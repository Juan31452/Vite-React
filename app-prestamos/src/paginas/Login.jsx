import React, { useState } from 'react'
import '../estilos/login.css';
import app from "../app.json";
import axios from 'axios';
import { useContext } from 'react';
import { ContextoUsuario } from '../componentes/contexto/ContextoUsuario';
import Inicio from './Inicio';
import { useNavigate } from 'react-router-dom';
import mialerta from 'sweetalert';


const Login = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(ContextoUsuario);
  const navigate = useNavigate();

  const {APIHOST}= app;
  
  const MostrarAlerta = () => {
    mialerta({
      title:"Error",
      text:"Usuario o clave invalida",
      icon: "warning",
      button:"Aceptar"
    }).then(res => {
      setEmail('');
      setPassword('');
    })
  }

  const CargarDatos = async (event) => {
    event.preventDefault();
    try {
      const usuarioActual = {
     
        email: email,
        password: password,
  
   
      };
      const response = await axios.post(`${APIHOST}/usuarios/login `,usuarioActual)
      const { _id: id } = response.data;
      const {interes: interes} = response.data;
      console.log(id);
      console.log(interes);
      console.log(email);

      if (response.data) {
        await login(email, interes, id);  // pasar el email y password al método login del contexto 
        setEmail('');
        setPassword('');
        // Redirigir a la página principal
        navigate('/inicio');
        
      } 
      
    } catch (error) {
      setError(error.message);
      console.log(error);
      console.log("Credenciales inválidas");
       MostrarAlerta(); 
    }
    
   
  };
  
  return (
    <div className='contenedorForm'>
      <form className="login-form" onSubmit={CargarDatos} >
        
        <label htmlFor="email">Correo electrónico:</label>
        <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        />
    
    
        <label htmlFor="password">Contraseña:</label>
        <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        />
        <button className="submit-btn" type="submit">Iniciar sesión</button>
      </form>
    </div>
  )
}

export default Login
