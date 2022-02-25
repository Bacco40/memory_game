import React from "react";

function Card({ meme, handleClick}){
    return(
        <button className="card" id={meme.id} onClick={handleClick}>
            <div className="cardContent" id={meme.id} >
                <img id={meme.id} src={meme.url} alt={meme.description}/>
                <div id={meme.id} className="cardTitle">{meme.description}</div>
            </div> 
        </button>
    )    
}

export default Card;