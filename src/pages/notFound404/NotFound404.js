import React from 'react'
import { useTranslation } from 'react-i18next'
import './NotFound404.scss'

const NotFound404 = () => {  
  const {t} = useTranslation('common')
  return (
    <section>
      <h2 styleName="title">
        {t('page404')}
      </h2>
      <h3 styleName="link">
        <code>
          {/*pathname*/}
        </code>
      </h3>
    </section>
  )
  
}
export default NotFound404