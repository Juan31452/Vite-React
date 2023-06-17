import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import '../../estilos/form.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TipoConexion } from '../../../TipoConexion';

const UsuariosCrear = () => {
    
    const [email, setEmail ] = useState(""); 
    const [password, setPassword] = useState("");
    const [interes, setInteres] = useState("");
    const formRef = useRef(null);
    
    const api = axios.create({
      baseURL: TipoConexion.apiUrl,
    });

    function animateForm() {
      gsap.to('.Formulario', { duration: 3, y: 50 , ease: 'power3.out', fontSize: '30px'});
    }
  
    useEffect(() => {
      animateForm();
    }, []);
    
    const GuardarDatos = (event) => {
      event.preventDefault()
  
      const usuarioActual = {
         
        email: email,
        password: password,
        interes: interes,
        
      };
      
      api
      .post('/usuarios ',usuarioActual)
      .then((res) => { 
       const usuario = res.data;
         window.location.replace('/');    
        console.log(usuario);   
      });
      
    } 

  return (
    <div className='Formulario'>
      <form onSubmit={GuardarDatos} >
      <h3>Nuevo Usuario</h3>
        <div className="division-uno">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email} onChange={ev => setEmail(ev.target.value)}            
          />
        </div>
        <div className="division-uno">
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={password} onChange={ev => setPassword(ev.target.value)}
          />
        </div>
        <div className="division-uno">
          <input
            type="text"
            name="interes"
            placeholder="Interes"
            value={interes} onChange={ev => setInteres(ev.target.value)}
            
          />
        </div>
        <button type="submit" id="miboton">
            Adicionar
        </button>
        
      </form>
      <div className="contenedorEnlace">
        <p>
          <Link to="/Login"> Inicio Sesion</Link>
        </p>
      </div>
    </div>
  )
}

export default UsuariosCrear
