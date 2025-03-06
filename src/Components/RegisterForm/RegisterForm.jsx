import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SvgEmail from "../SVGS/SvgEmail"
import SvgPerson from "../SVGS/SvgPerson"
import SvgPassword from "../SVGS/SvgPassword";
import SvgCity from "../SVGS/SvgCity";
import SvgPhone from "../SVGS/SvgPhone";
import InputField from "../InputFieldComponent/InputFieldComponent"


export default function RegisterForm({ corregirErrores, enviarFormulario, isUpdate = false, dataUpdate = null}){

    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({

        email: (dataUpdate) ? dataUpdate.email : "",
        nombre: (dataUpdate) ? dataUpdate.nombre : "",
        telefono: (dataUpdate) ? dataUpdate.telefono : "",
        ciudad: (dataUpdate) ? dataUpdate.ciudad : "",
        password: ""
    });

    const manejarCambioInfo = (e) => {
        const { name, value } = e.target;

        setFormValues({
            ...formValues, 
            [name] : value
        });
    }

    function limpiarErrores(){
        corregirErrores();
    }

    const obtenerInfoForm = (e) => {
        e.preventDefault();
        enviarFormulario(formValues);
    }

    //? Borrar todo input no numerico
    function validaSoloNumeros(event){
        event.target.value = event.target.value.replace(/\D/g, '');
    }

    //? Validar el tamaño del input
    function validaLength(event, sizeLength){
        if(event.target.value.length >= sizeLength){
            event.target.value = event.target.value.slice(0, sizeLength);
        }
    }

    function getLabelSubmit(){
        return (isUpdate) ? "Actualizar registro" : "Guardar registro";
    }

    const renderPasswordInput = () => {

        if(isUpdate) return null;

        return(
        <div className="col-12 col-md-10 col-lg-6">
            <InputField
                name={"password"}
                textLabel={"Contraseña"}
                id={"passwordRegistro"}
                type={"text"}
                icon={SvgPassword}
                onChange={ (e) => {
                    limpiarErrores;
                    manejarCambioInfo(e);
                }}
                value={formValues.password}
            />
        </div>
        )
    }


    return(

        <>
            <form id="RegisterForm" onSubmit={ obtenerInfoForm }>

                <fieldset className="border p-3 rounded mb-4 text-center">
                    <legend className="fs-6 fw-bold mb-3">Información de la cuenta</legend>

                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-6">
                            <InputField
                                name={"email"}
                                textLabel={"Correo Electrónico"}
                                id={"emailRegistro"}
                                type={"email"}
                                icon={SvgEmail}
                                onChange={ (e) => {
                                    limpiarErrores(e);
                                    manejarCambioInfo(e);
                                }}
                                value={formValues.email}
                                isUpdate={ isUpdate }
                            />
                        </div>

                        { renderPasswordInput() }    
                    </div>
                    
                </fieldset>
                

            <fieldset className="border p-3 rounded text-center"> 
                <legend className="fs-6 fw-bold mb-3"> Información del usuario </legend>

                <div className="row justify-content-center mb-3">

                    <div className="col-12 col-md-10 col-lg-6">
                        <InputField
                            name={"nombre"}
                            textLabel={"Nombre"}
                            type={"text"}
                            icon={SvgPerson}
                            onChange={ (e) => {
                                limpiarErrores(e);
                                manejarCambioInfo(e);
                            }}
                            id={"nombreRegistro"}
                            value={formValues.nombre}
                            isUpdate = { isUpdate }
                        />  
                    </div>
                    <div className="col-12 col-md-10 col-lg-6">
                        <InputField 
                            type={"text"} 
                            name={"telefono"} 
                            id={"telefonoRegistro"}
                            textLabel={"Teléfono"} 
                            icon={SvgPhone} 
                            onChange={ (e) =>{
                                limpiarErrores(e);
                                manejarCambioInfo(e);
                            }} 
                            onInput={ (e) => {
                                validaSoloNumeros(e);
                                validaLength(e, 10);
                            }}
                            value={formValues.telefono}
                            isUpdate = { isUpdate }
                        />
                    </div>

                </div>

                <div className="row justify-content-center mb-3">
                    <div className="col-12 col-md-10 col-lg-6">
                        <InputField
                            name={"ciudad"}
                            textLabel={"Ciudad"}
                            id={"ciudadRegistro"}
                            type={"text"}
                            icon={SvgCity}
                            onChange={ (e) => {
                                limpiarErrores(e);
                                manejarCambioInfo(e);
                            }}
                            value={formValues.ciudad}
                            isUpdate={ isUpdate }
                        />
                    </div>
                </div>
                

            </fieldset>

                <div className="d-flex flex-column align-items-center justify-content-center mt-3">
                    <div className="mb-3">
                        <input type="submit" className="btn btn-success btn-lg" value={ getLabelSubmit() }/>
                    </div>
                    <div>
                        <button type="button" className="btn btn-danger btn-lg" onClick={(e) => {navigate("/usuarios")}}> Cancelar </button>
                    </div>
                </div>
                
            </form>
        
        


        </>
    )

}