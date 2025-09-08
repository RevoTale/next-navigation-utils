# next-navigation-utils

[![npm version](https://badge.fury.io/js/next-navigation-utils.svg)](https://badge.fury.io/js/next-navigation-utils)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

Type-safe URL parameter management for Next.js applications. Seamlessly bridge server-side `searchParams`, client-side `URLSearchParams`, and URL strings with full TypeScript support.

## Why next-navigation-utils?

Next.js provides different URL parameter APIs depending on context:

- **Server Components**: `searchParams` object `{ category: 'electronics', page: ['1'] }`
- **Client Components**: `useSearchParams()` returns `URLSearchParams` 
- **Links & Navigation**: URL strings `'/products?category=electronics&page=1'`

Converting between these formats while maintaining type safety is complex. This library provides a unified, type-safe interface across all contexts.

## Features

- 🔄 **Universal API** - Same functions work with server, client, and URL contexts
- 🎯 **Type Safety** - Full TypeScript support with encode/decode patterns
- 🪝 **React Hooks** - Ready-to-use hooks for client-side state management
- 🔗 **URL Building** - Fluent API for constructing URLs with parameters
- ⚡ **Zero Config** - Works with Next.js App Router out of the box
- 🎛️ **State Sync** - Automatic URL ↔ component state synchronization

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
  getQueryParamValue,    // Server-side searchParams
  getSearchParamValue,   // Client-side URLSearchParams  
  getLinkQueryValue,     // URL strings
  encodeString, decodeString 
} from 'next-navigation-utils'

const options = { name: 'category', decode: decodeString }

// Server Component
export default function Page({ searchParams }) {
  const category = getQueryParamValue(searchParams, options)
  return <h1>Category: {category}</h1>
}

// Client Component  
'use client'
import { useSearchParams } from 'next/navigation'

function Filter() {
  const searchParams = useSearchParams()
  const category = getSearchParamValue(searchParams, options)
  return <div>Current: {category}</div>
}

// URL manipulation
const category = getLinkQueryValue('/products?category=electronics', options)
// Returns: 'electronics'
```

### URL State Hook

```tsx
'use client'
import { useParamState, encodeString, decodeString } from 'next-navigation-utils'

function SearchInput() {
  const [query, setQuery] = useParamState({
    name: 'q',
    encode: encodeString,
    decode: decodeString
  })
  
  return (
    <input
      value={query || ''}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  )
  // URL automatically updates as user types (debounced)
  // Component syncs when URL changes externally
}
```

## Core Concepts

### Encoder/Decoder Pattern

All functions use consistent encode/decode options for type safety:

```tsx
const stringParam = {
  name: 'category',
  encode: encodeString,    // value → URL
  decode: decodeString     // URL → value
}

// Use across all contexts
const category1 = getQueryParamValue(searchParams, stringParam)      // Server
const category2 = getSearchParamValue(useSearchParams(), stringParam) // Client
const category3 = getLinkQueryValue(url, stringParam)                 // URL
```

### Built-in Type Handlers

```tsx
import { 
  encodeString, decodeString,     // string | null
  encodeNumber, decodeNumber,     // number | null  
  encodeBool, decodeBool,         // boolean | null
  encodePage, decodePage          // number (1-based, defaults to 1)
} from 'next-navigation-utils'

// String parameters
const category = getQueryParamValue(searchParams, {
  name: 'category', 
  decode: decodeString 
})

// Numeric parameters  
const price = getQueryParamValue(searchParams, {
  name: 'minPrice',
  decode: decodeNumber
})

// Boolean parameters (encoded as '1'/'0')
const inStock = getQueryParamValue(searchParams, {
  name: 'inStock', 
  decode: decodeBool
})

// Page numbers (defaults to 1 if missing)
const page = getQueryParamValue(searchParams, {
  name: 'page',
  decode: decodePage
})
```

## API Reference

### Core Functions

#### Server-side (`searchParams` object)

```tsx
getQueryParamValue(searchParams, options): T
setQueryParamValue(searchParams, options, value): void
```

#### Client-side (`URLSearchParams`)

```tsx  
getSearchParamValue(urlSearchParams, options): T
setSearchParamValue(urlSearchParams, options, value): void
```

#### URL Strings

```tsx
getLinkQueryValue(url, options): T  
setLinkQueryValue(url, options, value): string
```

#### Bridge Function

```tsx
queryToSearchParams(searchParams): URLSearchParams
```

Converts server-side `searchParams` to `URLSearchParams` for client compatibility.

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

#### `useCurrentLink()`

Get current page URL as string:

```tsx
const currentUrl = useCurrentLink() // '/products?category=electronics'
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

### URL Builder

#### `createLinker(url)`

Create a URL builder for any URL:

```tsx
const builder = createLinker('/products')
const newUrl = builder
  .setValue({ name: 'category', encode: encodeString }, 'electronics')
  .setValue({ name: 'page', encode: encodeNumber }, 2)
  .asString() // '/products?category=electronics&page=2'
```

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

- **Next.js**: 14.0+ or 15.0+
- **React**: 18.0+ or 19.0+
- **TypeScript**: Recommended for full type safety

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.
