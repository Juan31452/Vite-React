import axios from 'axios';
import React from 'react'
import { NavLink ,useParams } from 'react-router-dom';
import { TipoConexion } from '../../../TipoConexion';

const EliminarPrestamos = () => {
  const {APIHOST}= app;
  let { id } = useParams();
  console.log(id); 
  
  const api = axios.create({
    baseURL: TipoConexion.apiUrl,
  }); 

  console.log(id);
  api.delete('/prestamos/'+ id).then(res => {console.log(res.data)
      this.setState({ status: true });
  console.log("Eliminado")    
  });

  return (
    <div>
     <h2>Registro Eliminado </h2>
     <NavLink to="/prestamos" className="btn btn-light">Volver</NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  )
}

export default EliminarPrestamos
