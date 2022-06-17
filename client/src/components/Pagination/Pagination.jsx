import React from "react";
import css from './Pagination.module.css'


const Pagination = ({gamesPerPage, totalGames, paginate}) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalGames/gamesPerPage); i++){
        console.log(totalGames/gamesPerPage)
        pageNumbers.push(i)
    }

    return(
        <div>
            {pageNumbers.map(n => {
                return(
                <span key={n}>
                    <a className={css.number} onClick={() => paginate(n)} href="#">{n}</a>
                </span>
                )
            })}
        </div>
    )
}

export default Pagination