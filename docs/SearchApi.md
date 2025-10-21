# Manticoresearch.SearchApi

All URIs are relative to *http://127.0.0.1:9308*

Method | HTTP request | Description
------------- | ------------- | -------------
[**autocomplete**](SearchApi.md#autocomplete) | **POST** /autocomplete | Performs an autocomplete search on a table
[**percolate**](SearchApi.md#percolate) | **POST** /pq/{table}/search | Perform reverse search on a percolate table
[**search**](SearchApi.md#search) | **POST** /search | Performs a search on a table


# **autocomplete**
> Array<any> autocomplete(autocompleteRequest)

 The method expects an object with the following mandatory properties: * the name of the table to search * the query string to autocomplete For details, see the documentation on [**Autocomplete**](Autocomplete.md) An example: ``` {   \"table\":\"table_name\",   \"query\":\"query_beginning\" }         ``` An example of the method\'s response:   ```  [    {      \"total\": 3,      \"error\": \"\",      \"warning\": \"\",      \"columns\": [        {          \"query\": {            \"type\": \"string\"          }        }      ],      \"data\": [        {          \"query\": \"hello\"        },        {          \"query\": \"helio\"        },        {          \"query\": \"hell\"        }      ]    }  ]   ```  For more detailed information about the autocomplete queries, please refer to the documentation [here](https://manual.manticoresearch.com/Searching/Autocomplete). 

### Example


```typescript
const configuration = createConfiguration();
const apiInstance = new SearchApi(configuration);

const data = await apiInstance.autocomplete(autocompleteRequest);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **autocompleteRequest** | **AutocompleteRequest**|  |


### Return type

**Array<any>**

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

# **percolate**
> SearchResponse percolate(percolateRequest)

Performs a percolate search. This method must be used only on percolate tables. Expects two parameters: the table name and an object with array of documents to be tested. An example of the documents object: ```   {     \"query\" {       \"percolate\": {         \"document\": {           \"content\":\"sample content\"         }       }     }   } ``` Responds with an object with matched stored queries:  ```   {     \'timed_out\':false,     \'hits\': {       \'total\':2,       \'max_score\':1,       \'hits\': [         {           \'table\':\'idx_pq_1\',           \'_type\':\'doc\',           \'_id\':\'2\',           \'_score\':\'1\',           \'_source\': {             \'query\': {               \'match\':{\'title\':\'some\'}             }           }         },         {           \'table\':\'idx_pq_1\',           \'_type\':\'doc\',           \'_id\':\'5\',           \'_score\':\'1\',           \'_source\': {             \'query\': {               \'ql\':\'some | none\'             }           }         }       ]     }   } ``` 

### Example


```typescript
const configuration = createConfiguration();
const apiInstance = new SearchApi(configuration);

const data = await apiInstance.percolate(table, percolateRequest);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **percolateRequest** | **PercolateRequest**|  |
 **table** | [**string**] | Name of the percolate table | defaults to undefined


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

 The method expects an object with the following mandatory properties: * the name of the table to search * the match query object For details, see the documentation on [**SearchRequest**](SearchRequest.md) The method returns an object with the following properties: - took: the time taken to execute the search query. - timed_out: a boolean indicating whether the query timed out. - hits: an object with the following properties:    - total: the total number of hits found.    - hits: an array of hit objects, where each hit object represents a matched document. Each hit object has the following properties:      - _id: the ID of the matched document.      - _score: the score of the matched document.      - _source: the source data of the matched document.  In addition, if profiling is enabled, the response will include an additional array with profiling information attached. Also, if pagination is enabled, the response will include an additional \'scroll\' property with a scroll token to use for pagination Here is an example search response:    ```   {     \'took\':10,     \'timed_out\':false,     \'hits\':     {       \'total\':2,       \'hits\':       [         {\'_id\':\'1\',\'_score\':1,\'_source\':{\'gid\':11}},         {\'_id\':\'2\',\'_score\':1,\'_source\':{\'gid\':12}}       ]     }   }   ```  For more information about the match query syntax and additional parameters that can be added to request and response, please see the documentation [here](https://manual.manticoresearch.com/Searching/Full_text_matching/Basic_usage#HTTP-JSON). 

### Example


```typescript
const configuration = createConfiguration();
const apiInstance = new SearchApi(configuration);

const data = await apiInstance.search(searchRequest);
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


