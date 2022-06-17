import React from "react";
import { Link } from "react-router-dom";
import css from './Navbar.module.css';


const Navbar = () => {
    return(
        <div className={css.div}>
            <ul>
                <Link className={css.headerTitle} to={'/home'}><h1>Jueguitos DB</h1></Link>
                <li><Link className={css.link} to={'/home'}>Home</Link></li>
                <li><Link className={css.link} to={'/crear'}>Crear videojuego</Link></li>
            </ul>
        </div>
    )
}

export default Navbar