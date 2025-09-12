'use client'
import { pageType, stringType  } from "@/dist-lib/parameters"
import { useRouter, useSearchParams } from "next/navigation";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useParamState } from "@/dist-lib/client";
import { ParameterOptions, ValuedParameter } from "../../../../dist/types";
import { encode } from "querystring";
const pageParams:ParameterOptions<number> = {
    name:'page',
    ...pageType
}
const Form:FunctionComponent = ()=>{
  const [isResetPage,setIsResetPage] = useState(false)
  const [value,setValue]  = useParamState({
  ...stringType,
    name:'url_change_test_input_value',
  },{
    updateValue: (link) =>{
      if (isResetPage) {
        link.setValue(pageParams,1)
      }
      return link
    },
  }) //This tests `updateValues` type safey. It cause a bad developer experience, so keep it to prrof that type afety works without ny issues for the developer
   const [page,setPage] = useParamState(pageParams,)
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
        <button data-testid="next_page" onClick={() => {
          setPage(page+1)
        }}>Next page</button>
        <button data-testid="toggle_page_reset" onClick={() => {
          setIsResetPage(prev=>!prev)
        }}>Toggle page reset on value change</button>
        <div data-testid="page_value">{page}</div>
        {isResetPage && <div data-testid="page_reset_active">Page reset active</div>}
    </div>
}
export default Form