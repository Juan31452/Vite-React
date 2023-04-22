import { createContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';


export const ContextoUsuario = createContext();
  

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState(null);
  const [interes, setInteres] = useState(null);
  const [id, setId] = useState(null);
  const [ocultarDiv, setOcultarDiv] =  useState(true);
  const [textoBoton, setTextoBoton] = useState('Inicio Sesion');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  
 
  useEffect(() => {
     // Restaurar los datos del contexto al cargar la página
    const storedEmail = localStorage.getItem('email');
    const storedInteres = localStorage.getItem('interes');
    const storedId = localStorage.getItem('id');
    
    if (storedEmail && storedInteres && storedId )  {
      setEmail(storedEmail);
      setInteres(storedInteres);
      setId(storedId);
      setTextoBoton('Cerra Sesion'); 
      
    }
  }, []);

 
 
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

      // Actualizar los datos de búsqueda en la URL
      setSearchParams({ email, interes, id });
      // Almacenar datos en localStorage (opcional)
      localStorage.setItem('email', email);
      localStorage.setItem('interes', interes);
      localStorage.setItem('id', id);
      navigate('/inicio');
      
  };
  
  const logout = () => {
    setEmail(null);
    setInteres(null);
    setId(null);
    setOcultarDiv(false);

    // Limpiar los datos de búsqueda en la URL
    setSearchParams({});

    // Eliminar datos de localStorage (opcional)
    localStorage.removeItem('email');
    localStorage.removeItem('interes');
    localStorage.removeItem('id');

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