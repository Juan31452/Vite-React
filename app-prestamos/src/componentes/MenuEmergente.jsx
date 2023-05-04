import React from 'react'
import '../estilos/MenuEmergente.css';
import { useContext } from 'react';
import { ContextoUsuario } from './contexto/ContextoUsuario';
import Milink from './Milink';

const MenuEmergente = ({ onClose }) => {
  const { logout,id } = useContext(ContextoUsuario);
  return (
    <div className="menu-container">
      <ul className="menu-items">
        <li><Milink to={`/editarUsuarios/${id}`}> Editar  </Milink></li>

      </ul>
      <button className="menu-close" onClick={logout}>Cerrar</button>
    </div>
  )
}

export default MenuEmergente

