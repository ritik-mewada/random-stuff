### App Data Model
- User
  - id: string
  - username: string
- List Item
  - id: string
  - bookId: string
  - ownerId: string
  - rating: number (-1 is no rating, otherwise it's 1-5)
  - notes: string
  - startDate: number (`Date.now()`)
  - finishDate: number (`Date.now()`)
> For convenience, our friendly backend engineers also return a `book` object on
> each list item which is the book it's associated to. Thanks backend folks!
- Book
  - id: string
  - title: string
  - author: string
  - coverImageUrl: string
  - pageCount: number
  - publisher: string
  - synopsis: string


