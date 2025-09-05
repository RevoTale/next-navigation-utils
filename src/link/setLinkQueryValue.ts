import type {ParameterOptions, RelativeURL} from "../types"
import parseLink from "../utils/parseLink";
import createLinker from "../utils/createLinker";

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
    link: string,
    opts: Pick<ParameterOptions<T>, 'name'|'encode'>,
    value: T
): RelativeURL|URL;
function setLinkQueryValue<T>(
    link: URL|string,
    opts: Pick<ParameterOptions<T>, 'name'|'encode'>,
    value: T
): URL|RelativeURL {

    const parsed =  link instanceof URL?link:parseLink(link);
    const linker = createLinker(parsed)
    linker.setValue(opts,value);
    return linker.getLink();
}

export default setLinkQueryValue
