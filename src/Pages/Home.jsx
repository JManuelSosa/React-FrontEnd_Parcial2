import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Card from "../Components/Card/CardComponent";
import SvgUser from "../Components/SVGS/SvgUser";
import SvgProduct from "../Components/SVGS/SvgProduct";
import httpRequest from "../Helpers/ServerRequest";


export default function Home(){

    const navigate = useNavigate();
    const urlLogout = 'http://127.0.0.1:8000/api/logout';

    useEffect(() => {
        // Si no hay token, redirigir a login
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [navigate]);

    async function cerrarSesion(){
        try {
            const response = await httpRequest(urlLogout, "GET", null, true);
            if(response.status == 200){
                localStorage.removeItem('token');
                navigate('/login');
            }

        } catch (error) {
            console.log(error);
        }
    }


    return(
        <>

        <div className="row">
            <div className="col-11">
                <h1 className="text-center mb-5"> Bienvenido al CRUD </h1>
            </div>
            <div className="col-1">
                <button type="btn" className="btn btn-light" onClick={cerrarSesion}>Cerrar sesión</button>
            </div>
            
        </div>
        
        <br/>
        <div className="container-fluid">
            <div className="row d-flex justify-content-evenly flex-wrap align-items-center">
                <div className="col-md-6 col-12 mb-3">
                    <Link to="/usuarios">
                        <Card classNameContainer="card p-3 d-flex d-flex justify-content-center align-items-center" classNameCardBody="card-body">
                            <div className="mb-3">
                                <h2 className="text-center">Usuarios</h2>
                            </div>
                            <div> 
                                <SvgUser size={200}/> 
                            </div>
                        </Card>
                    </Link>
                </div>
                <div className="col-md-6 col-12 mb-3">
                    <Link to="/productos">
                        <Card classNameContainer="card p-3 d-flex justify-content-center align-items-center" classNameCardBody="card-body">
                            <div className="mb-3">
                                <h2 className="text-center">Productos</h2>
                            </div>
                            <div> 
                                <SvgProduct size={200}/> 
                            </div>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}