import React, { useState } from "react";
import "./style.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Armazenar os dados na localStorage
    localStorage.setItem("contactData", JSON.stringify(formData));
    alert("Dados do formulário foram armazenados na localStorage.");
  };

  return (
    <div className="ContactForm">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>E-mail:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Mensagem:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default ContactForm;
