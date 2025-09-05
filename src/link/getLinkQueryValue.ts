
import type {ParameterOptions, RelativeURL} from "../types"
import parseLink from '../utils/parseLink';
import createLinker from '../utils/createLinker';
type Opts<T,> = Pick<ParameterOptions<T>,'decode'|'name'>
function getLinkQueryValue<T>(
    link: RelativeURL,
    opts: Opts<T>,
    value: T
): RelativeURL;
function getLinkQueryValue<T>(
    link: string,
    opts: Opts<T>,
    value: T
): RelativeURL|URL;
function getLinkQueryValue<T>(
    link: URL,
    opts: Opts<T>,
    value: T
): URL;
function getLinkQueryValue<T>(
	link: RelativeURL|URL|string,
	{name, decode}: Opts<T>
): T {
    const parsed =  typeof link === 'string'?parseLink(link):link;
    const linker = createLinker(parsed)
    return linker.getValue({name,decode});
	
}

export default getLinkQueryValue
