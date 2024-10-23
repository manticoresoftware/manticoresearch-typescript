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

import { JoinCond } from '../models/JoinCond';
import { HttpFile } from '../http/http';

export class JoinOn {
    'right'?: JoinCond;
    'left'?: JoinCond;
    'operator'?: JoinOnOperatorEnum;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "right",
            "baseName": "right",
            "type": "JoinCond",
            "format": ""
        },
        {
            "name": "left",
            "baseName": "left",
            "type": "JoinCond",
            "format": ""
        },
        {
            "name": "operator",
            "baseName": "operator",
            "type": "JoinOnOperatorEnum",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return JoinOn.attributeTypeMap;
    }

    public constructor() {
    }
}

export enum JoinOnOperatorEnum {
    eq = 'eq'
}

