import { assert, expect } from 'chai';
import * as Manticoresearch from '../index';

var indexApi: Manticoresearch.IndexApi;
var searchApi: Manticoresearch.SearchApi;
var utilsApi: Manticoresearch.UtilsApi;

beforeEach(function () {
  const serverConfig = new Manticoresearch.ServerConfiguration("http://localhost:9408", {})
  const config = Manticoresearch.createConfiguration({
    baseServer: serverConfig,
  });
  indexApi = new Manticoresearch.IndexApi(config);
  searchApi = new Manticoresearch.SearchApi(config);
  utilsApi = new Manticoresearch.UtilsApi(config);
});

describe('Utils Api Tests', () => {
  it('Testing utils api operations', async function () {
    try {
      let expected: object = [{ total: 0, error: '', warning: '' }];
      let res = await utilsApi.sql('DROP TABLE IF EXISTS test');
      expect(res).to.deep.equal(expected);
      res = await utilsApi.sql('DROP TABLE IF EXISTS movies');
      res = await utilsApi.sql(
        'CREATE TABLE IF NOT EXISTS test (content text, name string, cat int)'
      );
      expect(res).to.deep.equal(expected);

      res = await utilsApi.sql('SHOW TABLES', true);
      console.log(res);
      if (Array.isArray(res)) 
        expect(res[0]).to.include({ total: 1 });
      res = await utilsApi.sql('SELECT * FROM test', false);
      console.log(res);
      expect(res).to.deep.nested.property('hits.total', 0);
    } catch (e) {
      const errorResponse = e && typeof e === 'object' && 'body' in e && e.body && typeof e.body === 'object' && 'error' in e.body ? e.body.error : e;
      console.error('Error response:', JSON.stringify(errorResponse, null, 2));
      expect(e).to.be.null;
    }
  });
});


describe('Search Api Tests', () => {
  it('Testing search api operations', async function () {
    try {
      
      let res =  await utilsApi.sql('DROP TABLE IF EXISTS movies');
      res =  await utilsApi.sql('CREATE TABLE IF NOT EXISTS movies (title text, plot text, year bigint, rating float, code multi)');

      let docs = [ 
        {"insert": {"table" : "movies", "id" : 1, "doc" : {"title" : "Star Trek 2: Nemesis", "plot": "The Enterprise is diverted to the Romulan homeworld Romulus, supposedly because they want to negotiate a peace treaty. Captain Picard and his crew discover a serious threat to the Federation once Praetor Shinzon plans to attack Earth.", "year": 2002, "rating": 6.4, "code": [1,2,3]}}},
        {"insert": {"table" : "movies", "id" : 2, "doc" : {"title" : "Star Trek 1: Nemesis", "plot": "The Enterprise is diverted to the Romulan homeworld Romulus, supposedly because they want to negotiate a peace treaty. Captain Picard and his crew discover a serious threat to the Federation once Praetor Shinzon plans to attack Earth.", "year": 2001, "rating": 6.5, "code": [1,12,3]}}},
        {"insert": {"table" : "movies", "id" : 3, "doc" : {"title" : "Star Trek 3: Nemesis", "plot": "The Enterprise is diverted to the Romulan homeworld Romulus, supposedly because they want to negotiate a peace treaty. Captain Picard and his crew discover a serious threat to the Federation once Praetor Shinzon plans to attack Earth.", "year": 2003, "rating": 6.6, "code": [11,2,3]}}},
        {"insert": {"table" : "movies", "id" : 4, "doc" : {"title" : "Star Trek 4: Nemesis", "plot": "The Enterprise is diverted to the Romulan homeworld Romulus, supposedly because they want to negotiate a peace treaty. Captain Picard and his crew discover a serious threat to the Federation once Praetor Shinzon plans to attack Earth.", "year": 100000000000, "rating": 6.5, "code": [1,2,4]}}}
      ];
      let bulkRes =  await indexApi.bulk(docs.map(e=>JSON.stringify(e)).join('\n'));
      
      let search_request = {"table":"movies"};
      
      let searchRes = await searchApi.search(search_request);
      expect(searchRes).to.deep.nested.property('hits.total', 4);

      let query_highlight = new Manticoresearch.Highlight()
      query_highlight.fields = {"title":{}}
      
      let search_query = new Manticoresearch.SearchQuery()
      search_query.query_string = "@title Trek 4"
      
      let search_request2 = new Manticoresearch.SearchRequest()
      search_request2.table = "movies"
      search_request2.limit = 1
      search_request2.query = search_query
      
      search_request2.highlight = query_highlight
      
      console.log("The response of SearchApi->search:\n")    
      let search_response = await searchApi.search(search_request2)    
      expect(search_response).to.deep.nested.property('hits.total', 1);
      if (typeof search_response.hits !== 'undefined' && typeof search_response.hits.hits !== 'undefined' && typeof search_response.hits.hits[0] !== 'undefined')
        console.log(search_response.hits.hits[0].highlight)

      search_response = await searchApi.search({"table": "movies", "query": {"query_string": "@title Trek 4"}, "highlight": {"fields": ["title"]}});
      expect(search_response).to.deep.nested.property('hits.total', 1);
      if (typeof search_response.hits !== 'undefined' && typeof search_response.hits.hits !== 'undefined' && typeof search_response.hits.hits[0] !== 'undefined')
        console.log(search_response.hits.hits[0].highlight)
    } catch (e) {
      const errorResponse = e && typeof e === 'object' && 'body' in e && e.body && typeof e.body === 'object' && 'error' in e.body ? e.body.error : e;
      console.error('Error response:', JSON.stringify(errorResponse, null, 2));
      expect(e).to.be.null;
    }
  });
});
