// TODO: better import syntax?
import {BaseAPIRequestFactory, RequiredError, COLLECTION_FORMATS} from './baseapi';
import {Configuration} from '../configuration';
import {RequestContext, HttpMethod, ResponseContext, HttpFile, HttpInfo} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {canConsumeForm, isCodeInRange} from '../util';
import {SecurityAuthentication} from '../auth/auth';


import { BulkResponse } from '../models/BulkResponse';
import { DeleteDocumentRequest } from '../models/DeleteDocumentRequest';
import { DeleteResponse } from '../models/DeleteResponse';
import { ErrorResponse } from '../models/ErrorResponse';
import { InsertDocumentRequest } from '../models/InsertDocumentRequest';
import { ReplaceDocumentRequest } from '../models/ReplaceDocumentRequest';
import { SuccessResponse } from '../models/SuccessResponse';
import { UpdateDocumentRequest } from '../models/UpdateDocumentRequest';
import { UpdateResponse } from '../models/UpdateResponse';

/**
 * no description
 */
export class IndexApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * Sends multiple operatons like inserts, updates, replaces or deletes.  For each operation it\'s object must have same format as in their dedicated method.  The method expects a raw string as the batch in NDJSON.  Each operation object needs to be serialized to   JSON and separated by endline (\\n).      An example of raw input:      ```   {\"insert\": {\"index\": \"movies\", \"doc\": {\"plot\": \"A secret team goes to North Pole\", \"rating\": 9.5, \"language\": [2, 3], \"title\": \"This is an older movie\", \"lon\": 51.99, \"meta\": {\"keywords\":[\"travel\",\"ice\"],\"genre\":[\"adventure\"]}, \"year\": 1950, \"lat\": 60.4, \"advise\": \"PG-13\"}}}   \\n   {\"delete\": {\"index\": \"movies\",\"id\":700}}   ```      Responds with an object telling whenever any errors occured and an array with status for each operation:      ```   {     \'items\':     [       {         \'update\':{\'_index\':\'products\',\'_id\':1,\'result\':\'updated\'}       },       {         \'update\':{\'_index\':\'products\',\'_id\':2,\'result\':\'updated\'}       }     ],     \'errors\':false   }   ``` 
     * Bulk index operations
     * @param body 
     */
    public async bulk(body: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new RequiredError("IndexApi", "bulk", "body");
        }


        // Path Params
        const localVarPath = '/bulk';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/x-ndjson"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        requestContext.setBody(body);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Delete one or several documents. The method has 2 ways of deleting: either by id, in case only one document is deleted or by using a  match query, in which case multiple documents can be delete . Example of input to delete by id:    ```   {\'index\':\'movies\',\'id\':100}   ```  Example of input to delete using a query:    ```   {     \'index\':\'movies\',     \'query\':     {       \'bool\':       {         \'must\':         [           {\'query_string\':\'new movie\'}         ]       }     }   }   ```  The match query has same syntax as in for searching. Responds with an object telling how many documents got deleted:     ```   {\'_index\':\'products\',\'updated\':1}   ``` 
     * Delete a document in an index
     * @param deleteDocumentRequest 
     */
    public async delete(deleteDocumentRequest: DeleteDocumentRequest, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'deleteDocumentRequest' is not null or undefined
        if (deleteDocumentRequest === null || deleteDocumentRequest === undefined) {
            throw new RequiredError("IndexApi", "delete", "deleteDocumentRequest");
        }


        // Path Params
        const localVarPath = '/delete';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(deleteDocumentRequest, "DeleteDocumentRequest", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Insert a document.  Expects an object like:     ```   {     \'index\':\'movies\',     \'id\':701,     \'doc\':     {       \'title\':\'This is an old movie\',       \'plot\':\'A secret team goes to North Pole\',       \'year\':1950,       \'rating\':9.5,       \'lat\':60.4,       \'lon\':51.99,       \'advise\':\'PG-13\',       \'meta\':\'{\"keywords\":{\"travel\",\"ice\"},\"genre\":{\"adventure\"}}\',       \'language\':[2,3]     }   }   ```   The document id can also be missing, in which case an autogenerated one will be used:             ```   {     \'index\':\'movies\',     \'doc\':     {       \'title\':\'This is a new movie\',       \'plot\':\'A secret team goes to North Pole\',       \'year\':2020,       \'rating\':9.5,       \'lat\':60.4,       \'lon\':51.99,       \'advise\':\'PG-13\',       \'meta\':\'{\"keywords\":{\"travel\",\"ice\"},\"genre\":{\"adventure\"}}\',       \'language\':[2,3]     }   }   ```   It responds with an object in format:      ```   {\'_index\':\'products\',\'_id\':701,\'created\':true,\'result\':\'created\',\'status\':201}   ``` 
     * Create a new document in an index
     * @param insertDocumentRequest 
     */
    public async insert(insertDocumentRequest: InsertDocumentRequest, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'insertDocumentRequest' is not null or undefined
        if (insertDocumentRequest === null || insertDocumentRequest === undefined) {
            throw new RequiredError("IndexApi", "insert", "insertDocumentRequest");
        }


        // Path Params
        const localVarPath = '/insert';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(insertDocumentRequest, "InsertDocumentRequest", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Partially replaces a document with given id in an index Responds with an object of the following format:     ```   {\'_index\':\'products\',\'updated\':1}   ``` 
     * Partially replaces a document in an index
     * @param index Name of the percolate index
     * @param id Id of the document to replace
     * @param replaceDocumentRequest 
     */
    public async partialReplace(index: string, id: number, replaceDocumentRequest: ReplaceDocumentRequest, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'index' is not null or undefined
        if (index === null || index === undefined) {
            throw new RequiredError("IndexApi", "partialReplace", "index");
        }


        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new RequiredError("IndexApi", "partialReplace", "id");
        }


        // verify required parameter 'replaceDocumentRequest' is not null or undefined
        if (replaceDocumentRequest === null || replaceDocumentRequest === undefined) {
            throw new RequiredError("IndexApi", "partialReplace", "replaceDocumentRequest");
        }


        // Path Params
        const localVarPath = '/{index}/_update/{id}'
            .replace('{' + 'index' + '}', encodeURIComponent(String(index)))
            .replace('{' + 'id' + '}', encodeURIComponent(String(id)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(replaceDocumentRequest, "ReplaceDocumentRequest", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Replace an existing document. Input has same format as `insert` operation. <br/> Responds with an object in format: <br/>    ```   {\'_index\':\'products\',\'_id\':1,\'created\':false,\'result\':\'updated\',\'status\':200}   ``` 
     * Replace new document in an index
     * @param insertDocumentRequest 
     */
    public async replace(insertDocumentRequest: InsertDocumentRequest, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'insertDocumentRequest' is not null or undefined
        if (insertDocumentRequest === null || insertDocumentRequest === undefined) {
            throw new RequiredError("IndexApi", "replace", "insertDocumentRequest");
        }


        // Path Params
        const localVarPath = '/replace';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(insertDocumentRequest, "InsertDocumentRequest", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Update one or several documents. The update can be made by passing the id or by using a match query in case multiple documents can be updated.  For example update a document using document id:    ```   {\'index\':\'movies\',\'doc\':{\'rating\':9.49},\'id\':100}   ```  And update by using a match query:    ```   {     \'index\':\'movies\',     \'doc\':{\'rating\':9.49},     \'query\':     {       \'bool\':       {         \'must\':         [           {\'query_string\':\'new movie\'}         ]       }     }   }   ```   The match query has same syntax as for searching. Responds with an object that tells how many documents where updated in format:     ```   {\'_index\':\'products\',\'updated\':1}   ``` 
     * Update a document in an index
     * @param updateDocumentRequest 
     */
    public async update(updateDocumentRequest: UpdateDocumentRequest, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'updateDocumentRequest' is not null or undefined
        if (updateDocumentRequest === null || updateDocumentRequest === undefined) {
            throw new RequiredError("IndexApi", "update", "updateDocumentRequest");
        }


        // Path Params
        const localVarPath = '/update';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(updateDocumentRequest, "UpdateDocumentRequest", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

}

export class IndexApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to bulk
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async bulkWithHttpInfo(response: ResponseContext): Promise<HttpInfo<BulkResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: BulkResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "BulkResponse", ""
            ) as BulkResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("0", response.httpStatusCode)) {
            const body: ErrorResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ErrorResponse", ""
            ) as ErrorResponse;
            throw new ApiException<ErrorResponse>(response.httpStatusCode, "error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: BulkResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "BulkResponse", ""
            ) as BulkResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to delete
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteWithHttpInfo(response: ResponseContext): Promise<HttpInfo<DeleteResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: DeleteResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DeleteResponse", ""
            ) as DeleteResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("0", response.httpStatusCode)) {
            const body: ErrorResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ErrorResponse", ""
            ) as ErrorResponse;
            throw new ApiException<ErrorResponse>(response.httpStatusCode, "error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: DeleteResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DeleteResponse", ""
            ) as DeleteResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to insert
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async insertWithHttpInfo(response: ResponseContext): Promise<HttpInfo<SuccessResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: SuccessResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "SuccessResponse", ""
            ) as SuccessResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("0", response.httpStatusCode)) {
            const body: ErrorResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ErrorResponse", ""
            ) as ErrorResponse;
            throw new ApiException<ErrorResponse>(response.httpStatusCode, "error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: SuccessResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "SuccessResponse", ""
            ) as SuccessResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to partialReplace
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async partialReplaceWithHttpInfo(response: ResponseContext): Promise<HttpInfo<UpdateResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: UpdateResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "UpdateResponse", ""
            ) as UpdateResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("0", response.httpStatusCode)) {
            const body: ErrorResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ErrorResponse", ""
            ) as ErrorResponse;
            throw new ApiException<ErrorResponse>(response.httpStatusCode, "error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: UpdateResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "UpdateResponse", ""
            ) as UpdateResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to replace
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async replaceWithHttpInfo(response: ResponseContext): Promise<HttpInfo<SuccessResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: SuccessResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "SuccessResponse", ""
            ) as SuccessResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("0", response.httpStatusCode)) {
            const body: ErrorResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ErrorResponse", ""
            ) as ErrorResponse;
            throw new ApiException<ErrorResponse>(response.httpStatusCode, "error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: SuccessResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "SuccessResponse", ""
            ) as SuccessResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to update
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async updateWithHttpInfo(response: ResponseContext): Promise<HttpInfo<UpdateResponse >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: UpdateResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "UpdateResponse", ""
            ) as UpdateResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("0", response.httpStatusCode)) {
            const body: ErrorResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ErrorResponse", ""
            ) as ErrorResponse;
            throw new ApiException<ErrorResponse>(response.httpStatusCode, "error", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: UpdateResponse = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "UpdateResponse", ""
            ) as UpdateResponse;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
