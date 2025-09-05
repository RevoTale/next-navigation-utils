const ZERO_LENGTH = 0
const getNormalizedQueryStr = (params:URLSearchParams):string=>{
    const str= params.toString()
    return str.length === ZERO_LENGTH ? '' : `?${str}`
}
export default getNormalizedQueryStr