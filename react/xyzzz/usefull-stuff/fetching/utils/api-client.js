const baseURL = process.env.API_URL;

function client(
  endpoint,
  { data, token, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };
  return window
    .fetch(`${baseURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        // make user logout here
        window.location.assign(window.location);
        return Promise.reject({ message: "Please re-authenticate" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        Promise.reject(data);
      }
    });
}

export { client };

// if use react-query then on logout use queryCache.clear()
