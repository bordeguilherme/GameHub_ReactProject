import Background from "../../components/Background";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Input from "../../components/Input_Login";

function Cadastro() {
  const [login, setLogin] = useState("");
  const [confirmaLogin, setConfirmaLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const entrar = () => {
    if (login == "" || confirmaLogin == "" || senha == "") {
      setError("Há campos vazios.");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else if (login != confirmaLogin) {
      setError("Os campos de nome devem ser iguais.");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      const infos = {
        login: login,
        confirmaLogin: confirmaLogin,
        senha: senha,
      };
      localStorage.setItem("infos", JSON.stringify(infos));
      navigate(`/`);
    }
  };

  return (
    <main>
      <Background />
      <div className="login-box">
        <h2>Cadastre-se</h2>
        <form>
          <p className="error-msg">{error}</p>

          <div className="user-box">
            <Input
              type="text"
              value={login}
              setValue={setLogin}
              label={"Nome"}
            />
          </div>
          <div className="user-box">
            <Input
              type="text"
              value={confirmaLogin}
              setValue={setConfirmaLogin}
              label={"Confirmar nome"}
            />
          </div>
          <div className="user-box">
            <Input
              type="password"
              value={senha}
              setValue={setSenha}
              label={"Senha"}
            />
          </div>
          <Link to={"/"}>
            <span>Já tem uma conta? Clique aqui!</span>
          </Link>
          <button type="button" onClick={entrar}>
            Continuar
          </button>
        </form>
      </div>
    </main>
  );
}

export default Cadastro;
