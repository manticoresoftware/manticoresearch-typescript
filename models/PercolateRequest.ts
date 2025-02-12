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

import { PercolateRequestQuery } from '../models/PercolateRequestQuery';
import { HttpFile } from '../http/http';

/**
* Object containing the query for percolating documents against stored queries in a percolate table
*/
export class PercolateRequest {
    'query': PercolateRequestQuery;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "query",
            "baseName": "query",
            "type": "PercolateRequestQuery",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return PercolateRequest.attributeTypeMap;
    }

    public constructor() {
    }
}
