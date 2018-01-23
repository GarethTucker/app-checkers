import React from 'react';
import {connect} from 'react-redux';

const currentTurnText = (props) => {
    return <h2 align="left">{props.currentTurn}</h2>
}

function mapStateToProps(state) {
    return {
      currentTurn: state.currentTurn
    }
}

export default connect(mapStateToProps)(currentTurnText);