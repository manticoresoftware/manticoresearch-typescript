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

export class Highlight {
    /**
    * Maximum size of the text fragments in highlighted snippets per field
    */
    'fragment_size'?: any | null;
    /**
    * Maximum size of snippets per field
    */
    'limit'?: any | null;
    /**
    * Maximum number of snippets per field
    */
    'limit_snippets'?: any | null;
    /**
    * Maximum number of words per field
    */
    'limit_words'?: any | null;
    /**
    * Total number of highlighted fragments per field
    */
    'number_of_fragments'?: any | null;
    /**
    * Text inserted after the matched term, typically used for HTML formatting
    */
    'after_match'?: string;
    /**
    * Permits an empty string to be returned as the highlighting result. Otherwise, the beginning of the original text would be returned
    */
    'allow_empty'?: boolean;
    /**
    * Number of words around the match to include in the highlight
    */
    'around'?: number;
    /**
    * Text inserted before the match, typically used for HTML formatting
    */
    'before_match'?: string;
    /**
    * Emits an HTML tag with the enclosing zone name before each highlighted snippet
    */
    'emit_zones'?: boolean;
    /**
    * If set to \'html\', retains HTML markup when highlighting
    */
    'encoder'?: HighlightEncoderEnum;
    'fields'?: any | null;
    /**
    * Ignores the length limit until the result includes all keywords
    */
    'force_all_words'?: boolean;
    /**
    * Forces snippet generation even if limits allow highlighting the entire text
    */
    'force_snippets'?: boolean;
    'highlight_query'?: QueryFilter | null;
    /**
    * Defines the mode for handling HTML markup in the highlight
    */
    'html_strip_mode'?: HighlightHtmlStripModeEnum;
    /**
    * Determines whether the \'limit\', \'limit_words\', and \'limit_snippets\' options operate as individual limits in each field of the document
    */
    'limits_per_field'?: boolean;
    /**
    * If set to 1, allows an empty string to be returned as a highlighting result
    */
    'no_match_size'?: HighlightNoMatchSizeEnum;
    /**
    * Sets the sorting order of highlighted snippets
    */
    'order'?: HighlightOrderEnum;
    /**
    * Text inserted before each highlighted snippet
    */
    'pre_tags'?: string;
    /**
    * Text inserted after each highlighted snippet
    */
    'post_tags'?: string;
    /**
    * Sets the starting value of the %SNIPPET_ID% macro
    */
    'start_snippet_id'?: number;
    /**
    * Defines whether to additionally break snippets by phrase boundary characters
    */
    'use_boundaries'?: boolean;

    static readonly discriminator: string | undefined = undefined;

    static readonly mapping: {[index: string]: string} | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "fragment_size",
            "baseName": "fragment_size",
            "type": "any",
            "format": ""
        },
        {
            "name": "limit",
            "baseName": "limit",
            "type": "any",
            "format": ""
        },
        {
            "name": "limit_snippets",
            "baseName": "limit_snippets",
            "type": "any",
            "format": ""
        },
        {
            "name": "limit_words",
            "baseName": "limit_words",
            "type": "any",
            "format": ""
        },
        {
            "name": "number_of_fragments",
            "baseName": "number_of_fragments",
            "type": "any",
            "format": ""
        },
        {
            "name": "after_match",
            "baseName": "after_match",
            "type": "string",
            "format": ""
        },
        {
            "name": "allow_empty",
            "baseName": "allow_empty",
            "type": "boolean",
            "format": ""
        },
        {
            "name": "around",
            "baseName": "around",
            "type": "number",
            "format": ""
        },
        {
            "name": "before_match",
            "baseName": "before_match",
            "type": "string",
            "format": ""
        },
        {
            "name": "emit_zones",
            "baseName": "emit_zones",
            "type": "boolean",
            "format": ""
        },
        {
            "name": "encoder",
            "baseName": "encoder",
            "type": "HighlightEncoderEnum",
            "format": ""
        },
        {
            "name": "fields",
            "baseName": "fields",
            "type": "any",
            "format": ""
        },
        {
            "name": "force_all_words",
            "baseName": "force_all_words",
            "type": "boolean",
            "format": ""
        },
        {
            "name": "force_snippets",
            "baseName": "force_snippets",
            "type": "boolean",
            "format": ""
        },
        {
            "name": "highlight_query",
            "baseName": "highlight_query",
            "type": "QueryFilter",
            "format": ""
        },
        {
            "name": "html_strip_mode",
            "baseName": "html_strip_mode",
            "type": "HighlightHtmlStripModeEnum",
            "format": ""
        },
        {
            "name": "limits_per_field",
            "baseName": "limits_per_field",
            "type": "boolean",
            "format": ""
        },
        {
            "name": "no_match_size",
            "baseName": "no_match_size",
            "type": "HighlightNoMatchSizeEnum",
            "format": ""
        },
        {
            "name": "order",
            "baseName": "order",
            "type": "HighlightOrderEnum",
            "format": ""
        },
        {
            "name": "pre_tags",
            "baseName": "pre_tags",
            "type": "string",
            "format": ""
        },
        {
            "name": "post_tags",
            "baseName": "post_tags",
            "type": "string",
            "format": ""
        },
        {
            "name": "start_snippet_id",
            "baseName": "start_snippet_id",
            "type": "number",
            "format": ""
        },
        {
            "name": "use_boundaries",
            "baseName": "use_boundaries",
            "type": "boolean",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return Highlight.attributeTypeMap;
    }

    public constructor() {
    }
}

export enum HighlightEncoderEnum {
    default = 'default',
    html = 'html'
}
export enum HighlightHtmlStripModeEnum {
    none = 'none',
    strip = 'strip',
    index = 'index',
    retain = 'retain'
}
export enum HighlightNoMatchSizeEnum {
    NUMBER_0 = 0,
    NUMBER_1 = 1
}
export enum HighlightOrderEnum {
    asc = 'asc',
    desc = 'desc',
    score = 'score'
}
