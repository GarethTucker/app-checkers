import React from 'react';
import {connect} from 'react-redux';

const currentTurnText = (props) => {
    return <h1>{props.currentTurn}</h1>
}

function mapStateToProps(state) {
    return {
      currentTurn: state.currentTurn
    }
}

export default connect(mapStateToProps)(currentTurnText);