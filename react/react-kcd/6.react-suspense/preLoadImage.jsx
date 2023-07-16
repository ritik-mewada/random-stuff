import { createResource, preloadImage } from "./utils/createResource";

const imgSrcResourceCache = {};
// here to render image component
function Img({ src, alt, ...props }) {
  let imgSrcResource = imgSrcResourceCache[src];
  if (!imgSrcResource) {
    imgSrcResource = createResource(preloadImage(src));
    imgSrcResourceCache[src] = imgSrcResource;
  }
  return <img src={imgSrcResource.read()} alt={alt} {...props} />;
}
