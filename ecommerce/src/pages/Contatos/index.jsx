import Background from "../../components/Background";
import ContactForm from "../../components/ContactForm";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "./style.css";

function Contatos() {
  return (
    <>
      <Header />
      <main>
        <Background />
        <div className="contatos-container">
          <div className="form">
            <h2>Contato: </h2>
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Contatos;
