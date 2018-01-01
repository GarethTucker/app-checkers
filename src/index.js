import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import checkersApp from './reducers'

const store = createStore(checkersApp,
  { board: [
        [
          {0: null},
          {1: "black"},
          {2: null},
          {3: "black"},
          {4: null},
          {5: "black"},
          {6: null},
          {7: "black"}
        ]
      ,
        [
          {0: "black"},
          {1: null},
          {2: "black"},
          {3: null}
        ]
      ,
        [
          {0: null},
          {1: "black"},
          {2: null},
          {3: "black"}
        ]
    ]
  });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
