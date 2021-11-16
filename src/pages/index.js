import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Topbar from 'app/components/Topbar'
import SearchPage from 'pages/search'
import ResultsPage from 'pages/results'
import NotFound404 from 'pages/notFound404'

class Pages extends React.Component {

  render() {
    return (
      <section>
        <Topbar />
        <Routes>
          <Route path="/" element={<Navigate replace to="search" />} >
          </Route>
          <Route path="search" element={<SearchPage />}>           
          </Route>
          <Route path="results/:query" element={<ResultsPage />}>
          </Route>
          <Route path="results/:query/:sort" element={<ResultsPage />}>
          </Route>
          <Route path='*' element={<NotFound404 />}>          
          </Route>
        </Routes>
      </section>
    )
  }
}
export default Pages
