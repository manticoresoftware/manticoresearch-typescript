# Manticoresearch.IndexApi

All URIs are relative to *http://127.0.0.1:9308*

Method | HTTP request | Description
------------- | ------------- | -------------
[**bulk**](IndexApi.md#bulk) | **POST** /bulk | Bulk index operations
[**delete**](IndexApi.md#delete) | **POST** /delete | Delete a document in an index
[**insert**](IndexApi.md#insert) | **POST** /insert | Create a new document in an index
[**partialReplace**](IndexApi.md#partialReplace) | **POST** /{index}/_update/{id} | Partially replaces a document in an index
[**replace**](IndexApi.md#replace) | **POST** /replace | Replace new document in an index
[**update**](IndexApi.md#update) | **POST** /update | Update a document in an index


# **bulk**
> BulkResponse bulk(body)

Sends multiple operatons like inserts, updates, replaces or deletes.  For each operation it\'s object must have same format as in their dedicated method.  The method expects a raw string as the batch in NDJSON.  Each operation object needs to be serialized to   JSON and separated by endline (\\n).      An example of raw input:      ```   {\"insert\": {\"index\": \"movies\", \"doc\": {\"plot\": \"A secret team goes to North Pole\", \"rating\": 9.5, \"language\": [2, 3], \"title\": \"This is an older movie\", \"lon\": 51.99, \"meta\": {\"keywords\":[\"travel\",\"ice\"],\"genre\":[\"adventure\"]}, \"year\": 1950, \"lat\": 60.4, \"advise\": \"PG-13\"}}}   \\n   {\"delete\": {\"index\": \"movies\",\"id\":700}}   ```      Responds with an object telling whenever any errors occured and an array with status for each operation:      ```   {     \'items\':     [       {         \'update\':{\'_index\':\'products\',\'_id\':1,\'result\':\'updated\'}       },       {         \'update\':{\'_index\':\'products\',\'_id\':2,\'result\':\'updated\'}       }     ],     \'errors\':false   }   ``` 

### Example


```typescript
import { createConfiguration, IndexApi } from '';
import type { IndexApiBulkRequest } from '';

const configuration = createConfiguration();
const apiInstance = new IndexApi(configuration);

const request: IndexApiBulkRequest = {
  
  body: "body_example",
};

const data = await apiInstance.bulk(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **string**|  |


### Return type

**BulkResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/x-ndjson
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | item updated |  -  |
**0** | error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **delete**
> DeleteResponse delete(deleteDocumentRequest)

Delete one or several documents. The method has 2 ways of deleting: either by id, in case only one document is deleted or by using a  match query, in which case multiple documents can be delete . Example of input to delete by id:    ```   {\'index\':\'movies\',\'id\':100}   ```  Example of input to delete using a query:    ```   {     \'index\':\'movies\',     \'query\':     {       \'bool\':       {         \'must\':         [           {\'query_string\':\'new movie\'}         ]       }     }   }   ```  The match query has same syntax as in for searching. Responds with an object telling how many documents got deleted:     ```   {\'_index\':\'products\',\'updated\':1}   ``` 

### Example


```typescript
import { createConfiguration, IndexApi } from '';
import type { IndexApiDeleteRequest } from '';

const configuration = createConfiguration();
const apiInstance = new IndexApi(configuration);

const request: IndexApiDeleteRequest = {
  
  deleteDocumentRequest: null,
};

const data = await apiInstance.delete(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **deleteDocumentRequest** | **DeleteDocumentRequest**|  |


### Return type

**DeleteResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | item updated |  -  |
**0** | error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **insert**
> SuccessResponse insert(insertDocumentRequest)

Insert a document.  Expects an object like:     ```   {     \'index\':\'movies\',     \'id\':701,     \'doc\':     {       \'title\':\'This is an old movie\',       \'plot\':\'A secret team goes to North Pole\',       \'year\':1950,       \'rating\':9.5,       \'lat\':60.4,       \'lon\':51.99,       \'advise\':\'PG-13\',       \'meta\':\'{\"keywords\":{\"travel\",\"ice\"},\"genre\":{\"adventure\"}}\',       \'language\':[2,3]     }   }   ```   The document id can also be missing, in which case an autogenerated one will be used:             ```   {     \'index\':\'movies\',     \'doc\':     {       \'title\':\'This is a new movie\',       \'plot\':\'A secret team goes to North Pole\',       \'year\':2020,       \'rating\':9.5,       \'lat\':60.4,       \'lon\':51.99,       \'advise\':\'PG-13\',       \'meta\':\'{\"keywords\":{\"travel\",\"ice\"},\"genre\":{\"adventure\"}}\',       \'language\':[2,3]     }   }   ```   It responds with an object in format:      ```   {\'_index\':\'products\',\'_id\':701,\'created\':true,\'result\':\'created\',\'status\':201}   ``` 

### Example


```typescript
import { createConfiguration, IndexApi } from '';
import type { IndexApiInsertRequest } from '';

const configuration = createConfiguration();
const apiInstance = new IndexApi(configuration);

const request: IndexApiInsertRequest = {
  
  insertDocumentRequest: null,
};

const data = await apiInstance.insert(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **insertDocumentRequest** | **InsertDocumentRequest**|  |


### Return type

**SuccessResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**0** | error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **partialReplace**
> UpdateResponse partialReplace(replaceDocumentRequest)

Partially replaces a document with given id in an index Responds with an object of the following format:     ```   {\'_index\':\'products\',\'updated\':1}   ``` 

### Example


```typescript
import { createConfiguration, IndexApi } from '';
import type { IndexApiPartialReplaceRequest } from '';

const configuration = createConfiguration();
const apiInstance = new IndexApi(configuration);

const request: IndexApiPartialReplaceRequest = {
    // Name of the percolate index
  index: "index_example",
    // Id of the document to replace
  id: 1,
  
  replaceDocumentRequest: null,
};

const data = await apiInstance.partialReplace(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **replaceDocumentRequest** | **ReplaceDocumentRequest**|  |
 **index** | [**string**] | Name of the percolate index | defaults to undefined
 **id** | [**number**] | Id of the document to replace | defaults to undefined


### Return type

**UpdateResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | item updated |  -  |
**0** | error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **replace**
> SuccessResponse replace(insertDocumentRequest)

Replace an existing document. Input has same format as `insert` operation. <br/> Responds with an object in format: <br/>    ```   {\'_index\':\'products\',\'_id\':1,\'created\':false,\'result\':\'updated\',\'status\':200}   ``` 

### Example


```typescript
import { createConfiguration, IndexApi } from '';
import type { IndexApiReplaceRequest } from '';

const configuration = createConfiguration();
const apiInstance = new IndexApi(configuration);

const request: IndexApiReplaceRequest = {
  
  insertDocumentRequest: null,
};

const data = await apiInstance.replace(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **insertDocumentRequest** | **InsertDocumentRequest**|  |


### Return type

**SuccessResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |
**0** | error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **update**
> UpdateResponse update(updateDocumentRequest)

Update one or several documents. The update can be made by passing the id or by using a match query in case multiple documents can be updated.  For example update a document using document id:    ```   {\'index\':\'movies\',\'doc\':{\'rating\':9.49},\'id\':100}   ```  And update by using a match query:    ```   {     \'index\':\'movies\',     \'doc\':{\'rating\':9.49},     \'query\':     {       \'bool\':       {         \'must\':         [           {\'query_string\':\'new movie\'}         ]       }     }   }   ```   The match query has same syntax as for searching. Responds with an object that tells how many documents where updated in format:     ```   {\'_index\':\'products\',\'updated\':1}   ``` 

### Example


```typescript
import { createConfiguration, IndexApi } from '';
import type { IndexApiUpdateRequest } from '';

const configuration = createConfiguration();
const apiInstance = new IndexApi(configuration);

const request: IndexApiUpdateRequest = {
  
  updateDocumentRequest: null,
};

const data = await apiInstance.update(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateDocumentRequest** | **UpdateDocumentRequest**|  |


### Return type

**UpdateResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | item updated |  -  |
**0** | error |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


