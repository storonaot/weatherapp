import App from 'App'

const errorLoading = (err) => { console.error('Dynamic page loading failed', err) }
const loadRoute = cb => module => cb(null, module.default)

const routes = {
  component: App,
  childRoutes: [
    {
      path: '/',
      getComponent(location, cb) {
        System.import('CitiesList')
          .then(loadRoute(cb))
          .catch(errorLoading)
      }
    },
    {
      path: '/:id',
      getComponent(location, cb) {
        System.import('WeatherByCity')
          .then(loadRoute(cb))
          .catch(errorLoading)
      }
    }
  ]
}

export default routes
