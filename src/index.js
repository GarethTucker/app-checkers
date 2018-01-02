import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import checkersApp from './reducers'

const store = createStore(checkersApp,
  { board: [
        [
          {piece: null},
          {piece: "black"},
          {piece: null},
          {piece: "black"},
          {piece: null},
          {piece: "black"},
          {piece: null},
          {piece: "black"}
        ]
      ,
        [
          {piece: "black"},
          {piece: null},
          {piece: "black"},
          {piece: null},
          {piece: "black"},
          {piece: null},
          {piece: "black"},
          {piece: null}
        ]
      ,
        [
          {piece: null},
          {piece: "black"},
          {piece: null},
          {piece: "black"},
          {piece: null},
          {piece: "black"},
          {piece: null},
          {piece: "black"}
        ]
      ,
        [
          {piece: null},
          {piece: null},
          {piece: null},
          {piece: null},
          {piece: null},
          {piece: null},
          {piece: null},
          {piece: null}
        ]
      ,
        [
          {piece: null},
          {piece: null},
          {piece: null},
          {piece: null},
          {piece: null},
          {piece: null},
          {piece: null},
          {piece: null}
        ]
      ,
        [
          {piece: "red"},
          {piece: null},
          {piece: "red"},
          {piece: null},
          {piece: "red"},
          {piece: null},
          {piece: "red"},
          {piece: null}
        ]
      ,
        [
          {piece: null},
          {piece: "red"},
          {piece: null},
          {piece: "red"},
          {piece: null},
          {piece: "red"},
          {piece: null},
          {piece: "red"}
        ]
      ,
        [
          {piece: "red"},
          {piece: null},
          {piece: "red"},
          {piece: null},
          {piece: "red"},
          {piece: null},
          {piece: "red"},
          {piece: null}
        ]
    ]
  });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
