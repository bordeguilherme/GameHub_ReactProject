import Background from "../../components/Background";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Input from "../../components/Input_Login";

function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const armazenamento = localStorage.getItem("infos");

  const admin = {
    login: "admin",
    senha: "admin",
  };

  localStorage.setItem("admin", JSON.stringify(admin));

  let entrar;

  if (armazenamento != null) {
    const loginDefinido = JSON.parse(localStorage.getItem("infos")).login;
    const senhaDefinida = JSON.parse(localStorage.getItem("infos")).senha;

    const adminLogin = JSON.parse(localStorage.getItem("admin")).login;
    const adminSenha = JSON.parse(localStorage.getItem("admin")).senha;
    entrar = () => {
      if (login == adminLogin && senha == adminSenha) {
        navigate("/gerenciar");
      }

      if (login == "" || senha == "") {
        setError("Há campos vazios.");
        setTimeout(() => {
          setError("");
        }, 2000);
      } else if (login != loginDefinido || senha != senhaDefinida) {
        setError("Nome ou senha inválidos.");
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        navigate(`/home/${login}`);
      }
    };
  } else {
    useEffect(() => {
      navigate(`/cadastro`);
    }, []);
  }

  return (
    <main>
      <Background />
      <div className="login-box">
        <h2>Login</h2>
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
              type="password"
              value={senha}
              setValue={setSenha}
              label={"Senha"}
            />
          </div>
          <Link to={"/cadastro"}>
            <span>Não tem uma conta? Cadastre-se!</span>
          </Link>
          <button type="button" onClick={entrar}>
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
