import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Topbar from 'app/components/Topbar'
import SearchPage from 'pages/search'
import ResultsPage from 'pages/results'
import NotFound404 from 'pages/notFound404'

class Pages extends React.Component {

  render() {
    return (
      <section>
        <Topbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/search" />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/results/:query/:sort?">
            <ResultsPage />
          </Route>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
      </section>
    )
  }
}
export default Pages
