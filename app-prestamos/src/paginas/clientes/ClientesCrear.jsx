import axios from 'axios';
import '../../estilos/form.css';
import React, { useState } from "react";
import { useContext } from 'react';
import { ContextoUsuario } from '../../componentes/contexto/ContextoUsuario';
import { useNavigate } from 'react-router-dom';
import { TipoConexion } from '../../../TipoConexion';
//import Alerta from '../../componentes/Alerta';
import mialerta from "sweetalert";

const ClientesCrear = () => {
  const [nombres, setNombres ] = useState(""); 
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [cedula, setCedula ] = useState(""); 
  const [direccion, setDireccion] = useState("");
  const { id } = useContext(ContextoUsuario);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: TipoConexion.apiUrl,
  });

  const GuardarDatos = (event) => {
    event.preventDefault()

    const usuarioActual = {
       
      nombres: nombres,
      apellidos: apellidos,
      correo: correo,
      cedula: cedula,
      direccion: direccion,
      usuario: id, 
  
    };
    
    api
    .post('/clientes ',usuarioActual)
    .then((res) => { 
     const usuario = res.data;   
      console.log(usuario);  
      Alerta();   
    });

    const Alerta = () => {
      mialerta({
        title: "Clientes",
        text: "Registro Guardado con Exito",
        icon: "success",
        button: "Aceptar",
      }).then((res) => {
        navigate('/inicio');
      });
    };


    
  } 
  return (
    
    <div className='Formulario'>
      <h3>Nuevo</h3>      
      <form onSubmit={GuardarDatos}>
     
        <div className="division-uno">
          <input
            type="text"
            name="nombres"
            placeholder="Nombres"
            value={nombres} onChange={ev => setNombres(ev.target.value)}            
          />
        </div>
        <div className="division-uno">
          <input
            type="text"
            name="apellidos"
            placeholder="Apellidos"
            value={apellidos} onChange={ev => setApellidos(ev.target.value)}
          />
        </div>
        <div className="division-uno">
          <input
            type="text"
            name="correo"
            placeholder="Correo"
            value={correo} onChange={ev => setCorreo(ev.target.value)}
            
          />
        </div>
        <div className="division-uno">
          <input
            type="text"
            name="cedula"
            placeholder="Cedula"
            value={cedula} onChange={ev => setCedula(ev.target.value)}
            
          />
        </div>
        <div className="division-uno">
          <input
            type="text"
            name="direccion"
            placeholder="direccion"
            value={direccion} onChange={ev => setDireccion(ev.target.value)}          />
        </div>
        <button type="submit" id="miboton">
            Adicionar
        </button>
        
      </form>
     
    </div>
  );
};

export default ClientesCrear;
