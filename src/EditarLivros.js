import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./AppNavbar";

const EditarLivros = () => {
  const initialFormState = {
    isbn: "",
    titulo: "",
    autor: "",
  };
  const [group, setGroup] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== `new`) {
      fetch(`http://localhost:8080/api/v1/livros/id/${id}`)
        .then((response) => response.json())
        .then((data) => setGroup(data));
    }
  }, [id, setGroup]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGroup({ ...group, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(
      `http://localhost:8080/api/v1/livros/${group.id ? `/${group.id}` : ""}`,
      {
        method: group.id ? "PUT" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(group),
      }
    );
    setGroup(initialFormState);
    navigate("/groups");
  };

  const title = <h2>{group.id ? "Editar Livro" : "Cadastar Livro"}</h2>;

  return (
    <div>
      <AppNavbar />
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">ISBN</Label>
            <Input
              type="text"
              name="isbn"
              id="isbn"
              value={group.isbn || ""}
              onChange={handleChange}
              autoComplete="name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="titulo">Titulo</Label>
            <Input
              type="text"
              name="titulo"
              id="titulo"
              value={group.titulo || ""}
              onChange={handleChange}
              autoComplete="address-level1"
            />
          </FormGroup>
          <FormGroup>
            <Label for="autor">Autor</Label>
            <Input
              type="autor"
              name="autor"
              id="autor"
              value={group.autor || ""}
              onChange={handleChange}
              autoComplete="address-level1"
            />
          </FormGroup>

          <FormGroup>
            <Button color="primary" type="submit">
              Save
            </Button>{" "}
            <Button color="secondary" tag={Link} to="/groups">
              Cancel
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
};

export default EditarLivros;
