# Manticoresearch.IndexApi

All URIs are relative to *http://127.0.0.1:9308*

Method | HTTP request | Description
------------- | ------------- | -------------
[**bulk**](IndexApi.md#bulk) | **POST** /bulk | Bulk table operations
[**delete**](IndexApi.md#delete) | **POST** /delete | Delete a document in a table
[**insert**](IndexApi.md#insert) | **POST** /insert | Create a new document in a table
[**partialReplace**](IndexApi.md#partialReplace) | **POST** /{table}/_update/{id} | Partially replaces a document in a table
[**replace**](IndexApi.md#replace) | **POST** /replace | Replace new document in a table
[**update**](IndexApi.md#update) | **POST** /update | Update a document in a table


# **bulk**
> BulkResponse bulk(body)

Sends multiple operatons like inserts, updates, replaces or deletes.  For each operation it\'s object must have same format as in their dedicated method.  The method expects a raw string as the batch in NDJSON.  Each operation object needs to be serialized to   JSON and separated by endline (\\n).      An example of raw input:      ```   {\"insert\": {\"table\": \"movies\", \"doc\": {\"plot\": \"A secret team goes to North Pole\", \"rating\": 9.5, \"language\": [2, 3], \"title\": \"This is an older movie\", \"lon\": 51.99, \"meta\": {\"keywords\":[\"travel\",\"ice\"],\"genre\":[\"adventure\"]}, \"year\": 1950, \"lat\": 60.4, \"advise\": \"PG-13\"}}}   \\n   {\"delete\": {\"table\": \"movies\",\"id\":700}}   ```      Responds with an object telling whenever any errors occured and an array with status for each operation:      ```   {     \'items\':     [       {         \'update\':{\'table\':\'products\',\'id\':1,\'result\':\'updated\'}       },       {         \'update\':{\'table\':\'products\',\'id\':2,\'result\':\'updated\'}       }     ],     \'errors\':false   }   ``` 

### Example


```typescript
const configuration = createConfiguration();
const apiInstance = new IndexApi(configuration);

const data = await apiInstance.bulk(body);
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

Delete one or several documents. The method has 2 ways of deleting: either by id, in case only one document is deleted or by using a  match query, in which case multiple documents can be delete . Example of input to delete by id:    ```   {\'table\':\'movies\',\'id\':100}   ```  Example of input to delete using a query:    ```   {     \'table\':\'movies\',     \'query\':     {       \'bool\':       {         \'must\':         [           {\'query_string\':\'new movie\'}         ]       }     }   }   ```  The match query has same syntax as in for searching. Responds with an object telling how many documents got deleted:     ```   {\'table\':\'products\',\'updated\':1}   ``` 

### Example


```typescript
const configuration = createConfiguration();
const apiInstance = new IndexApi(configuration);

const data = await apiInstance.delete(deleteDocumentRequest);
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

Insert a document.  Expects an object like:     ```   {     \'table\':\'movies\',     \'id\':701,     \'doc\':     {       \'title\':\'This is an old movie\',       \'plot\':\'A secret team goes to North Pole\',       \'year\':1950,       \'rating\':9.5,       \'lat\':60.4,       \'lon\':51.99,       \'advise\':\'PG-13\',       \'meta\':\'{\"keywords\":{\"travel\",\"ice\"},\"genre\":{\"adventure\"}}\',       \'language\':[2,3]     }   }   ```   The document id can also be missing, in which case an autogenerated one will be used:             ```   {     \'table\':\'movies\',     \'doc\':     {       \'title\':\'This is a new movie\',       \'plot\':\'A secret team goes to North Pole\',       \'year\':2020,       \'rating\':9.5,       \'lat\':60.4,       \'lon\':51.99,       \'advise\':\'PG-13\',       \'meta\':\'{\"keywords\":{\"travel\",\"ice\"},\"genre\":{\"adventure\"}}\',       \'language\':[2,3]     }   }   ```   It responds with an object in format:      ```   {\'table\':\'products\',\'id\':701,\'created\':true,\'result\':\'created\',\'status\':201}   ``` 

### Example


```typescript
const configuration = createConfiguration();
const apiInstance = new IndexApi(configuration);

const data = await apiInstance.insert(insertDocumentRequest);
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

Partially replaces a document with given id in a table Responds with an object of the following format:     ```   {\'table\':\'products\',\'updated\':1}   ``` 

### Example


```typescript
const configuration = createConfiguration();
const apiInstance = new IndexApi(configuration);

const data = await apiInstance.partialReplace(table, id, replaceDocumentRequest);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **replaceDocumentRequest** | **ReplaceDocumentRequest**|  |
 **table** | [**string**] | Name of the percolate table | defaults to undefined
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

Replace an existing document. Input has same format as `insert` operation. Responds with an object in format:    ```   {\'table\':\'products\',\'id\':1,\'created\':false,\'result\':\'updated\',\'status\':200}   ``` 

### Example


```typescript
const configuration = createConfiguration();
const apiInstance = new IndexApi(configuration);

const data = await apiInstance.replace(insertDocumentRequest);
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

Update one or several documents. The update can be made by passing the id or by using a match query in case multiple documents can be updated.  For example update a document using document id:    ```   {\'table\':\'movies\',\'doc\':{\'rating\':9.49},\'id\':100}   ```  And update by using a match query:    ```   {     \'table\':\'movies\',     \'doc\':{\'rating\':9.49},     \'query\':     {       \'bool\':       {         \'must\':         [           {\'query_string\':\'new movie\'}         ]       }     }   }   ```   The match query has same syntax as for searching. Responds with an object that tells how many documents where updated in format:     ```   {\'table\':\'products\',\'updated\':1}   ``` 

### Example


```typescript
const configuration = createConfiguration();
const apiInstance = new IndexApi(configuration);

const data = await apiInstance.update(updateDocumentRequest);
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


