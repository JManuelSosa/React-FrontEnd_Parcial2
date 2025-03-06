import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import httpRequest from "../Helpers/ServerRequest";

import Card from "../Components/Card/CardComponent";
import RegisterForm from "../Components/RegisterForm/RegisterForm";
import SvgDanger from "../Components/SVGS/SvgDanger";



export default function Registro({isUpdate = false, data=null, addedFromCrud = false}){
    
    const navigate = useNavigate();
    const [registerErrors, setRegisterErrors] = useState([]);
    const [displayStyle, setDisplayStyle] = useState({ display: 'none' });
    const urlRegisterUser = "http://127.0.0.1:8000/api/registro";
    const urlUpdateUser = "http://127.0.0.1:8000/api/usuarios/";
    
    useEffect(() => {

        if(localStorage.getItem('token') && !isUpdate && !addedFromCrud){
            navigate('/');
            return;
        }
        setDisplayStyle({ display: 'inline' })

    }, [navigate]);
    

    function procesarFormulario(data){
        (isUpdate) ? putToRegister(data) : postToRegister(data);
    }

    function postToRegister(formData){
        const route = (addedFromCrud) ? "/usuarios" : "/login";
        sendRequest(urlRegisterUser, "POST", formData, false, route);
    }

    function putToRegister(formData){
        let url = getIdUpdate();
        let dataAEnviar = retireVoidData(formData);
        console.log(dataAEnviar);
        sendRequest(url, "PUT", dataAEnviar, true, "/usuarios")
    }

    async function sendRequest(url, method, data, needAuth, redireccion){
        try{
            const response = await httpRequest(url, method, data, needAuth);
            setRegisterErrors([]);
            navigate(redireccion);
        }
        catch(error){
            console.error("Error en la petición:", error.response ? error.response.data : error.message);
            if (error.response && error.response.data.errors) {
                setRegisterErrors(Object.values(error.response.data.errors).flat()); 
            }
        }
    }

    function retireVoidData(data){
        let dataSinFiltro = data;
        let dataEnArray = Object.entries(dataSinFiltro);
        let dataFiltrada = dataEnArray.filter( ([_, valor]) => valor != "" );

        dataFiltrada = Object.fromEntries(dataFiltrada);
        return dataFiltrada;
    }


    function getIdUpdate(){
        let urlUpdate = urlUpdateUser + data.id;
        return urlUpdate;
    }

    //* Funciones para los inputs
    function limpiarErrores(){
        setRegisterErrors([]);
    }


        //* Funcion para mostrar el div de errores
        const renderErrors = () => {
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
            renderErrors()
        }

        <section style={ displayStyle }>
            <h2 className="text-center mb-3"> {(isUpdate) ? "Actualizar informacion" : "Nuevo Registro" } </h2>
            <div className="row justify-content-center align-items-center">
                <div className="col-sm-12 col-md-8 col-lg-6">
                    <Card classNameContainer={"card p-4 cardRegistro"} classNameCardBody={"card-body"}>
                        <RegisterForm 
                            corregirErrores ={limpiarErrores} 
                            enviarFormulario ={procesarFormulario}
                            dataUpdate ={ data }
                            isUpdate = { isUpdate }
                            addedFromCrud = { addedFromCrud }
                        />
                    </Card>
                </div>
            </div>
        </section>
        </>


    )

}