'use client'
import { decodeString, encodeString, useParamState } from "@/dist-lib";
import { useSearchParams } from "next/navigation";
import { FunctionComponent, useEffect, useRef, useState } from "react";

const Form:FunctionComponent = ()=>{
  const [value,setValue]  = useParamState({
    encode:encodeString,
    decode:decodeString,
    name:'url_change_test_input_value'
  })
  const [countSearchParamsChanged,setCountSearchParamsChanged] = useState(0)
  const queryStr = useSearchParams().toString()
  const prevQueryStrRef = useRef(queryStr)
  useEffect(()=>{
    if (prevQueryStrRef.current !== queryStr) {
    setCountSearchParamsChanged(prev=>prev+1)
    prevQueryStrRef.current = queryStr


    }
  },[queryStr])
    return <div>
        <input id="form-input" type="text" onChange={e=>{
            setValue(e.target.value)
        }} value={value??''}></input>
        <div data-testid="url_change_time">{countSearchParamsChanged}</div>
    </div>
}
export default Form