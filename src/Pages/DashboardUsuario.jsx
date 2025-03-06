import CargarTablaComponente from "../Components/Cargadores/CargarTablaComponente";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SvgArrow from "../Components/SVGS/SvgArrow";

export default function DashboardUsuario(){

    const navigate = useNavigate();

    useEffect(() => {
        // Si no hay token, redirigir a login
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [navigate]);

    function goToFormRegister(){
        navigate('/usuarios/agregar');
    }

    function navegarAtras(){
        navigate('/');
    }

    return(

        <>
            <div className="container-fluid row align-items-center justify-content-center mb-5">
                <div className="col-1">
                    <button className="btn btn-light" onClick={navegarAtras}>
                        <SvgArrow size={32}/>
                    </button>
                </div>
                <div className="col-11">
                    <h1 className="text-center">Bienvenido al dashboard de Usuarios:</h1>
                </div>
            </div>
            
            <div className="container-fluid d-flex justify-content-center justify-content-md-end mb-5"> 
                <button className="btn btn-info" onClick={ goToFormRegister }> Agregar Usuario </button>
            </div>

            <div className="container-fluid">
                <CargarTablaComponente tableOf={ "Usuarios" }/>
            </div>
        
        </>
    )

}