import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Background from "../../components/Background";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import GameForm from "../../components/GameForm";
import "./style.css";

const Gerenciador = ({ isOpen, onClose, onSubmit, initialValues }) => {
  const [jogos, setJogos] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const url = "https://6542c2c301b5e279de1f8b80.mockapi.io/jogos/";

  const openForm = (game) => {
    setSelectedGame(game);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedGame(null);
    setIsFormOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    //console.log(typeof formData.id);
    try {
      if (formData.id) {
        try {
          const response = await axios.put(`${url}/${formData.id}`, formData);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log(formData);
        const response = await axios.post(url, formData);
        console.log(response.data);
      }
      getJogos();
      closeForm();
    } catch (error) {
      console.error(error);
    }
  };

  // Funções da API de Jogos:
  const getJogos = async () => {
    try {
      const { data } = await axios.get(url);
      setJogos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteJogo = async (id) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      console.log(`ID: ${id} deletado`);
      getJogos();
    } catch (error) {
      console.error(`Erro deletando o jogo de ID: ${id}:`, error);
    }
  };

  useEffect(() => {
    getJogos();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Background />
        <div className="gerente-container">
          <h1>All Games</h1>
        </div>
        <div className="gerente-container">
          {jogos.map((jogo) => (
            <div className="game-card" key={jogo.id}>
              <img src={jogo.imagem} alt={jogo.titulo} />
              <h2>{jogo.titulo}</h2>
              <div className="icon-container">
                <i
                  className="bi bi-pencil-fill edit-icon"
                  onClick={() => openForm(jogo)}
                ></i>
                <i
                  className="bi bi-trash-fill delete-icon"
                  onClick={() => deleteJogo(jogo.id)}
                ></i>
              </div>
            </div>
          ))}
          <div className="game-card add-card" onClick={() => openForm(null)}>
            <i className="bi bi-plus-lg"></i>
          </div>
        </div>
        <GameForm
          isOpen={isFormOpen}
          onClose={closeForm}
          onSubmit={handleFormSubmit}
          initialValues={selectedGame}
        />
      </main>
      <Footer />
    </>
  );
};

export default Gerenciador;
