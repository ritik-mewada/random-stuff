// 1.
const observer = useRef(null);

// 2. 
const lastMovie = useCallback((node) => {
  if(!node) return;
  if(movies.loading) return; // movies is array where adding infinite scroll
  if(observer.current) observer.current.disconnect();
  observer.current = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
      // call the function for load more movies of items
    }
  })
}, [])

// 3. add ref to parent div inside map() where rendering the list
<div ref={index === movies.length - 1 ? lastMovie : null}></div> // lastMovie consider as a ref