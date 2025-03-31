/**
 * Manticore Search Client
 * Сlient for Manticore Search. 
 *
 * OpenAPI spec version: 5.0.0
 * Contact: info@manticoresearch.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { HttpFile } from '../http/http';

/**
* Response object for successful delete request
*/
export class DeleteResponse {
    /**
    * The name of the table from which the document was deleted
    */
    'table'?: string;
    /**
    * Number of documents deleted
    */
    'deleted'?: number;
    /**
    * The ID of the deleted document. If multiple documents are deleted, the ID of the first deleted document is returned
    */
    'id'?: number;
    /**
    * Indicates whether any documents to be deleted were found
    */
    'found'?: boolean;
    /**
    * Result of the delete operation, typically \'deleted\'
    */
    'result'?: string;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "table",
            "baseName": "table",
            "type": "string",
            "format": ""
        },
        {
            "name": "deleted",
            "baseName": "deleted",
            "type": "number",
            "format": ""
        },
        {
            "name": "id",
            "baseName": "id",
            "type": "number",
            "format": "int64"
        },
        {
            "name": "found",
            "baseName": "found",
            "type": "boolean",
            "format": ""
        },
        {
            "name": "result",
            "baseName": "result",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return DeleteResponse.attributeTypeMap;
    }

    public constructor() {
    }
}
