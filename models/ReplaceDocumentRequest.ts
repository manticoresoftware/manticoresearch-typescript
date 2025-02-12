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
* Object containing the document data for replacing an existing document in a table.
*/
export class ReplaceDocumentRequest {
    /**
    * Object containing the new document data to replace the existing one.
    */
    'doc': any;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "doc",
            "baseName": "doc",
            "type": "any",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return ReplaceDocumentRequest.attributeTypeMap;
    }

    public constructor() {
    }
}
