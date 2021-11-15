import React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'
import './Topbar.scss'

const navbar = [  {
  title: 'search',
  link: '/search'
}, {
  title: 'results_sort',
  link: '/results/12/1'
}, {
  title: 'results',
  link: '/results/12'
}, {
  title: 'test',
  link: '/test'
}]

const Topbar = () => {

  //const history = useHistory()
  const navigate = useNavigate();
  const { path } = useParams()

  const navigateTo = route => () => {    
    if (path !== route) {
      //history.push(route)
      navigate(route)
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
              <span style={{cursor: 'pointer', color: 'crimson'}} onClick={navigateTo(nav.link)}>
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