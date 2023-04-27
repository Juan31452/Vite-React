import axios from 'axios';
import app from "../../app.json";
import '../../estilos/table.css';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../../componentes/Loading';
import CuotasCrear from './CuotasCrear';
import Modal from '../../componentes/Modal';

const ListarCuotas = () => {
  const [mostrar, setMostrar] = useState(false);   
  const [listacuotas, setListacuotas ] = useState("");
  const { id } = useParams();
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {APIHOST}= app;

  const handleRowClick = cuota => {
    setSelectedLoan(cuota);
    console.log(cuota._id);
              
  };
  
  useEffect(() => {
    const fetchCuotas = async () => {
      try {
        const response = await axios.get(`${APIHOST}/cuotas/buscarprestamo/` + id);
        setListacuotas(response.data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchCuotas();
  }, [APIHOST]);

  if (isLoading) {
    return <div> <Loading /> </div>;
    }

  return (
    <div>
    <h3>Cuotas</h3>
      <div id='contenedorBotonAdiciona'>
        <button id='miboton' onClick={() => setMostrar(true)}>Adicionar</button> 
      </div>
     
    
    <div className="table">
            
      <div className="table-header">
      <div className='table-cell'>Fecha </div>
      <div className='table-cell'>Interes </div>
      <div className='table-cell'>Abono </div>
      <div className='table-cell'>Saldo </div>
    </div>  
      {listacuotas && listacuotas.map((item,i) => {
        return(        
          <div  key={i}
          className={`table-row ${selectedLoan === item ? 'selected' : ''}`}
          onClick={() => handleRowClick(item)}
          >
          <div className='table-cell'>{item.fecha}</div>
          <div className='table-cell'>{item.interes}</div>
          <div className='table-cell'>{item.abono_capital}</div>
          <div className='table-cell'>{item.saldo}</div>
          
        </div>
      
        );
      })}
  
      
      
    </div>
    <Modal isOpen={mostrar} onClose={() => setMostrar(false)}>
      <CuotasCrear
     
      />              
    </Modal>


    </div>
  )
}

export default ListarCuotas
