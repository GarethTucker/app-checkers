import React from 'react';

const boarderStyles = {
    SELECTED: '2px solid red',
    AVAILABLE: '2px solid yellow',
    DEFAULT: '2px solid black'
}

function getStyle(i, j, mode){    
    return {
          backgroundColor: i % 2 === j % 2 ? 'blue' :'green',
          border: boarderStyles[mode]
    }
  }

function getMode(i, j, selection){
    if(selection && selection.row === i && selection.column === j){
       return "SELECTED"
    } 
    if (selection) {
        return "AVAILABLE"
    }
    return "DEFAULT";
}

function createOnClick({i, j, selectSquare, deselectSquare, moveTo}, mode){
    if(mode === 'DEFAULT'){
        return () => selectSquare(i, j)
    }
    if(mode === 'SELECTED'){
        return () => deselectSquare()
    }
    if(mode === 'AVAILABLE'){
        return () => moveTo(i,j)
    }
}

export default (props) => {
    const {i, j, myBoard, selection} = props;
    let imageSrc = null
    let square = myBoard[i][j]
    if(square === "black"){
      imageSrc = "https://lh5.ggpht.com/K3F-iniKTYk-ZZZI6I2UWe64TqBQrjDEtlqTqu87d6xk7rJvX6ZMcXWa1NSRl7TSAw=w300"
    } else if (square === "red"){
      imageSrc = "http://bristle.com/~michael/red-checker.png"  
    }
    let mode = getMode(i, j, selection)
    return <button 
      className="square" 
      onClick={createOnClick(props, mode)} 
      style={getStyle(i, j, mode)}> 
      {imageSrc && <img src={imageSrc} width="20" height="20" alt=""/>}    
    </button>
}