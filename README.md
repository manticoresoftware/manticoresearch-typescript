# Manticore TypeScript client

❗ WARNING: this is a development version of the client. The latest release's readme is https://github.com/manticoresoftware/manticoresearch-typescript/tree/6.0.0

❗ WARNING: the current version has breaking changes compared to the previous release https://github.com/manticoresoftware/manticoresearch-typescript/tree/5.0.0

## Compatibility Table

| **manticoresearch-typescript** | **Manticore Search**                | **Node**            | **Compatibility**      |
| ------------------------------ | ----------------------------------- | ------------------- | -----------------------|
| `manticoresearch-ts-dev`       | `dev` (latest development version)  | Node 18 or newer    | ✅ Fully Compatible    |
| 6.0.0 or newer                 | 7.0.0 or newer                      | Node 18 or newer    | ✅ Fully Compatible    |
| 6.0.0 or newer                 | 4.2.1 to 7.0.0                      | Node 18 or newer    | ⚠️ Partially Compatible|
| 3.3.1 to 6.0.0                 | 6.2.0 or newer                      | Node 18 or newer    | ✅ Fully Compatible    |
| 3.3.1 to 6.0.0                 | 4.2.1 to 6.2.0                      | Node 18 or newer    | ⚠️ Partially Compatible|
| 1.0.x to 3.3.1                 | 4.2.1 to 6.2.0                      | Node 18 or newer    | ✅ Fully Compatible    |


## Installation

```shell
npm install manticoresearch-ts 
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following typescript code:

```javascript
import * as Manticoresearch from "manticoresearch-ts";
(async () => {
  try {
    const serverConfig = new Manticoresearch.ServerConfiguration("http://localhost:9308", {})
    const config = Manticoresearch.createConfiguration({
      baseServer: serverConfig,
    });
    indexApi = new Manticoresearch.IndexApi(config);
    searchApi = new Manticoresearch.SearchApi(config);
  
    # Perform insert and search operations
    await indexApi.insert({"index": "products", "doc" : {"title" : "Crossbody Bag with Tassel", "price" : 19.85}});
    await indexApi.insert({"index": "products", "doc" : {"title" : "microfiber sheet set", "price" : 19.99}});

    var search_query = new Manticoresearch.SearchQuery()
    search_query.query_string = "@title bag"
      
    var search_request = new Manticoresearch.SearchRequest()
    search_request.index = "products"
    search_request.query = search_query
    var query_highlight = new Manticoresearch.Highlight()
    query_highlight.fields = {"title":{}}
    search_request.highlight = query_highlight
  
    var search_response = await searchApi.search(search_request)
    console.log("The response of SearchApi->search:\n")    
    console.log(search_response)

    # Alternatively, you can pass all request arguments as JSON strings
    search_response = await searchApi.search({"index": "products", "query": {"query_string": "@title bag"}, "highlight": {"fields": ["title"]}});
    console.log("The response of SearchApi->search:\n")    
    console.log(search_response)
  } catch (error) {
    console.error("Error response:", JSON.stringify(error));
  }
})();
```

## Documentation

Full documentation on the API Endpoints and Models used is available in [docs](https://github.com/manticoresoftware/manticoresearch-typescript/tree/6.0.0/docs) folder as listed below.

Manticore Search server documentation: https://manual.manticoresearch.com.

## Documentation for API Endpoints

All URIs are relative to *http://127.0.0.1:9308*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
_Manticoresearch.IndexApi_ | [**bulk**](docs/IndexApi.md#bulk) | **POST** /bulk | Bulk index operations
_Manticoresearch.IndexApi_ | [**delete**](docs/IndexApi.md#delete) | **POST** /delete | Delete a document in an index
_Manticoresearch.IndexApi_ | [**insert**](docs/IndexApi.md#insert) | **POST** /insert | Create a new document in an index
_Manticoresearch.IndexApi_ | [**partialReplace**](docs/IndexApi.md#partialReplace) | **POST** /{index}/_update/{id} | Partially replaces a document in an index
_Manticoresearch.IndexApi_ | [**replace**](docs/IndexApi.md#replace) | **POST** /replace | Replace new document in an index
_Manticoresearch.IndexApi_ | [**update**](docs/IndexApi.md#update) | **POST** /update | Update a document in an index
_Manticoresearch.SearchApi_ | [**percolate**](docs/SearchApi.md#percolate) | **POST** /pq/{index}/search | Perform reverse search on a percolate index
_Manticoresearch.SearchApi_ | [**search**](docs/SearchApi.md#search) | **POST** /search | Performs a search on an index
_Manticoresearch.UtilsApi_ | [**sql**](docs/UtilsApi.md#sql) | **POST** /sql | Perform SQL requests


## Documentation for Authorization

All endpoints do not require authorization.
