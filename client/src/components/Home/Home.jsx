import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import {useDispatch, useSelector} from 'react-redux'
import { getAllGames, getAllGenres } from "../../redux/actions";
import GameCard from "../GameCard/GameCard";
import css from './Home.module.css'
import Pagination from "../Pagination/Pagination";

const Home = () => {



    let dispatch = useDispatch()
    let games = useSelector((state) => state.games)
    let genres = useSelector((state) => state.genres)



    React.useEffect(() => {
        dispatch(getAllGames())
        dispatch(getAllGenres())
      }, []);

      function search(){
        dispatch(getAllGames(input.value))
      }


      const [filter, setFilter] = React.useState({
        ascendente: false,
        userMade: false,
        abc: false,
        rating: false,
        filtered: [],
        genreFiltered: '',
      })



      const [input, setInput] = React.useState({
        value: ''
      })

      function abcHandler(e){
        if(!filter.abc || e.target.name === 'order'){
            filterHandler(e)
        if(filter.filtered.length !== 0){
            setFilter((filter) => ({
                ...filter,
                filtered: filter.ascendente ? 
                [...filter.filtered].sort((a, b) => {
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                    return 0
                })
                :
                [...filter.filtered].sort((a, b) => {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
                    return 0
                })
            }))
        }else{
            setFilter((filter) => ({
                filtered: filter.ascendente ? 
                [...games].sort((a, b) => {
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                    return 0
                })
                :
                [...games].sort((a, b) => {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return -1
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return 1
                    return 0
                })
            }))
        }
        
      }
      else{
        filterHandler(e)
      }
    }

    function ratingHandler(e){
        if(!filter.rating || e.target.name === 'order'){
            filterHandler(e)
        if(filter.filtered.length !== 0){
            setFilter((filter) => ({
                ...filter,
                filtered: filter.ascendente ? 
                [...filter.filtered].sort((a, b) => {
                    if(a.rating < b.rating) return -1
                    if(a.rating > b.rating) return 1
                    return 0
                })
                :
                [...filter.filtered].sort((a, b) => {
                    if(a.rating > b.rating) return -1
                    if(a.rating < b.rating) return 1
                    return 0
                })
            }))
        }else{
            setFilter((filter) => ({
                ...filter,
                filtered: filter.ascendente ? 
                [...games].sort((a, b) => {
                    if(a.rating > b.rating) return -1
                    if(a.rating < b.rating) return 1
                    return 0
                })
                :
                [...games].sort((a, b) => {
                    if(a.rating < b.rating) return -1
                    if(a.rating > b.rating) return 1
                    return 0
                })
            }))
        }
        
      }
      else{
        filterHandler(e)
      }
    }

      function filterHandler(e){


        if(e.target.name === 'userMade'){
        setFilter({
            ascendente: filter.ascendente,
            genreFiltered: e.target.name,
            filtered: [],
            abc: false,
            rating: false,
            userMade: filter.userMade ? false : true,
        })
    }
    else if(e.target.name === 'abc'){
        return setFilter((filter) => ({
            ...filter,
            abc: true,
            rating: filter.rating && false
        }))
        
    }
    else if(e.target.name === 'rating'){
        return setFilter((filter) => ({
            ...filter,
            rating: true,
            abc: filter.abc && false
        }))
    }
    else if(e.target.name === 'order') return
    else{
        if(filter.genreFiltered === '' || filter.genreFiltered !== e.target.name)
        setFilter({
            ascendente: filter.ascendente,
            genreFiltered: e.target.name,
            filtered: [],
            abc: false,
            rating: false,
            userMade: false,
            [e.target.name]: true
        })
        else{
            setFilter({
                ascendente: false,
                userMade: false,
                abc: false,
                rating: false,
                filtered: [],
                genreFiltered: '',
            })
        }
    }

        setFilter((filter) => ({
            ...filter,
            filtered: games.filter((g) => {
                if(filter.userMade){
                    if(g.userMade) return g
                }
                if(filter.genreFiltered !== ''){
                    if(g.genres.includes(filter.genreFiltered)) return g
                }
            })
        }))
      }

      function order(e){
        setFilter((filter) => ({
            ...filter,
            ascendente: filter.ascendente ? false : true,
        }))
            if(filter.rating){
                return ratingHandler(e)
            }
            if(filter.abc){
                return abcHandler(e)
            }

      }

      function showAll(){
        setFilter({
            ascendente: false,
            userMade: false,
            abc: false,
            rating: false,
            filtered: [],
            genreFiltered: '',
        })
      }
      const [currentPage, setCurrentPage] = useState(1)
      let gamesPerPage = 15
      let indexOfLastGame = currentPage * gamesPerPage;
      let indexOfFirstGame = indexOfLastGame - gamesPerPage;
      let currentGames = games.slice(indexOfFirstGame, indexOfLastGame)
      let paginate = (pageNumber) => setCurrentPage(pageNumber)


      


    return(
        <main className={css.main}>
            <Navbar/>
            <h1>Jueguitos</h1>
            <input type='text' onChange={(e) => (setInput({value: e.target.value}))}/>
            <button onClick={() => search()} className={css.button}>Buscar</button>
            <div className={css.filtros}>
            <button className={css.button} name='mostrarTodo' onClick={() => {showAll()}}>Mostrar todos</button>
            <button className={css.button} name='order' onClick={(e) => {order(e)}}>{filter.ascendente ? "Ascendente" : "Descendente"}</button>
            <button className={filter.abc ? css.selected : css.button} name='abc' onClick={(e) => {abcHandler(e)}}>Orden alfabetico</button>
            <button className={filter.rating ? css.selected : css.button} name='rating' onClick={(e) => {ratingHandler(e)}}>Rating</button>
            <button className={filter.userMade ? css.selected : css.button} name='userMade' onClick={(e) => {filterHandler(e)}}>Agregados por usuarios</button>
            {genres.map((g) => {
                return(
                    <button className={filter[g.name] ? css.selected : css.button} onClick={(e) => {filterHandler(e)}} name={g.name} key={g.id}>{g.name}</button>
                )
            })}
            </div>
            <div className="juegos">
                {
                    filter.filtered.length === 0 ? currentGames.map((g) => {
                        return(
                            <GameCard key={g.id}
                            id={g.id}
                            name={g.name}
                            genres={g.genres}
                            image={g.image}
                            userMade={g.userMade}
                            rating={g.rating}
                            />
                        )
                    })
                    :
                    filter.filtered.map((g) => {
                        return(
                            <GameCard key={g.id}
                            id={g.id}
                            name={g.name}
                            genres={g.genres}
                            image={g.image}
                            userMade={g.userMade}
                            />
                        )
                    })
                }
            </div>
                {filter.filtered.length === 0 && <Pagination gamesPerPage={gamesPerPage} totalGames={games.length} paginate={paginate}/>}
        </main>
    )
}

export default Home