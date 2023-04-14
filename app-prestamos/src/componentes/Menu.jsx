import React from 'react';
import Layout from './Layout';
import { Container } from 'react-bootstrap';
import Login from '../paginas/Login';
import Inicio from '../paginas/Inicio';
import ListarClientes from '../paginas/clientes/ListarClientes';
import Nofound from '../paginas/Nofound'
import {  Navigate, Route, Routes } from 'react-router-dom';
import { PRIVATE1,PRIVATE2,PRIVATE3,PRIVATE4,PRIVATE5,PRIVATE6,PRIVATE7,PRIVATE8,PRIVATE9,PRIVATE10,
  PRIVATE11,PRIVATE12,PRIVATE13} from './Path';

const Menu = () => {
  return (
    
    <Container>
    <Layout />
      <Routes>
      <Route path="/inicio" element={<Inicio/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path={PRIVATE2} element={<ListarClientes/>}></Route>
      {/* Redireccionar a la página de login por defecto */}
      <Route index element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Nofound />}></Route>
      </Routes>  
      </Container>
  
  )
}

export default Menu


