import React, { /*useState,*/ useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Context } from 'app/components/Store'
import { apiFetch } from 'common/services/apiService'
import './results.scss'

const Results = () => {

  //const [results, setResults] = useState([])
  const [state, dispatch] = useContext(Context)

  useEffect(() => {
    console.log('results component')
    //test:
    apiFetch('Search/AutoComplete?query=ירושלים').then(res => {
      console.log(res)
      //setResults(res)
      dispatch({type: 'SET_RESULTS', payload: res})
    })
    //apiFetch('Account/Me').then(res => console.log(res)).catch(error => console.log('intended error', error))  //intended error    
  }, [])
  
  const {t} = useTranslation('nav')
  const { query, sort } = useParams()
  console.log('q', query, sort)
  return (
    <div style={{marginTop: '50px'}}>
      <div styleName="title">
        Results - Component
      </div>
      <br/>
      <div styleName="title">
        {t('results')}
      </div>
      <div styleName="results">
        <ul style={{'padding':'20px', 'margin':'20px'}}>
          {state.results.map((item, index) => {
            return <li key={index} style={{'margin': '10px'}}>
              <span styleName="data-span" style={{'width': '50px'}}>{item.id}#</span>
              <span styleName="data-span">{item.name}</span>
              <span styleName="data-span">{item.resType}</span>

            </li>
          })}
        </ul>
      </div>
    </div>
  )

}
export default Results