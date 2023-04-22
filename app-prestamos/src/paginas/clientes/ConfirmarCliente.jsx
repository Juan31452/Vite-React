import React from 'react'
import { NavLink, useParams } from 'react-router-dom';

const ConfirmarCliente = () => {
    let { id } = useParams();
  return (
    <div>
        <br />
        <h1 style={{color: "red"}}>¿Desea eliminar el cliente {id}?</h1><br />
        <NavLink to="/clientes" className="btn btn-light">Cancelar</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
        <NavLink to={"/eliminarCliente/"+id} className="btn btn-danger">Eliminar</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
           
    </div>
  )
}

export default ConfirmarCliente
