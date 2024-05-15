import Background from "../../components/Background";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ImgAbout from "../../components/ImgAbout";
import "./style.css";
import axios from "axios";
import { useState, useEffect } from "react";

function About() {
  const [logins, setLogins] = useState([]);

  const users = [
    { login: "felipesutter" },
    { login: "Rofogale" },
    { login: "bordeguilherme" },
    { login: "lucascaiafa00" },
    { login: "RafaelVPL" },
  ];

  const urls = users.map(
    (user) => `https://api.github.com/users/${user.login}`
  );

  const getLogins = async () => {
    try {
      const promises = urls.map((url) => axios.get(url));
      const responses = await Promise.all(promises);
      const data = responses.map((response) => response.data);
      setLogins(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLogins();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Background />
        <div className="about-container">
          <div className="about-us">
            <h1>
              Sobre nós
            </h1>
            <p>
              A Game Hub é muito mais do que uma simples loja de jogos; é um
              paraíso para entusiastas de videogames e amantes de entretenimento
              digital. Localizada no coração da cidade, a Game Hub oferece uma
              experiência única para todos os tipos de jogadores. Nossa equipe
              apaixonada está sempre à disposição para ajudá-lo a encontrar os
              jogos perfeitos e responder a todas as suas perguntas. Na Game
              Hub, acreditamos que os videogames são mais do que apenas um
              passatempo; são uma forma de se conectar, competir e explorar
              mundos incríveis. Venha nos visitar e faça da Game Hub o seu
              destino número um para todos os seus desejos de jogos. Estamos
              ansiosos para recebê-lo!
            </p>
          </div>
          <div className="github">
            <h2>Nossos Fundadores</h2>
            {logins.map((item) => (
              <ImgAbout key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default About;
