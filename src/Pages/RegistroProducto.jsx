import { useState } from "react";
import { useNavigate } from "react-router-dom";
import httpRequest from "../Helpers/ServerRequest";

import Card from "../Components/Card/CardComponent";
import ProductosForm from "../Components/ProductosForm/ProductosForm";
import SvgDanger from "../Components/SVGS/SvgDanger";


export default function RegistroProducto({ isUpdate = false, data = null}){

    const [registerErrors, setRegisterErrors] = useState([])
    const urlRegistroProducto = "http://127.0.0.1:8000/api/productos"; 
    const navigate = useNavigate();

    function procesarFormulario(form){
        (isUpdate) ? enviarPut(form) : enviarPost(form); 
    }

    function enviarPost(form){
        sendRequest(urlRegistroProducto, "POST", form, true, "/productos");
    }

    function enviarPut(form){
        let url = obtenerIdPut();
        sendRequest(url, "POST", form, true, "/productos", true);
    }

    async function sendRequest(url, method, data, needAuth, redireccion, override = false){
        try{
            const response = await httpRequest(url, method, data, needAuth, override);
            setRegisterErrors([]);
            console.log(response);
            navigate(redireccion);
        }
        catch(error){
            console.error("Error en la petición:", error.response ? error.response.data : error.message);
            if (error.response && error.response.data.errors) {
                setRegisterErrors(Object.values(error.response.data.errors).flat()); 
            }
        }
    }

    function obtenerIdPut(){
        let urlUpdate = urlRegistroProducto + "/" + data.id;
        return urlUpdate;
    }
    
     //* Funciones para los inputs
    function limpiarErrores(){
        setRegisterErrors([]);
    }

     //* Funcion para mostrar el div de errores
    const renderizarErrores = () => {
        if (registerErrors.length === 0) return null;
    
        return (
            <div className="row justify-content-center">
                <div className="alert alert-danger col-md-8 col-lg-6">
                    <div className="row align-items-center">
                        <div className="col-12 col-sm-3">
                            <div className="row justify-content-center">
                            <   SvgDanger size={100}/>
                            </div>
                        </div>
                        <div className="col-12 col-sm-9">
                            <span className="d-block text-center mt-3 mb-3">Ha ocurrido un error en su registro:</span>
                            <ul>
                                {registerErrors.map((e, index) => (
                                    <li key={index}>{e}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    };

    return(

        <>

            {
                renderizarErrores()
            }

            <section>
                <h2 className="text-center mb-3">{(isUpdate) ? "Actualizar información" : "Nuevo Registro" }</h2>
                <div className="row justify-content-center align-items-center">
                    <div className="col-sm-12 col-md-8 col-lg-6">
                        <Card classNameContainer={"card p-4 cardRegistro"} classNameCardBody={"card-body"}>
                            <ProductosForm isUpdate={isUpdate} dataUpdate={data} enviarFormulario={procesarFormulario} limpiarErrores={limpiarErrores}/>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    )



}