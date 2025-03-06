
export default function TablaComponente({ data, funcionActualizar, funcionEliminar, botonesDesactivados}){

    if (!data || data.length === 0) {
        return <h2>La tabla esta vacia por ahora</h2>;
    }
    
    const headers = Object.keys(data[0]);
    const imagenDefault = "../../../public/img/noImage.jpg";

    function capitalizarPrimeraLetra(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return(
    
        <>
        <div className="table-responsive">
            <table border="1" className="table table-striped table-bordered border-light table-hover" >
                <thead className="table-dark align-middle">
                    <tr>
                        <th>#</th>
                        {
                            //* Filtramos el id para que no se muestre
                            headers.filter(header => header !== "id").map((header) => (
                                <th key={header} className="text-center align-middle">{capitalizarPrimeraLetra(header)}</th>
                            ))
                        }
                        <th className="text-center align-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => (
                            <tr key={item.id}>
                                <td className="text-center align-middle">{index + 1}</td>
                                
                                {
                                    headers.filter(header => header !== "id" && header !== "imagen")
                                    .map(key => (
                                        <td key={key} className="text-center align-middle">{item[key]}</td>
                                    ))
                                }

                                {/* Si hay una columna imagen, mostramos la imagen */}
                                {headers.includes("imagen") && (
                                    <td className="text-center align-middle">
                                        <a href={item.imagen || imagenDefault} target="_blank" rel="noopener noreferrer">
                                            <img 
                                                src={item.imagen || imagenDefault} 
                                                alt="Imagen" 
                                                style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} 
                                            />
                                        </a>
                                    </td>
                                )}



                                <td className="text-center align-middle">
                                    <button className="btn btn-warning" onClick={ () => funcionActualizar(item.id) } >Actualizar</button>
                                    <button className="btn btn-danger" onClick={ () => funcionEliminar(item.id) } disabled={ (botonesDesactivados.includes(item.id)) }>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
        </div>
        </>
    )
}