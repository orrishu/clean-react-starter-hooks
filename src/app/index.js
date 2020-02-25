import 'react-hot-loader/patch'
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Store from './components/Store'
import './i18n'
import './global.scss'

function mount() {
  const App = require('./components/App').default
  render(
    <AppContainer>
      <Store>
        <App />
      </Store>
    </AppContainer>,
    document.getElementById('root')
  )
}

if (module.hot) {
  module.hot.accept('./components/App', mount)
}
mount()
