import {useMutation, useQuery, queryCache} from 'react-query'
import {client} from '../utils/api-client'


// react-query configuration
import { ReactQueryConfigProvider} from 'react-query'
const queryConfig = {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry(failureCount, error){
        if(error.status === 404) return false
        else if(failureCount < 2) return true
        else return false
      }
    }
}
// wrap this in index.js
<ReactQueryConfigProvider config={queryConfig}>
  <App />
</ReactQueryConfigProvider>


///// BOOk
// find as user search
// instead of useAsync we can query like this
const {data, error, isLoading, isError, isSuccess} = useQuery({
  queryKey: ['bookSearch', {query}], // query is what user type in input
  queryFn: () =>
    client(`books?query=${encodeURIComponent(query)}`, {
      token: user.token,
    }).then(data => data.books),
})

// to get a single book
// you may receive the bookId from params
const {bookId} = useParams() // from react-router-dom
const {data: book} = useQuery({
  queryKey: ['book', {bookId}],
  queryFn: () =>
    client(`books/${bookId}`, {token: user.token}).then(data => data.book),
})

///// ITEM
// query for all list-items
const {data: listItems} = useQuery({
  queryKey: 'list-items',
  queryFn: () =>
    client('list-items', {token: user.token}).then(data => data.listItems),
})

// just optional
// here you'll receieve listItems and if you want only single item from that array
const listItem = listItems?.find(li => li.bookId === book.id) ?? null

// add query
const [create] = useMutation(
  ({bookId}) => client('list-item', {data: {bookId}, token: user.token}),
  {onSettled: () => queryCache.invalidateQueries('list-items')}, // it will trigger when this mutation function gets updates or calls to get latest listItems
)
// how to use this function
// here you willl receive the id of book and pass to function call
{
  /* <button onClick={() => create({bookId: book.id})}>Add book</button> */
}

// delete query
const [remove] = useMutation(
  ({id}) => client(`list-item/${id}`, {method: 'DELETE', token: user.token}),
  {onSettled: () => queryCache.invalidateQueries('list-items')},
)
// <button onClick={() => remove({id: listItem.id})}>Remove Book</button>

// update query
const [update] = useMutation(
  updates =>
    client(`list-item/${updates.id}`, {
      method: 'PUT',
      data: updates,
      token: user.token,
    }),
  {onSettled: () => queryCache.invalidateQueries('list-items')},
)
// <button onClick={() => update({id: listItem.id, finisheDate: null})}>Unmark as read</button>
// <button onClick={() => update({id: listItem.id, finisheDate: Date.now()})}>Mark as read</button>

// it is also important to clear all the cache when user logout
queryCache.clear()
