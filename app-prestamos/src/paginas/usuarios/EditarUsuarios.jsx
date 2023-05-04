import React, { useEffect, useState } from 'react'
import app from "../../app.json";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import mialerta from 'sweetalert';
import '../../estilos/form.css';

const EditarUsuarios = () => {
  const {APIHOST}= app;
  const [email, setEmail ] = useState(""); 
  const [password, setPassword] = useState("");
  const [interes, setInteres] = useState("");
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    console.log(id);

    console.log(id);
    axios.get(`${APIHOST}/usuarios/` + id).then((res) => {
      console.log(res);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setInteres(res.data.interes);
      console.log(email);
    });
  }, []);
  
  const MostrarAlerta = () => {
    mialerta({
      title: "Clientes",
      text: "Registro Modificado",
      icon: "success",
      button: "Aceptar",
    }).then((res) => {
      navigate('/inicio');
    });
  };
  
  const GuardarDatos = (event) => {
    event.preventDefault();

    const usuarioActual = {
      email: email,
      password: password,
      interes: interes,
    };

    let url = `${APIHOST}/usuarios/` + id;
    axios.put(url, usuarioActual).then((res) => {
      console.log(url);
      console.log(res.data);
      console.log("Modificado");
      MostrarAlerta();
    });
  };

  return (
    <div className="Formulario">
      <form onSubmit={GuardarDatos}>
        <h3 >Editar Usuario</h3>
        <div className="division-uno">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </div>
        <div className="division-uno">
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
        <div className="division-uno">
          <input
            type="text"
            name="interes"
            placeholder="Interes"
            value={interes}
            onChange={(ev) => setInteres(ev.target.value)}
          />
        </div>
        <button type="submit" id="miboton">
          Actualizar
        </button>
      </form>
    </div>
  );
}

export default EditarUsuarios
