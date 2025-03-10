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
* Specifies the location of the pin point used for search
*/
export class GeoDistanceLocationAnchor {
    /**
    * Latitude of the anchor point
    */
    'lat'?: any | null;
    /**
    * Longitude of the anchor point
    */
    'lon'?: any | null;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "lat",
            "baseName": "lat",
            "type": "any",
            "format": ""
        },
        {
            "name": "lon",
            "baseName": "lon",
            "type": "any",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return GeoDistanceLocationAnchor.attributeTypeMap;
    }

    public constructor() {
    }
}
