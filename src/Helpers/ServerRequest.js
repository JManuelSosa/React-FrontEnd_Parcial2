import axios from "axios";

const httpRequest = async(url, method, data = null, needAuth, overrideMethodForImages = false) => {

    const tokenAuth = needAuth ? localStorage.getItem('token') : null;

    // Headers de la solicitud
    const headers = {
        "Accept": "application/json",
    }

    if(overrideMethodForImages){
        headers["X-HTTP-Method-Override"] = "PUT";
    }

    // Añadimos el token (según se requiera)
    if (needAuth && tokenAuth) {
        headers["Authorization"] = `Bearer ${tokenAuth}`;
    }

    // Configuración de Axios
    const config = {
        method: method.toUpperCase(),
        url,
        headers,
    };

    if(data){

        config.data = data;
    
        if (!(data instanceof FormData)) {
            headers["Content-Type"] = "application/json";
        }
    }

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error;
    }

}

export default httpRequest;