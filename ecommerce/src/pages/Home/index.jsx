import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Categoria from "../../components/ListaCateg";
import { Link } from "react-router-dom";
import Background from "../../components/Background";
import logo from "../../assets/logo.png";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function Home() {
  const url = "https://6542c2c301b5e279de1f8b80.mockapi.io/jogos";
  const [jogos, setJogos] = useState([]);
  const [jogosDestaque, setJogosDestaque] = useState([]);

  const getJogos = async () => {
    try {
      const { data } = await axios.get(url);
      const jogosPorAvaliacao = data
        .sort((a, b) => b.avaliacao - a.avaliacao)
        .slice(0, 3);
      setJogosDestaque(jogosPorAvaliacao);
      setJogos(data);
    } catch (error) {
      console.log(error);
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
        <div>
          <section id="inicio">
            <img src={logo} alt="" />
          </section>
          <section id="destaques">
            <h2>Destaques</h2>

            <div className="grid-container">
              {jogosDestaque[1] && (
                <Link
                  to={`/jogo/${jogosDestaque[1].id}`}
                  className="conteudo-maior container-destaque"
                >
                  <img
                    className="img-destaque"
                    src={jogosDestaque[1].imagem}
                    alt=""
                  />
                  <p>{jogosDestaque[1].titulo}</p>
                </Link>
              )}
              {jogosDestaque[0] && (
                <Link
                  to={`/jogo/${jogosDestaque[0].id}`}
                  className="conteudo-menor container-destaque"
                >
                  <img
                    className="img-destaque"
                    src={jogosDestaque[0].imagem}
                    alt=""
                  />
                  <p>{jogosDestaque[0].titulo}</p>
                </Link>
              )}
              {jogosDestaque[2] && (
                <Link
                  to={`/jogo/${jogosDestaque[2].id}`}
                  className="conteudo-menor container-destaque"
                >
                  <img
                    className="img-destaque"
                    src={jogosDestaque[2].imagem}
                    alt=""
                  />
                  <p>{jogosDestaque[2].titulo}</p>
                </Link>
              )}
            </div>
          </section>

          <section id="categorias">
            <Categoria categoria={"ação"} jogos={jogos} />
            <Categoria categoria={"puzzle"} jogos={jogos} />
            <Categoria categoria={"fps"} jogos={jogos} />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
