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

export class SqlObjResponse {
    'hits': any;
    'took'?: number;
    'timed_out'?: boolean;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "hits",
            "baseName": "hits",
            "type": "any",
            "format": ""
        },
        {
            "name": "took",
            "baseName": "took",
            "type": "number",
            "format": ""
        },
        {
            "name": "timed_out",
            "baseName": "timed_out",
            "type": "boolean",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return SqlObjResponse.attributeTypeMap;
    }

    public constructor() {
    }
}
