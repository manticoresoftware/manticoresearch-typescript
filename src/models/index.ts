/* tslint:disable */
/* eslint-disable */
/**
 * Query aggregation object
 * @export
 * @interface Aggregation
 */
export interface Aggregation {
    /**
     * 
     * @type {string}
     * @memberof Aggregation
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof Aggregation
     */
    field: string;
    /**
     * 
     * @type {number}
     * @memberof Aggregation
     */
    size?: number;
}
/**
 * Boolean attribute filter
 * @export
 * @interface BoolFilter
 */
export interface BoolFilter {
    /**
     * 
     * @type {Array<object>}
     * @memberof BoolFilter
     */
    should?: Array<object>;
    /**
     * 
     * @type {Array<object>}
     * @memberof BoolFilter
     */
    must?: Array<object>;
    /**
     * 
     * @type {Array<object>}
     * @memberof BoolFilter
     */
    must_not?: Array<object>;
}
/**
 * Success bulk response
 * @export
 * @interface BulkResponse
 */
export interface BulkResponse {
    [key: string]: any | any;
    /**
     * 
     * @type {object}
     * @memberof BulkResponse
     */
    items?: object;
    /**
     * 
     * @type {boolean}
     * @memberof BulkResponse
     */
    error?: boolean;
}
/**
 * Payload for delete request.
 * Documents can be deleted either one by one by specifying the document id or by providing a query object.
 * For more information see  [Delete API](https://manual.manticoresearch.com/Deleting_documents)
 * @export
 * @interface DeleteDocumentRequest
 */
export interface DeleteDocumentRequest {
    /**
     * Index name
     * @type {string}
     * @memberof DeleteDocumentRequest
     */
    index: string;
    /**
     * cluster name
     * @type {string}
     * @memberof DeleteDocumentRequest
     */
    cluster?: string;
    /**
     * Document ID
     * @type {number}
     * @memberof DeleteDocumentRequest
     */
    id?: number;
    /**
     * Query tree object
     * @type {object}
     * @memberof DeleteDocumentRequest
     */
    query?: object;
}
/**
 * Success response
 * @export
 * @interface DeleteResponse
 */
export interface DeleteResponse {
    /**
     * 
     * @type {string}
     * @memberof DeleteResponse
     */
    _index?: string;
    /**
     * 
     * @type {number}
     * @memberof DeleteResponse
     */
    deleted?: number;
    /**
     * 
     * @type {number}
     * @memberof DeleteResponse
     */
    _id?: number;
    /**
     * 
     * @type {string}
     * @memberof DeleteResponse
     */
    result?: string;
}
/**
 * Equals attribute filter
 * @export
 * @interface EqualsFilter
 */
export interface EqualsFilter {
    /**
     * 
     * @type {string}
     * @memberof EqualsFilter
     */
    field: string;
    /**
     * 
     * @type {object}
     * @memberof EqualsFilter
     */
    value: object;
}
/**
 * Error response
 * @export
 * @interface ErrorResponse
 */
export interface ErrorResponse {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof ErrorResponse
     */
    error: { [key: string]: any; };
    /**
     * 
     * @type {number}
     * @memberof ErrorResponse
     */
    status: number;
}
/**
 * Query FACET expression
 * @export
 * @interface Facet
 */
export interface Facet {
    /**
     * The name of an attribute to facet
     * @type {string}
     * @memberof Facet
     */
    attr: string;
    /**
     * Facet alias
     * @type {string}
     * @memberof Facet
     */
    alias?: string;
    /**
     * The number of facet values to return
     * @type {number}
     * @memberof Facet
     */
    limit?: number;
}
/**
 * Query filter
 * @export
 * @interface FilterBoolean
 */
export interface FilterBoolean {
    /**
     * 
     * @type {string}
     * @memberof FilterBoolean
     */
    filter_field: string;
    /**
     * 
     * @type {string}
     * @memberof FilterBoolean
     */
    operation: string;
    /**
     * 
     * @type {boolean}
     * @memberof FilterBoolean
     */
    filter_value: boolean;
}
/**
 * Query filter
 * @export
 * @interface FilterNumber
 */
export interface FilterNumber {
    /**
     * 
     * @type {string}
     * @memberof FilterNumber
     */
    filter_field: string;
    /**
     * 
     * @type {string}
     * @memberof FilterNumber
     */
    operation: string;
    /**
     * 
     * @type {number}
     * @memberof FilterNumber
     */
    filter_value: number;
}
/**
 * Query filter
 * @export
 * @interface FilterString
 */
export interface FilterString {
    /**
     * 
     * @type {string}
     * @memberof FilterString
     */
    filter_field: string;
    /**
     * 
     * @type {string}
     * @memberof FilterString
     */
    operation: string;
    /**
     * 
     * @type {string}
     * @memberof FilterString
     */
    filter_value: string;
}
/**
 * Geo distance attribute filter
 * @export
 * @interface GeoDistanceFilter
 */
export interface GeoDistanceFilter {
    /**
     * 
     * @type {GeoDistanceFilterLocationAnchor}
     * @memberof GeoDistanceFilter
     */
    location_anchor?: GeoDistanceFilterLocationAnchor;
    /**
     * Attribute containing latitude and longitude data
     * @type {string}
     * @memberof GeoDistanceFilter
     */
    location_source?: string;
    /**
     * 
     * @type {string}
     * @memberof GeoDistanceFilter
     */
    distance_type?: GeoDistanceFilterDistanceTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof GeoDistanceFilter
     */
    distance?: string;
}

/**
* @export
* @enum {string}
*/
export enum GeoDistanceFilterDistanceTypeEnum {
    adaptive = 'adaptive',
    haversine = 'haversine'
}

/**
 * Geo pin point object
 * @export
 * @interface GeoDistanceFilterLocationAnchor
 */
export interface GeoDistanceFilterLocationAnchor {
    /**
     * Geo latitude of pin point in degrees
     * @type {number}
     * @memberof GeoDistanceFilterLocationAnchor
     */
    lat?: number;
    /**
     * Geo longitude pf pin point in degrees
     * @type {number}
     * @memberof GeoDistanceFilterLocationAnchor
     */
    lon?: number;
}
/**
 * Query HIGHLIGHT expression
 * @export
 * @interface Highlight
 */
export interface Highlight {
    /**
     * 
     * @type {Array<string>}
     * @memberof Highlight
     */
    fieldnames?: Array<string>;
    /**
     * 
     * @type {Array<HighlightField>}
     * @memberof Highlight
     */
    fields?: Array<HighlightField>;
    /**
     * 
     * @type {string}
     * @memberof Highlight
     */
    encoder?: HighlightEncoderEnum;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof Highlight
     */
    highlight_query?: { [key: string]: any; } | null;
    /**
     * 
     * @type {string}
     * @memberof Highlight
     */
    pre_tags?: string;
    /**
     * 
     * @type {string}
     * @memberof Highlight
     */
    post_tags?: string;
    /**
     * 
     * @type {number}
     * @memberof Highlight
     */
    no_match_size?: HighlightNoMatchSizeEnum;
    /**
     * 
     * @type {number}
     * @memberof Highlight
     */
    fragment_size?: number;
    /**
     * 
     * @type {number}
     * @memberof Highlight
     */
    number_of_fragments?: number;
    /**
     * 
     * @type {number}
     * @memberof Highlight
     */
    limit?: number;
    /**
     * 
     * @type {number}
     * @memberof Highlight
     */
    limit_words?: number;
    /**
     * 
     * @type {number}
     * @memberof Highlight
     */
    limit_snippets?: number;
    /**
     * 
     * @type {boolean}
     * @memberof Highlight
     */
    limits_per_field?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Highlight
     */
    use_boundaries?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Highlight
     */
    force_all_words?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Highlight
     */
    allow_empty?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Highlight
     */
    emit_zones?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Highlight
     */
    force_snippets?: boolean;
    /**
     * 
     * @type {number}
     * @memberof Highlight
     */
    around?: number;
    /**
     * 
     * @type {number}
     * @memberof Highlight
     */
    start_snippet_id?: number;
    /**
     * 
     * @type {string}
     * @memberof Highlight
     */
    html_strip_mode?: HighlightHtmlStripModeEnum;
    /**
     * 
     * @type {string}
     * @memberof Highlight
     */
    snippet_boundary?: HighlightSnippetBoundaryEnum;
}

/**
* @export
* @enum {string}
*/
export enum HighlightEncoderEnum {
    default = 'default',
    html = 'html'
}
/**
* @export
* @enum {string}
*/
export enum HighlightNoMatchSizeEnum {
    NUMBER_0 = 0,
    NUMBER_1 = 1
}
/**
* @export
* @enum {string}
*/
export enum HighlightHtmlStripModeEnum {
    none = 'none',
    strip = 'strip',
    index = 'index',
    retain = 'retain'
}
/**
* @export
* @enum {string}
*/
export enum HighlightSnippetBoundaryEnum {
    sentence = 'sentence',
    paragraph = 'paragraph',
    zone = 'zone'
}

/**
 * Query Highlight field with options set
 * @export
 * @interface HighlightField
 */
export interface HighlightField {
    /**
     * 
     * @type {string}
     * @memberof HighlightField
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof HighlightField
     */
    limit?: number;
    /**
     * 
     * @type {number}
     * @memberof HighlightField
     */
    limit_words?: number;
    /**
     * 
     * @type {number}
     * @memberof HighlightField
     */
    limit_snippets?: number;
}
/**
 * In attribute filter
 * @export
 * @interface InFilter
 */
export interface InFilter {
    /**
     * 
     * @type {string}
     * @memberof InFilter
     */
    field: string;
    /**
     * 
     * @type {Array<object>}
     * @memberof InFilter
     */
    values: Array<object>;
}
/**
 * Object with document data.
 * @export
 * @interface InsertDocumentRequest
 */
export interface InsertDocumentRequest {
    /**
     * Name of the index
     * @type {string}
     * @memberof InsertDocumentRequest
     */
    index: string;
    /**
     * cluster name
     * @type {string}
     * @memberof InsertDocumentRequest
     */
    cluster?: string;
    /**
     * Document ID.
     * @type {number}
     * @memberof InsertDocumentRequest
     */
    id?: number;
    /**
     * Object with document data
     * @type {{ [key: string]: any; }}
     * @memberof InsertDocumentRequest
     */
    doc: { [key: string]: any; };
}
/**
 * Query match filter
 * @export
 * @interface MatchFilter
 */
export interface MatchFilter {
    /**
     * 
     * @type {string}
     * @memberof MatchFilter
     */
    query_string: string;
    /**
     * 
     * @type {string}
     * @memberof MatchFilter
     */
    query_fields: string;
}
/**
 * Query match expression with logical operator
 * @export
 * @interface MatchOp
 */
export interface MatchOp {
    /**
     * 
     * @type {object}
     * @memberof MatchOp
     */
    query_info: object;
}
/**
 * Query match expression
 * @export
 * @interface MatchOpFilter
 */
export interface MatchOpFilter {
    /**
     * 
     * @type {string}
     * @memberof MatchOpFilter
     */
    query_string: string;
    /**
     * 
     * @type {string}
     * @memberof MatchOpFilter
     */
    query_fields: string;
    /**
     * 
     * @type {string}
     * @memberof MatchOpFilter
     */
    operator: MatchOpFilterOperatorEnum;
}

/**
* @export
* @enum {string}
*/
export enum MatchOpFilterOperatorEnum {
    or = 'or',
    and = 'and'
}

/**
 * Query match expression
 * @export
 * @interface MatchPhraseFilter
 */
export interface MatchPhraseFilter {
    /**
     * 
     * @type {string}
     * @memberof MatchPhraseFilter
     */
    query_phrase: string;
    /**
     * 
     * @type {string}
     * @memberof MatchPhraseFilter
     */
    query_fields: string;
}
/**
 * Query filter
 * @export
 * @interface NotFilterBoolean
 */
export interface NotFilterBoolean {
    /**
     * 
     * @type {string}
     * @memberof NotFilterBoolean
     */
    filter_field: string;
    /**
     * 
     * @type {string}
     * @memberof NotFilterBoolean
     */
    operation: string;
    /**
     * 
     * @type {boolean}
     * @memberof NotFilterBoolean
     */
    filter_value: boolean;
}
/**
 * Query filter
 * @export
 * @interface NotFilterNumber
 */
export interface NotFilterNumber {
    /**
     * 
     * @type {string}
     * @memberof NotFilterNumber
     */
    filter_field: string;
    /**
     * 
     * @type {string}
     * @memberof NotFilterNumber
     */
    operation: string;
    /**
     * 
     * @type {number}
     * @memberof NotFilterNumber
     */
    filter_value: number;
}
/**
 * Query filter
 * @export
 * @interface NotFilterString
 */
export interface NotFilterString {
    /**
     * 
     * @type {string}
     * @memberof NotFilterString
     */
    filter_field: string;
    /**
     * 
     * @type {string}
     * @memberof NotFilterString
     */
    operation: string;
    /**
     * 
     * @type {string}
     * @memberof NotFilterString
     */
    filter_value: string;
}
/**
 * Object with documents to percolate
 * @export
 * @interface PercolateRequest
 */
export interface PercolateRequest {
    /**
     * 
     * @type {PercolateRequestQuery}
     * @memberof PercolateRequest
     */
    query: PercolateRequestQuery;
}
/**
 * 
 * @export
 * @interface PercolateRequestQuery
 */
export interface PercolateRequestQuery {
    [key: string]: any | any;
    /**
     * 
     * @type {object}
     * @memberof PercolateRequestQuery
     */
    percolate: object;
}
/**
 * Query string filter
 * @export
 * @interface QueryFilter
 */
export interface QueryFilter {
    /**
     * 
     * @type {string}
     * @memberof QueryFilter
     */
    query_string: string;
}
/**
 * Range attribute filter
 * @export
 * @interface RangeFilter
 */
export interface RangeFilter {
    /**
     * 
     * @type {string}
     * @memberof RangeFilter
     */
    field: string;
    /**
     * 
     * @type {number}
     * @memberof RangeFilter
     */
    lte?: number | null;
    /**
     * 
     * @type {number}
     * @memberof RangeFilter
     */
    gte?: number | null;
    /**
     * 
     * @type {number}
     * @memberof RangeFilter
     */
    lt?: number | null;
    /**
     * 
     * @type {number}
     * @memberof RangeFilter
     */
    gt?: number | null;
}
/**
 * Request object for search operation
 * @export
 * @interface SearchRequest
 */
export interface SearchRequest {
    /**
     * 
     * @type {string}
     * @memberof SearchRequest
     */
    index: string;
    /**
     * 
     * @type {object}
     * @memberof SearchRequest
     */
    query?: object;
    /**
     * 
     * @type {object}
     * @memberof SearchRequest
     */
    fulltext_filter?: object;
    /**
     * 
     * @type {object}
     * @memberof SearchRequest
     */
    attr_filter?: object;
    /**
     * 
     * @type {number}
     * @memberof SearchRequest
     */
    limit?: number;
    /**
     * 
     * @type {number}
     * @memberof SearchRequest
     */
    offset?: number;
    /**
     * 
     * @type {number}
     * @memberof SearchRequest
     */
    max_matches?: number;
    /**
     * 
     * @type {Array<object>}
     * @memberof SearchRequest
     */
    sort?: Array<object>;
    /**
     * 
     * @type {Array<Aggregation>}
     * @memberof SearchRequest
     */
    aggs?: Array<Aggregation>;
    /**
     * 
     * @type {Array<object>}
     * @memberof SearchRequest
     */
    expressions?: Array<object>;
    /**
     * 
     * @type {Highlight}
     * @memberof SearchRequest
     */
    highlight?: Highlight;
    /**
     * 
     * @type {object}
     * @memberof SearchRequest
     */
    source?: object;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof SearchRequest
     */
    options?: { [key: string]: any; };
    /**
     * 
     * @type {boolean}
     * @memberof SearchRequest
     */
    profile?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SearchRequest
     */
    track_scores?: boolean;
}
/**
 * Response object of a search request
 * @export
 * @interface SearchResponse
 */
export interface SearchResponse {
    /**
     * 
     * @type {number}
     * @memberof SearchResponse
     */
    took?: number;
    /**
     * 
     * @type {boolean}
     * @memberof SearchResponse
     */
    timed_out?: boolean;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof SearchResponse
     */
    aggregations?: { [key: string]: any; };
    /**
     * 
     * @type {SearchResponseHits}
     * @memberof SearchResponse
     */
    hits?: SearchResponseHits;
    /**
     * 
     * @type {object}
     * @memberof SearchResponse
     */
    profile?: object;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof SearchResponse
     */
    warning?: { [key: string]: any; };
}
/**
 * 
 * @export
 * @interface SearchResponseHits
 */
export interface SearchResponseHits {
    /**
     * 
     * @type {number}
     * @memberof SearchResponseHits
     */
    max_score?: number;
    /**
     * 
     * @type {number}
     * @memberof SearchResponseHits
     */
    total?: number;
    /**
     * 
     * @type {string}
     * @memberof SearchResponseHits
     */
    total_relation?: string;
    /**
     * 
     * @type {Array<object>}
     * @memberof SearchResponseHits
     */
    hits?: Array<object>;
}
/**
 * Query sort expression for MVA attributes
 * @export
 * @interface SortMVA
 */
export interface SortMVA {
    /**
     * 
     * @type {string}
     * @memberof SortMVA
     */
    attr: string;
    /**
     * 
     * @type {string}
     * @memberof SortMVA
     */
    order: SortMVAOrderEnum;
    /**
     * 
     * @type {string}
     * @memberof SortMVA
     */
    mode: SortMVAModeEnum;
}

/**
* @export
* @enum {string}
*/
export enum SortMVAOrderEnum {
    asc = 'asc',
    desc = 'desc'
}
/**
* @export
* @enum {string}
*/
export enum SortMVAModeEnum {
    min = 'min',
    max = 'max'
}

/**
 * Query sort expression for multiple attributes
 * @export
 * @interface SortMultiple
 */
export interface SortMultiple {
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof SortMultiple
     */
    attrs: { [key: string]: any; };
    /**
     * 
     * @type {boolean}
     * @memberof SortMultiple
     */
    replace: boolean;
}
/**
 * Query sort expression
 * @export
 * @interface SortOrder
 */
export interface SortOrder {
    /**
     * 
     * @type {string}
     * @memberof SortOrder
     */
    attr: string;
    /**
     * 
     * @type {string}
     * @memberof SortOrder
     */
    order: SortOrderOrderEnum;
}

/**
* @export
* @enum {string}
*/
export enum SortOrderOrderEnum {
    asc = 'asc',
    desc = 'desc'
}

/**
 * Query fields to be included/excluded to/from response
 * @export
 * @interface SourceByRules
 */
export interface SourceByRules {
    /**
     * 
     * @type {Array<string>}
     * @memberof SourceByRules
     */
    includes: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof SourceByRules
     */
    excludes: Array<string>;
}
/**
 * Success response
 * @export
 * @interface SuccessResponse
 */
export interface SuccessResponse {
    /**
     * 
     * @type {string}
     * @memberof SuccessResponse
     */
    _index?: string;
    /**
     * 
     * @type {number}
     * @memberof SuccessResponse
     */
    _id?: number;
    /**
     * 
     * @type {boolean}
     * @memberof SuccessResponse
     */
    created?: boolean;
    /**
     * 
     * @type {string}
     * @memberof SuccessResponse
     */
    result?: string;
    /**
     * 
     * @type {boolean}
     * @memberof SuccessResponse
     */
    found?: boolean;
}
/**
 * Payload for update document
 * @export
 * @interface UpdateDocumentRequest
 */
export interface UpdateDocumentRequest {
    /**
     * 
     * @type {string}
     * @memberof UpdateDocumentRequest
     */
    index: string;
    /**
     * Index name
     * @type {{ [key: string]: any; }}
     * @memberof UpdateDocumentRequest
     */
    doc: { [key: string]: any; };
    /**
     * Document ID
     * @type {number}
     * @memberof UpdateDocumentRequest
     */
    id?: number;
    /**
     * Query tree object
     * @type {{ [key: string]: any; }}
     * @memberof UpdateDocumentRequest
     */
    query?: { [key: string]: any; } | null;
}
/**
 * Success response
 * @export
 * @interface UpdateResponse
 */
export interface UpdateResponse {
    /**
     * 
     * @type {string}
     * @memberof UpdateResponse
     */
    _index?: string;
    /**
     * 
     * @type {number}
     * @memberof UpdateResponse
     */
    updated?: number;
    /**
     * 
     * @type {number}
     * @memberof UpdateResponse
     */
    _id?: number;
    /**
     * 
     * @type {string}
     * @memberof UpdateResponse
     */
    result?: string;
}
