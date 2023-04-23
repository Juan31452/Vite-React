import React from 'react'
import { NavLink, useParams } from 'react-router-dom';

const ConfirmarPrestamo = () => {
    let { id } = useParams();
  return (
    <div>
      <br />
      <h1 style={{color: "red"}}>¿Desea eliminar el Prestamo {id}?</h1><br />
      <NavLink to="/prestamos" className="btn btn-light">Cancelar</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
      <NavLink to={"/eliminarPrestamo/"+id} className="btn btn-danger">Eliminar</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  )
}

export default ConfirmarPrestamo
