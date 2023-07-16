// When to use Lazy loading
/*
  A component which is more expensive to load at first place
  then make that component lazy loaded.
*/

// import component like this
const Globe = React.lazy(() => import(/* webpackPrefetch: true */ "./globe"));
// if you use webpackprefetch then no need to make function like loadGlobe
// webpackPrefetch will load that component when everything is fetched and there is nothing to load it will start prefetching that component so that user do not have to wait.

// you can also add functionality when user hover over start loading that component
function loadGlobe() {
  return import("./globe");
}

/*
JUST AN ANOTHER WAY TO IMPORT 
const loadGlobe = () => import('./globe');
const Glove = React.lazy(loadGlobe)
*/

// make sure you wrap this component inside `Suspense` otherwise it will throw en error
// must pass fallback inside suspense
<React.Suspense fallback={<div>Loading...</div>}>
  {/* now you have to pass this function in any HTML tag on which mouse hover you want to load that component */}
  <div onMouseEnter={loadGlobe} onFocus={loadGlobe}>
    <Globe />
  </div>
</React.Suspense>;
