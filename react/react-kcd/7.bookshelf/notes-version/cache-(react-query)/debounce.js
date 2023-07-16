import debounceFn from 'debounce-fn'

const [mutate] = useMutation(
  updates =>
    client(`list-items/${updates.id}`, {
      method: 'PUT',
      data: updates,
      token: user.token,
    }),
  {onSettled: () => queryCache.invalidateQueries('list-items')},
)
const debouncedMutate = React.useMemo(
  () => debounceFn(mutate, {wait: 300}),
  [mutate],
)

function handleNotesChange(e) {
  debouncedMutate({id: listItem.id, notes: e.target.value})
}
;<Textarea id="notes" onChange={handleNotesChange} />
