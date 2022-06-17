import css from './GameCard.module.css'
import { Link } from 'react-router-dom'
import notfound from '../../image-not-found.svg'

const GameCard = (props) => {

    let gKey = 0

    return(
        <div className={css.div} to={'/game/' + props.id}>
            <h3>{props.name}</h3>


            {
            props.userMade ?
            <Link to={'/game/u' + props.id }>
            {props.image ? <img className={css.img} src={props.image}/> : <img className={css.img} src={notfound}/>}
            </Link>
            :
            <Link to={'/game/' + props.id }>
            {props.image ? <img className={css.img} src={props.image}/> : <img className={css.img} src={notfound}/>}
            </Link>
            }




            <br/>

            {props.genres.map(g =>{
                return(
                    <span key={gKey++}>{g}</span>
                )
            })}
            
        </div>
    )

}

export default GameCard