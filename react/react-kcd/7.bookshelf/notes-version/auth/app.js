import * as auth from './auth-provider'
import {client} from '../utils/api-client'
import {useAsync} from '../utils/useAsync'
import {AuthContext} from '../utils/auth-context'

// to varify is the user is already logged in or not
async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    user = await client('me', {token})
  }
  return user
}

function App() {
  const {
    data: user,
    error,
    isLoading,
    isError,
    isIdle,
    run,
    setData,
  } = useAsync()

  useEffect(() => {
    run(getUser()) // it will check if the user is already exist
  }, [run])

  if (isLoading || isIdle) {
    return <FullPageSpinner /> // make your custom fullpage spinner
  }

  if (error) {
    return <div>{error.message}</div>
  }

  const login = form => auth.login(form).then(user => setData(user))
  const register = form => auth.register(form).then(user => setData(user))
  // in this case `form` will be username and password data which should be passed to login and register api.
  <AuthContext.Provider value={login, register, user, logout}>

    {user ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
  </AuthContext.Provider>
  // authcontext is just an example 
}
