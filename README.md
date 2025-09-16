# next-navigation-utils

[![npm version](https://badge.fury.io/js/next-navigation-utils.svg)](https://badge.fury.io/js/next-navigation-utils)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
Type-safe URL parameter management for Next.js applications. Seamlessly bridge server-side `searchParams`, client-side `URLSearchParams`, and relative/absolute URLs via a fluent Link Builder — all with full TypeScript support.

<img width="1536" height="1024" alt="image" src="./preview.png" />




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
- 📦 **Tree Shakeable** – Modular exports for optimal bundle size
- 🔧 **Parameter Types** – Built-in parameter types with better tree shaking

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
  parseLink,              // String → RelativeURL | URL
  createLinker,           // Create fluent builder for RelativeURL
  createLinkerUrl,        // Create fluent builder for URL
  makeParam,              // Create parameter with utilities
} from 'next-navigation-utils'

// Parameter types (tree-shakeable)
import { stringType, numberType, boolType, pageType } from 'next-navigation-utils/parameters'

// Client-only hooks
import { useRelativeLink, useLinker, useSearchParam, useParamState } from 'next-navigation-utils/client'

// Create a parameter definition
const categoryParam = makeParam('category', stringType)
// Or manually: { name: 'category', encode: stringType.encode, decode: stringType.decode }

// Server Component
export function Page({ searchParams }) {
  const cat = getQueryParamValue(searchParams, categoryParam)
  return <h1>{cat}</h1>
}

// Client Component
'use client'
import { useSearchParams } from 'next/navigation'
function Cat() {
  const sp = useSearchParams()
  return <span>{getSearchParamValue(sp, categoryParam)}</span>
}

// URL Building
const parsed = parseLink('/products?category=books')
const linker = parsed instanceof URL ? createLinkerUrl(parsed) : createLinker(parsed)
const nextUrl = linker.setValue(categoryParam, 'games').asString() // '/products?category=games'
```

### Parameter Types

Built-in parameter types with optimized encoding/decoding:

```tsx
import { stringType, numberType, boolType, pageType } from 'next-navigation-utils/parameters'
import { makeParam } from 'next-navigation-utils'

// String parameters (null when missing)
const categoryParam = makeParam('category', stringType)

// Number parameters  
const priceParam = makeParam('price', numberType)

// Boolean parameters (1/0 encoding)
const featuredParam = makeParam('featured', boolType)

// Page parameters (1-based, omits page 1)
const pageParam = makeParam('page', pageType)
```

### API Reference

**Value Management:**
```tsx
// Server-side (searchParams object)
getQueryParamValue(searchParams, paramOptions) → T
setQueryParamValue(searchParams, paramOptions, value) → new searchParams

// Client-side (URLSearchParams)
getSearchParamValue(urlSearchParams, paramOptions) → T
setSearchParamValue(urlSearchParams, paramOptions, value) → void (mutates)

// Conversion
queryToSearchParams(searchParams) → URLSearchParams
```

**URL Building:**
```tsx
parseLink(str) → RelativeURL | URL
createRelativeLink(pathname, searchParams) → RelativeURL
createLinker(relativeURL) → Linker<RelativeURL>
createLinkerUrl(absoluteURL) → Linker<URL>

// Linker methods
linker.getValue(paramOptions) → T
linker.setValue(paramOptions, value) → chainable Linker
linker.asString() → string
linker.getLink() → RelativeURL | URL
```

**Utilities:**
```tsx
makeParam(name, paramType) → ParameterOptions<T>
makeParamType(encode, decode) → ParameterValueCoderOptions<T>
```

### React Hooks

#### `useSearchParam(options)`

Extract a typed parameter from current URL:

```tsx
const category = useSearchParam({ 
  name: 'category', 
  decode: stringType.decode 
})
```

#### `useParamState(options, config?)`

React state-like hook synchronized with URL parameters:

```tsx
const [value, setValue] = useParamState({
  name: 'search',
  encode: stringType.encode,
  decode: stringType.decode
}, { 
  debounce: 500, // 500ms debounce (default: 1000ms)
  updateValue: (link, source) => {
    // Reset page to 1 when search changes
    return link.setValue(pageParam, 1)
  }
})
```

**Features:**
- Bidirectional sync: state changes update URL, URL changes update state
- Debounced URL updates to prevent excessive navigation
- External URL changes automatically sync to component state
- `updateValue` middleware for dependent parameter updates

#### `useRelativeLink()`

Structured snapshot of current route:
```tsx
const link = useRelativeLink()
link.pathname  // '/products'
link.search    // ReadonlyURLSearchParams
link.asString() // '/products?category=books'
```

#### `useLinker()`

Create a URL builder factory for the current page:

```tsx
const linker = useLinker()
const newUrl = linker()
  .setValue(makeParam('sort', stringType), 'price')
  .setValue(makeParam('page', numberType), 1)
  .asString()
```

### URL Builder (Fluent)

```tsx
import { parseLink, createLinker, createLinkerUrl } from 'next-navigation-utils'
import { stringType, numberType } from 'next-navigation-utils/parameters'

const raw = '/products?category=electronics'
const parsed = parseLink(raw)
const linker = parsed instanceof URL ? createLinkerUrl(parsed) : createLinker(parsed)

const currentCategory = linker.getValue({ name: 'category', decode: stringType.decode })

const nextUrl = linker
  .setValue({ name: 'category', encode: stringType.encode }, 'books')
  .setValue({ name: 'page', encode: numberType.encode }, 3)
  .asString() // '/products?category=books&page=3'
```

Chaining produces an immutable builder; call `asString()` at the end.

## Examples

### Server-Client Bridge

```tsx
// app/products/page.tsx (Server Component)
import { getQueryParamValue, queryToSearchParams } from 'next-navigation-utils'
import { stringType, pageType } from 'next-navigation-utils/parameters'

export default async function ProductsPage({ searchParams }) {
  // Extract typed server-side parameters
  const category = getQueryParamValue(searchParams, { 
    name: 'category', 
    decode: stringType.decode 
  })
  const page = getQueryParamValue(searchParams, { 
    name: 'page', 
    decode: pageType.decode 
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
import { useLinker, getSearchParamValue } from 'next-navigation-utils'
import { stringType, numberType } from 'next-navigation-utils/parameters'

export function ClientFilters({ searchParams }) {
  const router = useRouter()
  const linker = useLinker()
  
  const currentCategory = getSearchParamValue(searchParams, {
    name: 'category',
    decode: stringType.decode
  })
  
  const handleCategoryChange = (newCategory: string) => {
    const url = linker()
      .setValue({ name: 'category', encode: stringType.encode }, newCategory)
      .setValue({ name: 'page', encode: numberType.encode }, 1) // Reset pagination
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
import { useParamState } from 'next-navigation-utils/client'
import { stringType, numberType, pageType } from 'next-navigation-utils/parameters'

export function ProductFilters() {
  const [search, setSearch] = useParamState({
    name: 'q',
    encode: stringType.encode,
    decode: stringType.decode
  }, { debounce: 500 }) // 500ms debounce for search input
  
  const [category, setCategory] = useParamState({
    name: 'category', 
    encode: stringType.encode,
    decode: stringType.decode
  })
  
  const [minPrice, setMinPrice] = useParamState({
    name: 'minPrice',
    encode: numberType.encode, 
    decode: numberType.decode
  })
  
  // Reset page when category changes
  const [page, setPage] = useParamState({
    name: 'page',
    encode: pageType.encode,
    decode: pageType.decode
  })
  
  const [categoryWithPageReset, setCategoryWithPageReset] = useParamState({
    name: 'category',
    encode: stringType.encode,
    decode: stringType.decode
  }, {
    updateValue: (link) => link.setValue({ 
      name: 'page', 
      encode: pageType.encode 
    }, 1)
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
import { makeParam } from 'next-navigation-utils'
import { stringType, numberType, pageType } from 'next-navigation-utils/parameters'

export const searchParams = {
  category: makeParam('category', stringType),
  search: makeParam('q', stringType),
  page: makeParam('page', pageType),
  minPrice: makeParam('minPrice', numberType),
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
import { useParamState } from 'next-navigation-utils/client'
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
import { makeParamType, makeParam } from 'next-navigation-utils'

// Date parameter
const encodeDate: ParameterValueEncoder<Date | null> = (date) => 
  date ? date.toISOString() : null

const decodeDate: ParameterValueDecoder<Date | null> = (value) => {
  if (!value) return null
  const dateStr = Array.isArray(value) ? value[0] : value
  return new Date(dateStr)
}

const dateType = makeParamType(encodeDate, decodeDate)
const dateParam = makeParam('createdAt', dateType)

// Array parameter  
const encodeStringArray: ParameterValueEncoder<string[]> = (arr) => arr

const decodeStringArray: ParameterValueDecoder<string[]> = (value) => {
  if (Array.isArray(value)) return value
  if (typeof value === 'string') return [value]
  return []
}

const stringArrayType = makeParamType(encodeStringArray, decodeStringArray)
const tagsParam = makeParam('tags', stringArrayType)

// Usage across all contexts
const createdAt = getQueryParamValue(searchParams, dateParam)
const tags = getSearchParamValue(useSearchParams(), tagsParam)
```

## TypeScript Support

Full TypeScript support with proper type inference:

```tsx
// Parameter options are fully typed
const categoryParam: ParameterOptions<string | null> = makeParam('category', stringType)

// Return types are automatically inferred
const category = useSearchParam(categoryParam) // string | null
const [search, setSearch] = useParamState(categoryParam) // [string | null, (value: string | null) => void]
```

## Migration Guide (0.2.x → 1.x)

### Breaking Changes:
- **Removed**: `getLinkQueryValue` / `setLinkQueryValue` → use `parseLink` + `createLinker*`
- **Removed**: `useCurrentLink` → use `useRelativeLink`
- **Renamed**: `.toString()` → `.asString()` (prevents accidental implicit coercion)
- **Changed**: `updateValues` → `updateValue` in `useParamState` (simplified API)

### New Features:
- **Added**: Tree-shakeable parameter types (`stringType`, `numberType`, etc.)
- **Added**: `makeParam` and `makeParamType` utilities
- **Added**: Modular exports (`/client`, `/parameters`)
- **Enhanced**: `useParamState` with simpler `updateValue` middleware

### Migration Examples:

```diff
// URL building
- const url = setLinkQueryValue('/products', categoryParam, 'books')
+ const link = parseLink('/products')
+ const linker = link instanceof URL ? createLinkerUrl(link) : createLinker(link)
+ const url = linker.setValue(categoryParam, 'books').asString()

// Parameter types
- import { encodeString, decodeString } from 'next-navigation-utils'
- const categoryParam = { name: 'category', encode: encodeString, decode: decodeString }
+ import { stringType, makeParam } from 'next-navigation-utils'
+ const categoryParam = makeParam('category', stringType)

// Hooks import
- import { useParamState } from 'next-navigation-utils'
+ import { useParamState } from 'next-navigation-utils/client'

// updateValues → updateValue
- const [category, setCategory] = useParamState(categoryParam, {
-   updateValues: () => [() => [pageParam, 1]]
- })
+ const [category, setCategory] = useParamState(categoryParam, {
+   updateValue: (link) => link.setValue(pageParam, 1)
+ })
```

## Requirements

- Next.js 14+ / 15+
- React 18+ / 19+
- TypeScript (recommended)

## Contributing

We welcome contributions! Please see our contributing guidelines for details.

## License

MIT License – see LICENSE.

## Changelog

See CHANGELOG.md for detailed release notes.
