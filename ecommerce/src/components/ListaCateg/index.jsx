import Card from "../Card";
import "./style.css";
import { Link } from "react-router-dom";

function Categoria({ jogos, categoria }) {
  const jogosCategoria = jogos
    .filter((jogo) => jogo.categoria == categoria)
    .slice(0, 4);
  return (
    <article className={categoria}>
      <div className="categoria-botao">
        <h2>{categoria}</h2>
        <Link
          className="ver-mais"
          to={`/categoria/${categoria}`}
          onClick={() => {
            window.scroll({
              top: 0,
              left: 0,
            });
          }}
        >
          Ver mais
        </Link>
      </div>
      <div className="cards-container">
        {jogosCategoria.map((item) => (
          <Card key={item.id} jogo={item} />
        ))}
      </div>
    </article>
  );
}

export default Categoria;
