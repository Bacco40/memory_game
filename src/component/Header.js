import React from "react";

function Header({actual, best}){
    return(
        <div className="header">
            <div className="Title">Memery&nbsp;<div className="meme">H</div></div>
            <div className="counters">
                <div>Score :&nbsp;{actual}</div>
                <div> Best :&nbsp;{best}</div>
            </div>
        </div>
    )
}

export default Header;