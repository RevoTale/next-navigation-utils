# next-navigation-utils

[![npm version](https://badge.fury.io/js/next-navigation-utils.svg)](https://badge.fury.io/js/next-navigation-utils)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

Type-safe URL parameter management for Next.js applications. Seamlessly bridge server-side `searchParams`, client-side `URLSearchParams`, and relative/absolute URLs via a fluent Link Builder — all with full TypeScript support.

## Why next-navigation-utils?

Next.js exposes different URL param shapes:

- **Server Components**: `searchParams` object `{ category: 'electronics', page: ['1'] }`
- **Client Components**: `useSearchParams()` → `URLSearchParams`
- **Navigation / External**: raw URL strings `/products?category=electronics&page=1`

Converting between them while keeping type safety & avoiding brittle string fiddling is noisy. This library gives you one consistent, typed toolkit.

## Features

- 🔄 **Universal API** – Same encoder/decoder pattern works everywhere
- 🎯 **Type Safety** – Strong typing for parameters & return values
- 🪝 **React Hooks** – Extract & sync URL state with zero boilerplate
- 🔗 **Fluent Link Builder** – Immutable, chainable URL editing (relative & absolute)
- ⚡ **Next.js Native** – Designed for the App Router (14+ / 15+)
- 🎛️ **State Sync** – Debounced two‑way sync between input state & URL
- 🧪 **Deterministic** – Pure helpers for server & test environments

## Installation

```bash
# pnpm (recommended)
pnpm add next-navigation-utils

# npm
npm install next-navigation-utils

# yarn
yarn add next-navigation-utils

# bun
bun add next-navigation-utils
```

## Quick Start

### Basic Usage

```tsx
import {
  getQueryParamValue,     // Server-side (props.searchParams)
  getSearchParamValue,    // Client-side (URLSearchParams)
  parseLink,              // String -> RelativeURL | URL
const parsed = parseLink(raw) // RelativeURL
  # next-navigation-utils

  [![npm version](https://badge.fury.io/js/next-navigation-utils.svg)](https://badge.fury.io/js/next-navigation-utils)
  [![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

  Concise, type‑safe URL parameter utilities for Next.js (server + client) plus a fluent link builder for relative & absolute URLs.

  ## Install
  ```bash
  pnpm add next-navigation-utils
  ```

  ## 10‑Second Example
  ```tsx
  import { getQueryParamValue, getSearchParamValue, parseLink, createLinker, createLinkerUrl, encodeString, decodeString } from 'next-navigation-utils'
  const categoryParam = { name: 'category', encode: encodeString, decode: decodeString }

  // Server
  export function Page({ searchParams }) {
    const cat = getQueryParamValue(searchParams, categoryParam)
    return <h1>{cat}</h1>
  }

  // Client
  'use client'
  import { useSearchParams } from 'next/navigation'
  function Cat() {
    const sp = useSearchParams()
    return <span>{getSearchParamValue(sp, categoryParam)}</span>
  }

  // Raw string → new URL
  const parsed = parseLink('/products?category=books')
  const linker = parsed instanceof URL ? createLinkerUrl(parsed) : createLinker(parsed)
  const nextUrl = linker.setValue(categoryParam, 'games').asString() // '/products?category=games'
  ```

  ## Encoders / Decoders
  Built-ins: `encode/decodeString`, `encode/decodeNumber`, `encode/decodeBool (1/0)`, `encode/decodePage` (1-based, omits page 1).

  ## API (Summary)
  Value (server/client):
  - `getQueryParamValue(queryObj, opt)` → T
  - `setQueryParamValue(queryObj, opt, value)` → new query object
  - `getSearchParamValue(urlSearchParams, opt)` → T
  - `setSearchParamValue(urlSearchParams, opt, value)` → void (mutates)
  - `queryToSearchParams(queryObj)` → URLSearchParams

  Links & Builder:
  - `parseLink(str)` → RelativeURL | URL
  - `createRelativeLink(path, searchParams)` → RelativeURL
  - `createLinker(relativeURL)` / `createLinkerUrl(URL)` → Linker
  - `linker.getValue({name, decode})` → T
  - `linker.setValue({name, encode}, value)` → chainable
  - `linker.asString()` → string

  Hooks:
  - `useRelativeLink()` → current RelativeURL
  - `useLinker()` → factory returning fresh Linker per invocation
  - `useSearchParam(opt)` → current decoded value
  - `useParamState(opt, { debounce=1000, updateValues? })` → `[value, setValue]` (debounced push + external sync)

  Encoders/Decoders:
  - `encodeString / decodeString`
  - `encodeNumber / decodeNumber`
  - `encodeBool / decodeBool`
  - `encodePage / decodePage`

  Types:
  - `ParameterOptions<T>`
  - `ParameterValueEncoder<T>` / `ParameterValueDecoder<T>`
  - `QueryParameters`
  - `RelativeURL` (`{ pathname; search; asString() }`)

  ## `useParamState` Dependent Reset
  ```tsx
  import { useParamState, encodeString, decodeString, encodePage, decodePage } from 'next-navigation-utils'
  const pageParam = { name: 'page', encode: encodePage, decode: decodePage }
  const categoryParam = { name: 'category', encode: encodeString, decode: decodeString }
  const [category, setCategory] = useParamState(categoryParam, {
    updateValues: () => [ () => [pageParam, 1] ]
  })
  ```

  ## Custom Encoder Example
  ```ts
  import type { ParameterValueEncoder, ParameterValueDecoder } from 'next-navigation-utils'
  const encodeDate: ParameterValueEncoder<Date | null> = d => d ? d.toISOString() : null
  const decodeDate: ParameterValueDecoder<Date | null> = v => v ? new Date(Array.isArray(v) ? v[0] : v) : null
  ```

  ## Migration (0.2.x → 1.x)
  Replaced `getLinkQueryValue/setLinkQueryValue` with `parseLink + createLinker*`. Renamed `.toString()` → `.asString()`. Added `parseLink`, `createLinkerUrl`, `useRelativeLink`, `updateValues` (in `useParamState`).
  ```diff
  - const url = setLinkQueryValue('/products', p, 'books')
  + const url = (parseLink('/products') instanceof URL
  +   ? createLinkerUrl(parseLink('/products') as URL)
  +   : createLinker(parseLink('/products') as any))
  +   .setValue(p, 'books').asString()
  ```

  ## Requirements
  Next.js 14+, React 18+, TS recommended.

  ## License
  MIT

  ## Contributing
  PRs welcome.

  ## Changelog
  See CHANGELOG.md.
```tsx
parseLink(str): RelativeURL | URL
createLinker(relative: RelativeURL)
createLinkerUrl(absolute: URL)
createRelativeLink(pathname, searchParams)
```

Linker API:
```ts
linker.getLink(): RelativeURL | URL
linker.asString(): string
linker.getValue({ name, decode }): T
linker.setValue({ name, encode }, value) // chainable builder
```

### React Hooks

#### `useSearchParam(options)`

Extract a typed parameter from current URL:

```tsx
const category = useSearchParam({ 
  name: 'category', 
  decode: decodeString 
})
```

#### `useParamState(options, debounceMs?)`

React state-like hook synchronized with URL parameters:

```tsx
const [value, setValue] = useParamState({
  name: 'search',
  encode: encodeString,
  decode: decodeString
}, 500) // 500ms debounce (default: 1000ms)
```

**Features:**
- Bidirectional sync: state changes update URL, URL changes update state
- Debounced URL updates to prevent excessive navigation
- External URL changes automatically sync to component state

#### `useRelativeLink()`

Structured snapshot of current route.
```tsx
const link = useRelativeLink()
link.pathname
link.search // ReadonlyURLSearchParams
link.asString()
```

#### `useLinker()`

Create a URL builder for the current page:

```tsx
const linker = useLinker()
const newUrl = linker()
  .setValue({ name: 'sort', encode: encodeString }, 'price')
  .setValue({ name: 'page', encode: encodeNumber }, 1)
  .asString()
```

### URL Builder (Fluent)

```tsx
import { parseLink, createLinker, createLinkerUrl, encodeString, encodeNumber, decodeString } from 'next-navigation-utils'

const raw = '/products?category=electronics'
const parsed = parseLink(raw)
const linker = parsed instanceof URL ? createLinkerUrl(parsed) : createLinker(parsed)

const currentCategory = linker.getValue({ name: 'category', decode: decodeString })

const nextUrl = linker
  .setValue({ name: 'category', encode: encodeString }, 'books')
  .setValue({ name: 'page', encode: encodeNumber }, 3)
  .asString() // '/products?category=books&page=3'
```

Chaining produces an immutable builder; call `asString()` at the end.

## Real-World Patterns

## Examples

### Server-Client Bridge

```tsx
// app/products/page.tsx (Server Component)
import { getQueryParamValue, queryToSearchParams, decodeString, decodePage } from 'next-navigation-utils'

export default async function ProductsPage({ searchParams }) {
  // Extract typed server-side parameters
  const category = getQueryParamValue(searchParams, { 
    name: 'category', 
    decode: decodeString 
  })
  const page = getQueryParamValue(searchParams, { 
    name: 'page', 
    decode: decodePage 
  })
  
  // Fetch data using typed parameters
  const products = await getProducts({ category, page })
  
  // Convert for client components  
  const clientParams = queryToSearchParams(searchParams)
  
  return (
    <div>
      <h1>Products {category && `in ${category}`}</h1>
      <ProductList products={products} />
      <ClientFilters searchParams={clientParams} />
    </div>
  )
}

// components/ClientFilters.tsx (Client Component)
'use client'
import { useRouter } from 'next/navigation'
import { useLinker, getSearchParamValue, encodeString, decodeString, encodeNumber } from 'next-navigation-utils'

export function ClientFilters({ searchParams }) {
  const router = useRouter()
  const linker = useLinker()
  
  const currentCategory = getSearchParamValue(searchParams, {
    name: 'category',
    decode: decodeString
  })
  
  const handleCategoryChange = (newCategory: string) => {
    const url = linker()
      .setValue({ name: 'category', encode: encodeString }, newCategory)
      .setValue({ name: 'page', encode: encodeNumber }, 1) // Reset pagination
      .asString()
    router.push(url)
  }
  
  return (
    <select value={currentCategory || ''} onChange={(e) => handleCategoryChange(e.target.value)}>
      <option value="">All Categories</option>
      <option value="electronics">Electronics</option>
      <option value="clothing">Clothing</option>
    </select>
  )
}
```

### Form State Synchronization

```tsx
'use client'
import { useParamState, encodeString, decodeString, encodeNumber, decodeNumber } from 'next-navigation-utils'

export function ProductFilters() {
  const [search, setSearch] = useParamState({
    name: 'q',
    encode: encodeString,
    decode: decodeString
  }, 500) // 500ms debounce for search input
  
  const [category, setCategory] = useParamState({
    name: 'category', 
    encode: encodeString,
    decode: decodeString
  })
  
  const [minPrice, setMinPrice] = useParamState({
    name: 'minPrice',
    encode: encodeNumber, 
    decode: decodeNumber
  })
  
  return (
    <form>
      <input
        type="text"
        value={search || ''}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
      />
      
      <select value={category || ''} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      
      <input
        type="number"
        value={minPrice || ''}
        onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : null)}
        placeholder="Min price"
      />
    </form>
  )
}
```

### Shared Parameter Definitions

```tsx
// lib/params.ts - Define once, use everywhere
import { encodeString, decodeString, encodeNumber, decodeNumber, encodePage, decodePage } from 'next-navigation-utils'

export const searchParams = {
  category: { name: 'category', encode: encodeString, decode: decodeString },
  search: { name: 'q', encode: encodeString, decode: decodeString },
  page: { name: 'page', encode: encodePage, decode: decodePage },
  minPrice: { name: 'minPrice', encode: encodeNumber, decode: decodeNumber },
}

// app/products/page.tsx (Server)
import { getQueryParamValue } from 'next-navigation-utils'
import { searchParams } from '@/lib/params'

export default function ProductsPage({ searchParams: params }) {
  const category = getQueryParamValue(params, searchParams.category)
  const search = getQueryParamValue(params, searchParams.search)
  const page = getQueryParamValue(params, searchParams.page)
  
  return <ProductList category={category} search={search} page={page} />
}

// components/Search.tsx (Client)
import { useParamState } from 'next-navigation-utils'
import { searchParams } from '@/lib/params'

export function SearchInput() {
  const [search, setSearch] = useParamState(searchParams.search)
  
  return (
    <input 
      value={search || ''} 
      onChange={(e) => setSearch(e.target.value)}
    />
  )
}
```

### Custom Parameter Types

```tsx
import type { ParameterValueEncoder, ParameterValueDecoder } from 'next-navigation-utils'

// Date parameter
const encodeDate: ParameterValueEncoder<Date | null> = (date) => 
  date ? date.toISOString() : null

const decodeDate: ParameterValueDecoder<Date | null> = (value) => {
  if (!value) return null
  const dateStr = Array.isArray(value) ? value[0] : value
  return new Date(dateStr)
}

// Array parameter  
const encodeStringArray: ParameterValueEncoder<string[]> = (arr) => arr

const decodeStringArray: ParameterValueDecoder<string[]> = (value) => {
  if (Array.isArray(value)) return value
  if (typeof value === 'string') return [value]
  return []
}

// Usage
const dateParam = { name: 'createdAt', encode: encodeDate, decode: decodeDate }
const tagsParam = { name: 'tags', encode: encodeStringArray, decode: decodeStringArray }

// Works across all contexts
const createdAt = getQueryParamValue(searchParams, dateParam)
const tags = getSearchParamValue(useSearchParams(), tagsParam)
```

## TypeScript Support

Full TypeScript support with proper type inference:

```tsx
// Parameter options are fully typed
const categoryParam: ParameterOptions<string | null> = {
  name: 'category',
  encode: encodeString,  // (value: string | null) => string | string[] | null
  decode: decodeString   // (value: string | string[] | null) => string | null
}

// Return types are automatically inferred
const category = useSearchParam(categoryParam) // string | null
const [search, setSearch] = useParamState(categoryParam) // [string | null, (value: string | null) => void]
```

### Shared Parameter Logic

Define your parameters once, use everywhere:

```tsx
// lib/searchParams.ts
import { decodeString, encodeString, decodeNumber, encodeNumber } from 'next-navigation-utils'

export const categoryParam = { name: 'category', encode: encodeString, decode: decodeString }
export const pageParam = { name: 'page', encode: encodeNumber, decode: decodeNumber }
export const sortParam = { name: 'sort', encode: encodeString, decode: decodeString }

// page.tsx (Server)
export default function ProductsPage({ searchParams }: { searchParams: any }) {
  const category = getQueryParamValue(searchParams, categoryParam)
  const page = getQueryParamValue(searchParams, pageParam)
  const sort = getQueryParamValue(searchParams, sortParam)
  
  return <ProductList category={category} page={page} sort={sort} />
}

// components/Filter.tsx (Client) 
'use client'
import { useParamState, useSearchParam, useLinker } from 'next-navigation-utils'
import { useRouter } from 'next/navigation'

export function CategoryFilter() {
  // Option 1: Using useSearchParam + useLinker (existing approach)
  const currentCategory = useSearchParam(categoryParam)
  const linker = useLinker()
  
  const handleChange = (newCategory: string) => {
    const url = linker()
      .setValue(categoryParam, newCategory)
      .setValue(pageParam, 1) // Reset to page 1
      .asString()
    router.push(url)
  }
  
  // Option 2: Using useParamState (simpler approach)
  const [category, setCategory] = useParamState(categoryParam)
  const [, setPage] = useParamState(pageParam)
  
  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory)
    setPage(1) // Reset to page 1
  }
  
  return (
    <select value={category || ''} onChange={(e) => handleCategoryChange(e.target.value)}>
      <option value="">All Categories</option>
      <option value="electronics">Electronics</option>
      <option value="clothing">Clothing</option>
    </select>
  )
}
```

### Server-Client Data Flow

```tsx
// app/products/page.tsx
export default function ProductsPage({ searchParams }: { searchParams: any }) {
  // Extract server-side parameters
  const filters = {
    category: getQueryParamValue(searchParams, { name: 'category', decode: decodeString }),
    minPrice: getQueryParamValue(searchParams, { name: 'minPrice', decode: decodeNumber }),
    page: getQueryParamValue(searchParams, { name: 'page', decode: decodePage })
  }
  
  // Fetch data based on filters
  const products = await getProducts(filters)
  
  // Convert for client components
  const clientSearchParams = queryToSearchParams(searchParams)
  
  return (
    <div>
      <ProductGrid products={products} />
      <ProductFilters searchParams={clientSearchParams} />
      <Pagination currentPage={filters.page} searchParams={clientSearchParams} />
    </div>
  )
}

// components/ProductFilters.tsx  
'use client'
function ProductFilters({ searchParams }: { searchParams: URLSearchParams }) {
  // Option 1: Direct parameter manipulation (existing approach)
  const currentCategory = getSearchParamValue(searchParams, { name: 'category', decode: decodeString })
  const linker = useLinker()
  
  const handleCategoryChange = (value: string) => {
    const newUrl = linker()
      .setValue({ name: 'category', encode: encodeString }, value)
      .setValue({ name: 'page', encode: encodePage }, 1) // Reset pagination
      .asString()
    router.push(newUrl)
  }

  // Option 2: Using useParamState for simpler state management
  const [selectedCategory, setSelectedCategory] = useParamState({
    name: 'category',
    encode: encodeString,
    decode: decodeString
  })
  
  return (
    <div>
      {/* Traditional approach */}
      <select 
        value={currentCategory || ''} 
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      
      {/* useParamState approach - simpler */}
      <select 
        value={selectedCategory || ''} 
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
    </div>
  )
}
```

### Custom Parameter Types

Create your own encoders and decoders for complex data:

```tsx
import type { ParameterValueEncoder, ParameterValueDecoder } from 'next-navigation-utils'

// Date parameters
const encodeDate: ParameterValueEncoder<Date> = (date) => date.toISOString()
const decodeDate: ParameterValueDecoder<Date> = (value) => 
  value ? new Date(Array.isArray(value) ? value[0] : value) : new Date()

// Array parameters  
const encodeStringArray: ParameterValueEncoder<string[]> = (arr) => arr
const decodeStringArray: ParameterValueDecoder<string[]> = (value) => 
  Array.isArray(value) ? value : value ? [value] : []

// Use across all contexts
const dateParam = { name: 'createdAt', encode: encodeDate, decode: decodeDate }
const tagsParam = { name: 'tags', encode: encodeStringArray, decode: decodeStringArray }

// Server-side
const createdAt = getQueryParamValue(searchParams, dateParam)
const tags = getQueryParamValue(searchParams, tagsParam)

// Client-side
const createdAt = getSearchParamValue(useSearchParams(), dateParam)
const tags = getSearchParamValue(useSearchParams(), tagsParam)

// useParamState - for interactive forms
const [selectedDate, setSelectedDate] = useParamState(dateParam)
const [selectedTags, setSelectedTags] = useParamState(tagsParam, 300) // 300ms debounce
```

### Advanced `useParamState` Patterns

```tsx
import { useParamState, encodeString, decodeString, encodeNumber, decodeNumber, encodePage, decodePage } from 'next-navigation-utils'
import { useEffect } from 'react'

// Multi-step form with URL state
'use client'
function MultiStepForm() {
  const [step, setStep] = useParamState({
    name: 'step',
    encode: encodeNumber,
    decode: decodeNumber
  })
  
  const [formData, setFormData] = useParamState({
    name: 'data',
    encode: (data: FormData) => JSON.stringify(data),
    decode: (value) => {
      try {
        return JSON.parse(Array.isArray(value) ? value[0] : value || '{}')
      } catch {
        return {}
      }
    }
  })
  
  const currentStep = step || 1
  
  return (
    <div>
      <h2>Step {currentStep} of 3</h2>
      {currentStep === 1 && <StepOne data={formData} onChange={setFormData} />}
      {currentStep === 2 && <StepTwo data={formData} onChange={setFormData} />}
      {currentStep === 3 && <StepThree data={formData} onChange={setFormData} />}
      
      <button onClick={() => setStep(Math.max(1, currentStep - 1))}>
        Previous
      </button>
      <button onClick={() => setStep(Math.min(3, currentStep + 1))}>
        Next
      </button>
    </div>
  )
}

// Search with filters and pagination
'use client'
function SearchWithFilters() {
  const [query, setQuery] = useParamState({
    name: 'q',
    encode: encodeString,
    decode: decodeString
  }, 500) // Debounce search input
  
  const [category, setCategory] = useParamState({
    name: 'category',
    encode: encodeString,
    decode: decodeString
  })
  
  const [page, setPage] = useParamState({
    name: 'page',
    encode: encodePage,
    decode: decodePage
  })
  
  // Reset page when search query or category changes
  useEffect(() => {
    if (page !== 1) {
      setPage(1)
    }
  }, [query, category])
  
  return (
    <div>
      <input
        type="text"
        value={query || ''}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      
      <select value={category || ''} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="books">Books</option>
        <option value="electronics">Electronics</option>
      </select>
      
      <Pagination currentPage={page || 1} onPageChange={setPage} />
    </div>
  )
}
```

## Requirements

- Next.js 14+ / 15+
- React 18+ / 19+
- TypeScript (recommended)

## Migration Guide (0.2.x → 1.x)

Changes:
- Removed: `getLinkQueryValue` / `setLinkQueryValue` → use `parseLink` + `createLinker*`
- Removed: `useCurrentLink` → use `useRelativeLink`
- Renamed: `.toString()` → `.asString()` (prevents accidental implicit coercion)
- Added: `parseLink`, `createLinkerUrl`, `useRelativeLink`
- Enhanced: `useParamState` now supports `updateValues`

Example migration:
```diff
- const url = setLinkQueryValue('/products', categoryParam, 'books')
- const value = getLinkQueryValue(url, categoryParam)
+ const link = parseLink('/products')
+ const linker = link instanceof URL ? createLinkerUrl(link) : createLinker(link)
+ const url = linker.setValue(categoryParam, 'books').asString()
+ const value = linker.getValue({ name: 'category', decode: decodeString })
```

Dependent reset:
```tsx
const pageParam = { name: 'page', encode: encodePage, decode: decodePage }
const categoryParam = { name: 'category', encode: encodeString, decode: decodeString }
const [category, setCategory] = useParamState(categoryParam, {
  updateValues: () => [ () => [pageParam, 1] ]
})
```

## Contributing
See CONTRIBUTING.md.

## License
MIT License – see LICENSE.

## Changelog
See CHANGELOG.md.
