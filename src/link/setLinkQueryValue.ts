import type {ParameterOptions, RelativePathname, RelativeURL} from "../types"
import setSearchParamValue from "../searchParams/setSearchParamValue"
import createRelativeLink from "../utils/createRelativeLink"

const isRelativePathname = (pathname: string): pathname is RelativePathname =>
    pathname === '' || pathname.startsWith('/');

function setLinkQueryValue<T>(
    link: URL,
    opts: Pick<ParameterOptions<T>, 'name'|'encode'>,
    value: T
): URL;
function setLinkQueryValue<T>(
    link: string,
    opts: Pick<ParameterOptions<T>, 'name'|'encode'>,
    value: T
): RelativeURL;
function setLinkQueryValue<T>(
    link: URL|string,
    opts: Pick<ParameterOptions<T>, 'name'|'encode'>,
    value: T
): URL|RelativeURL {
    if (link instanceof URL) {
        const newUrl = new URL(link);
        setSearchParamValue(newUrl.searchParams, opts, value);
        return newUrl;
    } else {
        if (!isRelativePathname(link)) {
            throw new Error(`Invalid path: ${link}`);
        }
        const url = new URL(link, 'https://example.com');
        setSearchParamValue(url.searchParams, opts, value);

        return createRelativeLink(url.pathname, url.searchParams);
    }
}

export default setLinkQueryValue
