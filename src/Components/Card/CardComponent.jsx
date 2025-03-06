import { children } from "react";
import '../Card/Card.css';

export default function Card({ children, classNameContainer, classNameCardBody }){

    return(

        <div className={ classNameContainer }>
            <div className={ classNameCardBody }>
                { children }
            </div>
        </div>
    )

}