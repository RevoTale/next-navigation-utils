import type { ParameterOptions } from "../types";

const makeParam = <T,>(name:string,type:Pick<ParameterOptions<T>, 'decode' | 'encode'>):ParameterOptions<T> => ({ name, ...type })
export default makeParam