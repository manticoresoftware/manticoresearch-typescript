export * from '../models/AggComposite';
export * from '../models/AggCompositeSource';
export * from '../models/AggCompositeTerm';
export * from '../models/AggDateHistogram';
export * from '../models/AggHistogram';
export * from '../models/AggTerms';
export * from '../models/Aggregation';
export * from '../models/AutocompleteRequest';
export * from '../models/BoolFilter';
export * from '../models/BulkResponse';
export * from '../models/DeleteDocumentRequest';
export * from '../models/DeleteResponse';
export * from '../models/ErrorResponse';
export * from '../models/FulltextFilter';
export * from '../models/GeoDistance';
export * from '../models/GeoDistanceLocationAnchor';
export * from '../models/Highlight';
export * from '../models/HighlightFieldOption';
export * from '../models/HighlightFields';
export * from '../models/HitsHits';
export * from '../models/InsertDocumentRequest';
export * from '../models/Join';
export * from '../models/JoinCond';
export * from '../models/JoinOn';
export * from '../models/KnnQuery';
export * from '../models/KnnQueryQuery';
export * from '../models/Match';
export * from '../models/MatchAll';
export * from '../models/PercolateRequest';
export * from '../models/PercolateRequestQuery';
export * from '../models/QueryFilter';
export * from '../models/Range';
export * from '../models/ReplaceDocumentRequest';
export * from '../models/ResponseError';
export * from '../models/ResponseErrorDetails';
export * from '../models/SearchQuery';
export * from '../models/SearchRequest';
export * from '../models/SearchResponse';
export * from '../models/SearchResponseHits';
export * from '../models/SourceRules';
export * from '../models/SqlObjResponse';
export * from '../models/SqlResponse';
export * from '../models/SuccessResponse';
export * from '../models/UpdateDocumentRequest';
export * from '../models/UpdateResponse';

import { AggComposite } from '../models/AggComposite';
import { AggCompositeSource } from '../models/AggCompositeSource';
import { AggCompositeTerm } from '../models/AggCompositeTerm';
import { AggDateHistogram } from '../models/AggDateHistogram';
import { AggHistogram } from '../models/AggHistogram';
import { AggTerms } from '../models/AggTerms';
import { Aggregation } from '../models/Aggregation';
import { AutocompleteRequest } from '../models/AutocompleteRequest';
import { BoolFilter } from '../models/BoolFilter';
import { BulkResponse } from '../models/BulkResponse';
import { DeleteDocumentRequest } from '../models/DeleteDocumentRequest';
import { DeleteResponse } from '../models/DeleteResponse';
import { ErrorResponse } from '../models/ErrorResponse';
import { FulltextFilter } from '../models/FulltextFilter';
import { GeoDistance  , GeoDistanceDistanceTypeEnum    } from '../models/GeoDistance';
import { GeoDistanceLocationAnchor } from '../models/GeoDistanceLocationAnchor';
import { Highlight          , HighlightEncoderEnum      , HighlightHtmlStripModeEnum   , HighlightNoMatchSizeEnum  , HighlightOrderEnum       } from '../models/Highlight';
import { HighlightFieldOption } from '../models/HighlightFieldOption';
import { HighlightFieldsClass } from '../models/HighlightFields';
import { HitsHits } from '../models/HitsHits';
import { InsertDocumentRequest } from '../models/InsertDocumentRequest';
import { Join, JoinTypeEnum      } from '../models/Join';
import { JoinCond } from '../models/JoinCond';
import { JoinOn  , JoinOnOperatorEnum   } from '../models/JoinOn';
import { KnnQuery } from '../models/KnnQuery';
import { KnnQueryQueryClass } from '../models/KnnQueryQuery';
import { Match , MatchOperatorEnum    } from '../models/Match';
import { MatchAll, MatchAllAllEnum   } from '../models/MatchAll';
import { PercolateRequest } from '../models/PercolateRequest';
import { PercolateRequestQuery } from '../models/PercolateRequestQuery';
import { QueryFilter } from '../models/QueryFilter';
import { Range } from '../models/Range';
import { ReplaceDocumentRequest } from '../models/ReplaceDocumentRequest';
import { ResponseErrorClass } from '../models/ResponseError';
import { ResponseErrorDetails } from '../models/ResponseErrorDetails';
import { SearchQuery } from '../models/SearchQuery';
import { SearchRequest } from '../models/SearchRequest';
import { SearchResponse } from '../models/SearchResponse';
import { SearchResponseHits } from '../models/SearchResponseHits';
import { SourceRules } from '../models/SourceRules';
import { SqlObjResponse } from '../models/SqlObjResponse';
import { SqlResponseClass } from '../models/SqlResponse';
import { SuccessResponse } from '../models/SuccessResponse';
import { UpdateDocumentRequest } from '../models/UpdateDocumentRequest';
import { UpdateResponse } from '../models/UpdateResponse';

/* tslint:disable:no-unused-variable */
let primitives = [
                    "string",
                    "boolean",
                    "double",
                    "integer",
                    "long",
                    "float",
                    "number",
                    "any"
                 ];

let enumsMap: Set<string> = new Set<string>([
    "GeoDistanceDistanceTypeEnum",
    "HighlightEncoderEnum",
    "HighlightHtmlStripModeEnum",
    "HighlightNoMatchSizeEnum",
    "HighlightOrderEnum",
    "JoinTypeEnum",
    "JoinOnOperatorEnum",
    "MatchOperatorEnum",
    "MatchAllAllEnum",
]);

let typeMap: {[index: string]: any} = {
    "AggComposite": AggComposite,
    "AggCompositeSource": AggCompositeSource,
    "AggCompositeTerm": AggCompositeTerm,
    "AggDateHistogram": AggDateHistogram,
    "AggHistogram": AggHistogram,
    "AggTerms": AggTerms,
    "Aggregation": Aggregation,
    "AutocompleteRequest": AutocompleteRequest,
    "BoolFilter": BoolFilter,
    "BulkResponse": BulkResponse,
    "DeleteDocumentRequest": DeleteDocumentRequest,
    "DeleteResponse": DeleteResponse,
    "ErrorResponse": ErrorResponse,
    "FulltextFilter": FulltextFilter,
    "GeoDistance": GeoDistance,
    "GeoDistanceLocationAnchor": GeoDistanceLocationAnchor,
    "Highlight": Highlight,
    "HighlightFieldOption": HighlightFieldOption,
    "HighlightFields": HighlightFieldsClass,
    "HitsHits": HitsHits,
    "InsertDocumentRequest": InsertDocumentRequest,
    "Join": Join,
    "JoinCond": JoinCond,
    "JoinOn": JoinOn,
    "KnnQuery": KnnQuery,
    "KnnQueryQuery": KnnQueryQueryClass,
    "Match": Match,
    "MatchAll": MatchAll,
    "PercolateRequest": PercolateRequest,
    "PercolateRequestQuery": PercolateRequestQuery,
    "QueryFilter": QueryFilter,
    "Range": Range,
    "ReplaceDocumentRequest": ReplaceDocumentRequest,
    "ResponseError": ResponseErrorClass,
    "ResponseErrorDetails": ResponseErrorDetails,
    "SearchQuery": SearchQuery,
    "SearchRequest": SearchRequest,
    "SearchResponse": SearchResponse,
    "SearchResponseHits": SearchResponseHits,
    "SourceRules": SourceRules,
    "SqlObjResponse": SqlObjResponse,
    "SqlResponse": SqlResponseClass,
    "SuccessResponse": SuccessResponse,
    "UpdateDocumentRequest": UpdateDocumentRequest,
    "UpdateResponse": UpdateResponse,
}

type MimeTypeDescriptor = {
    type: string;
    subtype: string;
    subtypeTokens: string[];
};

/**
 * Every mime-type consists of a type, subtype, and optional parameters.
 * The subtype can be composite, including information about the content format.
 * For example: `application/json-patch+json`, `application/merge-patch+json`.
 *
 * This helper transforms a string mime-type into an internal representation.
 * This simplifies the implementation of predicates that in turn define common rules for parsing or stringifying
 * the payload.
 */
const parseMimeType = (mimeType: string): MimeTypeDescriptor => {
    const [type = '', subtype = ''] = mimeType.split('/');
    return {
        type,
        subtype,
        subtypeTokens: subtype.split('+'),
    };
};

type MimeTypePredicate = (mimeType: string) => boolean;

// This factory creates a predicate function that checks a string mime-type against defined rules.
const mimeTypePredicateFactory = (predicate: (descriptor: MimeTypeDescriptor) => boolean): MimeTypePredicate => (mimeType) => predicate(parseMimeType(mimeType));

// Use this factory when you need to define a simple predicate based only on type and, if applicable, subtype.
const mimeTypeSimplePredicateFactory = (type: string, subtype?: string): MimeTypePredicate => mimeTypePredicateFactory((descriptor) => {
    if (descriptor.type !== type) return false;
    if (subtype != null && descriptor.subtype !== subtype) return false;
    return true;
});

// Creating a set of named predicates that will help us determine how to handle different mime-types
const isTextLikeMimeType = mimeTypeSimplePredicateFactory('text');
const isJsonMimeType = mimeTypeSimplePredicateFactory('application', 'json');
const isJsonLikeMimeType = mimeTypePredicateFactory((descriptor) => descriptor.type === 'application' && descriptor.subtypeTokens.some((item) => item === 'json' || item === 'x-ndjson'));
const isOctetStreamMimeType = mimeTypeSimplePredicateFactory('application', 'octet-stream');
const isFormUrlencodedMimeType = mimeTypeSimplePredicateFactory('application', 'x-www-form-urlencoded');

// Defining a list of mime-types in the order of prioritization for handling.
const supportedMimeTypePredicatesWithPriority: MimeTypePredicate[] = [
    isJsonMimeType,
    isJsonLikeMimeType,
    isTextLikeMimeType,
    isOctetStreamMimeType,
    isFormUrlencodedMimeType,
];

const nullableSuffix = " | null";
const optionalSuffix = " | undefined";
const arrayPrefix = "Array<";
const arraySuffix = ">";
const mapPrefix = "{ [key: string]: ";
const mapSuffix = "; }";

const JSONbig = require('json-bigint')({
	useNativeBigInt: true,
});

export class ObjectSerializer {
    public static findCorrectType(data: any, expectedType: string) {
        if (data == undefined) {
            return expectedType;
        } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        } else if (expectedType === "Date") {
            return expectedType;
        } else {
            if (enumsMap.has(expectedType)) {
                return expectedType;
            }

            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }

            // Check the discriminator
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            } else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    let mapping = typeMap[expectedType].mapping;
                    if (mapping != undefined && mapping[discriminatorType]) {
                        return mapping[discriminatorType]; // use the type given in the discriminator
                    } else if(typeMap[discriminatorType]) {
                        return discriminatorType;
                    } else {
                        return expectedType; // discriminator did not map to a type
                    }
                } else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }

    public static serialize(data: any, type: string, format: string): any {
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.endsWith(nullableSuffix)) {
            let subType: string = type.slice(0, -nullableSuffix.length); // Type | null => Type
            return ObjectSerializer.serialize(data, subType, format);
        } else if (type.endsWith(optionalSuffix)) {
            let subType: string = type.slice(0, -optionalSuffix.length); // Type | undefined => Type
            return ObjectSerializer.serialize(data, subType, format);
        } else if (type.startsWith(arrayPrefix)) {
            let subType: string = type.slice(arrayPrefix.length, -arraySuffix.length); // Array<Type> => Type
            let transformedData: any[] = [];
            for (let date of data) {
                transformedData.push(ObjectSerializer.serialize(date, subType, format));
            }
            return transformedData;
        } else if (type.startsWith(mapPrefix)) {
            let subType: string = type.slice(mapPrefix.length, -mapSuffix.length); // { [key: string]: Type; } => Type
            let transformedData: { [key: string]: any } = {};
            for (let key in data) {
                transformedData[key] = ObjectSerializer.serialize(
                    data[key],
                    subType,
                    format,
                );
            }
            return transformedData;
        } else if (type === "Date") {
            if (format == "date") {
                let month = data.getMonth()+1
                month = month < 10 ? "0" + month.toString() : month.toString()
                let day = data.getDate();
                day = day < 10 ? "0" + day.toString() : day.toString();

                return data.getFullYear() + "-" + month + "-" + day;
            } else {
                return data.toISOString();
            }
        } else {
            if (enumsMap.has(type)) {
                return data;
            }
            if (!typeMap[type]) { // in case we dont know the type
                return data;
            }

            // Get the actual type of this object
            type = this.findCorrectType(data, type);

            // get the map for the correct type.
            try {
	            let attributeTypes = typeMap[type].getAttributeTypeMap();
	            let instance: {[index: string]: any} = {};
	            for (let attributeType of attributeTypes) {
	                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type, attributeType.format);
	            }
	            return instance;
	        } catch (e) {
                return data;
            }
        }
    }

    public static deserialize(data: any, type: string, format: string): any {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.endsWith(nullableSuffix)) {
            let subType: string = type.slice(0, -nullableSuffix.length); // Type | null => Type
            return ObjectSerializer.deserialize(data, subType, format);
        } else if (type.endsWith(optionalSuffix)) {
            let subType: string = type.slice(0, -optionalSuffix.length); // Type | undefined => Type
            return ObjectSerializer.deserialize(data, subType, format);
        } else if (type.startsWith(arrayPrefix)) {
            let subType: string = type.slice(arrayPrefix.length, -arraySuffix.length); // Array<Type> => Type
            let transformedData: any[] = [];
            for (let date of data) {
                transformedData.push(ObjectSerializer.deserialize(date, subType, format));
            }
            return transformedData;
        } else if (type.startsWith(mapPrefix)) {
            let subType: string = type.slice(mapPrefix.length, -mapSuffix.length); // { [key: string]: Type; } => Type
            let transformedData: { [key: string]: any } = {};
            for (let key in data) {
                transformedData[key] = ObjectSerializer.deserialize(
                    data[key],
                    subType,
                    format,
                );
            }
            return transformedData;
        } else if (type === "Date") {
            return new Date(data);
        } else {
            if (enumsMap.has(type)) {// is Enum
                return data;
            }

            if (!typeMap[type]) { // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            try {
                let attributeTypes = typeMap[type].getAttributeTypeMap();
                for (let attributeType of attributeTypes) {
                    let value = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type, attributeType.format);
                    if (value !== undefined) {
                        instance[attributeType.name] = value;
                    }
                }
                return instance;
            } catch (e) {
                return data;
            }
        }
    }


    /**
     * Normalize media type
     *
     * We currently do not handle any media types attributes, i.e. anything
     * after a semicolon. All content is assumed to be UTF-8 compatible.
     */
    public static normalizeMediaType(mediaType: string | undefined): string | undefined {
        if (mediaType === undefined) {
            return undefined;
        }
        return (mediaType.split(";")[0] ?? '').trim().toLowerCase();
    }

    /**
     * From a list of possible media types, choose the one we can handle best.
     *
     * The order of the given media types does not have any impact on the choice
     * made.
     */
    public static getPreferredMediaType(mediaTypes: Array<string>): string {
        /** According to OAS 3 we should default to json */
        if (mediaTypes.length === 0) {
            return "application/json";
        }

        const normalMediaTypes = mediaTypes.map(this.normalizeMediaType);

        for (const predicate of supportedMimeTypePredicatesWithPriority) {
            for (const mediaType of normalMediaTypes) {
                if (mediaType != null && predicate(mediaType)) {
                    return mediaType;
                }
            }
        }

        throw new Error("None of the given media types are supported: " + mediaTypes.join(", "));
    }

    /**
     * Convert data to a string according the given media type
     */
    public static stringify(data: any, mediaType: string): string {
        if (isTextLikeMimeType(mediaType)) {
            return String(data);
        }

        if (isJsonLikeMimeType(mediaType)) {
            return JSONbig.stringify(data);
        }

        throw new Error("The mediaType " + mediaType + " is not supported by ObjectSerializer.stringify.");
    }

    /**
     * Parse data from a string according to the given media type
     */
    public static parse(rawData: string, mediaType: string | undefined) {
        if (mediaType === undefined) {
            throw new Error("Cannot parse content. No Content-Type defined.");
        }

        if (isTextLikeMimeType(mediaType)) {
            return rawData;
        }

        if (isJsonLikeMimeType(mediaType)) {
            return JSONbig.parse(rawData);
        }

        throw new Error("The mediaType " + mediaType + " is not supported by ObjectSerializer.parse.");
    }
}
