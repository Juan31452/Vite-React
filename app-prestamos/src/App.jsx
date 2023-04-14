import './App.css';
import Menu from './componentes/Menu';
import { UserProvider } from './componentes/contexto/ContextoUsuario';


function App() {
 
  return (
    <UserProvider>
      <div className="App">
       <Menu />
      </div>
    </UserProvider>
  )
} 

export default App
