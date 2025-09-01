import { FunctionComponent, Suspense } from "react";
import Form from "./Form";

const Page:FunctionComponent = ()=>{
return <div>
    <Suspense>
        <Form/>
    </Suspense>
</div>

}
export default Page