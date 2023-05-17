import React from 'react'
import { useNavigate } from 'react-router-dom';
import mialerta from "sweetalert";

const Alerta = () => {
 const navigate = useNavigate();
  mialerta({
    title: "Actualizado",
    text: "Registro Guardado con Exito",
    icon: "success",
    button: "Aceptar",
   }).then((res) => {
      navigate('/inicio');
   });
}

export default Alerta
