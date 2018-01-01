import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import checkersApp from './reducers'

const store = createStore(checkersApp,
  { board: [
      {
        a: {
          2: "black",
          4: "black"
        }
      },
      {
        b: {
          1: "black"
        }
      },
      {
        c: {
          2: "black",
          4: "black"
        }
      }
    ]
  });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
