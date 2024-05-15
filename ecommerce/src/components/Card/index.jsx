import "./style.css";
import { Link } from "react-router-dom";

function Card({ jogo }) {
  return (
    <Link to={`/jogo/${jogo.id}`} className="card-jogo">
      <div className="img-container">
        <img className="img-jogo" src={jogo.imagem} alt="" />
      </div>
      <h3>{jogo.titulo}</h3>
      <h3>R${jogo.preco}</h3>
    </Link>
  );
}

export default Card;
