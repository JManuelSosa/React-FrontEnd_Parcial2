import { useState} from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

import SvgEyeFill from "../SVGS/SvgEyeFill";
import SvgEmail  from "../SVGS/SvgEmail";
import SvgEyeVisible from "../SVGS/SvgEyeVisible";



export default function LoginForm(){

    const [passwordIsVisible, setIsVisible] = useState(true);
    const svgPassword = (passwordIsVisible) ? <SvgEyeVisible size={18} /> : <SvgEyeFill size={18} />;
    const typePassword = (passwordIsVisible) ? "password" : "text";
    const [messageError, setMessageError] = useState('');

    const navigate = useNavigate();

    function iniciarSesion(e){

        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        
        PostToLogin(data);
    }

    async function PostToLogin(formData){
        try {

            const response = await axios.post("http://127.0.0.1:8000/api/login", formData, {
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                }
            });
    

            console.log("Respuesta del servidor:", response.data);

            if (response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("currentID", response.data.user.id);
                console.log('Hay token');
                navigate("/");
            } 
        } catch (error) {
            console.error("Error en la petición:", error.response ? error.response.data : null);
            if(error.response.data.message){
                setMessageError(error.response.data['message']);
                console.log(messageError);
            }
        }
    }

    function limpiarErrores(){
        setMessageError('');
    }

    function changePasswordVisibility(){
        setIsVisible( prev => !prev);
        console.log(passwordIsVisible);
    }

    const isUnauthorized = () => {

        if(messageError != ''){

            return(

                <span className="d-block text-center" style={{color:"red"}}>
                    { messageError }
                </span>
            )
        }

    } 


    return(

        <>
            
            <form onSubmit={iniciarSesion}>

                <div className="row justify-content-center p-3 gap-3">
                    <div className="mt-3 mb-2">
                        <label htmlFor="emailLogin" className="d-block text-center">Correo Electrónico</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="password-addon">
                                <SvgEmail size={16}/>
                            </span>
                            <input type="text" className="form-control" id="emailLogin" aria-describedby="password-addon" name="email" required 
                            onChange={limpiarErrores}/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="passwordLogin" className="d-block text-center">Contraseña</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="password-addon" onClick={changePasswordVisibility}>
                                { svgPassword }
                            </span>
                            <input type={typePassword} className="form-control" id="passwordLogin" aria-describedby="password-addon" name="password" required minLength={8}
                            onChange={limpiarErrores}/>
                        </div>
                    </div>
                </div>

                <div className="mb-3 d-flex justify-content-center">
                    <input className="btn btn-success" type="submit" value="Acceder"/>
                </div>

            </form>

            {
                isUnauthorized()
            }


        </>
    )

}