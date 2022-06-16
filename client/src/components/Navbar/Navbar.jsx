import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
    return(
        <div>
            <ul>
                <li><Link to={'/home'}>Home</Link></li>
                <li><Link to={'/crear'}>Crear videojuego</Link></li>
            </ul>
        </div>
    )
}

export default Navbar