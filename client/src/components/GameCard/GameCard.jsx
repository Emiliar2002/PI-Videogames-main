import css from './GameCard.module.css'
import { Link } from 'react-router-dom'

const GameCard = (props) => {

    return(
        <div className={css.div} to={'/game/' + props.id}>
            <h3>{props.name}</h3>


            {
            props.userMade ?
            <Link to={'/game/u' + props.id }>
            {props.image ? <img className={css.img} src={props.image}/> : <img className={css.img} src={'https://searx.tiekoetter.com/image_proxy?url=https%3A%2F%2Fs1.qwant.com%2Fthumbr%2F474x474%2F8%2Fa%2Fb0e75215e03386a2ffc6606cab618e87a0f9641f16a01cacbaef097c26c794%2Fth.jpg%3Fu%3Dhttps%253A%252F%252Ftse4.mm.bing.net%252Fth%253Fid%253DOIP.O4tCD5ABPlCCijlvAe8wXAHaHa%2526pid%253DApi%26q%3D0%26b%3D1%26p%3D0%26a%3D0&h=0d5d6cf63e9236d756ec1f8884973748882c0636c4985d20a2fea9e12d522da9'}/>}
            </Link>
            :
            <Link to={'/game/' + props.id }>
            {props.image ? <img className={css.img} src={props.image}/> : <img className={css.img} src={'https://searx.tiekoetter.com/image_proxy?url=https%3A%2F%2Fs1.qwant.com%2Fthumbr%2F474x474%2F8%2Fa%2Fb0e75215e03386a2ffc6606cab618e87a0f9641f16a01cacbaef097c26c794%2Fth.jpg%3Fu%3Dhttps%253A%252F%252Ftse4.mm.bing.net%252Fth%253Fid%253DOIP.O4tCD5ABPlCCijlvAe8wXAHaHa%2526pid%253DApi%26q%3D0%26b%3D1%26p%3D0%26a%3D0&h=0d5d6cf63e9236d756ec1f8884973748882c0636c4985d20a2fea9e12d522da9'}/>}
            </Link>
            }




            <br/>

            {props.genres.map(g =>{
                return(
                    <span>{g}</span>
                )
            })}
            
        </div>
    )

}

export default GameCard