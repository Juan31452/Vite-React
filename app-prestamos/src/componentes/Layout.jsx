import React, { useEffect, useState } from 'react'
import '../estilos/layout.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ContextoUsuario } from './contexto/ContextoUsuario';
import Login from '../paginas/Login';

const Layout = () => {
  const { email,logout,ocultarDiv,textoBoton } = useContext(ContextoUsuario);
 

  useEffect(() => {
    console.log(email);
    console.log(ocultarDiv);
  }, []);

  return (
    <nav>
    <div>
    <p id='emailactivo'>Email: {email}</p>  
    {ocultarDiv ?  <div id="cerrarsesion" onClick={logout}>{textoBoton}</div> :  null }

    </div> 
        <ul>
          <li>
           
              <Link to="/inicio" className="edit-link">
                Inicio
              </Link>
            
          </li>
          <li>
            <Link to="/clientes" className="nav-link">
              Clientes
            </Link>
          </li>
          <li>
            <Link to="/prestamos" className="nav-link">
              Prestamos
            </Link>
          </li>
        </ul>
             
     
    </nav>

  )
}

export default Layout
