import React from 'react'
import '../estilos/layout.css';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';



const Layout = () => {
  return (
    <nav>
      
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
