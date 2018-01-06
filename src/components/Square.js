import React from 'react';

const boarderStyles = {
    SELECTED: '2px solid red',
    AVAILABLE: '2px solid yellow',
    DEFAULT: '2px solid black'
}

function getStyle(row, col, mode){    
    return {
            backgroundColor: row % 2 === col % 2 ? 'blue' :'green',
            border: boarderStyles[mode]
    }
}

function createOnClick({row, col, selectSquare, deselectSquare, moveTo}, mode){
    if(mode === 'DEFAULT'){
        return () => selectSquare(row, col)
    }
    if(mode === 'SELECTED'){
        return () => deselectSquare()
    }
    if(mode === 'AVAILABLE'){
        return () => moveTo(row,col)
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
    }
    return <button 
      className="square" 
      onClick={createOnClick(props, mode)} 
      style={getStyle(row, col, mode)}> 
      {imageSrc && <img src={imageSrc} width="20" height="20" alt=""/>}    
    </button>
}