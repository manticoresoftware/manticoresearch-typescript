/* tslint:disable */
/* eslint-disable */
/*
 * Manticore Search Client
 * Copyright (c) 2020-2021, Manticore Software LTD (https://manticoresearch.com)
 *
 * All rights reserved
 */


import * as runtime from '../runtime';
import type {
  ErrorResponse,
} from '../models/index';

export interface SqlRequest {
    body: string;
    rawResponse?: boolean;
}

/**
 * 
 */
export class UtilsApi extends runtime.BaseAPI {

    /**
     * Run a query in SQL format. Expects a query string passed through `body` parameter and optional `raw_response` parameter that defines a format of response. `raw_response` can be set to `False` for Select queries only, e.g., `SELECT * FROM myindex` The query string must stay as it is, no URL encoding is needed. The response object depends on the query executed. In select mode the response has same format as `/search` operation. 
     * Perform SQL requests
     */
    async sqlRaw(requestParameters: SqlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<object>>> {
        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling sql.');
        }

        const queryParameters: any = {};

        if (requestParameters.rawResponse !== false) {
            queryParameters['mode'] = 'raw'
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'text/plain';

        const response = await this.request({
            path: `/sql`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: 'query=' + encodeURIComponent(requestParameters.body)
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Run a query in SQL format. Expects a query string passed through `body` parameter and optional `raw_response` parameter that defines a format of response. `raw_response` can be set to `False` for Select queries only, e.g., `SELECT * FROM myindex` The query string must stay as it is, no URL encoding is needed. The response object depends on the query executed. In select mode the response has same format as `/search` operation. 
     * Perform SQL requests
     */
    async sql(body: string, rawResponse?: boolean, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<object>> {
        const response = await this.sqlRaw({ body: body, rawResponse: rawResponse }, initOverrides);
        return await response.value();
    }

}
