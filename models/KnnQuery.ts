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

import { QueryFilter } from '../models/QueryFilter';
import { HttpFile } from '../http/http';

/**
* Object representing a k-nearest neighbor search query
*/
export class KnnQuery {
    /**
    * Field to perform the k-nearest neighbor search on
    */
    'field': string;
    /**
    * The number of nearest neighbors to return
    */
    'k': number;
    /**
    * The vector used as input for the KNN search
    */
    'query_vector'?: Array<number>;
    /**
    * The docuemnt ID used as input for the KNN search
    */
    'doc_id'?: number;
    /**
    * Optional parameter controlling the accuracy of the search
    */
    'ef'?: number;
    'filter'?: QueryFilter;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "field",
            "baseName": "field",
            "type": "string",
            "format": ""
        },
        {
            "name": "k",
            "baseName": "k",
            "type": "number",
            "format": ""
        },
        {
            "name": "query_vector",
            "baseName": "query_vector",
            "type": "Array<number>",
            "format": ""
        },
        {
            "name": "doc_id",
            "baseName": "doc_id",
            "type": "number",
            "format": "int64"
        },
        {
            "name": "ef",
            "baseName": "ef",
            "type": "number",
            "format": ""
        },
        {
            "name": "filter",
            "baseName": "filter",
            "type": "QueryFilter",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return KnnQuery.attributeTypeMap;
    }

    public constructor() {
    }
}