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
* Options for controlling the behavior of highlighting on a per-field basis
*/
export class HighlightFieldOption {
    /**
    * Maximum size of the text fragments in highlighted snippets per field
    */
    'fragment_size'?: number;
    /**
    * Maximum size of snippets per field
    */
    'limit'?: number;
    /**
    * Maximum number of snippets per field
    */
    'limit_snippets'?: number;
    /**
    * Maximum number of words per field
    */
    'limit_words'?: number;
    /**
    * Total number of highlighted fragments per field
    */
    'number_of_fragments'?: number;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "fragment_size",
            "baseName": "fragment_size",
            "type": "number",
            "format": ""
        },
        {
            "name": "limit",
            "baseName": "limit",
            "type": "number",
            "format": ""
        },
        {
            "name": "limit_snippets",
            "baseName": "limit_snippets",
            "type": "number",
            "format": ""
        },
        {
            "name": "limit_words",
            "baseName": "limit_words",
            "type": "number",
            "format": ""
        },
        {
            "name": "number_of_fragments",
            "baseName": "number_of_fragments",
            "type": "number",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return HighlightFieldOption.attributeTypeMap;
    }

    public constructor() {
    }
}
