# Manticore TypeScript client

Сlient for Manticore Search.


❗ WARNING: this is a development version of the client. The latest release's readme is https://github.com/manticoresoftware/manticoresearch-typescript/tree/3.3.1

## Requirements

Minimum Manticore Search version is 4.2.1 with HTTP protocol enabled.

| Manticore Search  | manticoresearch-typescript   |     Node      |
| ----------------- | ---------------------------- | ------------- |
| >= 6.2.0          | 3.3.1                        | >= 18.0.0     |
| >= 4.2.1          | 1.0.x                        | >= 18.0.0     |


## Installation

```shell
npm install manticoresearch-ts 
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following typescript code:


```javascript
import { Configuration, IndexApi, SearchApi, ResponseError } from 'manticoresearch-ts'
;(async () => {
  try {
    /*
    const config = new Configuration({
      basePath: 'http://localhost:9308',
      // fetchApi: <your own fetch API> // use node-fetch with node version < 18
    })
    const indexApi = new IndexApi(config)
    */
    const indexApi = new IndexApi()
    const docs = [
      { insert: { index: 'test', id: 1, doc: { title: 'Title 1' } } },
      { insert: { index: 'test', id: 2, doc: { title: 'Title 2' } } },
    ]
    const insertResponse = await indexApi.bulk(docs.map((doc) => JSON.stringify(doc)).join('\n'))
    console.info('Insert response:', JSON.stringify(insertResponse, null, 2))

    const searchApi = new SearchApi()
    const searchResponse = await searchApi.search({
      index: 'test',
      query: { query_string: 'Title 1' },
    })
    console.info('Search response:', JSON.stringify(searchResponse, null, 2))
  } catch (error) {
    const errorResponse = error instanceof ResponseError ? await error.response.json() : error
    console.error('Error response:', JSON.stringify(errorResponse, null, 2))
  }
})()

```

## Documentation

Full documentation on the API Endpoints and Models used is available in  [docs](https://github.com/manticoresoftware/manticoresearch-typescript/tree/3.3.1/docs) folder as listed below.

Manticore Search server documentation: https://manual.manticoresearch.com.

## Documentation for API Endpoints

All URIs are relative to *http://127.0.0.1:9308*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*Manticoresearch.IndexApi* | [**bulk**](docs/IndexApi.md#bulk) | **POST** /bulk | Bulk index operations
*Manticoresearch.IndexApi* | [**delete**](docs/IndexApi.md#delete) | **POST** /delete | Delete a document in an index
*Manticoresearch.IndexApi* | [**insert**](docs/IndexApi.md#insert) | **POST** /insert | Create a new document in an index
*Manticoresearch.IndexApi* | [**replace**](docs/IndexApi.md#replace) | **POST** /replace | Replace new document in an index
*Manticoresearch.IndexApi* | [**update**](docs/IndexApi.md#update) | **POST** /update | Update a document in an index
*Manticoresearch.SearchApi* | [**percolate**](docs/SearchApi.md#percolate) | **POST** /pq/{index}/search | Perform reverse search on a percolate index
*Manticoresearch.SearchApi* | [**search**](docs/SearchApi.md#search) | **POST** /search | Performs a search on an index
*Manticoresearch.UtilsApi* | [**sql**](docs/UtilsApi.md#sql) | **POST** /sql | Perform SQL requests


## Documentation for Authorization

All endpoints do not require authorization.
