/*eslint-disable */
const baseUrl = "http://localhost:3000";
const url = `${baseUrl}/photos`;

const {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} = ReactQuery;

// const { ReactQueryDevtools } = ReactQuery.Devtools;

function translateStatusToErrorMessage(status) {
  switch (status) {
    case 401:
      return "Please login again.";
    case 403:
      return "You do not have permission to view the photos.";
    default:
      return "There was an error retrieving the photos. Please try again.";
  }
}

function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(
      `logging http details for debugging: ${JSON.stringify(httpErrorInfo)}`
    );

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response) {
  return response.json();
}

function delay(ms) {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

const photoAPI = {
  getAll(page = 1, limit = 100) {
    return fetch(`${url}?_page=${page}&_limit=${limit}`)
      .then(checkStatus)
      .then(parseJSON)
      .catch((error) => {
        let errorMessage = translateStatusToErrorMessage(error);
        throw new Error(errorMessage);
      });
  },
};

function usePhotos() {
  const queryInfo = useQuery("photos", photoAPI.getAll);
  console.log(queryInfo);
  const { isLoading: loading, error, data: photos } = queryInfo;
  return { loading, photos, error };
}

function PhotoList() {
  const { loading, photos, error } = usePhotos();

  if (error) {
    return <div>{error}</div>;
  } else if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {photos.map((photo) => {
          return (
            <li key={photo.id}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <h3>{photo.title}</h3>
            </li>
          );
        })}
      </ul>
    );
  }
}

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <PhotoList />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
