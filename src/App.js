// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './componentes/Index';
import Login from './componentes/Cuenta/Login';
import EntradasList from './componentes/Entradas/Index';
import CategoriasList from './componentes/Categorias/Index';
import DetalleEntrada from './componentes/Entradas/DetalleEntrada';
import Registro from './componentes/Cuenta/Registro';
import Perfil from './componentes/Cuenta/Perfil';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrarse" element={<Registro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/entradas" element={<EntradasList />} />
        <Route path="/categorias" element={<CategoriasList />} />
        <Route path="/entradas/:slug" element={<DetalleEntrada />} />
      </Routes>
    </Router>
    
  );
}

export default App;
