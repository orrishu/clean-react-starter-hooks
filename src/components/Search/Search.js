import React from 'react'
import { useTranslation } from 'react-i18next'
import './search.scss'

const Search = () => {

  console.log('search component', `${process.env.API_BASEURL}`)  
  const { t } = useTranslation('nav')
  return (
    <>
      <div style={{marginTop: '50px'}} styleName="test">
        Search - Component      
      </div>
      <br />    
      <div styleName="test">
        {t('search')}
      </div>
    </>
  )

}

export default Search
