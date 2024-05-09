/* tslint:disable */
/* eslint-disable */
/*
 * Manticore Search Client
 * Copyright (c) 2020-2021, Manticore Software LTD (https://manticoresearch.com)
 *
 * All rights reserved
 */


import * as runtime from '../runtime';
import type {
  ErrorResponse,
  PercolateRequest,
  SearchRequest,
  SearchResponse,
} from '../models/index';

export interface PercolateOperationRequest {
  index: string;
  percolateRequest: PercolateRequest;
}

export interface SearchOperationRequest {
  searchRequest: SearchRequest;
}

/**
 * 
 */
export class SearchApi extends runtime.BaseAPI {

  /**
   * Performs a percolate search.  This method must be used only on percolate indexes.  Expects two parameters: the index name and an object with array of documents to be tested. An example of the documents object:    ```   {     \"query\":     {       \"percolate\":       {         \"document\":         {           \"content\":\"sample content\"         }       }     }   }   ```  Responds with an object with matched stored queries:     ```   {     \'timed_out\':false,     \'hits\':     {       \'total\':2,       \'max_score\':1,       \'hits\':       [         {           \'_index\':\'idx_pq_1\',           \'_type\':\'doc\',           \'_id\':\'2\',           \'_score\':\'1\',           \'_source\':           {             \'query\':             {               \'match\':{\'title\':\'some\'}             }           }         },         {           \'_index\':\'idx_pq_1\',           \'_type\':\'doc\',           \'_id\':\'5\',           \'_score\':\'1\',           \'_source\':           {             \'query\':             {               \'ql\':\'some | none\'             }           }         }       ]     }   }   ``` 
   * Perform reverse search on a percolate index
   */
  async percolateRaw(requestParameters: PercolateOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SearchResponse>> {
    if (requestParameters.index === null || requestParameters.index === undefined) {
      throw new runtime.RequiredError('index','Required parameter requestParameters.index was null or undefined when calling percolate.');
    }

    if (requestParameters.percolateRequest === null || requestParameters.percolateRequest === undefined) {
      throw new runtime.RequiredError('percolateRequest','Required parameter requestParameters.percolateRequest was null or undefined when calling percolate.');
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request({
      path: `/pq/{index}/search`.replace(`{${"index"}}`, encodeURIComponent(String(requestParameters.index))),
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: requestParameters.percolateRequest,
    }, initOverrides);

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Performs a percolate search.  This method must be used only on percolate indexes.  Expects two parameters: the index name and an object with array of documents to be tested. An example of the documents object:    ```   {     \"query\":     {       \"percolate\":       {         \"document\":         {           \"content\":\"sample content\"         }       }     }   }   ```  Responds with an object with matched stored queries:     ```   {     \'timed_out\':false,     \'hits\':     {       \'total\':2,       \'max_score\':1,       \'hits\':       [         {           \'_index\':\'idx_pq_1\',           \'_type\':\'doc\',           \'_id\':\'2\',           \'_score\':\'1\',           \'_source\':           {             \'query\':             {               \'match\':{\'title\':\'some\'}             }           }         },         {           \'_index\':\'idx_pq_1\',           \'_type\':\'doc\',           \'_id\':\'5\',           \'_score\':\'1\',           \'_source\':           {             \'query\':             {               \'ql\':\'some | none\'             }           }         }       ]     }   }   ``` 
   * Perform reverse search on a percolate index
   */
  async percolate(index: string, percolateRequest: PercolateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SearchResponse> {
    const response = await this.percolateRaw({ index: index, percolateRequest: percolateRequest }, initOverrides);
    return await response.value();
  }

  /**
   *  The method expects an object with the following mandatory properties: * the name of the index to search * the match query object For details, see the documentation on [**SearchRequest**](SearchRequest.md) The method returns an object with the following properties: - took: the time taken to execute the search query. - timed_out: a boolean indicating whether the query timed out. - hits: an object with the following properties:    - total: the total number of hits found.    - hits: an array of hit objects, where each hit object represents a matched document. Each hit object has the following properties:      - _id: the ID of the matched document.      - _score: the score of the matched document.      - _source: the source data of the matched document.  In addition, if profiling is enabled, the response will include an additional array with profiling information attached. Here is an example search response:    ```   {     \'took\':10,     \'timed_out\':false,     \'hits\':     {       \'total\':2,       \'hits\':       [         {\'_id\':\'1\',\'_score\':1,\'_source\':{\'gid\':11}},         {\'_id\':\'2\',\'_score\':1,\'_source\':{\'gid\':12}}       ]     }   }   ```  For more information about the match query syntax and additional parameters that can be added to request and response, please see the documentation [here](https://manual.manticoresearch.com/Searching/Full_text_matching/Basic_usage#HTTP-JSON). 
   * Performs a search on an index
   */
  async searchRaw(requestParameters: SearchOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SearchResponse>> {
	var JSONbig = require('json-bigint');
	
	if (requestParameters.searchRequest === null || requestParameters.searchRequest === undefined) {
      throw new runtime.RequiredError('searchRequest','Required parameter requestParameters.searchRequest was null or undefined when calling search.');
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    var postBody = JSONbig.parse(JSONbig.stringify(requestParameters.searchRequest));
    
    if (postBody['source']) {
      postBody['_source'] = postBody['source']; 
      delete postBody['source'];
    }

    const response = await this.request({
      path: `/search`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: postBody,
    }, initOverrides);

    return new runtime.JSONApiResponse(response);
  }

  /**
   *  The method expects an object with the following mandatory properties: * the name of the index to search * the match query object For details, see the documentation on [**SearchRequest**](SearchRequest.md) The method returns an object with the following properties: - took: the time taken to execute the search query. - timed_out: a boolean indicating whether the query timed out. - hits: an object with the following properties:    - total: the total number of hits found.    - hits: an array of hit objects, where each hit object represents a matched document. Each hit object has the following properties:      - _id: the ID of the matched document.      - _score: the score of the matched document.      - _source: the source data of the matched document.  In addition, if profiling is enabled, the response will include an additional array with profiling information attached. Here is an example search response:    ```   {     \'took\':10,     \'timed_out\':false,     \'hits\':     {       \'total\':2,       \'hits\':       [         {\'_id\':\'1\',\'_score\':1,\'_source\':{\'gid\':11}},         {\'_id\':\'2\',\'_score\':1,\'_source\':{\'gid\':12}}       ]     }   }   ```  For more information about the match query syntax and additional parameters that can be added to request and response, please see the documentation [here](https://manual.manticoresearch.com/Searching/Full_text_matching/Basic_usage#HTTP-JSON). 
   * Performs a search on an index
   */
  async search(searchRequest: SearchRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SearchResponse> {
    const response = await this.searchRaw({ searchRequest: searchRequest }, initOverrides);
    return await response.value();
  }

}
