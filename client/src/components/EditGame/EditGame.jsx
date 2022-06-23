import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllGenres } from "../../redux/actions";
import Navbar from "../Navbar/Navbar";
import css from './EditGame.module.css'
const axios = require('axios')

function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;
    var d = new Date(dateString);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false;
    return d.toISOString().slice(0,10) === dateString;
  }


const EditGame = () => {


    let dispatch = useDispatch()
    let genres = useSelector((state) => state.genres)

    React.useEffect(() => {
        dispatch(getAllGenres())
      }, []);



    const [input, setInput] = React.useState({
        id: '',
        name: "",
        description: "",
        releaseDate: "N/A",
        rating: 'N/A',
        genre: '',
        genres: [],
        platform: '',
        platforms: [],
        error: false,
        sent: false
    })

    function inputHandler(e){

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function ratingHandler(e){

        let parsed = parseInt(e.target.value)

        if((parsed && parsed <= 10 && parsed >= 1)) setInput({...input, rating: parsed})
        else if(e.target.value === '') setInput({...input, rating: 'N/A'})
        else setInput({...input, rating: 'El puntaje debe ser un número del 1 al 10.'})
    }

    function dateHandler(e){
        if(isValidDate(e.target.value)) setInput({...input, releaseDate: e.target.value})
        else if(e.target.value === '') setInput({...input, releaseDate: 'N/A'})
        else setInput({...input, releaseDate: 'N/A'})
    }

    function genreInputHandler(){
        if(input.genre === '' || input.genres.includes(input.genre)) return

      setInput({
        ...input,
        genres: [...input.genres, input.genre],
      })

    }


    function genreHandler(g){

        if(input.genres.includes(g)) return

        setInput({
            ...input,
            genres: [...input.genres, g],
          })
    }

    function genreRemove(g){

        setInput({
            ...input,
            genres: [...input.genres].filter(genre =>{
                if(genre !== g) return genre
            }),
          })
    }

    function platformRemove(p){

        setInput({
            ...input,
            platforms: [...input.platforms].filter(platform =>{
                if(platform !== p) return p
            }),
          })
    }



    function platformInputHandler(){
        if(input.platform === '' || input.platforms.includes(input.platform)) return
    
        setInput({
          ...input,
          platforms: [...input.platforms, input.platform],
        })
    
      }


    
    const submitHandler = async (e) => {
        e.preventDefault()

        let {id ,name, description, releaseDate, rating, genres, platforms} = input
        rating = parseInt(rating)


        const payload = {
            name: name !== '' ? name : null,
            description: description !== '' ? description : null,
            releaseDate: releaseDate !== 'N/A' ? releaseDate : null,
            rating: !isNaN(rating) ? rating : null,
            genres: genres.length > 0 ? genres : null,
            platforms: platforms.length > 0 ? platforms : null
        }
        try{
        let edited = await axios.put(process.env.REACT_APP_API_URL + '/videogame/u' + id, payload)

        if(edited.data.success) return setInput({...input, error: false, success: true})
        else{
            return setInput({...input, error: true, success: false})
        } 
    }catch(e){
        console.log(e)
        return setInput({...input, error: true, success: false})
    }

    }




    return(
        <div className={css.container}>
        <Navbar/>
            <main className={css.main}>
                <form className={css.form} onSubmit={(e) => submitHandler(e)}>

                    <label>ID</label>
                    <input type='text' name='id' onChange={(e) => inputHandler(e)}/>

                    <label>Editar nombre</label>
                    <input type='text' name='name' onChange={(e) => inputHandler(e)}/>

                    <label>Editar descripcion</label>
                    <input type='text' name='description' onChange={(e) => {inputHandler(e)}}/>

                    <label>Añadir géneros</label>

                    <div className={css.genres}>
                    {genres.length === 0 ? <p>Cargando géneros...</p> : genres.map(g => {
                        return(
                            <button type='button' onClick={() => genreHandler(g.name)} key={g.id}>{g.name}</button>
                        )
                    })}
                    </div>

                    <input type='text' name='genre' onChange={(e) => {inputHandler(e)}}/>
                    <button type='button' onClick={() => {genreInputHandler()}}>Añadir genero</button>

                    <label>Editar fecha de lanzamiento</label>
                    <input type='text' name='releaseDate' onChange={(e) => {dateHandler(e)}}/>

                    <label>Añadir plataformas</label>
                    <input type='text' name='platform' onChange={(e) => {inputHandler(e)}}/>
                    <button type='button' onClick={() => {platformInputHandler()}}>Añadir plataforma</button>


                    <label>Editar puntaje</label>
                    <input type='text' name='rating' onChange={(e) => {ratingHandler(e)}}/>

                    <button type="submit">Enviar</button>

                </form>
                <div className={css.gameData}>
                <p>ID: {input.id !== '' && 'u' + input.id}</p>
                <h1>Título: {input.name}</h1>
                <p>Descripcion: {input.description}</p>
                <div className={css.genres}>Géneros:{input.genres.length > 0 && input.genres.map(g => {
                    return(
                        <button type='button' onClick={() => {genreRemove(g)}} key={input.genres.indexOf(g)}>{g}</button>
                    )
                })}</div>
                <p>Fecha de lanzamiento: {input.releaseDate}</p>
                <div className={css.platforms}>Plataformas disponibles: {input.platforms.length > 0 && input.platforms.map(p => {
                    return(
                        <button type='button' onClick={() => {platformRemove(p)}} key={input.platforms.indexOf(p)}>{p}</button>
                    )
                })}</div>
                <p>Puntaje: {input.rating}</p>

                {input.error && <h2>No se pudo enviar el formulario porque los datos son erroneos. Corrijalos e inténtelo de vuelta.</h2>}
                {input.success && <h2>Videojuego editado.</h2>}

                </div>
            </main>
        </div>

    )
}

export default EditGame