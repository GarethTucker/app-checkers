import React from 'react';

const boarderStyles = {
    SELECTED: '2px solid red',
    AVAILABLE_SIMPLE: '2px solid yellow',
    AVAILABLE_CAPTURE: '2px solid yellow',
    KING_RED: '2px solid yellow',
    KING_BLACK: '2px solid yellow',
    DEFAULT: '2px solid black'
}

function getStyle(row, col, mode){    
    return {
            backgroundColor: row % 2 === col % 2 ? 'blue' :'green',
            border: boarderStyles[mode]
    }
}

function createOnClick({row, col, selectSquare, deselectSquare, moveTo, capture}, mode){
    if(mode === 'DEFAULT'){
        return () => selectSquare(row, col)
    }
    if(mode === 'SELECTED'){
        return () => deselectSquare()
    }
    if(mode === 'AVAILABLE_SIMPLE'){
        return () => moveTo(row,col)
    }
    if(mode === 'AVAILABLE_CAPTURE'){
        return () => capture(row,col)
    }
    if(mode === 'KING_RED'){
        return () => capture(row,col,"red")
    }
    if(mode === 'KING_BLACK'){
        return () => capture(row,col,"black")
    }
}

export default (props) => {
    const {row, col, myBoard} = props;
    let imageSrc = null
    // let square = myBoard[row][col]
    let {color,mode} = myBoard[row][col]
    if(color === "black"){
      imageSrc = "https://lh5.ggpht.com/K3F-iniKTYk-ZZZI6I2UWe64TqBQrjDEtlqTqu87d6xk7rJvX6ZMcXWa1NSRl7TSAw=w300"
    } else if (color === "red"){
      imageSrc = "http://bristle.com/~michael/red-checker.png"  
    } else if (color === "black-king"){
      imageSrc = "http://www.charbase.com/images/glyph/9923"
    } else if (color === "red-king"){
        imageSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Draughts_kdt45.svg/2000px-Draughts_kdt45.svg.png"
    }
    return <button 
      className="square" 
      onClick={createOnClick(props, mode)} 
      style={getStyle(row, col, mode)}> 
      {imageSrc && <img src={imageSrc} width="20" height="20" alt=""/>}    
    </button>
}