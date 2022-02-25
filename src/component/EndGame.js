import React from "react";

function EndGame({result, handleVictory}){
    if(result===true){
        return(
           <div className="endGame">
               <div className="Title">You won!&nbsp;<div className="meme">K</div></div>
               <button className="startGame" onClick={handleVictory}>Play Again!</button>
           </div> 
        )   
    }else{
        return(
            <div className="endGame">
               <div className="Title">LOSERRRR!!&nbsp;<div className="meme">F</div></div>
               <button className="startGame" onClick={handleVictory}>Play Again!</button>
           </div> 
        )
    }
    
}

export default EndGame;