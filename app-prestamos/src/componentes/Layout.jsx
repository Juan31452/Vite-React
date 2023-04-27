import React, { useEffect, useState } from 'react'
import '../estilos/layout.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ContextoUsuario } from './contexto/ContextoUsuario';
import Login from '../paginas/Login';

const Layout = () => {
  const { email,logout,ocultarDiv,textoBoton } = useContext(ContextoUsuario);
  const [isOpen, setIsOpen] = useState(false); // Estado para manejar la apertura/cierre del menú

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log(email);
    console.log(ocultarDiv);
  }, []);
  
  const menuClass = isOpen ? 'menu open' : 'menu';

  return (
    <nav> 
      {ocultarDiv ?  <div id="cerrarsesion" onClick={logout}>{email}</div> :  null }
        
       
      
      <div className={menuClass}>
         
        
               
        <button onClick={toggleMenu} className="menu-button">
          {isOpen ? 'Cerrar' : 'Menú'}
        </button>
        <ul className="menu-list">
          <li className="menu-item">
            
              <Link to="/inicio" className="edit-link">
                Inicio
              </Link>
            
          </li>
          <li className="menu-item">
            <Link to="/clientes" className="nav-link">
              Clientes
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/prestamos" className="nav-link">
              Prestamos
            </Link>
          </li>
        </ul>
        
        
      </div>  
    </nav>

  )
}

export default Layout
