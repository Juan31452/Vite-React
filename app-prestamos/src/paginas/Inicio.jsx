import React, { useEffect, useState }  from 'react'
import { useContext } from 'react';
import { ContextoUsuario } from '../componentes/contexto/ContextoUsuario';
import { gsap } from 'gsap';

const Inicio = () => {
  const { email } = useContext(ContextoUsuario);
  
  function animateBox() {
    let tiempo = gsap.timeline({
      repeat: 0,
    });

  //gsap.to('.caja', { duration: 4,rotate: '360deg', x: 400, delay: 1,ease: 'bounce.out', fontSize: '30px', color: 'blue' });

  tiempo.to('.titulo',{
    duration: 2,
    scale: 2,
    y: 300,
    color: 'blue' ,
   });

 
  }

 useEffect(() => {
   animateBox();
   console.log(email);
 }, []);

  return (
    <div>
   
      <div className='titulo'>
        <h2>BIENVENIDOS</h2>
      </div>
      
    </div>

  )
}

export default Inicio
