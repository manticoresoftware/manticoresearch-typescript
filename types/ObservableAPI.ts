import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
import { AggComposite } from '../models/AggComposite';
import { AggCompositeSource } from '../models/AggCompositeSource';
import { AggCompositeTerm } from '../models/AggCompositeTerm';
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
import { HitsHits } from '../models/HitsHits';
import { InsertDocumentRequest } from '../models/InsertDocumentRequest';
import { Join } from '../models/Join';
import { JoinCond } from '../models/JoinCond';
import { JoinOn } from '../models/JoinOn';
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

import { IndexApiRequestFactory, IndexApiResponseProcessor} from "../apis/IndexApi";
export class ObservableIndexApi {
    private requestFactory: IndexApiRequestFactory;
    private responseProcessor: IndexApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: IndexApiRequestFactory,
        responseProcessor?: IndexApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new IndexApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new IndexApiResponseProcessor();
    }

    /**
     * Sends multiple operatons like inserts, updates, replaces or deletes.  For each operation it\'s object must have same format as in their dedicated method.  The method expects a raw string as the batch in NDJSON.  Each operation object needs to be serialized to   JSON and separated by endline (\\n).      An example of raw input:      ```   {\"insert\": {\"table\": \"movies\", \"doc\": {\"plot\": \"A secret team goes to North Pole\", \"rating\": 9.5, \"language\": [2, 3], \"title\": \"This is an older movie\", \"lon\": 51.99, \"meta\": {\"keywords\":[\"travel\",\"ice\"],\"genre\":[\"adventure\"]}, \"year\": 1950, \"lat\": 60.4, \"advise\": \"PG-13\"}}}   \\n   {\"delete\": {\"table\": \"movies\",\"id\":700}}   ```      Responds with an object telling whenever any errors occured and an array with status for each operation:      ```   {     \'items\':     [       {         \'update\':{\'table\':\'products\',\'id\':1,\'result\':\'updated\'}       },       {         \'update\':{\'table\':\'products\',\'id\':2,\'result\':\'updated\'}       }     ],     \'errors\':false   }   ``` 
     * Bulk table operations
     * @param body
     */
    public bulkWithHttpInfo(body: string, _options?: Configuration): Observable<HttpInfo<BulkResponse>> {
        const requestContextPromise = this.requestFactory.bulk(body, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.bulkWithHttpInfo(rsp)));
            }));
    }

    /**
     * Sends multiple operatons like inserts, updates, replaces or deletes.  For each operation it\'s object must have same format as in their dedicated method.  The method expects a raw string as the batch in NDJSON.  Each operation object needs to be serialized to   JSON and separated by endline (\\n).      An example of raw input:      ```   {\"insert\": {\"table\": \"movies\", \"doc\": {\"plot\": \"A secret team goes to North Pole\", \"rating\": 9.5, \"language\": [2, 3], \"title\": \"This is an older movie\", \"lon\": 51.99, \"meta\": {\"keywords\":[\"travel\",\"ice\"],\"genre\":[\"adventure\"]}, \"year\": 1950, \"lat\": 60.4, \"advise\": \"PG-13\"}}}   \\n   {\"delete\": {\"table\": \"movies\",\"id\":700}}   ```      Responds with an object telling whenever any errors occured and an array with status for each operation:      ```   {     \'items\':     [       {         \'update\':{\'table\':\'products\',\'id\':1,\'result\':\'updated\'}       },       {         \'update\':{\'table\':\'products\',\'id\':2,\'result\':\'updated\'}       }     ],     \'errors\':false   }   ``` 
     * Bulk table operations
     * @param body
     */
    public bulk(body: string, _options?: Configuration): Observable<BulkResponse> {
        return this.bulkWithHttpInfo(body, _options).pipe(map((apiResponse: HttpInfo<BulkResponse>) => apiResponse.data));
    }

    /**
     * Delete one or several documents. The method has 2 ways of deleting: either by id, in case only one document is deleted or by using a  match query, in which case multiple documents can be delete . Example of input to delete by id:    ```   {\'table\':\'movies\',\'id\':100}   ```  Example of input to delete using a query:    ```   {     \'table\':\'movies\',     \'query\':     {       \'bool\':       {         \'must\':         [           {\'query_string\':\'new movie\'}         ]       }     }   }   ```  The match query has same syntax as in for searching. Responds with an object telling how many documents got deleted:     ```   {\'table\':\'products\',\'updated\':1}   ``` 
     * Delete a document in a table
     * @param deleteDocumentRequest
     */
    public deleteWithHttpInfo(deleteDocumentRequest: DeleteDocumentRequest, _options?: Configuration): Observable<HttpInfo<DeleteResponse>> {
        const requestContextPromise = this.requestFactory.delete(deleteDocumentRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deleteWithHttpInfo(rsp)));
            }));
    }

    /**
     * Delete one or several documents. The method has 2 ways of deleting: either by id, in case only one document is deleted or by using a  match query, in which case multiple documents can be delete . Example of input to delete by id:    ```   {\'table\':\'movies\',\'id\':100}   ```  Example of input to delete using a query:    ```   {     \'table\':\'movies\',     \'query\':     {       \'bool\':       {         \'must\':         [           {\'query_string\':\'new movie\'}         ]       }     }   }   ```  The match query has same syntax as in for searching. Responds with an object telling how many documents got deleted:     ```   {\'table\':\'products\',\'updated\':1}   ``` 
     * Delete a document in a table
     * @param deleteDocumentRequest
     */
    public delete(deleteDocumentRequest: DeleteDocumentRequest, _options?: Configuration): Observable<DeleteResponse> {
        return this.deleteWithHttpInfo(deleteDocumentRequest, _options).pipe(map((apiResponse: HttpInfo<DeleteResponse>) => apiResponse.data));
    }

    /**
     * Insert a document.  Expects an object like:     ```   {     \'table\':\'movies\',     \'id\':701,     \'doc\':     {       \'title\':\'This is an old movie\',       \'plot\':\'A secret team goes to North Pole\',       \'year\':1950,       \'rating\':9.5,       \'lat\':60.4,       \'lon\':51.99,       \'advise\':\'PG-13\',       \'meta\':\'{\"keywords\":{\"travel\",\"ice\"},\"genre\":{\"adventure\"}}\',       \'language\':[2,3]     }   }   ```   The document id can also be missing, in which case an autogenerated one will be used:             ```   {     \'table\':\'movies\',     \'doc\':     {       \'title\':\'This is a new movie\',       \'plot\':\'A secret team goes to North Pole\',       \'year\':2020,       \'rating\':9.5,       \'lat\':60.4,       \'lon\':51.99,       \'advise\':\'PG-13\',       \'meta\':\'{\"keywords\":{\"travel\",\"ice\"},\"genre\":{\"adventure\"}}\',       \'language\':[2,3]     }   }   ```   It responds with an object in format:      ```   {\'table\':\'products\',\'id\':701,\'created\':true,\'result\':\'created\',\'status\':201}   ``` 
     * Create a new document in a table
     * @param insertDocumentRequest
     */
    public insertWithHttpInfo(insertDocumentRequest: InsertDocumentRequest, _options?: Configuration): Observable<HttpInfo<SuccessResponse>> {
        const requestContextPromise = this.requestFactory.insert(insertDocumentRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.insertWithHttpInfo(rsp)));
            }));
    }

    /**
     * Insert a document.  Expects an object like:     ```   {     \'table\':\'movies\',     \'id\':701,     \'doc\':     {       \'title\':\'This is an old movie\',       \'plot\':\'A secret team goes to North Pole\',       \'year\':1950,       \'rating\':9.5,       \'lat\':60.4,       \'lon\':51.99,       \'advise\':\'PG-13\',       \'meta\':\'{\"keywords\":{\"travel\",\"ice\"},\"genre\":{\"adventure\"}}\',       \'language\':[2,3]     }   }   ```   The document id can also be missing, in which case an autogenerated one will be used:             ```   {     \'table\':\'movies\',     \'doc\':     {       \'title\':\'This is a new movie\',       \'plot\':\'A secret team goes to North Pole\',       \'year\':2020,       \'rating\':9.5,       \'lat\':60.4,       \'lon\':51.99,       \'advise\':\'PG-13\',       \'meta\':\'{\"keywords\":{\"travel\",\"ice\"},\"genre\":{\"adventure\"}}\',       \'language\':[2,3]     }   }   ```   It responds with an object in format:      ```   {\'table\':\'products\',\'id\':701,\'created\':true,\'result\':\'created\',\'status\':201}   ``` 
     * Create a new document in a table
     * @param insertDocumentRequest
     */
    public insert(insertDocumentRequest: InsertDocumentRequest, _options?: Configuration): Observable<SuccessResponse> {
        return this.insertWithHttpInfo(insertDocumentRequest, _options).pipe(map((apiResponse: HttpInfo<SuccessResponse>) => apiResponse.data));
    }

    /**
     * Partially replaces a document with given id in a table Responds with an object of the following format:     ```   {\'table\':\'products\',\'updated\':1}   ``` 
     * Partially replaces a document in a table
     * @param table Name of the percolate table
     * @param id Id of the document to replace
     * @param replaceDocumentRequest
     */
    public partialReplaceWithHttpInfo(table: string, id: number, replaceDocumentRequest: ReplaceDocumentRequest, _options?: Configuration): Observable<HttpInfo<UpdateResponse>> {
        const requestContextPromise = this.requestFactory.partialReplace(table, id, replaceDocumentRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.partialReplaceWithHttpInfo(rsp)));
            }));
    }

    /**
     * Partially replaces a document with given id in a table Responds with an object of the following format:     ```   {\'table\':\'products\',\'updated\':1}   ``` 
     * Partially replaces a document in a table
     * @param table Name of the percolate table
     * @param id Id of the document to replace
     * @param replaceDocumentRequest
     */
    public partialReplace(table: string, id: number, replaceDocumentRequest: ReplaceDocumentRequest, _options?: Configuration): Observable<UpdateResponse> {
        return this.partialReplaceWithHttpInfo(table, id, replaceDocumentRequest, _options).pipe(map((apiResponse: HttpInfo<UpdateResponse>) => apiResponse.data));
    }

    /**
     * Replace an existing document. Input has same format as `insert` operation. Responds with an object in format:    ```   {\'table\':\'products\',\'id\':1,\'created\':false,\'result\':\'updated\',\'status\':200}   ``` 
     * Replace new document in a table
     * @param insertDocumentRequest
     */
    public replaceWithHttpInfo(insertDocumentRequest: InsertDocumentRequest, _options?: Configuration): Observable<HttpInfo<SuccessResponse>> {
        const requestContextPromise = this.requestFactory.replace(insertDocumentRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.replaceWithHttpInfo(rsp)));
            }));
    }

    /**
     * Replace an existing document. Input has same format as `insert` operation. Responds with an object in format:    ```   {\'table\':\'products\',\'id\':1,\'created\':false,\'result\':\'updated\',\'status\':200}   ``` 
     * Replace new document in a table
     * @param insertDocumentRequest
     */
    public replace(insertDocumentRequest: InsertDocumentRequest, _options?: Configuration): Observable<SuccessResponse> {
        return this.replaceWithHttpInfo(insertDocumentRequest, _options).pipe(map((apiResponse: HttpInfo<SuccessResponse>) => apiResponse.data));
    }

    /**
     * Update one or several documents. The update can be made by passing the id or by using a match query in case multiple documents can be updated.  For example update a document using document id:    ```   {\'table\':\'movies\',\'doc\':{\'rating\':9.49},\'id\':100}   ```  And update by using a match query:    ```   {     \'table\':\'movies\',     \'doc\':{\'rating\':9.49},     \'query\':     {       \'bool\':       {         \'must\':         [           {\'query_string\':\'new movie\'}         ]       }     }   }   ```   The match query has same syntax as for searching. Responds with an object that tells how many documents where updated in format:     ```   {\'table\':\'products\',\'updated\':1}   ``` 
     * Update a document in a table
     * @param updateDocumentRequest
     */
    public updateWithHttpInfo(updateDocumentRequest: UpdateDocumentRequest, _options?: Configuration): Observable<HttpInfo<UpdateResponse>> {
        const requestContextPromise = this.requestFactory.update(updateDocumentRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.updateWithHttpInfo(rsp)));
            }));
    }

    /**
     * Update one or several documents. The update can be made by passing the id or by using a match query in case multiple documents can be updated.  For example update a document using document id:    ```   {\'table\':\'movies\',\'doc\':{\'rating\':9.49},\'id\':100}   ```  And update by using a match query:    ```   {     \'table\':\'movies\',     \'doc\':{\'rating\':9.49},     \'query\':     {       \'bool\':       {         \'must\':         [           {\'query_string\':\'new movie\'}         ]       }     }   }   ```   The match query has same syntax as for searching. Responds with an object that tells how many documents where updated in format:     ```   {\'table\':\'products\',\'updated\':1}   ``` 
     * Update a document in a table
     * @param updateDocumentRequest
     */
    public update(updateDocumentRequest: UpdateDocumentRequest, _options?: Configuration): Observable<UpdateResponse> {
        return this.updateWithHttpInfo(updateDocumentRequest, _options).pipe(map((apiResponse: HttpInfo<UpdateResponse>) => apiResponse.data));
    }

}

import { SearchApiRequestFactory, SearchApiResponseProcessor} from "../apis/SearchApi";
export class ObservableSearchApi {
    private requestFactory: SearchApiRequestFactory;
    private responseProcessor: SearchApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: SearchApiRequestFactory,
        responseProcessor?: SearchApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new SearchApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new SearchApiResponseProcessor();
    }

    /**
     *  The method expects an object with the following mandatory properties: * the name of the table to search * the query string to autocomplete For details, see the documentation on [**Autocomplete**](Autocomplete.md) An example: ``` {   \"table\":\"table_name\",   \"query\":\"query_beginning\" }         ``` An example of the method\'s response:   ```  [    {      \"total\": 3,      \"error\": \"\",      \"warning\": \"\",      \"columns\": [        {          \"query\": {            \"type\": \"string\"          }        }      ],      \"data\": [        {          \"query\": \"hello\"        },        {          \"query\": \"helio\"        },        {          \"query\": \"hell\"        }      ]    }  ]   ```  For more detailed information about the autocomplete queries, please refer to the documentation [here](https://manual.manticoresearch.com/Searching/Autocomplete). 
     * Performs an autocomplete search on a table
     * @param autocompleteRequest
     */
    public autocompleteWithHttpInfo(autocompleteRequest: AutocompleteRequest, _options?: Configuration): Observable<HttpInfo<Array<any>>> {
        const requestContextPromise = this.requestFactory.autocomplete(autocompleteRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.autocompleteWithHttpInfo(rsp)));
            }));
    }

    /**
     *  The method expects an object with the following mandatory properties: * the name of the table to search * the query string to autocomplete For details, see the documentation on [**Autocomplete**](Autocomplete.md) An example: ``` {   \"table\":\"table_name\",   \"query\":\"query_beginning\" }         ``` An example of the method\'s response:   ```  [    {      \"total\": 3,      \"error\": \"\",      \"warning\": \"\",      \"columns\": [        {          \"query\": {            \"type\": \"string\"          }        }      ],      \"data\": [        {          \"query\": \"hello\"        },        {          \"query\": \"helio\"        },        {          \"query\": \"hell\"        }      ]    }  ]   ```  For more detailed information about the autocomplete queries, please refer to the documentation [here](https://manual.manticoresearch.com/Searching/Autocomplete). 
     * Performs an autocomplete search on a table
     * @param autocompleteRequest
     */
    public autocomplete(autocompleteRequest: AutocompleteRequest, _options?: Configuration): Observable<Array<any>> {
        return this.autocompleteWithHttpInfo(autocompleteRequest, _options).pipe(map((apiResponse: HttpInfo<Array<any>>) => apiResponse.data));
    }

    /**
     * Performs a percolate search. This method must be used only on percolate tables. Expects two parameters: the table name and an object with array of documents to be tested. An example of the documents object: ```   {     \"query\" {       \"percolate\": {         \"document\": {           \"content\":\"sample content\"         }       }     }   } ``` Responds with an object with matched stored queries:  ```   {     \'timed_out\':false,     \'hits\': {       \'total\':2,       \'max_score\':1,       \'hits\': [         {           \'table\':\'idx_pq_1\',           \'_type\':\'doc\',           \'_id\':\'2\',           \'_score\':\'1\',           \'_source\': {             \'query\': {               \'match\':{\'title\':\'some\'}             }           }         },         {           \'table\':\'idx_pq_1\',           \'_type\':\'doc\',           \'_id\':\'5\',           \'_score\':\'1\',           \'_source\': {             \'query\': {               \'ql\':\'some | none\'             }           }         }       ]     }   } ``` 
     * Perform reverse search on a percolate table
     * @param table Name of the percolate table
     * @param percolateRequest
     */
    public percolateWithHttpInfo(table: string, percolateRequest: PercolateRequest, _options?: Configuration): Observable<HttpInfo<SearchResponse>> {
        const requestContextPromise = this.requestFactory.percolate(table, percolateRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.percolateWithHttpInfo(rsp)));
            }));
    }

    /**
     * Performs a percolate search. This method must be used only on percolate tables. Expects two parameters: the table name and an object with array of documents to be tested. An example of the documents object: ```   {     \"query\" {       \"percolate\": {         \"document\": {           \"content\":\"sample content\"         }       }     }   } ``` Responds with an object with matched stored queries:  ```   {     \'timed_out\':false,     \'hits\': {       \'total\':2,       \'max_score\':1,       \'hits\': [         {           \'table\':\'idx_pq_1\',           \'_type\':\'doc\',           \'_id\':\'2\',           \'_score\':\'1\',           \'_source\': {             \'query\': {               \'match\':{\'title\':\'some\'}             }           }         },         {           \'table\':\'idx_pq_1\',           \'_type\':\'doc\',           \'_id\':\'5\',           \'_score\':\'1\',           \'_source\': {             \'query\': {               \'ql\':\'some | none\'             }           }         }       ]     }   } ``` 
     * Perform reverse search on a percolate table
     * @param table Name of the percolate table
     * @param percolateRequest
     */
    public percolate(table: string, percolateRequest: PercolateRequest, _options?: Configuration): Observable<SearchResponse> {
        return this.percolateWithHttpInfo(table, percolateRequest, _options).pipe(map((apiResponse: HttpInfo<SearchResponse>) => apiResponse.data));
    }

    /**
     *  The method expects an object with the following mandatory properties: * the name of the table to search * the match query object For details, see the documentation on [**SearchRequest**](SearchRequest.md) The method returns an object with the following properties: - took: the time taken to execute the search query. - timed_out: a boolean indicating whether the query timed out. - hits: an object with the following properties:    - total: the total number of hits found.    - hits: an array of hit objects, where each hit object represents a matched document. Each hit object has the following properties:      - _id: the ID of the matched document.      - _score: the score of the matched document.      - _source: the source data of the matched document.  In addition, if profiling is enabled, the response will include an additional array with profiling information attached. Also, if pagination is enabled, the response will include an additional \'scroll\' property with a scroll token to use for pagination Here is an example search response:    ```   {     \'took\':10,     \'timed_out\':false,     \'hits\':     {       \'total\':2,       \'hits\':       [         {\'_id\':\'1\',\'_score\':1,\'_source\':{\'gid\':11}},         {\'_id\':\'2\',\'_score\':1,\'_source\':{\'gid\':12}}       ]     }   }   ```  For more information about the match query syntax and additional parameters that can be added to request and response, please see the documentation [here](https://manual.manticoresearch.com/Searching/Full_text_matching/Basic_usage#HTTP-JSON). 
     * Performs a search on a table
     * @param searchRequest
     */
    public searchWithHttpInfo(searchRequest: SearchRequest, _options?: Configuration): Observable<HttpInfo<SearchResponse>> {
        const requestContextPromise = this.requestFactory.search(searchRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.searchWithHttpInfo(rsp)));
            }));
    }

    /**
     *  The method expects an object with the following mandatory properties: * the name of the table to search * the match query object For details, see the documentation on [**SearchRequest**](SearchRequest.md) The method returns an object with the following properties: - took: the time taken to execute the search query. - timed_out: a boolean indicating whether the query timed out. - hits: an object with the following properties:    - total: the total number of hits found.    - hits: an array of hit objects, where each hit object represents a matched document. Each hit object has the following properties:      - _id: the ID of the matched document.      - _score: the score of the matched document.      - _source: the source data of the matched document.  In addition, if profiling is enabled, the response will include an additional array with profiling information attached. Also, if pagination is enabled, the response will include an additional \'scroll\' property with a scroll token to use for pagination Here is an example search response:    ```   {     \'took\':10,     \'timed_out\':false,     \'hits\':     {       \'total\':2,       \'hits\':       [         {\'_id\':\'1\',\'_score\':1,\'_source\':{\'gid\':11}},         {\'_id\':\'2\',\'_score\':1,\'_source\':{\'gid\':12}}       ]     }   }   ```  For more information about the match query syntax and additional parameters that can be added to request and response, please see the documentation [here](https://manual.manticoresearch.com/Searching/Full_text_matching/Basic_usage#HTTP-JSON). 
     * Performs a search on a table
     * @param searchRequest
     */
    public search(searchRequest: SearchRequest, _options?: Configuration): Observable<SearchResponse> {
        return this.searchWithHttpInfo(searchRequest, _options).pipe(map((apiResponse: HttpInfo<SearchResponse>) => apiResponse.data));
    }

}

import { UtilsApiRequestFactory, UtilsApiResponseProcessor} from "../apis/UtilsApi";
export class ObservableUtilsApi {
    private requestFactory: UtilsApiRequestFactory;
    private responseProcessor: UtilsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: UtilsApiRequestFactory,
        responseProcessor?: UtilsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new UtilsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new UtilsApiResponseProcessor();
    }

    /**
     * Run a query in SQL format. Expects a query string passed through `body` parameter and optional `raw_response` parameter that defines a format of response. `raw_response` can be set to `False` for Select queries only, e.g., `SELECT * FROM mytable` The query string must stay as it is, no URL encoding is needed. The response object depends on the query executed. In select mode the response has same format as `/search` operation. 
     * Perform SQL requests
     * @param body A query parameter string. 
     * @param [rawResponse] Optional parameter, defines a format of response. Can be set to &#x60;False&#x60; for Select only queries and set to &#x60;True&#x60; for any type of queries. Default value is \&#39;True\&#39;. 
     */
    public sqlWithHttpInfo(body: string, rawResponse?: boolean, _options?: Configuration): Observable<HttpInfo<SqlResponse>> {
        const requestContextPromise = this.requestFactory.sql(body, rawResponse, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.sqlWithHttpInfo(rsp)));
            }));
    }

    /**
     * Run a query in SQL format. Expects a query string passed through `body` parameter and optional `raw_response` parameter that defines a format of response. `raw_response` can be set to `False` for Select queries only, e.g., `SELECT * FROM mytable` The query string must stay as it is, no URL encoding is needed. The response object depends on the query executed. In select mode the response has same format as `/search` operation. 
     * Perform SQL requests
     * @param body A query parameter string. 
     * @param [rawResponse] Optional parameter, defines a format of response. Can be set to &#x60;False&#x60; for Select only queries and set to &#x60;True&#x60; for any type of queries. Default value is \&#39;True\&#39;. 
     */
    public sql(body: string, rawResponse?: boolean, _options?: Configuration): Observable<SqlResponse> {
        return this.sqlWithHttpInfo(body, rawResponse, _options).pipe(map((apiResponse: HttpInfo<SqlResponse>) => apiResponse.data));
    }

}
