import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'

import { AggComposite } from '../models/AggComposite';
import { AggCompositeSource } from '../models/AggCompositeSource';
import { AggCompositeTerm } from '../models/AggCompositeTerm';
import { AggDateHistogram } from '../models/AggDateHistogram';
import { AggHistogram } from '../models/AggHistogram';
import { AggTerms } from '../models/AggTerms';
import { Aggregation } from '../models/Aggregation';
import { AutocompleteRequest } from '../models/AutocompleteRequest';
import { BoolFilter } from '../models/BoolFilter';
import { BulkResponse } from '../models/BulkResponse';
import { DeleteDocumentRequest } from '../models/DeleteDocumentRequest';
import { DeleteResponse } from '../models/DeleteResponse';
import { ErrorResponse } from '../models/ErrorResponse';
import { FulltextFilter } from '../models/FulltextFilter';
import { GeoDistance } from '../models/GeoDistance';
import { GeoDistanceLocationAnchor } from '../models/GeoDistanceLocationAnchor';
import { Highlight } from '../models/Highlight';
import { HighlightFieldOption } from '../models/HighlightFieldOption';
import { HighlightFields } from '../models/HighlightFields';
import { HitsHits } from '../models/HitsHits';
import { InsertDocumentRequest } from '../models/InsertDocumentRequest';
import { Join } from '../models/Join';
import { JoinCond } from '../models/JoinCond';
import { JoinOn } from '../models/JoinOn';
import { Knn } from '../models/Knn';
import { KnnQuery } from '../models/KnnQuery';
import { Match } from '../models/Match';
import { MatchAll } from '../models/MatchAll';
import { PercolateRequest } from '../models/PercolateRequest';
import { PercolateRequestQuery } from '../models/PercolateRequestQuery';
import { QueryFilter } from '../models/QueryFilter';
import { Range } from '../models/Range';
import { ReplaceDocumentRequest } from '../models/ReplaceDocumentRequest';
import { ResponseError } from '../models/ResponseError';
import { ResponseErrorDetails } from '../models/ResponseErrorDetails';
import { SearchQuery } from '../models/SearchQuery';
import { SearchRequest } from '../models/SearchRequest';
import { SearchResponse } from '../models/SearchResponse';
import { SearchResponseHits } from '../models/SearchResponseHits';
import { SourceRules } from '../models/SourceRules';
import { SqlObjResponse } from '../models/SqlObjResponse';
import { SqlResponse } from '../models/SqlResponse';
import { SuccessResponse } from '../models/SuccessResponse';
import { UpdateDocumentRequest } from '../models/UpdateDocumentRequest';
import { UpdateResponse } from '../models/UpdateResponse';

import { ObservableIndexApi } from "./ObservableAPI";
import { IndexApiRequestFactory, IndexApiResponseProcessor} from "../apis/IndexApi";

export interface IndexApiBulkRequest {
    /**
     * 
     * @type string
     * @memberof IndexApibulk
     */
    body: string
}

export interface IndexApiDeleteRequest {
    /**
     * 
     * @type DeleteDocumentRequest
     * @memberof IndexApidelete
     */
    deleteDocumentRequest: DeleteDocumentRequest
}

export interface IndexApiInsertRequest {
    /**
     * 
     * @type InsertDocumentRequest
     * @memberof IndexApiinsert
     */
    insertDocumentRequest: InsertDocumentRequest
}

export interface IndexApiPartialReplaceRequest {
    /**
     * Name of the percolate table
     * Defaults to: undefined
     * @type string
     * @memberof IndexApipartialReplace
     */
    table: string
    /**
     * Id of the document to replace
     * Defaults to: undefined
     * @type number
     * @memberof IndexApipartialReplace
     */
    id: number
    /**
     * 
     * @type ReplaceDocumentRequest
     * @memberof IndexApipartialReplace
     */
    replaceDocumentRequest: ReplaceDocumentRequest
}

export interface IndexApiReplaceRequest {
    /**
     * 
     * @type InsertDocumentRequest
     * @memberof IndexApireplace
     */
    insertDocumentRequest: InsertDocumentRequest
}

export interface IndexApiUpdateRequest {
    /**
     * 
     * @type UpdateDocumentRequest
     * @memberof IndexApiupdate
     */
    updateDocumentRequest: UpdateDocumentRequest
}

export class ObjectIndexApi {
    private api: ObservableIndexApi

    public constructor(configuration: Configuration, requestFactory?: IndexApiRequestFactory, responseProcessor?: IndexApiResponseProcessor) {
        this.api = new ObservableIndexApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Sends multiple operatons like inserts, updates, replaces or deletes.  For each operation it\'s object must have same format as in their dedicated method.  The method expects a raw string as the batch in NDJSON.  Each operation object needs to be serialized to   JSON and separated by endline (\\n).      An example of raw input:      ```   {\"insert\": {\"table\": \"movies\", \"doc\": {\"plot\": \"A secret team goes to North Pole\", \"rating\": 9.5, \"language\": [2, 3], \"title\": \"This is an older movie\", \"lon\": 51.99, \"meta\": {\"keywords\":[\"travel\",\"ice\"],\"genre\":[\"adventure\"]}, \"year\": 1950, \"lat\": 60.4, \"advise\": \"PG-13\"}}}   \\n   {\"delete\": {\"table\": \"movies\",\"id\":700}}   ```      Responds with an object telling whenever any errors occured and an array with status for each operation:      ```   {     \'items\':     [       {         \'update\':{\'table\':\'products\',\'id\':1,\'result\':\'updated\'}       },       {         \'update\':{\'table\':\'products\',\'id\':2,\'result\':\'updated\'}       }     ],     \'errors\':false   }   ``` 
     * Bulk table operations
     * @param param the request object
     */
    public bulkWithHttpInfo(param: IndexApiBulkRequest, options?: Configuration): Promise<HttpInfo<BulkResponse>> {
        return this.api.bulkWithHttpInfo(param.body,  options).toPromise();
    }

    /**
     * Sends multiple operatons like inserts, updates, replaces or deletes.  For each operation it\'s object must have same format as in their dedicated method.  The method expects a raw string as the batch in NDJSON.  Each operation object needs to be serialized to   JSON and separated by endline (\\n).      An example of raw input:      ```   {\"insert\": {\"table\": \"movies\", \"doc\": {\"plot\": \"A secret team goes to North Pole\", \"rating\": 9.5, \"language\": [2, 3], \"title\": \"This is an older movie\", \"lon\": 51.99, \"meta\": {\"keywords\":[\"travel\",\"ice\"],\"genre\":[\"adventure\"]}, \"year\": 1950, \"lat\": 60.4, \"advise\": \"PG-13\"}}}   \\n   {\"delete\": {\"table\": \"movies\",\"id\":700}}   ```      Responds with an object telling whenever any errors occured and an array with status for each operation:      ```   {     \'items\':     [       {         \'update\':{\'table\':\'products\',\'id\':1,\'result\':\'updated\'}       },       {         \'update\':{\'table\':\'products\',\'id\':2,\'result\':\'updated\'}       }     ],     \'errors\':false   }   ``` 
     * Bulk table operations
     * @param param the request object
     */
    public bulk(param: IndexApiBulkRequest, options?: Configuration): Promise<BulkResponse> {
        return this.api.bulk(param.body,  options).toPromise();
    }

    /**
     * Delete one or several documents. The method has 2 ways of deleting: either by id, in case only one document is deleted or by using a  match query, in which case multiple documents can be delete . Example of input to delete by id:    ```   {\'table\':\'movies\',\'id\':100}   ```  Example of input to delete using a query:    ```   {     \'table\':\'movies\',     \'query\':     {       \'bool\':       {         \'must\':         [           {\'query_string\':\'new movie\'}         ]       }     }   }   ```  The match query has same syntax as in for searching. Responds with an object telling how many documents got deleted:     ```   {\'table\':\'products\',\'updated\':1}   ``` 
     * Delete a document in a table
     * @param param the request object
     */
    public deleteWithHttpInfo(param: IndexApiDeleteRequest, options?: Configuration): Promise<HttpInfo<DeleteResponse>> {
        return this.api.deleteWithHttpInfo(param.deleteDocumentRequest,  options).toPromise();
    }

    /**
     * Delete one or several documents. The method has 2 ways of deleting: either by id, in case only one document is deleted or by using a  match query, in which case multiple documents can be delete . Example of input to delete by id:    ```   {\'table\':\'movies\',\'id\':100}   ```  Example of input to delete using a query:    ```   {     \'table\':\'movies\',     \'query\':     {       \'bool\':       {         \'must\':         [           {\'query_string\':\'new movie\'}         ]       }     }   }   ```  The match query has same syntax as in for searching. Responds with an object telling how many documents got deleted:     ```   {\'table\':\'products\',\'updated\':1}   ``` 
     * Delete a document in a table
     * @param param the request object
     */
    public delete(param: IndexApiDeleteRequest, options?: Configuration): Promise<DeleteResponse> {
        return this.api.delete(param.deleteDocumentRequest,  options).toPromise();
    }

    /**
     * Insert a document.  Expects an object like:     ```   {     \'table\':\'movies\',     \'id\':701,     \'doc\':     {       \'title\':\'This is an old movie\',       \'plot\':\'A secret team goes to North Pole\',       \'year\':1950,       \'rating\':9.5,       \'lat\':60.4,       \'lon\':51.99,       \'advise\':\'PG-13\',       \'meta\':\'{\"keywords\":{\"travel\",\"ice\"},\"genre\":{\"adventure\"}}\',       \'language\':[2,3]     }   }   ```   The document id can also be missing, in which case an autogenerated one will be used:             ```   {     \'table\':\'movies\',     \'doc\':     {       \'title\':\'This is a new movie\',       \'plot\':\'A secret team goes to North Pole\',       \'year\':2020,       \'rating\':9.5,       \'lat\':60.4,       \'lon\':51.99,       \'advise\':\'PG-13\',       \'meta\':\'{\"keywords\":{\"travel\",\"ice\"},\"genre\":{\"adventure\"}}\',       \'language\':[2,3]     }   }   ```   It responds with an object in format:      ```   {\'table\':\'products\',\'id\':701,\'created\':true,\'result\':\'created\',\'status\':201}   ``` 
     * Create a new document in a table
     * @param param the request object
     */
    public insertWithHttpInfo(param: IndexApiInsertRequest, options?: Configuration): Promise<HttpInfo<SuccessResponse>> {
        return this.api.insertWithHttpInfo(param.insertDocumentRequest,  options).toPromise();
    }

    /**
     * Insert a document.  Expects an object like:     ```   {     \'table\':\'movies\',     \'id\':701,     \'doc\':     {       \'title\':\'This is an old movie\',       \'plot\':\'A secret team goes to North Pole\',       \'year\':1950,       \'rating\':9.5,       \'lat\':60.4,       \'lon\':51.99,       \'advise\':\'PG-13\',       \'meta\':\'{\"keywords\":{\"travel\",\"ice\"},\"genre\":{\"adventure\"}}\',       \'language\':[2,3]     }   }   ```   The document id can also be missing, in which case an autogenerated one will be used:             ```   {     \'table\':\'movies\',     \'doc\':     {       \'title\':\'This is a new movie\',       \'plot\':\'A secret team goes to North Pole\',       \'year\':2020,       \'rating\':9.5,       \'lat\':60.4,       \'lon\':51.99,       \'advise\':\'PG-13\',       \'meta\':\'{\"keywords\":{\"travel\",\"ice\"},\"genre\":{\"adventure\"}}\',       \'language\':[2,3]     }   }   ```   It responds with an object in format:      ```   {\'table\':\'products\',\'id\':701,\'created\':true,\'result\':\'created\',\'status\':201}   ``` 
     * Create a new document in a table
     * @param param the request object
     */
    public insert(param: IndexApiInsertRequest, options?: Configuration): Promise<SuccessResponse> {
        return this.api.insert(param.insertDocumentRequest,  options).toPromise();
    }

    /**
     * Partially replaces a document with given id in a table Responds with an object of the following format:     ```   {\'table\':\'products\',\'updated\':1}   ``` 
     * Partially replaces a document in a table
     * @param param the request object
     */
    public partialReplaceWithHttpInfo(param: IndexApiPartialReplaceRequest, options?: Configuration): Promise<HttpInfo<UpdateResponse>> {
        return this.api.partialReplaceWithHttpInfo(param.table, param.id, param.replaceDocumentRequest,  options).toPromise();
    }

    /**
     * Partially replaces a document with given id in a table Responds with an object of the following format:     ```   {\'table\':\'products\',\'updated\':1}   ``` 
     * Partially replaces a document in a table
     * @param param the request object
     */
    public partialReplace(param: IndexApiPartialReplaceRequest, options?: Configuration): Promise<UpdateResponse> {
        return this.api.partialReplace(param.table, param.id, param.replaceDocumentRequest,  options).toPromise();
    }

    /**
     * Replace an existing document. Input has same format as `insert` operation. Responds with an object in format:    ```   {\'table\':\'products\',\'id\':1,\'created\':false,\'result\':\'updated\',\'status\':200}   ``` 
     * Replace new document in a table
     * @param param the request object
     */
    public replaceWithHttpInfo(param: IndexApiReplaceRequest, options?: Configuration): Promise<HttpInfo<SuccessResponse>> {
        return this.api.replaceWithHttpInfo(param.insertDocumentRequest,  options).toPromise();
    }

    /**
     * Replace an existing document. Input has same format as `insert` operation. Responds with an object in format:    ```   {\'table\':\'products\',\'id\':1,\'created\':false,\'result\':\'updated\',\'status\':200}   ``` 
     * Replace new document in a table
     * @param param the request object
     */
    public replace(param: IndexApiReplaceRequest, options?: Configuration): Promise<SuccessResponse> {
        return this.api.replace(param.insertDocumentRequest,  options).toPromise();
    }

    /**
     * Update one or several documents. The update can be made by passing the id or by using a match query in case multiple documents can be updated.  For example update a document using document id:    ```   {\'table\':\'movies\',\'doc\':{\'rating\':9.49},\'id\':100}   ```  And update by using a match query:    ```   {     \'table\':\'movies\',     \'doc\':{\'rating\':9.49},     \'query\':     {       \'bool\':       {         \'must\':         [           {\'query_string\':\'new movie\'}         ]       }     }   }   ```   The match query has same syntax as for searching. Responds with an object that tells how many documents where updated in format:     ```   {\'table\':\'products\',\'updated\':1}   ``` 
     * Update a document in a table
     * @param param the request object
     */
    public updateWithHttpInfo(param: IndexApiUpdateRequest, options?: Configuration): Promise<HttpInfo<UpdateResponse>> {
        return this.api.updateWithHttpInfo(param.updateDocumentRequest,  options).toPromise();
    }

    /**
     * Update one or several documents. The update can be made by passing the id or by using a match query in case multiple documents can be updated.  For example update a document using document id:    ```   {\'table\':\'movies\',\'doc\':{\'rating\':9.49},\'id\':100}   ```  And update by using a match query:    ```   {     \'table\':\'movies\',     \'doc\':{\'rating\':9.49},     \'query\':     {       \'bool\':       {         \'must\':         [           {\'query_string\':\'new movie\'}         ]       }     }   }   ```   The match query has same syntax as for searching. Responds with an object that tells how many documents where updated in format:     ```   {\'table\':\'products\',\'updated\':1}   ``` 
     * Update a document in a table
     * @param param the request object
     */
    public update(param: IndexApiUpdateRequest, options?: Configuration): Promise<UpdateResponse> {
        return this.api.update(param.updateDocumentRequest,  options).toPromise();
    }

}

import { ObservableSearchApi } from "./ObservableAPI";
import { SearchApiRequestFactory, SearchApiResponseProcessor} from "../apis/SearchApi";

export interface SearchApiAutocompleteRequest {
    /**
     * 
     * @type AutocompleteRequest
     * @memberof SearchApiautocomplete
     */
    autocompleteRequest: AutocompleteRequest
}

export interface SearchApiPercolateRequest {
    /**
     * Name of the percolate table
     * Defaults to: undefined
     * @type string
     * @memberof SearchApipercolate
     */
    table: string
    /**
     * 
     * @type PercolateRequest
     * @memberof SearchApipercolate
     */
    percolateRequest: PercolateRequest
}

export interface SearchApiSearchRequest {
    /**
     * 
     * @type SearchRequest
     * @memberof SearchApisearch
     */
    searchRequest: SearchRequest
}

export class ObjectSearchApi {
    private api: ObservableSearchApi

    public constructor(configuration: Configuration, requestFactory?: SearchApiRequestFactory, responseProcessor?: SearchApiResponseProcessor) {
        this.api = new ObservableSearchApi(configuration, requestFactory, responseProcessor);
    }

    /**
     *  The method expects an object with the following mandatory properties: * the name of the table to search * the query string to autocomplete For details, see the documentation on [**Autocomplete**](Autocomplete.md) An example: ``` {   \"table\":\"table_name\",   \"query\":\"query_beginning\" }         ``` An example of the method\'s response:   ```  [    {      \"total\": 3,      \"error\": \"\",      \"warning\": \"\",      \"columns\": [        {          \"query\": {            \"type\": \"string\"          }        }      ],      \"data\": [        {          \"query\": \"hello\"        },        {          \"query\": \"helio\"        },        {          \"query\": \"hell\"        }      ]    }  ]   ```  For more detailed information about the autocomplete queries, please refer to the documentation [here](https://manual.manticoresearch.com/Searching/Autocomplete). 
     * Performs an autocomplete search on a table
     * @param param the request object
     */
    public autocompleteWithHttpInfo(param: SearchApiAutocompleteRequest, options?: Configuration): Promise<HttpInfo<Array<any>>> {
        return this.api.autocompleteWithHttpInfo(param.autocompleteRequest,  options).toPromise();
    }

    /**
     *  The method expects an object with the following mandatory properties: * the name of the table to search * the query string to autocomplete For details, see the documentation on [**Autocomplete**](Autocomplete.md) An example: ``` {   \"table\":\"table_name\",   \"query\":\"query_beginning\" }         ``` An example of the method\'s response:   ```  [    {      \"total\": 3,      \"error\": \"\",      \"warning\": \"\",      \"columns\": [        {          \"query\": {            \"type\": \"string\"          }        }      ],      \"data\": [        {          \"query\": \"hello\"        },        {          \"query\": \"helio\"        },        {          \"query\": \"hell\"        }      ]    }  ]   ```  For more detailed information about the autocomplete queries, please refer to the documentation [here](https://manual.manticoresearch.com/Searching/Autocomplete). 
     * Performs an autocomplete search on a table
     * @param param the request object
     */
    public autocomplete(param: SearchApiAutocompleteRequest, options?: Configuration): Promise<Array<any>> {
        return this.api.autocomplete(param.autocompleteRequest,  options).toPromise();
    }

    /**
     * Performs a percolate search. This method must be used only on percolate tables. Expects two parameters: the table name and an object with array of documents to be tested. An example of the documents object: ```   {     \"query\" {       \"percolate\": {         \"document\": {           \"content\":\"sample content\"         }       }     }   } ``` Responds with an object with matched stored queries:  ```   {     \'timed_out\':false,     \'hits\': {       \'total\':2,       \'max_score\':1,       \'hits\': [         {           \'table\':\'idx_pq_1\',           \'_type\':\'doc\',           \'_id\':\'2\',           \'_score\':\'1\',           \'_source\': {             \'query\': {               \'match\':{\'title\':\'some\'}             }           }         },         {           \'table\':\'idx_pq_1\',           \'_type\':\'doc\',           \'_id\':\'5\',           \'_score\':\'1\',           \'_source\': {             \'query\': {               \'ql\':\'some | none\'             }           }         }       ]     }   } ``` 
     * Perform reverse search on a percolate table
     * @param param the request object
     */
    public percolateWithHttpInfo(param: SearchApiPercolateRequest, options?: Configuration): Promise<HttpInfo<SearchResponse>> {
        return this.api.percolateWithHttpInfo(param.table, param.percolateRequest,  options).toPromise();
    }

    /**
     * Performs a percolate search. This method must be used only on percolate tables. Expects two parameters: the table name and an object with array of documents to be tested. An example of the documents object: ```   {     \"query\" {       \"percolate\": {         \"document\": {           \"content\":\"sample content\"         }       }     }   } ``` Responds with an object with matched stored queries:  ```   {     \'timed_out\':false,     \'hits\': {       \'total\':2,       \'max_score\':1,       \'hits\': [         {           \'table\':\'idx_pq_1\',           \'_type\':\'doc\',           \'_id\':\'2\',           \'_score\':\'1\',           \'_source\': {             \'query\': {               \'match\':{\'title\':\'some\'}             }           }         },         {           \'table\':\'idx_pq_1\',           \'_type\':\'doc\',           \'_id\':\'5\',           \'_score\':\'1\',           \'_source\': {             \'query\': {               \'ql\':\'some | none\'             }           }         }       ]     }   } ``` 
     * Perform reverse search on a percolate table
     * @param param the request object
     */
    public percolate(param: SearchApiPercolateRequest, options?: Configuration): Promise<SearchResponse> {
        return this.api.percolate(param.table, param.percolateRequest,  options).toPromise();
    }

    /**
     *  The method expects an object with the following mandatory properties: * the name of the table to search * the match query object For details, see the documentation on [**SearchRequest**](SearchRequest.md) The method returns an object with the following properties: - took: the time taken to execute the search query. - timed_out: a boolean indicating whether the query timed out. - hits: an object with the following properties:    - total: the total number of hits found.    - hits: an array of hit objects, where each hit object represents a matched document. Each hit object has the following properties:      - _id: the ID of the matched document.      - _score: the score of the matched document.      - _source: the source data of the matched document.  In addition, if profiling is enabled, the response will include an additional array with profiling information attached. Also, if pagination is enabled, the response will include an additional \'scroll\' property with a scroll token to use for pagination Here is an example search response:    ```   {     \'took\':10,     \'timed_out\':false,     \'hits\':     {       \'total\':2,       \'hits\':       [         {\'_id\':\'1\',\'_score\':1,\'_source\':{\'gid\':11}},         {\'_id\':\'2\',\'_score\':1,\'_source\':{\'gid\':12}}       ]     }   }   ```  For more information about the match query syntax and additional parameters that can be added to request and response, please see the documentation [here](https://manual.manticoresearch.com/Searching/Full_text_matching/Basic_usage#HTTP-JSON). 
     * Performs a search on a table
     * @param param the request object
     */
    public searchWithHttpInfo(param: SearchApiSearchRequest, options?: Configuration): Promise<HttpInfo<SearchResponse>> {
        return this.api.searchWithHttpInfo(param.searchRequest,  options).toPromise();
    }

    /**
     *  The method expects an object with the following mandatory properties: * the name of the table to search * the match query object For details, see the documentation on [**SearchRequest**](SearchRequest.md) The method returns an object with the following properties: - took: the time taken to execute the search query. - timed_out: a boolean indicating whether the query timed out. - hits: an object with the following properties:    - total: the total number of hits found.    - hits: an array of hit objects, where each hit object represents a matched document. Each hit object has the following properties:      - _id: the ID of the matched document.      - _score: the score of the matched document.      - _source: the source data of the matched document.  In addition, if profiling is enabled, the response will include an additional array with profiling information attached. Also, if pagination is enabled, the response will include an additional \'scroll\' property with a scroll token to use for pagination Here is an example search response:    ```   {     \'took\':10,     \'timed_out\':false,     \'hits\':     {       \'total\':2,       \'hits\':       [         {\'_id\':\'1\',\'_score\':1,\'_source\':{\'gid\':11}},         {\'_id\':\'2\',\'_score\':1,\'_source\':{\'gid\':12}}       ]     }   }   ```  For more information about the match query syntax and additional parameters that can be added to request and response, please see the documentation [here](https://manual.manticoresearch.com/Searching/Full_text_matching/Basic_usage#HTTP-JSON). 
     * Performs a search on a table
     * @param param the request object
     */
    public search(param: SearchApiSearchRequest, options?: Configuration): Promise<SearchResponse> {
        return this.api.search(param.searchRequest,  options).toPromise();
    }

}

import { ObservableUtilsApi } from "./ObservableAPI";
import { UtilsApiRequestFactory, UtilsApiResponseProcessor} from "../apis/UtilsApi";

export interface UtilsApiSqlRequest {
    /**
     * A query parameter string. 
     * @type string
     * @memberof UtilsApisql
     */
    body: string
    /**
     * Optional parameter, defines a format of response. Can be set to &#x60;False&#x60; for Select only queries and set to &#x60;True&#x60; for any type of queries. Default value is \&#39;True\&#39;. 
     * Defaults to: true
     * @type boolean
     * @memberof UtilsApisql
     */
    rawResponse?: boolean
}

export class ObjectUtilsApi {
    private api: ObservableUtilsApi

    public constructor(configuration: Configuration, requestFactory?: UtilsApiRequestFactory, responseProcessor?: UtilsApiResponseProcessor) {
        this.api = new ObservableUtilsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Run a query in SQL format. Expects a query string passed through `body` parameter and optional `raw_response` parameter that defines a format of response. `raw_response` can be set to `False` for Select queries only, e.g., `SELECT * FROM mytable` The query string must stay as it is, no URL encoding is needed. The response object depends on the query executed. In select mode the response has same format as `/search` operation. 
     * Perform SQL requests
     * @param param the request object
     */
    public sqlWithHttpInfo(param: UtilsApiSqlRequest, options?: Configuration): Promise<HttpInfo<SqlResponse>> {
        return this.api.sqlWithHttpInfo(param.body, param.rawResponse,  options).toPromise();
    }

    /**
     * Run a query in SQL format. Expects a query string passed through `body` parameter and optional `raw_response` parameter that defines a format of response. `raw_response` can be set to `False` for Select queries only, e.g., `SELECT * FROM mytable` The query string must stay as it is, no URL encoding is needed. The response object depends on the query executed. In select mode the response has same format as `/search` operation. 
     * Perform SQL requests
     * @param param the request object
     */
    public sql(param: UtilsApiSqlRequest, options?: Configuration): Promise<SqlResponse> {
        return this.api.sql(param.body, param.rawResponse,  options).toPromise();
    }

}
