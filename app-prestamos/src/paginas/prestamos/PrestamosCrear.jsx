import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../../estilos/table.css';
import { useContext } from 'react';
import { ContextoUsuario } from '../../componentes/contexto/ContextoUsuario';
import mialerta from "sweetalert";
import { useNavigate } from 'react-router-dom';
import { TipoConexion } from '../../../TipoConexion';

const PrestamosCrear = () => {
  const [fecha, setFecha ] = useState(""); 
  const [valor_prestamo, setValor_prestamo] = useState("");
  const [cuota, setCuota ] = useState(""); 
  const [cliente, setCliente] = useState("");
  const [debe, setDebe] = useState("");
  const [letra, setLetra] = useState("");
  const [fotocopia, setFotocopia] = useState("");
  const [listaclientes, setListaclientes ] = useState("");
  const { id, interes } = useContext(ContextoUsuario);
  const navigate = useNavigate();
  
  const api = axios.create({
    baseURL: TipoConexion.apiUrl,
  });

  const GuardarDatos = (event) => {
    event.preventDefault()

    const prestamoActual = {
       
      fecha: fecha,
      valor_prestamo: valor_prestamo,
      miinteres: interes,
      cuota: cuota,
      cliente: cliente,
      letra: letra,
      fotocopia: fotocopia,
      debe: debe,
      usuario: id,
      
    };
    api
    .post('/prestamos ',prestamoActual)
    .then((res) => { 
     const prestamo = res.data;
       console.log(prestamo);
       MostrarAlerta();  
     
    });
    
    const MostrarAlerta = () => {
      mialerta({
        title: "Prestamos",
        text: "Registro Guardado con Exito",
        icon: "success",
        button: "Aceptar",
      }).then((res) => {
        navigate('/inicio');
      });
    };
    
  }
  
  const calculo = () => {
    let micuota = (valor_prestamo * interes)/100 ;
    console.log(micuota); 
    setCuota(micuota);
    setDebe(valor_prestamo);
    setLetra("Si");
    setFotocopia("Si");
   
  }
  
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get('/clientes/buscarPorUsuario/'+ id);
        setListaclientes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClientes();
  }, []);
  
  return (
    <div className="Formulario">
    <form onSubmit={GuardarDatos}>
       <h3 className='tittle-registro'>Prestamos</h3>
       <div className="division-uno">
         <input
           type="date"
           name="fecha"
           value={fecha} onChange={ev => setFecha(ev.target.value)}            
         />
       </div>
       <div className="division-uno">
         <input
           type="number"
           name="valor_prestamo"
           placeholder="Valor Prestamo"
           value={valor_prestamo} onChange={ev => setValor_prestamo(ev.target.value)}
           onKeyUp = {calculo}
         />
       </div>
       <div className="division-uno">
         <input
           type="number"
           name="cuota"
           placeholder="Cuota"
           value={cuota} onChange={ev => setCuota(ev.target.value)}
           
         />
       </div>
       <div className="division-uno">
         
          {' '}  
          <select name = "cliente" value={cliente} onChange={ev => setCliente(ev.target.value)}>
             <option value=" " >Seleccione un Cliente...</option>             
             {listaclientes && listaclientes.map((elcliente) => (
                               
               <option key={elcliente._id} value={elcliente.nombres}>{elcliente.nombres}</option>  
                                        
               
             ))} 
           </select>  
        </div>
       
       <button type="submit" id="miboton">Adicionar</button>
       
     </form>
  
    </div>
  )
}

export default PrestamosCrear
