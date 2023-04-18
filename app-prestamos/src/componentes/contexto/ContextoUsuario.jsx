import { createContext, useEffect, useState } from 'react';
import { useNavigate, redirect } from 'react-router-dom';


export const ContextoUsuario = createContext({
  email: '',
  interes: 0,
  id:'',
  ocultarDiv: '',
  updateEmail: () => {},
  updatePassword: () => {},
  updateId: () => {},
  login: async () => {},
});

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState(null);
  const [interes, setInteres] = useState(null);
  const [id, setId] = useState(null);
  const [ocultarDiv, setOcultarDiv] =  useState(true);
  const [textoBoton, setTextoBoton] = useState('Inicio Sesion');
  const navigate = useNavigate();
  
  //const updateEmail = (newEmail) => setEmail(newEmail);
  //const updatePassword = (newPassword) => setPassword(newPassword);
  //const updateId = (newId) => setId(newId);
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedInteres = localStorage.getItem('interes');
    const storedId = localStorage.getItem('id');
    
    if (storedEmail && storedInteres && storedId )  {
      setEmail(storedEmail);
      setInteres(storedInteres);
      setId(storedId); 
      
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('email', email);
    localStorage.setItem('interes', interes);
    localStorage.setItem('id', id);
  }, [email, interes, id]);
 
  const login = async (email, interes, id) => {
    // Verificar credenciales del usuario y actualizar el estado del email y password si son válidos
      setEmail(email);
      setInteres(interes);
      setId(id);
      setOcultarDiv(true);
      setTextoBoton('Cerra Sesion');

      console.log(id);
      console.log(interes);
      console.log(email);
      console.log(ocultarDiv);
      //window.location.replace('/inicio');
      navigate('/inicio');
      
  };
  
  const logout = () => {
    setEmail(null);
    setInteres(null);
    setId(null);
    setOcultarDiv(false);
    if (email === '') {
      window.location.replace('/');
      //navigate('/');
    } else { 
      window.location.replace('/Login'); 
      //navigate('/Login'); 
    }  
  };

  return (
    <ContextoUsuario.Provider value={{ email, interes, id ,ocultarDiv, textoBoton, login, logout }}>
      {children}
    </ContextoUsuario.Provider>
  );
};