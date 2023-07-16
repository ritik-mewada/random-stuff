import * as auth from '../auth/auth-provider'

function client(
  endPoint,
  {data, token, headers: customHeaders, ...customConfig} = {},
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }
  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endPoint}`, config)
    .then(async response => {
      if (response.status === 401) {
        // this block if user try to access if they are not authenticated or token if expired then they will logged out.
        await auth.logout() // here call your logout api
        queryCache.clear() // it user not allowed when token is expired
        window.location.assign(window.location) // it will reload the page
        return Promise.reject({message: 'please re-authenticate'})
      }
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

export {client}
