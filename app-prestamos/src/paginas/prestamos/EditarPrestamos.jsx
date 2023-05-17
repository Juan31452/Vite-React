import React, { useEffect, useState } from 'react'
import '../../estilos/form.css';
import { useContext } from 'react';
import  { ContextoUsuario } from '../../componentes/contexto/ContextoUsuario';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import mialerta from 'sweetalert';
import { TipoConexion } from '../../../TipoConexion';

const EditarPrestamos = () => {
  const [fecha, setFecha] = useState("");
  const [valor_prestamo, setValor_prestamo] = useState("");
  const [cuota, setCuota] = useState("");
  //const [cliente, setCliente] = useState("");
  const [debe, setDebe] = useState("");
  const [letra, setLetra] = useState("");
  const [fotocopia, setFotocopia] = useState("");
  //const [listaclientes, setListaclientes] = useState("");
  const { interes } = useContext(ContextoUsuario);
  const navigate = useNavigate();
  let { id } = useParams();
  
  const api = axios.create({
    baseURL: TipoConexion.apiUrl,
  });

  useEffect(() => {
    console.log(id);
    const editarPrestamos = async () => {
    try {
      const response = await api.get('/prestamos/'+ id);
      setFecha(response.data.fecha);
      setValor_prestamo(response.data.valor_prestamo);
      setCuota(response.data.cuota);
      //setCliente(res.data.cliente);
      setDebe(response.data.debe);
      setLetra(response.data.letra);
      setFotocopia(response.data.fotocopia);
      console.log(fecha);

    } catch (error) {
      console.error(error);
    }
    
  };  
         
  editarPrestamos();
},[] );

  const MostrarAlerta = () => {
    mialerta({
      title: "Clientes",
      text: "Registro Modificado",
      icon: "success",
      button: "Aceptar",
    }).then((res) => {
      navigate('/prestamos');
    });
  };

  const GuardarDatos = (event) => {
    event.preventDefault();

    const usuarioActual = {
      fecha: fecha,
      valor_prestamo: valor_prestamo,
      cuota: cuota,
      //cliente: cliente,
      letra: letra,
      fotocopia: fotocopia,
      debe: debe,
    };

    let url = '/prestamos/' + id;
      api.put(url, usuarioActual).then((res) => {
      console.log(url);
      console.log(res.data);
      console.log("Modificado");
      MostrarAlerta();
    });
  };

  const calculo = () => {
    let micuota = (valor_prestamo * interes) / 100;
    console.log(micuota);
    setCuota(micuota);
    //setDebe("No");
    setLetra("Si");
    setFotocopia("Si");
  };

  return (
    <div className='Formulario'>
    <form onSubmit={GuardarDatos}>
    <h1>Prestamos</h1>
    <div className="division-uno">
      <label htmlFor="lafecha">Fecha:</label>
      <input
        type="date"
        name="fecha"
        value={fecha}
        onChange={(ev) => setFecha(ev.target.value)}
      />
    </div>
    <div className="division-uno">
      <label htmlFor="valorprestamo">Prestamo:</label>
      <input
        type="number"
        name="valor_prestamo"
        placeholder="Valor Prestamo"
        value={valor_prestamo}
        onChange={(ev) => setValor_prestamo(ev.target.value)}
        onKeyUp={calculo}
      />
    </div>
    <div className="division-uno">
      <label htmlFor="lacuota">Cuota:</label>
      <input
        type="number"
        name="cuota"
        placeholder="Cuota"
        value={cuota}
        onChange={(ev) => setCuota(ev.target.value)}
      />
    </div>
    <div className="division-uno">
      <label htmlFor="laletra">Letra:</label>
      <input
        type="text"
        name="letra"
        placeholder="Letra"
        value={letra}
        onChange={(ev) => setLetra(ev.target.value)}
      />
    </div>
    <div className="division-uno">
      <label htmlFor="lafotocopia">Fotocopia:</label>
      <input
        type="text"
        name="fotocopia"
        placeholder="Fotocopia"
        value={fotocopia}
        onChange={(ev) => setFotocopia(ev.target.value)}
      />
    </div>
    <div className="division-uno">
      <label htmlFor="debe">Debe:</label>
      <input
        type="text"
        name="debe"
        placeholder="Debe"
        value={debe}
        onChange={(ev) => setDebe(ev.target.value)}
      />
    </div>
    
    <button type="submit" id="miboton">
      Actualizar
    </button>
  </form>
    </div>
  )
}

export default EditarPrestamos
