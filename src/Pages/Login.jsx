import Card from "../Components/Card/CardComponent"
import LoginForm from "../Components/LoginForm/LoginForm"
import { Link } from "react-router-dom"

export default function Login(){


    return(
        <>
            <section className="mt-5">
                <h2 className="text-center mb-3">Inicio de sesión</h2>

                <section className="row justify-content-center align-items-center">
                    <div className="col-sm-8 col-md-6 col-lg-4">
                        <Card classNameContainer={"card p-2 row justify-content-md-center"} classNameCardBody={"card-body"}>
                            <LoginForm></LoginForm>
                        </Card>
                    </div>
                </section>

                <span className="d-block text-center mt-3">
                    <Link to="/registro">
                        ¿No te has registrado? ¡Hazlo aqui!
                    </Link>
                </span>
            </section>
        </>
    )
}