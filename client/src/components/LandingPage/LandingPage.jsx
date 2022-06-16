import { Link } from 'react-router-dom'
import css from './LandingPage.module.css'
import portada from './jueguitosdbportada.jpg'

const LandingPage = () => {
    return(
        <div className={css.container}>
        <img className={css.portada} src={portada}/>
            <Link className={css.enter} to={'/home'}>ENTRAR</Link>
        </div>
    )
}

export default LandingPage