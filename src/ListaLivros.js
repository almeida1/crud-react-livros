import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";

const ListaLivros = () => {
  console.log("chamada do componente lista livros");
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    //fetch("/api/livros.json")
    fetch("http://localhost:8080/api/v1/livros")
      .then((response) => response.json())
      .then((data) => {
        setGroups(data);
        setLoading(false);
      });
  }, []);

  const remove = async (id) => {
    await fetch(`http://localhost:8080/api/v1/livros/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedGroups = [...groups].filter((i) => i.id !== id);
      setGroups(updatedGroups);
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const groupList = groups.map((group) => {
    return (
      <tr key={group.id}>
        <td style={{ whiteSpace: "nowrap" }}>{group.isbn}</td>
        <td>{group.titulo}</td>

        <td>{group.autor}</td>

        <td>
          <ButtonGroup>
            <Button
              size="sm"
              color="primary"
              tag={Link}
              to={"/groups/" + group.id}
            >
              Edit
            </Button>
            <Button size="sm" color="danger" onClick={() => remove(group.id)}>
              Delete
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <AppNavbar />
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/groups/new">
            Cadastrar Livro
          </Button>
        </div>
        <h3>Lista de Livros</h3>
        <Table className="mt-4">
          <thead>
            <tr>
              <th width="20%">ISBN</th>
              <th width="20%">Titulo</th>
              <th width="20%">Autor</th>
              <th width="10%">Ações</th>
            </tr>
          </thead>
          <tbody>{groupList}</tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ListaLivros;
