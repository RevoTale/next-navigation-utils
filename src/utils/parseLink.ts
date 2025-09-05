import createRelativeLink from "./createRelativeLink";
import type { RelativeURL } from "../types"

const parseLink = (link:string):RelativeURL|URL=>{
   try {
    return new URL(link); // succeeds only if it's absolute
  } catch {
    const url = new URL(link, 'https://example.com'); // base is required but irrelevant
    return createRelativeLink(url.pathname, url.searchParams);
  }
}
export default parseLink