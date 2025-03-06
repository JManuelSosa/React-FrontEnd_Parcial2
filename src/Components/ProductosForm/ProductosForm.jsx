import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputFieldComponent from "../InputFieldComponent/InputFieldComponent";
import SvgBagPlusFill from "../SVGS/SvgBagPlusFill";
import SvgCash from "../SVGS/SvgCash";
import SvgBodyText from "../SVGS/SvgBodyText";
import SvgBoxFill from "../SVGS/SvgBoxFill";
import SvgPicture from "../SVGS/SvgPicture";


export default function ProductosForm({ enviarFormulario, isUpdate = false, dataUpdate = null, limpiarErrores}){

    const navigate = useNavigate();

    const [formProductVal, setFormProductVal ] = useState({
        "nombre": (dataUpdate) ? dataUpdate.nombre : "",
        "descripcion": (dataUpdate) ? dataUpdate.descripcion : "",
        "precio": (dataUpdate) ? dataUpdate.precio : 0,
        "stock": (dataUpdate) ? dataUpdate.stock : 0,

    });

    const [imagen, setImagen] = useState(null);

    const manejarCambioInfo = (e) => {

        if(e.target.name == "stock"){

            e.target.value = validarEnteros(e);
        }

        // Si el nombre es "stock", eliminar ceros iniciales
        if (e.target.name == "precio") {
            e.target.value = e.target.value.replace(/^0+/, ''); // Elimina los ceros iniciales
        }

        if(e.target.name == "precio" && e.target.value == ""){
            e.target.value = 0;
        } 

        const { name, value } = e.target;

        setFormProductVal({
            ...formProductVal, 
            [name] : value
        });
    }

    const manejarCambioImagen = (e) => {
        const file = e.target.files[0]; 
        setImagen(file);
    }

    function obtenerFormulario(e){

        e.preventDefault();
        const formData = new FormData();

        for(let name in formProductVal){
            if(formProductVal[name] !== null && formProductVal[name].toString().trim() !== ""){
                formData.append(name, formProductVal[name]);
            }
        }

        if(imagen){
            formData.append("imagen", imagen);
        }

        enviarFormulario(formData);

    }

    function validarEnteros(e){
        let valorOriginal = e.target.value;
        let valorSinDecimales = Math.floor(parseFloat(valorOriginal) || 0); 
        
        return valorSinDecimales
    }

    function limitarDecimales(e){
        let valor = e.target.value;

        //* Solo dejamos hasta 2 decimales
        if (!/^\d*\.?\d{0,2}$/.test(valor)) {
            e.target.value = valor.slice(0, -1)
            return; 
        }
    }

    function getLabelSubmit(){
        return (isUpdate) ? "Actualizar registro" : "Guardar registro";
    }

    return(

        <>
            <form encType="multipart/form-data" onSubmit={obtenerFormulario}>
                <fieldset className="border p-3 rounded mb-4 text-center">
                <legend className="fs-6 fw-bold mb-3"> Información del producto </legend>

                    <div className="row justify-content-center mb-3">
                        <div className="col-12 col-md-10 col-lg-6">
                            <InputFieldComponent 
                                name={"nombre"} 
                                id={"productoNombre"}
                                textLabel={"Nombre del Producto"}
                                sizeIcon={16}
                                icon={SvgBagPlusFill}
                                type={"text"}
                                value={formProductVal.nombre}
                                onChange={ (e) => {
                                    manejarCambioInfo(e);
                                    limpiarErrores(e);
                                }}
                            />
                        </div>
                    </div>

                    <div className="row justify-content-center mb-3">
                        <div className="col-12 col-md-10 col-lg-6">
                            <InputFieldComponent
                                name={"precio"}
                                id={"productoPrecio"}
                                type={"number"}
                                textLabel={"Precio del producto"}
                                icon={SvgCash}
                                sizeIcon={16}
                                value={formProductVal.precio}
                                onChange={ (e) => {
                                    manejarCambioInfo(e);
                                    limpiarErrores(e);
                                }}
                                onInput={ (e) => {
                                    limitarDecimales(e);
                                }}
                            />
                        </div>

                        <div className="col-12 col-md-10 col-lg-6">
                            <InputFieldComponent
                                name={"stock"}
                                id={"productoStock"}
                                type={"number"}
                                textLabel={"Stock disponible"}
                                icon={SvgBoxFill}
                                sizeIcon={16}
                                value={formProductVal.stock}
                                onChange={ (e) => {
                                    manejarCambioInfo(e);
                                    limpiarErrores(e);
                                }}
                            />
                        </div>
                    </div>

                    <div className="row justify-content-center mb-3">
                        <div className="col-12 col-md-10 col-lg-12">
                            <InputFieldComponent 
                                name={"descripcion"}
                                id={"productoDescripcion"}
                                textLabel={"Descripción del producto"}
                                sizeIcon={16}
                                icon={SvgBodyText}
                                type={"textarea"}
                                value={formProductVal.descripcion}
                                onChange={ (e) => {
                                    manejarCambioInfo(e);
                                    limpiarErrores(e);
                                }}
                            />
                        </div>
                    </div>

                </fieldset>

                <fieldset className="border p-3 rounded mb-4 text-center">
                <legend className="fs-6 fw-bold mb-3">Multimedia del producto</legend>

                    <div className="row justify-content-center">
                        <div className="col-12">
                            <InputFieldComponent 
                                name={"imagen"}
                                id={"productoImagen"}
                                textLabel={"Imagen del producto"}
                                sizeIcon={16}
                                icon={SvgPicture}
                                type={"file"}
                                onChange={(e) => {
                                    manejarCambioImagen(e);
                                }} 
                            />
                        </div>
                    </div>

                </fieldset>

                <div className="d-flex flex-column align-items-center justify-content-center mt-3">
                    <div className="mb-3">
                        <input type="submit" className="btn btn-success btn-lg" value={ getLabelSubmit() }/>
                    </div>
                    <div>
                        <button type="button" className="btn btn-danger btn-lg" onClick={(e) => {navigate("/productos")}}> Cancelar </button>
                    </div>
                </div>

            </form>
        </>
    )
}