import React from 'react'
import Pages from 'pages'
//import { createBrowserHistory } from 'history'

import { BrowserRouter } from 'react-router-dom'

//const browserHistory = createBrowserHistory()
const App = () => {
  
  return (
    <BrowserRouter>      
      <Pages />      
    </BrowserRouter>
  )
  
}
export default App