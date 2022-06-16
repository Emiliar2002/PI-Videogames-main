import React from "react";


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
                    <a onClick={() => paginate(n)} href="#">{n}</a>
                </span>
                )
            })}
        </div>
    )
}

export default Pagination