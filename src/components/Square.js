import React from 'react';

const boarderStyles = {
    SELECTED: '2px solid red',
    AVAILABLE_SIMPLE: '2px solid yellow',
    AVAILABLE_CAPTURE: '2px solid yellow',
    DEFAULT: '2px solid black',
    red: '2px solid orange',
    black: '2px solid orange',
    redKing: '2px solid orange',
    blackKing: '2px solid orange'
}

function getStyle(row, col, mode){    
    return {
            backgroundColor: row % 2 === col % 2 ? 'blue' :'green',
            border: boarderStyles[mode]
    }
}

function createOnClick({row, col, selectSquare, deselectSquare, moveTo, capture, king}, mode){
    if(mode === "red" || mode === "black" || mode === "redKing" || mode === "blackKing"){
        return () => selectSquare(row, col, mode)
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
    } else if (color === "blackKing"){
      imageSrc = "http://www.charbase.com/images/glyph/9923"
    } else if (color === "redKing"){
        imageSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Draughts_kdt45.svg/2000px-Draughts_kdt45.svg.png"
    }
    return <button 
      className="square" 
      onClick={createOnClick(props, mode)} 
      style={getStyle(row, col, mode)}> 
      {imageSrc && <img src={imageSrc} width="20" height="20" alt=""/>}    
    </button>
}