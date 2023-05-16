import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import mialerta from 'sweetalert';
import { TipoConexion } from '../../../TipoConexion';


const EditarClientes = () => {
  const [nombres, setNombres ] = useState(""); 
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [cedula, setCedula ] = useState(""); 
  const [direccion, setDireccion] = useState("");
  const navigate = useNavigate();
  
  
  let { id } = useParams();
  
  const api = axios.create({
    baseURL: TipoConexion.apiUrl,
  });

    useEffect(() => {
      console.log(id); 
      const editarClientes = async () => {
        try {
          const response = await api.get('/clientes/'+ id);
          setNombres(response.data.nombres);
          setApellidos(response.data.apellidos);
          setCorreo(response.data.correo);
          setCedula(response.data.cedula);
          setDireccion(response.data.direccion);
          //setUsuario(response.data.usuario)
          console.log(nombres);
        } catch (error) {
          console.error(error);
        }
        
      };

      editarClientes();
    },[] );
      
    const MostrarAlerta = () => {
      mialerta({
        title:"Clientes",
        text:"Registro Modificado",
        icon: "success",
        button:"Aceptar"
      }).then(res => {
        navigate('/clientes');
      })
    }
   
  const GuardarDatos = (event) => {
    event.preventDefault()

    const usuarioActual = {
       
      nombres: nombres,
      apellidos: apellidos,
      correo: correo,
      cedula: cedula,
      direccion: direccion,
    };
    
    let url = '/clientes/' + id;
      api.put(url,usuarioActual)
        .then(res => {console.log(url)
        console.log(res.data);
        console.log("Modificado")
        MostrarAlerta();   
        })

  } 
  return (
    <div>
    <form onSubmit={GuardarDatos}>
    <h1 className='tittle-registro'>Clientes</h1>
      <div className="division-uno">
        <label htmlFor="losnombres">Nombres:</label>
        <input
          type="text"
          name="nombres"
          value={nombres} onChange={ev => setNombres(ev.target.value)}            
        />
      </div>
      <div className="division-uno">
        <label htmlFor="losapellidos">Apellidos:</label>
        <input
          type="text"
          name="apellidos"
          value={apellidos} onChange={ev => setApellidos(ev.target.value)}
        />
      </div>
      <div className="division-uno">
        <label htmlFor="elcorreo">correo:</label>
        <input
          type="text"
          name="correo"
          value={correo} onChange={ev => setCorreo(ev.target.value)}
          
        />
      </div>
      <div className="division-uno">
        <label htmlFor="lacedula">Cedula:</label>
        <input
          type="text"
          name="cedula"
          value={cedula} onChange={ev => setCedula(ev.target.value)}
          
        />
      </div>
      <div className="division-uno">
        <label htmlFor="ladireccion">Direccion:</label>
        <input
          type="text"
          name="direccion"
          value={direccion} onChange={ev => setDireccion(ev.target.value)}          
        />
      </div>
      
      <button type="submit" className="btn btn-primary">
        Guardar
      </button>
      
    </form>

    </div>
  )
}

export default EditarClientes
