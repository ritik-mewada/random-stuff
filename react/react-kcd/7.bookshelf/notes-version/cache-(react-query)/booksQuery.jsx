import {useQuery} from 'react-query'
import {client} from '../utils/api-client'

// ############### DIRECT METHOD ###############
// Direct Method
const {data, error, isLoading, isError, isSuccess} = useQuery({
  queryKey: ['bookSearch', {query}], // query is what user type in input
  queryFn: () =>
    client(`books?query=${encodeURIComponent(query)}`, {
      token: user.token,
    }).then(data => data.books),
})

const {bookId} = useParams() // from react-router-dom
const {data: book} = useQuery({
  queryKey: ['book', {bookId}],
  queryFn: () =>
    client(`books/${bookId}`, {token: user.token}).then(data => data.book),
})

// ############### CUSTOM HOOK METHOD ###############
// custom loading of book
const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
}

const loadingBooks = Array.from({length: 10}, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingBook,
}))

const getBookSearchConfig = (query, user) => ({
  queryKey: ['bookSearch', {query}], // query is what user type in input
  queryFn: () =>
    client(`books?query=${encodeURIComponent(query)}`, {
      token: user.token,
    }).then(data => data.books),
  config: {
    //just to add each of book in cache so if user request for one book from list of all book it gives immediatly to user without any delay
    onSuccess(books) {
      for (const book of books) {
        // queryCache.setQueryData(['book', {bookId: book.id}], book) way 1
        setQueryDataForBook(book)
      }
    },
  },
})

// serach as user type
function useBookSearch(query, user) {
  const result = useQuery(getBookSearchConfig(query, user))
  return {...result, books: result.data ?? loadingBooks}
}

function useBook(bookId, user) {
  const {data} = useQuery({
    queryKey: ['book', {bookId}],
    queryFn: () =>
      client(`books/${bookId}`, {token: user.token}).then(data => data.book),
  })

  return data ?? loadingBook
}

function refetchBookSearchQuery(user) {
  queryCache.removeQueries('bookSearch')
  queryCache.prefetchQuery(getBookSearchConfig('', user))
}

function setQueryDataForBook(book) {
  queryCache.setQueryData(['book', {bookId: book.id}], book)
}

// Make use
const {} = useBookSearch(query, user) // query will be user search input
const {} = useBook(query, user) // to get only one book
