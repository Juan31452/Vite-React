import React from 'react'
import axios from 'axios';
import {  NavLink, useParams,} from "react-router-dom";
import app from "../../app.json";

const EliminarCliente = () => {
  const {APIHOST}= app;
  let { id } = useParams();
  console.log(id); 
  
  

  console.log(id);
  axios.delete(`${APIHOST}/clientes/`+ id).then(res => {console.log(res.data)
      this.setState({ status: true });
  console.log("Eliminado")    
  });

  return (
    <div>
        <h2>Registro Eliminado </h2>
        <NavLink to="/clientes" className="btn btn-light">Volver</NavLink>&nbsp;&nbsp;&nbsp;&nbsp; 
    </div>
  )
}

export default EliminarCliente

