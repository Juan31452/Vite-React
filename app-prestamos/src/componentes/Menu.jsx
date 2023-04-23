import React from 'react';
import Layout from './Layout';
import { Container } from 'react-bootstrap';
import Login from '../paginas/Login';
import Inicio from '../paginas/Inicio';
import ListarClientes from '../paginas/clientes/ListarClientes';
import UsuariosCrear from '../paginas/usuarios/UsuariosCrear';
import ConfirmarCliente from '../paginas/clientes/ConfirmarCliente';
import ClientesCrear from '../paginas/clientes/ClientesCrear';
import EliminarCliente from '../paginas/clientes/EliminarCliente';
import EditarClientes from '../paginas/clientes/EditarCliente';
import ListarPrestamos from '../paginas/prestamos/ListarPrestamos';
import EditarPrestamos from '../paginas/prestamos/EditarPrestamos';
import ConfirmarPrestamo from '../paginas/prestamos/ConfirmarPrestamo';
import EliminarPrestamos from '../paginas/prestamos/EliminarPrestamos';
import ListarCuotas from '../paginas/cuotas/ListarCuotas';
import Nofound from '../paginas/Nofound'
import {  Navigate, Route, Routes } from 'react-router-dom';
import { PRIVATE1,PRIVATE2,PRIVATE3,PRIVATE4,PRIVATE5,PRIVATE6,PRIVATE7,PRIVATE8,PRIVATE9,PRIVATE10,
  PRIVATE11,PRIVATE12} from './Path';

const Menu = () => {
  return (
    
    <Container>
    <Layout />
      <Routes>
      <Route path="/inicio" element={<Inicio/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/UsuarioCrear" element={<UsuariosCrear/>}></Route>
      <Route path={PRIVATE1} element={<ClientesCrear/>}></Route>
      <Route path={PRIVATE2} element={<ListarClientes/>}></Route>
      <Route path={PRIVATE3} element={<EditarClientes/>}></Route>
      <Route path={PRIVATE4} element={<ConfirmarCliente/>}></Route> 
      <Route path={PRIVATE5} element={<EliminarCliente />}></Route>
      <Route path={PRIVATE6} element={<ConfirmarPrestamo />}></Route>
      <Route path={PRIVATE8} element={<ListarPrestamos />}></Route> 
      <Route path={PRIVATE9} element={<EditarPrestamos />}></Route> 
      <Route path={PRIVATE10} element={<EliminarPrestamos />}></Route> 
      <Route path={PRIVATE11} element={<ListarCuotas />}></Route> 

      {/* Redireccionar a la página de login por defecto */}
      <Route index element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Nofound />}></Route>
      </Routes>  
      </Container>
  
  )
}

export default Menu


