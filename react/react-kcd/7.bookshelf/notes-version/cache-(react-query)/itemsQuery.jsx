import {useQuery, queryCache, useMutation} from 'react-query'
import {client} from '../utils/api-client'

// ############### DIRECT METHOD ###############
const {data: listItems} = useQuery({
  queryKey: 'list-items',
  queryFn: () =>
    client('list-items', {token: user.token}).then(data => data.listItems),
})
// here you'll receieve listItems and if you want only single item from that array
const listItem = listItems?.find(li => li.bookId === book.id) ?? null

//  MUTATION

// ############### CUSTOM HOOK METHOD ###############
// get all list items
function useListItems() {
  const {data: listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: () =>
      client('list-items', {token: user.token}).then(data => data.listItems),
    config: {
      //just to add each of items in cache so if user request for one item from list of all items it gives immediatly to user without any delay
      onSuccess(listItems) {
        for (const listItem of listItems) {
          queryCache.setQueryData(
            ['book', {bookId: listItem.book.id}],
            listItem.book,
          )
        }
      },
    },
  })
  return listItems ?? []
}
// get single list item from listitmes
function useListItem(user, bookId) {
  const listItems = useListItems(user)
  return listItems?.find(li => li.bookId === book.id) ?? null
}

// mutation query

const defaultMutationOptions = {
  onError: (err, variables, recover) =>
    typeof recover === 'function' ? recover() : null,
  onSettled: () => queryCache.invalidateQueries('list-items'),
}
// UPDATE
function useUpdateListItem(user, option) {
  return useMutation(
    updates =>
      client(`list-items/${updates.id}`, {
        method: 'PUT',
        data: updates,
        token: user.token,
      }),
    // {...defaultMutationOptions, ...option}, way 1
    {
      // what it will do when user perform this update function it will automatic set to cache that updated
      onMutate(newItem) {
        const previousItems = queryCache.getQueryData('list-items')

        queryCache.setQueryData('list-items', old => {
          return old.map(item => {
            return item.id === newItem.id ? {...item, ...newItem} : item
          })
        })

        return () => queryCache.setQueryData('list-items', previousItems)
      },
      ...defaultMutationOptions,
      ...option,
    },
  )
} // check the debounce.js to check see how actual it works
// CREATE
function useCreateListItem(user) {
  return useMutation(
    ({bookId}) => client('list-item', {data: {bookId}, token: user.token}),
    {...defaultMutationOptions, ...option}, // it will trigger when this mutation function gets updates or calls to get latest listItems
  )
}
// REMOVE
function useRemoveListItem(user) {
  return useMutation(
    ({id}) => client(`list-item/${id}`, {method: 'DELETE', token: user.token}),
    {
      onMutate(removedItem) {
        const previousItems = queryCache.getQueryData('list-items')

        queryCache.setQueryData('list-items', old => {
          return old.filter(item => item.id !== removedItem.id)
        })

        return () => queryCache.setQueryData('list-items', previousItems)
      },
      ...defaultMutationOptions,
      ...option,
    },
  )
}

export {
  useListItems,
  useListItem,
  useUpdateListItem,
  useCreateListItem,
  useRemoveListItem,
}

// make use
// const listItem = useListItem(user, book.id)
// const listItems = useListItems(user)
// const [mutate, {error, isError}] = useUpdateListItem(user)
// const [update] = useUpdateListItem(user, {throwOnError: true})
// const [remove] = useRemoveListItem(user)
// const [create] = useUpdateListItem(user)
