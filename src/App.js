import React from "react";
import "./App.css";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListaLivros from "./ListaLivros";
import EditarLivros from "./EditarLivros";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/groups" exact={true} element={<ListaLivros />} />
        <Route path="/groups/:id" element={<EditarLivros />} />
      </Routes>
    </Router>
  );
};

export default App;
