# Manticoresearch.SearchApi

All URIs are relative to *http://127.0.0.1:9308*

Method | HTTP request | Description
------------- | ------------- | -------------
[**percolate**](SearchApi.md#percolate) | **POST** /pq/{index}/search | Perform reverse search on a percolate index
[**search**](SearchApi.md#search) | **POST** /search | Performs a search on an index


# **percolate**
> SearchResponse percolate(percolateRequest)

Performs a percolate search. <br><br> This method must be used only on percolate indexes. <br> Expects two parameters: the index name and an object with array of documents to be tested. <br> <br> An example of the documents object: <br>   { <br>   &nbsp;&nbsp;\"query\" {<br>   &nbsp;&nbsp;&nbsp;&nbsp;\"percolate\": {<br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"document\": { <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\"content\":\"sample content\" <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br>   &nbsp;&nbsp;&nbsp;&nbsp;} <br>   &nbsp;&nbsp;} <br>   } <br> <br> Responds with an object with matched stored queries:  <br>   { <br>   &nbsp;&nbsp;\'timed_out\':false, <br>   &nbsp;&nbsp;\'hits\': { <br>   &nbsp;&nbsp;&nbsp;&nbsp;\'total\':2, <br>   &nbsp;&nbsp;&nbsp;&nbsp;\'max_score\':1, <br>   &nbsp;&nbsp;&nbsp;&nbsp;\'hits\': [ <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; { <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \'_index\':\'idx_pq_1\', <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \'_type\':\'doc\', <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \'_id\':\'2\', <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \'_score\':\'1\', <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \'_source\': { <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \'query\': { <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \'match\':{\'title\':\'some\'} <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; } <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }, <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; { <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \'_index\':\'idx_pq_1\', <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \'_type\':\'doc\', <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \'_id\':\'5\', <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \'_score\':\'1\', <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \'_source\': { <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \'query\': { <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \'ql\':\'some | none\' <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; } <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; } <br>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; } <br>   &nbsp;&nbsp;&nbsp;&nbsp; ] <br>   &nbsp;&nbsp; } <br>   } <br> 

### Example


```typescript
import { createConfiguration, SearchApi } from '';
import type { SearchApiPercolateRequest } from '';

const configuration = createConfiguration();
const apiInstance = new SearchApi(configuration);

const request: SearchApiPercolateRequest = {
    // Name of the percolate index
  index: "index_example",
  
  percolateRequest: null,
};

const data = await apiInstance.percolate(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **percolateRequest** | **PercolateRequest**|  |
 **index** | [**string**] | Name of the percolate index | defaults to undefined


### Return type

**SearchResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | items found |  -  |
**0** | error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **search**
> SearchResponse search(searchRequest)

 The method expects an object with the following mandatory properties: * the name of the index to search * the match query object For details, see the documentation on [**SearchRequest**](SearchRequest.md) The method returns an object with the following properties: - took: the time taken to execute the search query. - timed_out: a boolean indicating whether the query timed out. - hits: an object with the following properties:    - total: the total number of hits found.    - hits: an array of hit objects, where each hit object represents a matched document. Each hit object has the following properties:      - _id: the ID of the matched document.      - _score: the score of the matched document.      - _source: the source data of the matched document.  In addition, if profiling is enabled, the response will include an additional array with profiling information attached. Also, if pagination is enabled, the response will include an additional \'scroll\' property with a scroll token to use for pagination Here is an example search response:    ```   {     \'took\':10,     \'timed_out\':false,     \'hits\':     {       \'total\':2,       \'hits\':       [         {\'_id\':\'1\',\'_score\':1,\'_source\':{\'gid\':11}},         {\'_id\':\'2\',\'_score\':1,\'_source\':{\'gid\':12}}       ]     }   }   ```  For more information about the match query syntax and additional parameters that can be added to request and response, please see the documentation [here](https://manual.manticoresearch.com/Searching/Full_text_matching/Basic_usage#HTTP-JSON). 

### Example


```typescript
import { createConfiguration, SearchApi } from '';
import type { SearchApiSearchRequest } from '';

const configuration = createConfiguration();
const apiInstance = new SearchApi(configuration);

const request: SearchApiSearchRequest = {
  
  searchRequest: null,
};

const data = await apiInstance.search(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **searchRequest** | **SearchRequest**|  |


### Return type

**SearchResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Ok |  -  |
**0** | error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


