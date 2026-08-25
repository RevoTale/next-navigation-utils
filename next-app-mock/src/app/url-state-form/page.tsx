import { type FunctionComponent, Suspense } from 'react'
import Form from './Form'

const Page: FunctionComponent = () => (
  <div>
    <Suspense>
      <Form />
    </Suspense>
  </div>
)
export default Page
