import Navbar from "../Navbar/Navbar"
import css from './NotFound.module.css'


const NotFound = () => {


    return(
        <div className={css.container}>
            <Navbar/>
            <h1>Error 404: Página no encontrada.</h1>
            <img src="https://i.gifer.com/3rF.gif"/>
        </div>
    )

}

export default NotFound