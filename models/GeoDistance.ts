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

import { GeoDistanceLocationAnchor } from '../models/GeoDistanceLocationAnchor';
import { HttpFile } from '../http/http';

/**
* Object to perform geo-distance based filtering on queries
*/
export class GeoDistance {
    'location_anchor'?: GeoDistanceLocationAnchor;
    /**
    * Field name in the document that contains location data
    */
    'location_source'?: any | null;
    /**
    * Algorithm used to calculate the distance
    */
    'distance_type'?: GeoDistanceDistanceTypeEnum | null;
    /**
    * The distance from the anchor point to filter results by
    */
    'distance'?: any | null;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "location_anchor",
            "baseName": "location_anchor",
            "type": "GeoDistanceLocationAnchor",
            "format": ""
        },
        {
            "name": "location_source",
            "baseName": "location_source",
            "type": "any",
            "format": ""
        },
        {
            "name": "distance_type",
            "baseName": "distance_type",
            "type": "GeoDistanceDistanceTypeEnum",
            "format": ""
        },
        {
            "name": "distance",
            "baseName": "distance",
            "type": "any",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return GeoDistance.attributeTypeMap;
    }

    public constructor() {
    }
}

export enum GeoDistanceDistanceTypeEnum {
    adaptive = 'adaptive',
    haversine = 'haversine'
}

