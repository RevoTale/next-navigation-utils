'use client'
import { stringType  } from "@/dist-lib/parameters"
import { useRouter, useSearchParams } from "next/navigation";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useParamState } from "@/dist-lib/client";
const Form:FunctionComponent = ()=>{
  const [value,setValue]  = useParamState({
  ...stringType,
    name:'url_change_test_input_value'
  })
  const router = useRouter()
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
        <input  data-testid="form-input" type="text" onChange={e=>{
            setValue(e.target.value)
        }} value={value??''}></input>
        <div data-testid="url_change_time">{countSearchParamsChanged}</div>
        <button data-testid="change_url_button" onClick={() => {
          router.push('/url-state-form?url_change_test_input_value=text_updated_from_nextjs_router')
        }}>Change URL</button>
    </div>
}
export default Form