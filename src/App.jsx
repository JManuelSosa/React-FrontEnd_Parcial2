import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Registro from './Pages/Registro';
import DashboardProductos from './Pages/DashboardProductos';
import DashboardUsuario from './Pages/DashboardUsuario';
import CargarFormRegistro from './Components/Cargadores/CargarFormRegistro';

function App() {


  return (
    <>
        <main>
            <Routes>
              
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path='/registro' element={<Registro/>}/>
                <Route path="/usuarios" element={<DashboardUsuario/>}/>
                <Route path="/usuarios/agregar" element={<CargarFormRegistro typeOfForm={ "Usuarios" }/>}/>
                <Route path="/usuarios/actualizar/:elementID" element={<CargarFormRegistro typeOfForm={ "Usuarios" } isUpdate={ true }/>}/>
                <Route path="/productos" element={<DashboardProductos/>}/>
                <Route path="/productos/agregar" element={ <CargarFormRegistro typeOfForm={ "Productos" }/>} />
                <Route path="/productos/actualizar/:elementID" element={ <CargarFormRegistro typeOfForm={ "Productos" } isUpdate={ true }/>} />
              
            </Routes>
        </main>
    </>
  )
}

export default App
