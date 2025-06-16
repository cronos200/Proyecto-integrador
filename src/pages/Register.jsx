import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alerta } from "../helpers/funciones";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    if (!name || !email || !password) {
      alerta("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alerta("Correo inválido", "Ingresa un correo válido", "warning");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Error al registrar usuario");
      }

      alerta(
        "¡Registro exitoso!",
        "Ahora puedes iniciar sesión",
        "success"
      ).then(() => {
        navigate("/login");
      });
    } catch (err) {
      console.error("Error en el registro:", err);
      alerta("Error", err.message, "error");
    }
  };

  return (
    <div className="form-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre completo:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <label>Correo electrónico:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
