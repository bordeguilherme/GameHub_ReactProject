import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const GameForm = ({ isOpen, onClose, onSubmit, initialValues }) => {
  const [formData, setFormData] = useState({ ...initialValues }); // Use spread operator to avoid directly modifying initialValues
  const [categories, setCategories] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const url = "https://6542c2c301b5e279de1f8b80.mockapi.io/jogos/";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(url);
        const unique = [...new Set(data.map((form) => form.categoria))];

        const categoriesData = unique.map((category, index) => ({
          id: `category${index + 1}`,
          name: category,
        }));

        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setFormData({ ...initialValues });
  }, [initialValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      onSubmit(formData);
      onClose();
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.titulo || formData.titulo.trim() === "") {
      errors.titulo = "Título é obrigatório";
    }
    if (!formData.categoria || formData.categoria.trim() === "") {
      errors.categoria = "Categoria é obrigatória";
    }
    if (!formData.descricao || formData.descricao.trim() === "") {
      errors.descricao = "Description is required";
    }
    if (isNaN(parseFloat(formData.preco))) {
      errors.preco = "Preço inválido";
    }
    if (isNaN(formData.avaliacao)) {
      errors.avaliacao = "Avaliação inválida";
    }
    return errors;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal form-modal">
      <div className="modal-content form-modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <label>
            Título:
            <input
              type="text"
              name="titulo"
              value={formData.titulo || ""}
              onChange={handleInputChange}
            />
            {formErrors.titulo && (
              <span className="error">{formErrors.titulo}</span>
            )}
          </label>
          <label>
            Categoria:
            <select
              name="categoria"
              value={formData.categoria || ""}
              onChange={handleInputChange}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {formErrors.categoria && (
              <span className="error">{formErrors.categoria}</span>
            )}
          </label>
          <label>
            URL da Imagem:
            <input
              type="text"
              name="imagem"
              value={formData.imagem || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Descrição:
            <textarea
              name="descricao"
              value={formData.descricao || ""}
              onChange={handleInputChange}
            />
            {formErrors.descricao && (
              <span className="error">{formErrors.descricao}</span>
            )}
          </label>
          <label>
            Preço:
            <input
              type="text"
              name="preco"
              value={formData.preco || ""}
              onChange={handleInputChange}
            />
            {formErrors.preco && (
              <span className="error">{formErrors.preco}</span>
            )}
          </label>
          <label>
            Avaliação:
            <input
              type="text"
              name="avaliacao"
              value={formData.avaliacao || ""}
              onChange={handleInputChange}
            />
            {formErrors.avaliacao && (
              <span className="error">{formErrors.avaliacao}</span>
            )}
          </label>
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default GameForm;
