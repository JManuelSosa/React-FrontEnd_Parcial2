import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import httpRequest from "../../Helpers/ServerRequest";

import TablaComponente from "../Table/TablaComponente";
import "./Cargadores.css";

export default function CargarTablaComponente({ tableOf }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dataCargada, setDataCargada] = useState(false);
    const [botonesDesactivados, setBotonesDesactivados] = useState([]);
    const [filtro, setFiltro] = useState("");
    const navigate = useNavigate();
    let urlRequestTable = "";
    let routeUpdateForm = "";
    
    switch (tableOf){

        case "Usuarios":
            urlRequestTable = "http://127.0.0.1:8000/api/usuarios";
            routeUpdateForm = '/usuarios/actualizar/';
        break;

        case "Productos":
            urlRequestTable = "http://127.0.0.1:8000/api/productos";
            routeUpdateForm = '/productos/actualizar/';
    }

    useEffect(() => {

        if(!dataCargada){
            obtenerDataTabla();
        }

    }, [dataCargada]);

    async function obtenerDataTabla() {
        try {
            const allElements = await httpRequest(urlRequestTable, 'GET', null, true);
            console.log(allElements);
            setData(allElements.data);
            setLoading(false);
            setDataCargada(true);
        } catch (error) {
            console.error("Error en la petición:", error.allElements ? error.allElements.data : error.message);
        }
    }
    function actualizarRegistro(id){
        navigate(routeUpdateForm + id)
    }

    async function eliminarElemento(id) {

        let urlDelete = urlRequestTable + '/' + id;
        setBotonesDesactivados((prev) => [...prev, id]);

        try{
            const responseDelete = await httpRequest(urlDelete,'DELETE', null, true);
            console.log(responseDelete.status);

            if(responseDelete.status == 200){
                eliminarElementoTabla(id);
            }
        }
        catch(error){
            console.error("Error en la petición:", error.responseDelete ? error.responseDelete.data : error.message);
        }
        finally{
            setBotonesDesactivados((prev) => prev.filter((buttonID) => buttonID !== id));
        }

    }

    function eliminarElementoTabla(id){
        setData((prevData) => prevData.filter((e) => e.id !== id));
    }

    const dataFiltrada = data?.filter((item) =>
        Object.values(item).some(value =>
            value?.toString().toLowerCase().includes(filtro.toLowerCase())
        )
    );



    if (loading) return <span className="loader d-flex justify-content-center"> Cargando datos... </span>;

    
    return (
    <>
        <div className="container-fluid row d-flex justify-content-star mb-5">
                <div className="col-8">
                    <label htmlFor="buscador" className="mb-3">Buscar producto:</label>
                    <input type="text" className="form-control" id="buscador" value={filtro}  onChange={(e) => setFiltro(e.target.value)}/>
                </div>
        </div>
        
        <TablaComponente 
            data={ dataFiltrada } 
            funcionActualizar={ actualizarRegistro } 
            funcionEliminar={ eliminarElemento }
            botonesDesactivados={ botonesDesactivados }
        ></TablaComponente>
    </>
    );
}