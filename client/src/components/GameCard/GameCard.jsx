import css from './GameCard.module.css'
import { Link } from 'react-router-dom'
import notfound from '../../image-not-found.svg'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getAllGames } from '../../redux/actions'

const GameCard = (props) => {

    let dispatch = useDispatch()

    async function deleteHandler(id){
        await axios.delete(`${process.env.REACT_APP_API_URL}/videogame/u${id}`)
        dispatch(getAllGames())
    }

    let gKey = 0

    return(
        <div className={css.div} to={'/game/' + props.id}>
            <h3>{props.name}</h3>


            {
            props.userMade ?
            <div>
            <Link to={'/game/u' + props.id }>
            {props.image ? <img className={css.img} src={props.image}/> : <img className={css.img} src={notfound}/>}
            </Link>
            <button className={css.button} onClick={() => {deleteHandler(props.id)}}>Eliminar</button>
            </div>
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