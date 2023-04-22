import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import '../estilos/consulta.css';


class Consultar extends Component {
  state = {
    nombre: ''
  };

  handleChange = (event) => {
    this.setState({ nombre: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onBuscar(this.state.nombre);
  };

  render() {  
  return (
    <div className="ContenedorConsulta"> 
    <form onSubmit={this.handleSubmit}>
      
        <input
           type="text"
            name="Consulta"
            id="mi-input"
            placeholder="Nombre"
            value={this.state.nombre} onChange={this.handleChange}          
          />
       
        
          <Button type="submit" id="miboton" >
            Consultar
          </Button>
       
      </form>   
    </div>
    );
  }
}

export default Consultar
