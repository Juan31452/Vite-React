import React, { useEffect, useState } from 'react'
import axios from 'axios';
import app from "../../app.json";
import '../../estilos/table.css';
import Loading from '../../componentes/Loading';
import Modal from '../../componentes/Modal';
import Consultar from '../../componentes/Consultar';
import Milink from '../../componentes/Milink';
import ClientesCrear from './ClientesCrear';
import { useContext } from 'react';
import { ContextoUsuario } from '../../componentes/contexto/ContextoUsuario';

const ListarClientes = () => {
  const { id } = useContext(ContextoUsuario);
  const [listaclientes, setListaclientes ] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mostrar, setMostrar] = useState(false);
  
  const {APIHOST}= app;
  
  const handleRowClick = cliente => {
    setSelectedLoan(cliente);
    console.log(cliente._id);
              
  };
   
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get(`${APIHOST}/clientes/buscarPorUsuario/`+ id);
        setListaclientes(response.data);
        console.log(id);
        
        console.log(listaclientes);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchClientes();
  }, [APIHOST]);
  
  if (isLoading) {
    return <div> <Loading /> </div>;
  }
  
  const buscarClientesPorNombre = async (consulta) => {
    try {
      const response = await axios.get(`${APIHOST}/clientes/buscarPorNombre/${consulta}`);
      setListaclientes(response.data);
      console.log(consulta);
      console.log(listaclientes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='Contenedor'>
      <h3>Clientes</h3>
      <Consultar onBuscar={buscarClientesPorNombre}/>
      <div id='contenedorBotonAdiciona'>
       <button id='miboton' onClick={() => setMostrar(true)}>Adicionar</button> 
      </div>
      <div className="table">
       {selectedLoan ? (
         <div className='enlace'>
           <Milink to={`/modificar/${selectedLoan._id}`}> Modificar  </Milink> 
           <Milink to={`/confirmarCliente/${selectedLoan._id}`}>Elimina</Milink>
          </div>
        ) : null} 

        <div className="table-header">
          <div className="table-cell">Nombres </div>
          <div className="table-cell">Apellidos </div>
          <div className="table-cell">Correo </div>
          <div className="table-cell">Cedula </div>
          <div className="table-cell">Direccion </div>
        </div>

        {listaclientes &&
          listaclientes.map((cliente, i) => {
            return (
              <div
                key={i}
                className={`table-row ${
                  selectedLoan === cliente ? "selected" : ""
                }`}
                onClick={() => handleRowClick(cliente)}
                >
                <div className="table-cell">{cliente.nombres}</div>
                <div className="table-cell">{cliente.apellidos}</div>
                <div className="table-cell">{cliente.correo}</div>
                <div className="table-cell">{cliente.cedula}</div>
                <div className="table-cell">{cliente.direccion}</div>
              </div>
            );
        })}
      </div>
      <Modal isOpen={mostrar} onClose={() => setMostrar(false)}>
        <ClientesCrear
        />              
      </Modal>
    </div>
  );
}

export default ListarClientes
