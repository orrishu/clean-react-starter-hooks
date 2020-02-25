import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'
import './Topbar.scss'

const navbar = [  {
  title: 'search',
  link: '/search'
}, {
  title: 'results',
  link: '/results/12/1'
}, {
  title: 'test',
  link: '/test'
}]

const Topbar = () => {

  const history = useHistory()
  const { path } = useParams()

  const navigate = route => () => {    
    if (path !== route) {
      history.push(route)
    }
  }

  const {t} = useTranslation('nav')

  return (
    <div>
      <div styleName="header">{t('AppTitle')}</div>
      <div>
        <div>
          {navbar.map((nav, index) =>
            <div key={index} styleName="nav-link">
              <span style={{cursor: 'pointer', color: 'crimson'}} onClick={navigate(nav.link)}>
                {t(nav.title)}
              </span>
            </div>
          ) }
        </div>
      </div>
    </div>
  )

}
export default Topbar