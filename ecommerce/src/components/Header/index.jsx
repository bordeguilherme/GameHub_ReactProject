import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./style.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsSun, BsMoonFill } from "react-icons/bs";
import CartPopup from "../Carrinho";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function Header() {
  const url = "https://6542c2c301b5e279de1f8b80.mockapi.io/jogos";
  const [categorias, setCategorias] = useState([]);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const getJogos = async () => {
    try {
      const { data } = await axios.get(url);
      const categoriasApi = [
        ...new Set(data.map((objeto) => objeto.categoria)),
      ];
      setCategorias(categoriasApi);
    } catch (error) {
      console.log(error);
    }
  };

  const buttonStyle = {
    backgroundColor: theme === "light" ? "black" : "black",
    padding: "10px",
    border: "none",
    cursor: "pointer",
  };

  useEffect(() => {
    getJogos();
  }, []);

  const navigate = useNavigate();

  const armazenamento = localStorage.getItem("infos");

  let login;

  if (armazenamento != null) {
    login = JSON.parse(localStorage.getItem("infos")).login;
  } else {
    useEffect(() => {
      navigate(`/cadastro`);
    }, []);
  }

  const cat = (categoria) => {
    navigate("/categoria/" + categoria);
  };

  return (
    <>
      <Navbar expand="lg" className="header-color" sticky="top">
        <Container>
          <Link to="/home">
            <Navbar.Brand href="/home">Game Hub</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" variant="underline">
              <Link to="/home">
                <Nav.Link href="/home">Home</Nav.Link>
              </Link>
              <Link to="/contato">
                <Nav.Link href="/contato">Contato</Nav.Link>
              </Link>
              <NavDropdown
                title="Categorias"
                id="basic-nav-dropdown"
                menuVariant="dark"
              >
                {categorias.map((categoria) => (
                  <NavDropdown.Item
                    key={categoria}
                    onClick={() => cat(categoria)}
                  >
                    <Link to={`/categorias/${categoria}`}>{categoria}</Link>
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <Link to="/about">
                <Nav.Link href="/about">Sobre Nós</Nav.Link>
              </Link>

              <Nav.Item href="/login" className="login-name">
                Seja bem-vindo(a), {login}!
              </Nav.Item>
              <button
                onClick={toggleTheme}
                className="botao-tema"
                style={buttonStyle}
              >
                {theme === "light" ? <BsSun /> : <BsMoonFill />}
              </button>
              <button className="carrinho-btn" onClick={openCart}>
              <i className="bi bi-cart icon-cart" onClick={openCart}></i></button> 
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CartPopup isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}

export default Header;
