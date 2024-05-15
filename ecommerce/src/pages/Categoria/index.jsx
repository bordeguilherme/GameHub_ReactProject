import React from "react";
import Card from "../../components/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Background from "../../components/Background";
import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Categorias() {
  const [jogos, setJogos] = useState([]);
  const url = "https://6542c2c301b5e279de1f8b80.mockapi.io/jogos";
  const { categoria } = useParams();

  const getJogos = async () => {
    try {
      const { data } = await axios.get(url);
      const jogosCategoria = data.filter((jogo) => jogo.categoria == categoria);
      setJogos(jogosCategoria);
      console.log(jogos)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJogos();
  }, [categoria]);

  return (
    <>
      <Header />
      <main>
        <Background />
        <div className="categ">
          <h1>{categoria}</h1>

          <div className="cards-container cards-categoria">
            {jogos.map((item) => (
              <Card key={item.id} jogo={item} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
