import React, { useEffect, useState } from 'react'
import '../estilos/form.css';
import app from "../app.json";
import axios from 'axios';
import { useContext } from 'react';
import { ContextoUsuario } from '../componentes/contexto/ContextoUsuario';
import { TipoConexion } from '../../TipoConexion';
import { useNavigate, Link } from 'react-router-dom';
import mialerta from 'sweetalert';
import { gsap } from 'gsap'

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
  function animateForm() {
    gsap.to('.Formulario', { duration: 3, y: 50 , ease: 'power3.out', fontSize: '20px'});
  }

  useEffect(() => {
    animateForm();
  }, []);TipoConexion

  const CargarDatos = async (event) => {
    event.preventDefault();
    try {
      const usuarioActual = {
     
        email: email,
        password: password,
  
   
      };

      const api = axios.create({
        baseURL: TipoConexion.apiUrl,
      });

      const response = await api.post('/usuarios/login ',usuarioActual)
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
    <div className="Formulario">
      <h3>Inicio Sesion</h3>
      <form onSubmit={CargarDatos}>
        <div className="division-uno">
          <input
            type="email"
            value={email}
            placeholder="Email"
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="division-uno">
          <input
            type="password"
            value={password}
            placeholder="Password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" id ="miboton">
          Iniciar Sesión
        </button>
      </form>
      <div className="contenedorEnlace">
        <p>
          <Link to="/UsuarioCrear"> Registrate</Link>
        </p>
      </div>
    </div>
  );
}

export default Login
