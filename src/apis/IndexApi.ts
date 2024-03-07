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
  BulkResponse,
  DeleteDocumentRequest,
  DeleteResponse,
  ErrorResponse,
  InsertDocumentRequest,
  ReplaceDocumentRequest,
  SuccessResponse,
  UpdateDocumentRequest,
  UpdateResponse,
} from '../models/index';

export interface BulkRequest {
  body: string;
}

export interface DeleteRequest {
  deleteDocumentRequest: DeleteDocumentRequest;
}

export interface InsertRequest {
  insertDocumentRequest: InsertDocumentRequest;
}

export interface ReplaceRequest {
  insertDocumentRequest: InsertDocumentRequest;
}

export interface UpdateRequest {
  updateDocumentRequest: UpdateDocumentRequest;
}

export interface Update0Request {
  index: string;
  id: number;
  replaceDocumentRequest: ReplaceDocumentRequest;
}

/**
 * 
 */
export class IndexApi extends runtime.BaseAPI {

  /**
   * Sends multiple operatons like inserts, updates, replaces or deletes.  For each operation it\'s object must have same format as in their dedicated method.  The method expects a raw string as the batch in NDJSON.  Each operation object needs to be serialized to   JSON and separated by endline (\\n).      An example of raw input:      ```   {\"insert\": {\"index\": \"movies\", \"doc\": {\"plot\": \"A secret team goes to North Pole\", \"rating\": 9.5, \"language\": [2, 3], \"title\": \"This is an older movie\", \"lon\": 51.99, \"meta\": {\"keywords\":[\"travel\",\"ice\"],\"genre\":[\"adventure\"]}, \"year\": 1950, \"lat\": 60.4, \"advise\": \"PG-13\"}}}   \\n   {\"delete\": {\"index\": \"movies\",\"id\":700}}   ```      Responds with an object telling whenever any errors occured and an array with status for each operation:      ```   {     \'items\':     [       {         \'update\':{\'_index\':\'products\',\'_id\':1,\'result\':\'updated\'}       },       {         \'update\':{\'_index\':\'products\',\'_id\':2,\'result\':\'updated\'}       }     ],     \'errors\':false   }   ```   
   * Bulk index operations
   */
  async bulkRaw(requestParameters: BulkRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BulkResponse>> {
    if (requestParameters.body === null || requestParameters.body === undefined) {
      throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling bulk.');
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/x-ndjson';

    const response = await this.request({
      path: `/bulk`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: requestParameters.body as any,
    }, initOverrides);

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Sends multiple operatons like inserts, updates, replaces or deletes.  For each operation it\'s object must have same format as in their dedicated method.  The method expects a raw string as the batch in NDJSON.  Each operation object needs to be serialized to   JSON and separated by endline (\\n).      An example of raw input:      ```   {\"insert\": {\"index\": \"movies\", \"doc\": {\"plot\": \"A secret team goes to North Pole\", \"rating\": 9.5, \"language\": [2, 3], \"title\": \"This is an older movie\", \"lon\": 51.99, \"meta\": {\"keywords\":[\"travel\",\"ice\"],\"genre\":[\"adventure\"]}, \"year\": 1950, \"lat\": 60.4, \"advise\": \"PG-13\"}}}   \\n   {\"delete\": {\"index\": \"movies\",\"id\":700}}   ```      Responds with an object telling whenever any errors occured and an array with status for each operation:      ```   {     \'items\':     [       {         \'update\':{\'_index\':\'products\',\'_id\':1,\'result\':\'updated\'}       },       {         \'update\':{\'_index\':\'products\',\'_id\':2,\'result\':\'updated\'}       }     ],     \'errors\':false   }   ```   
   * Bulk index operations
   */
  async bulk(body: string, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BulkResponse> {
    const response = await this.bulkRaw({ body: body }, initOverrides);
    return await response.value();
  }

  /**
   * Delete one or several documents. The method has 2 ways of deleting: either by id, in case only one document is deleted or by using a  match query, in which case multiple documents can be delete . Example of input to delete by id:    ```   {\'index\':\'movies\',\'id\':100}   ```  Example of input to delete using a query:    ```   {     \'index\':\'movies\',     \'query\':     {       \'bool\':       {         \'must\':         [           {\'query_string\':\'new movie\'}         ]       }     }   }   ```  The match query has same syntax as in for searching. Responds with an object telling how many documents got deleted:     ```   {\'_index\':\'products\',\'updated\':1}   ``` 
   * Delete a document in an index
   */
  async deleteRaw(requestParameters: DeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DeleteResponse>> {
    if (requestParameters.deleteDocumentRequest === null || requestParameters.deleteDocumentRequest === undefined) {
      throw new runtime.RequiredError('deleteDocumentRequest','Required parameter requestParameters.deleteDocumentRequest was null or undefined when calling delete.');
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request({
      path: `/delete`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: requestParameters.deleteDocumentRequest,
    }, initOverrides);

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Delete one or several documents. The method has 2 ways of deleting: either by id, in case only one document is deleted or by using a  match query, in which case multiple documents can be delete . Example of input to delete by id:    ```   {\'index\':\'movies\',\'id\':100}   ```  Example of input to delete using a query:    ```   {     \'index\':\'movies\',     \'query\':     {       \'bool\':       {         \'must\':         [           {\'query_string\':\'new movie\'}         ]       }     }   }   ```  The match query has same syntax as in for searching. Responds with an object telling how many documents got deleted:     ```   {\'_index\':\'products\',\'updated\':1}   ``` 
   * Delete a document in an index
   */
  async delete(deleteDocumentRequest: DeleteDocumentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DeleteResponse> {
    const response = await this.deleteRaw({ deleteDocumentRequest: deleteDocumentRequest }, initOverrides);
    return await response.value();
  }

  /**
   * Insert a document.  Expects an object like:     ```   {     \'index\':\'movies\',     \'id\':701,     \'doc\':     {       \'title\':\'This is an old movie\',       \'plot\':\'A secret team goes to North Pole\',       \'year\':1950,       \'rating\':9.5,       \'lat\':60.4,       \'lon\':51.99,       \'advise\':\'PG-13\',       \'meta\':\'{\"keywords\":{\"travel\",\"ice\"},\"genre\":{\"adventure\"}}\',       \'language\':[2,3]     }   }   ```   The document id can also be missing, in which case an autogenerated one will be used:             ```   {     \'index\':\'movies\',     \'doc\':     {       \'title\':\'This is a new movie\',       \'plot\':\'A secret team goes to North Pole\',       \'year\':2020,       \'rating\':9.5,       \'lat\':60.4,       \'lon\':51.99,       \'advise\':\'PG-13\',       \'meta\':\'{\"keywords\":{\"travel\",\"ice\"},\"genre\":{\"adventure\"}}\',       \'language\':[2,3]     }   }   ```   It responds with an object in format:      ```   {\'_index\':\'products\',\'_id\':701,\'created\':true,\'result\':\'created\',\'status\':201}   ``` 
   * Create a new document in an index
   */
  async insertRaw(requestParameters: InsertRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SuccessResponse>> {
    if (requestParameters.insertDocumentRequest === null || requestParameters.insertDocumentRequest === undefined) {
      throw new runtime.RequiredError('insertDocumentRequest','Required parameter requestParameters.insertDocumentRequest was null or undefined when calling insert.');
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request({
      path: `/insert`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: requestParameters.insertDocumentRequest,
    }, initOverrides);

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Insert a document.  Expects an object like:     ```   {     \'index\':\'movies\',     \'id\':701,     \'doc\':     {       \'title\':\'This is an old movie\',       \'plot\':\'A secret team goes to North Pole\',       \'year\':1950,       \'rating\':9.5,       \'lat\':60.4,       \'lon\':51.99,       \'advise\':\'PG-13\',       \'meta\':\'{\"keywords\":{\"travel\",\"ice\"},\"genre\":{\"adventure\"}}\',       \'language\':[2,3]     }   }   ```   The document id can also be missing, in which case an autogenerated one will be used:             ```   {     \'index\':\'movies\',     \'doc\':     {       \'title\':\'This is a new movie\',       \'plot\':\'A secret team goes to North Pole\',       \'year\':2020,       \'rating\':9.5,       \'lat\':60.4,       \'lon\':51.99,       \'advise\':\'PG-13\',       \'meta\':\'{\"keywords\":{\"travel\",\"ice\"},\"genre\":{\"adventure\"}}\',       \'language\':[2,3]     }   }   ```   It responds with an object in format:      ```   {\'_index\':\'products\',\'_id\':701,\'created\':true,\'result\':\'created\',\'status\':201}   ``` 
   * Create a new document in an index
   */
  async insert(insertDocumentRequest: InsertDocumentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SuccessResponse> {
    const response = await this.insertRaw({ insertDocumentRequest: insertDocumentRequest }, initOverrides);
    return await response.value();
  }

  /**
   * Replace an existing document. Input has same format as `insert` operation. <br/> Responds with an object in format: <br/>    ```   {\'_index\':\'products\',\'_id\':1,\'created\':false,\'result\':\'updated\',\'status\':200}   ``` 
   * Replace new document in an index
   */
  async replaceRaw(requestParameters: ReplaceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SuccessResponse>> {
    if (requestParameters.insertDocumentRequest === null || requestParameters.insertDocumentRequest === undefined) {
      throw new runtime.RequiredError('insertDocumentRequest','Required parameter requestParameters.insertDocumentRequest was null or undefined when calling replace.');
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request({
      path: `/replace`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: requestParameters.insertDocumentRequest,
    }, initOverrides);

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Replace an existing document. Input has same format as `insert` operation. <br/> Responds with an object in format: <br/>    ```   {\'_index\':\'products\',\'_id\':1,\'created\':false,\'result\':\'updated\',\'status\':200}   ``` 
   * Replace new document in an index
   */
  async replace(insertDocumentRequest: InsertDocumentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SuccessResponse> {
    const response = await this.replaceRaw({ insertDocumentRequest: insertDocumentRequest }, initOverrides);
    return await response.value();
  }

  /**
   * Update one or several documents. The update can be made by passing the id or by using a match query in case multiple documents can be updated.  For example update a document using document id:    ```   {\'index\':\'movies\',\'doc\':{\'rating\':9.49},\'id\':100}   ```  And update by using a match query:    ```   {     \'index\':\'movies\',     \'doc\':{\'rating\':9.49},     \'query\':     {       \'bool\':       {         \'must\':         [           {\'query_string\':\'new movie\'}         ]       }     }   }   ```   The match query has same syntax as for searching. Responds with an object that tells how many documents where updated in format:     ```   {\'_index\':\'products\',\'updated\':1}   ``` 
   * Update a document in an index
   */
  async updateRaw(requestParameters: UpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UpdateResponse>> {
    if (requestParameters.updateDocumentRequest === null || requestParameters.updateDocumentRequest === undefined) {
      throw new runtime.RequiredError('updateDocumentRequest','Required parameter requestParameters.updateDocumentRequest was null or undefined when calling update.');
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request({
      path: `/update`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: requestParameters.updateDocumentRequest,
    }, initOverrides);

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Update one or several documents. The update can be made by passing the id or by using a match query in case multiple documents can be updated.  For example update a document using document id:    ```   {\'index\':\'movies\',\'doc\':{\'rating\':9.49},\'id\':100}   ```  And update by using a match query:    ```   {     \'index\':\'movies\',     \'doc\':{\'rating\':9.49},     \'query\':     {       \'bool\':       {         \'must\':         [           {\'query_string\':\'new movie\'}         ]       }     }   }   ```   The match query has same syntax as for searching. Responds with an object that tells how many documents where updated in format:     ```   {\'_index\':\'products\',\'updated\':1}   ``` 
   * Update a document in an index
   */
  async update(updateDocumentRequest: UpdateDocumentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UpdateResponse> {
    const response = await this.updateRaw({ updateDocumentRequest: updateDocumentRequest }, initOverrides);
    return await response.value();
  }

  /**
   * Partially replaces a document with given id in an index Responds with an object of the following format:     ```   {\'_index\':\'products\',\'updated\':1}   ``` 
   * Partially replaces a document in an index
   */
  async update_1Raw(requestParameters: Update0Request, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UpdateResponse>> {
    if (requestParameters.index === null || requestParameters.index === undefined) {
      throw new runtime.RequiredError('index','Required parameter requestParameters.index was null or undefined when calling update_1.');
    }

    if (requestParameters.id === null || requestParameters.id === undefined) {
      throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling update_1.');
    }

    if (requestParameters.replaceDocumentRequest === null || requestParameters.replaceDocumentRequest === undefined) {
      throw new runtime.RequiredError('replaceDocumentRequest','Required parameter requestParameters.replaceDocumentRequest was null or undefined when calling update_1.');
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    const response = await this.request({
      path: `/{index}/_update/{id}`.replace(`{${"index"}}`, encodeURIComponent(String(requestParameters.index))).replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
      body: requestParameters.replaceDocumentRequest,
    }, initOverrides);

    return new runtime.JSONApiResponse(response);
  }

  /**
   * Partially replaces a document with given id in an index Responds with an object of the following format:     ```   {\'_index\':\'products\',\'updated\':1}   ``` 
   * Partially replaces a document in an index
   */
  async update_1(index: string, id: number, replaceDocumentRequest: ReplaceDocumentRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UpdateResponse> {
    const response = await this.update_1Raw({ index: index, id: id, replaceDocumentRequest: replaceDocumentRequest }, initOverrides);
    return await response.value();
  }

}
