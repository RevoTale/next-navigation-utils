import type {  RelativePathname, RelativeURL } from "../types";
import getNormalizedQueryStr from "./getNormalizedQueryStr";

const isRelativePathname = (pathname: string): pathname is RelativePathname =>
    pathname === '' || pathname.startsWith('/');

const createRelativeLink = (pathname:  string, search: URLSearchParams): RelativeURL => {
    if (isRelativePathname(pathname)) {
        return ({
                pathname,
                search,
                toString: () => `${pathname}${getNormalizedQueryStr(search)}`
            })
    }
    throw new Error(`Invalid path: ${pathname}`);
}
export default createRelativeLink;