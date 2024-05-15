import React, { useState, useEffect } from "react";
import axios from "axios";
import Background from "../../components/Background";
import "./style.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";

export default function Jogo() {
  const { id } = useParams();
  const url = "https://6542c2c301b5e279de1f8b80.mockapi.io/jogos/";
  const [jogo, setJogo] = useState(null);

  const getJogo = async () => {
    try {
      const { data } = await axios.get(url);
      const jogoAtual = data.find((item) => item.id == id);
      setJogo(jogoAtual);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = () => {
    const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const isItemInCart = existingCartItems.some((item) => item.id === id);

    if (!isItemInCart) {
      const newItem = { id, title: jogo.titulo, price: jogo.preco };
      const updatedCartItems = [...existingCartItems, newItem];
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      alert("Jogo adicionado ao carrinho!");
    } else {
      alert("Erro: Esse jogo já está no carrinho!");
    }
  };

  useEffect(() => {
    getJogo();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Background />
        {jogo && (
          <div className="game-container">
            <h2>{jogo.titulo}</h2>
            <img src={jogo.imagem} alt={jogo.titulo} />
            <div>
              <p>
                <strong>Categoria: </strong>
                {jogo.categoria}
              </p>
              <p>
                <strong>Descrição: </strong>
                {jogo.descricao}
              </p>
              <p>
                <strong>Nota: </strong>
                {jogo.avaliacao}
              </p>
              <p>
                <strong>Preço: </strong>
                R$ {jogo.preco}
              </p>
            </div>
            <button onClick={addToCart}>Comprar</button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
