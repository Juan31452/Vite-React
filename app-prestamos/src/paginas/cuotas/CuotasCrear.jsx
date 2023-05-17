import React, { useState } from 'react'
import app from "../../app.json";
import axios from 'axios';
import '../../estilos/form.css';
import { useNavigate, useParams } from 'react-router-dom';
import { TipoConexion } from '../../../TipoConexion';

const CuotasCrear = (prestamoActual) => {
  const [fecha, setFecha ] = useState(""); 
  const [prestamo, setPrestamo] = useState("");
  const [interes, setInteres] = useState("");
  const [abono_capital, setAbono_capital] = useState("");
  const [saldo, setSaldo] = useState("");
  const {APIHOST}= app;
  const [listaprestamos, setListaprestamos ] = useState("");
  const navigate = useNavigate();
  let { id } = useParams();

  const api = axios.create({
    baseURL: TipoConexion.apiUrl,
  });

  const calculo = () => {
    let url = '/prestamos/'+ id
    console.log(url);
    
    api
    .get(url)
    .then(res => { console.log(res.data)
    setListaprestamos(res.data)  
    console.log(listaprestamos);
    });
    
    setPrestamo(id);
    //valorInteres se redondea valor a dos digitos
    let valorInteres = ((listaprestamos.debe * 6) / 100).toFixed(2);
    setInteres(valorInteres);
    let capital = (listaprestamos.cuota-valorInteres);
    setAbono_capital(capital);
    let total = (listaprestamos.debe-capital);
    setSaldo(total); 
    
    console.log(prestamoActual);
    console.log(listaprestamos.debe);
    console.log(listaprestamos.cuota);
    console.log(valorInteres);
    console.log(capital); 
    console.log(total);

  }  
  
  const GuardarDatos = (event) => {
    event.preventDefault()

    const cuotaActual = {
       
      fecha: fecha,
      prestamo: prestamo,
      interes: interes,
      abono_capital: abono_capital,
      saldo: saldo,
          
    };
    
    const usuarioActual = {
      debe: saldo,
    };
    console.log(cuotaActual);
    api
    .post('/cuotas ',cuotaActual)
    .then((res) => { 
     const cuotas = res.data;
     console.log(cuotas);   
     console.log(prestamo);
    });

    let url = '/prestamos/' + prestamo;
    api.put(url, usuarioActual).then((res) => {
      console.log(usuarioActual);
      console.log(url);
      console.log(res.data);
      console.log("OK");
       
      
    });
  
       
     navigate('/prestamos');     

  }

  return (
    <div className="Formulario">    
      <form onSubmit={GuardarDatos}>
      
        <h1>Cuota</h1>
        <div className="division-uno">
          <input
            type="date"
            name="fecha"
            value={fecha} onChange={ev => setFecha(ev.target.value)}
            onClick = {calculo}            
          />
        </div>
        <div className="division-uno">
          <input
            type="hidden"
            name="prestamo"
            placeholder="Prestamo"
            value={prestamo} onChange={ev => setPrestamo(ev.target.value)}
          />
        </div>
        <div className="division-uno">
          <input
            type="number"
            name="interes"
            placeholder="Interes"
            value={interes} onChange={ev => setInteres(ev.target.value)}
          />
          </div>
          <div className="division-uno">
          <input
            type="number"
            name="abono_capital"
            placeholder="Abono Capital"
            value={abono_capital} onChange={ev => setAbono_capital(ev.target.value)}
          />
          </div>
          <div className="division-uno">
          <input
            type="number"
            name="saldo"
            placeholder="Saldo"
            value={saldo} onChange={ev => setSaldo(ev.target.value)}
          />
        </div>
        
          <button type="submit" className="miboton">
            Adicionar
          </button>
        </form>

      </div>
  )
}

export default CuotasCrear
