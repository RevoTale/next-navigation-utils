# next-navigation-utils

A TypeScript library that bridges Next.js navigation contexts - seamlessly convert between client-side `useSearchParams()`, server-side `searchParams`, and URL strings with type safety.

## The Problem

Next.js gives you different ways to work with URL parameters:
- **Client-side**: `useSearchParams()` returns `URLSearchParams`
- **Server-side**: `page.tsx` receives `searchParams` as a plain object
- **URLs**: String manipulation for links and navigation

Converting between these formats while maintaining type safety is tedious. This library solves that.

## Features

- 🔄 **Bidirectional Conversion**: Move data between client, server, and URL contexts
- 🎯 **Type Safety**: Full TypeScript support with built-in encoders/decoders
- 🪝 **React Hooks**: Ready-to-use hooks for client-side navigation
- 🔗 **URL Building**: Create and modify URLs with type-safe parameters
- ⚡ **Next.js Native**: Works with App Router patterns out of the box

## Installation

```bash
npm install next-navigation-utils
# or
yarn add next-navigation-utils
# or
pnpm add next-navigation-utils
```

## Quick Start

### The Three Contexts

```tsx
// 1. Server-side (page.tsx) - Plain object
export default function Page({ searchParams }: { 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  // searchParams = { category: 'electronics', page: '2' }
}

// 2. Client-side (components) - URLSearchParams
'use client'
function ClientComponent() {
  const searchParams = useSearchParams() // URLSearchParams object
}

// 3. URL strings - For links and navigation
const url = '/products?category=electronics&page=2'
```

### Seamless Conversion

```tsx
import { 
  getQueryParamValue, getSearchParamValue, getLinkQueryValue,
  setQueryParamValue, setSearchParamValue, setLinkQueryValue,
  queryToSearchParams, decodeString, encodeString 
} from 'next-navigation-utils'

// Same operation across all contexts
const options = { name: 'category', decode: decodeString }

// Get value from server-side searchParams
const categoryFromServer = getQueryParamValue(searchParams, options)

// Get value from client-side useSearchParams()
const categoryFromClient = getSearchParamValue(useSearchParams(), options)

// Get value from URL string
const categoryFromUrl = getLinkQueryValue('/products?category=electronics', options)

// All return the same value: 'electronics'
```

## Core Concept: Context Bridge

### Server to Client Bridge

```tsx
// page.tsx (Server Component)
import { queryToSearchParams, getQueryParamValue, decodeString } from 'next-navigation-utils'

export default function ProductsPage({ searchParams }: { searchParams: any }) {
  // Convert server searchParams to URLSearchParams for consistency
  const urlSearchParams = queryToSearchParams(searchParams)
  
  // Extract typed values
  const category = getQueryParamValue(searchParams, { name: 'category', decode: decodeString })
  
  return (
    <div>
      <h1>Category: {category}</h1>
      <ClientFilters initialSearchParams={urlSearchParams} />
    </div>
  )
}

// ClientComponent.tsx (Client Component)
'use client'
import { useSearchParams, useLinker } from 'next-navigation-utils'

function ClientFilters({ initialSearchParams }: { initialSearchParams: URLSearchParams }) {
  const currentParams = useSearchParams() // Current client-side params
  const linker = useLinker() // For building new URLs
  
  const handleFilterChange = (newCategory: string) => {
    const newUrl = linker()
      .setValue({ name: 'category', encode: encodeString }, newCategory)
      .toString()
    
    router.push(newUrl) // Navigate with new params
  }
  
  return <FilterUI onFilterChange={handleFilterChange} />
}
```

### URL Building and Navigation

```tsx
import { createLinker, encodeString, encodeNumber } from 'next-navigation-utils'

// Start with any URL - current page, different page, etc.
const linker = createLinker('/products')

// Chain parameter modifications
const searchUrl = linker
  .setValue({ name: 'category', encode: encodeString }, 'electronics')
  .setValue({ name: 'page', encode: encodeNumber }, 1)
  .setValue({ name: 'sort', encode: encodeString }, 'price-asc')
  .toString()

// Result: '/products?category=electronics&page=1&sort=price-asc'

// Use for navigation
router.push(searchUrl)

// Or for links
<Link href={searchUrl}>Electronics Page 1</Link>
```

## API Reference

### Context Conversion Functions

The core of the library - these functions work across different Next.js contexts:

#### Query Parameters (Server-side `searchParams`)
- `getQueryParamValue(searchParams, options)` - Get typed value from server-side searchParams
- `setQueryParamValue(searchParams, options, value)` - Set value in server-side searchParams object

#### Search Parameters (Client-side `useSearchParams()`)
- `getSearchParamValue(urlSearchParams, options)` - Get typed value from URLSearchParams
- `setSearchParamValue(urlSearchParams, options, value)` - Set value in URLSearchParams

#### Link Parameters (URL strings)
- `getLinkQueryValue(url, options)` - Get typed value from URL string
- `setLinkQueryValue(url, options, value)` - Set value in URL string

#### Bridge Function
- `queryToSearchParams(searchParams)` - Convert server-side searchParams to URLSearchParams

### React Hooks (Client-side)

#### `useLinker()`
Creates a URL builder based on the current page URL.

```tsx
const linker = useLinker()
const newUrl = linker()
  .setValue({ name: 'filter', encode: encodeString }, 'active')
  .toString()
```

#### `useCurrentLink()`
Gets the current page URL as a string.

```tsx
const currentUrl = useCurrentLink() // '/products?category=electronics'
```

#### `useSearchParam(options)`
Gets a typed parameter from the current URL's search params.

```tsx
const category = useSearchParam({ name: 'category', decode: decodeString })
// Returns the current 'category' parameter value
```

### URL Builder

#### `createLinker(url)`
Creates a URL builder for any URL string.

```tsx
const builder = createLinker('/products')
const newUrl = builder
  .setValue({ name: 'sort', encode: encodeString }, 'price')
  .toString() // '/products?sort=price'
```

### Type-Safe Parameter Handling

All functions use the same parameter options for consistent type safety:

```tsx
const options = {
  name: 'parameterName',
  encode: encodeString,  // How to convert value to URL
  decode: decodeString   // How to convert URL back to value
}
```

#### Built-in Type Handlers

**String**
```tsx
import { encodeString, decodeString } from 'next-navigation-utils'

// Server-side
const category = getQueryParamValue(searchParams, { name: 'category', decode: decodeString })

// Client-side  
const category = getSearchParamValue(useSearchParams(), { name: 'category', decode: decodeString })

// URL building
const url = setLinkQueryValue('/products', { name: 'category', encode: encodeString }, 'electronics')
```

**Number**
```tsx
import { encodeNumber, decodeNumber } from 'next-navigation-utils'

const page = getQueryParamValue(searchParams, { name: 'page', decode: decodeNumber })
const url = setLinkQueryValue('/products', { name: 'page', encode: encodeNumber }, 2)
```

**Boolean**
```tsx
import { encodeBool, decodeBool } from 'next-navigation-utils'

const isActive = getQueryParamValue(searchParams, { name: 'active', decode: decodeBool })
const url = setLinkQueryValue('/products', { name: 'active', encode: encodeBool }, true)
```

**Page Numbers** (1-based, defaults to 1)
```tsx
import { encodePage, decodePage } from 'next-navigation-utils'

const page = getQueryParamValue(searchParams, { name: 'page', decode: decodePage }) // defaults to 1
const url = setLinkQueryValue('/products', { name: 'page', encode: encodePage }, 3)
```

## Real-World Patterns

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
export function CategoryFilter() {
  const currentCategory = useSearchParam(categoryParam)
  const linker = useLinker()
  
  const handleChange = (newCategory: string) => {
    const url = linker()
      .setValue(categoryParam, newCategory)
      .setValue(pageParam, 1) // Reset to page 1
      .toString()
    router.push(url)
  }
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
  const currentCategory = getSearchParamValue(searchParams, { name: 'category', decode: decodeString })
  const linker = useLinker()
  
  return (
    <select 
      value={currentCategory || ''} 
      onChange={(e) => {
        const newUrl = linker()
          .setValue({ name: 'category', encode: encodeString }, e.target.value)
          .setValue({ name: 'page', encode: encodePage }, 1) // Reset pagination
          .toString()
        router.push(newUrl)
      }}
    >
      <option value="">All Categories</option>
      <option value="electronics">Electronics</option>
      <option value="clothing">Clothing</option>
    </select>
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
```

## Requirements

- Next.js 14.0+ or 15.0+
- React 18.0+ or 19.0+
- TypeScript (recommended)

## Contributing

We welcome contributions! Please read our contributing guidelines and feel free to submit issues and pull requests.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history and updates.
