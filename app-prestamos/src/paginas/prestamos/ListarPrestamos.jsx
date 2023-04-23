import React, { useEffect, useState } from 'react';
import axios from 'axios';
import app from "../../app.json";
import '../../estilos/table.css';
import Modal from '../../componentes/Modal';
import PrestamosCrear from './PrestamosCrear';
import Loading from '../../componentes/Loading';
import Milink from '../../componentes/Milink';
import Consultar from '../../componentes/Consultar';
import { useContext } from 'react';
import  { ContextoUsuario } from '../../componentes/contexto/ContextoUsuario';

const ListarPrestamos = () => {
  const { id } = useContext(ContextoUsuario);
  const [mostrar, setMostrar] = useState(false);
  const [listaprestamos, setListaprestamos ] = useState("");
  const {APIHOST}= app;
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);
  
  const handleRowClick = prestamo => {
    setSelectedLoan(prestamo);
    console.log(prestamo._id);
              
  };
  
  useEffect(() => {
     const fetchPrestamos = async () => {
      try {
        const response = await axios.get(`${APIHOST}/prestamos/buscarPorUsuario/`+ id);
        setListaprestamos(response.data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
     };

     fetchPrestamos();
    }, [APIHOST]);

  if (isLoading) {
   return <div> <Loading /> </div>;
  }
  
  const buscarClientesPorNombre = async (consulta) => {
    try {
      const response = await axios.get(`${APIHOST}/prestamos/buscarPorNombre/${consulta}`);
      setListaprestamos(response.data);
      console.log(consulta);
      console.log(listaprestamos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Prestamos</h3>
      <Consultar onBuscar={buscarClientesPorNombre}/>
      <div id='contenedorBotonAdiciona'>
       <button id='miboton' onClick={() => setMostrar(true)}>Adicionar</button> 
      </div>
     
      <div className="table">
      {selectedLoan ? (
        <div>
          <div className='enlace'><Milink to={`/modificarp/${selectedLoan._id}`}> Modificar  </Milink> </div>
          <div className='enlace'><Milink to={`/confirmarPrestamo/${selectedLoan._id}`}>Elimina</Milink></div>
          <div className='enlace'><Milink to={`/ListarCuotas/${selectedLoan._id}`} >cuotas</Milink></div>
        </div>
      ) : null} 

        <div className="table-header">
          <div className="table-cell">Cliente </div>
          <div className="table-cell">Fecha </div>
          <div className="table-cell">Prestamo </div>
          <div className="table-cell">cuota </div>
          <div className="table-cell">Debe </div>
        </div>
        {listaprestamos && listaprestamos.map((prestamo,i) => { 
          return(
            
            <div  key={i}
            className={`table-row ${selectedLoan === prestamo ? 'selected' : ''}`}
            onClick={() => handleRowClick(prestamo)}
            >
              <div className='table-cell'>{prestamo.cliente}</div>
              <div className='table-cell'>{prestamo.fecha}</div>
              <div className='table-cell'>{prestamo.valor_prestamo}</div>
              <div className='table-cell'>{prestamo.cuota}</div>
              <div className='table-cell'>{prestamo.debe}</div>               
                   
            </div> 
            
          );             
      })}
      </div>
      <Modal isOpen={mostrar} onClose={() => setMostrar(false)}>
        <PrestamosCrear
        />              
      </Modal>
    </div>
  );
}

export default ListarPrestamos
