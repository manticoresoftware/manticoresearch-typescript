import { assert, expect } from 'chai';
import * as Manticoresearch from '../src';

var indexApi: Manticoresearch.IndexApi;
var searchApi: Manticoresearch.SearchApi;
var utilsApi: Manticoresearch.UtilsApi;

beforeEach(function () {
  const config = new Manticoresearch.Configuration({
    basePath: "http://localhost:9408",
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
      res = await utilsApi.sql(
        "CREATE TABLE IF NOT EXISTS test (content text, name string, cat int, type_vector float_vector knn_type='hnsw' knn_dims='3' hnsw_similarity='l2')"
      );
      expect(res).to.deep.equal(expected);

      res = await utilsApi.sql('SHOW TABLES', true);
      expect(res[0]).to.include({ total: 1 });
      res = await utilsApi.sql('SELECT * FROM test', false);
      expect(res).to.deep.nested.property('hits.total', 0);
    } catch (e) {
      const errorResponse = e instanceof Manticoresearch.ResponseError ? await e.response.json() : e;
      console.error('Error response:', JSON.stringify(errorResponse, null, 2));
      expect(e).to.be.null;
    }
  });
});

describe('Index API Tests', () => {
  it('Testing index api operations', async function () {
    try {
      await utilsApi.sql('TRUNCATE TABLE test');

      let res = await indexApi.insert({
        index: 'test',
        id: 1,
        doc: { content: 'Text 1', name: 'Doc 1', cat: 1, type_vector: [0.2, 1.4, -2.3] },
      });
      expect(res).to.include({ _id: 1, result: 'created' });

      res = await indexApi.insert({
        index: 'test',
        id: 2,
        doc: { content: 'Text 2', name: 'Doc 2', cat: 2, type_vector: [0.8, 0.4, 1.3] },
      });
      res = await indexApi.insert({
        index: 'test',
        id: 3,
        doc: { content: 'Text 3', name: 'Doc 3', cat: 7, type_vector: [1.5, -1.0, 1.6] },
      });

      res = await indexApi.replace({
        index: 'test',
        id: 2,
        doc: { content: 'Text21', cat: 3, type_vector: [0.8, 0.4, 1.3] },
      });
      expect(res).to.include({ _id: 2, result: 'updated' });
      let testRes = await utilsApi.sql('SELECT * FROM test WHERE id=2', false);
      expect(testRes).to.deep.nested.property('hits.hits[0]._source', {
        content: 'Text21',
        cat: 3,
        name: '',
        type_vector: [0.8, 0.4, 1.3],
      });

      let insertDocs = [
        {
          insert: {
            index: 'test',
            id: 4,
            doc: { content: 'Text 4', cat: 1, name: 'Doc 4', type_vector: [0.2, 1.4, -2.3] },
          },
        },
        {
          insert: {
            index: 'test',
            id: 5,
            doc: { content: 'Text 5', cat: 9, name: 'Doc 5', type_vector: [0.8, 0.4, 1.3] },
          },
        },
        {
          insert: {
            index: 'test',
            id: 6,
            doc: { content: 'Text 6', cat: 7, name: 'Doc 6', type_vector: [1.5, -1.0, 1.6] },
          },
        },
      ];

      let bulkRes = await indexApi.bulk(
        insertDocs.map((e) => JSON.stringify(e)).join("\n")
      );
      expect(bulkRes).to.property("errors", false);

      res = await indexApi.update({ index: "test", id: 1, doc: { cat: 10 } });
      expect(res).to.include({ _id: 1, result: "updated" });

      let updateDocs = [
        {
          update: {
            index: "test",
            doc: { cat: 10 },
            query: { equals: { cat: 7 } },
          },
        },
        {
          update: {
            index: "test",
            doc: { cat: 10 },
            query: { equals: { cat: 9 } },
          },
        },
      ];

      bulkRes = await indexApi.bulk(
        updateDocs.map((e) => JSON.stringify(e)).join('\n')
      );

      testRes = await utilsApi.sql(
        'SELECT COUNT(*) FROM test WHERE cat=10',
        false
      );
      expect(testRes).to.deep.nested.property('hits.hits[0]._source', {
        'count(*)': 4,
      });

      res = await indexApi.delete({ index: 'test', id: 1 });
      expect(res).to.include({ _id: 1, result: 'deleted' });

      res = await indexApi.delete({
        index: 'test',
        query: { match: { '*': 'Text21' } },
      });
      expect(res).to.property('deleted', 1);
    } catch (e) {
      const errorResponse = e instanceof Manticoresearch.ResponseError ? await e.response.json() : e;
      console.error('Error response:', JSON.stringify(errorResponse, null, 2));
      expect(e).to.be.null;
    }
  });
});

describe('Search Api Tests', () => {
  it('Testing search api operations', async function () {
    try {
      await utilsApi.sql('TRUNCATE TABLE test');
      let insertDocs = [
        {
          insert: {
            index: 'test',
            id: 1,
            doc: { content: 'Text 1', cat: 1, name: 'Doc 1', type_vector: [0.2, 1.4, -2.3] },
          },
        },
        {
          insert: {
            index: 'test',
            id: 2,
            doc: { content: 'Text 2', cat: 5, name: 'Doc 2', type_vector: [0.8, 0.4, 1.3]  },
          },
        },
        {
          insert: {
            index: 'test',
            id: 3,
            doc: { content: 'Text 3', cat: 10, name: 'Doc 3', type_vector: [1.5, -1.0, 1.6] },
          },
        },
        {
          insert: {
            index: 'test',
            id: 4,
            doc: { content: 'Text 4', cat: 7, name: 'Doc 4', type_vector: [0.4, 2.4, 0.9] },
          },
        },
        {
          insert: {
            index: 'test',
            id: 5,
            doc: { content: 'Text 5', cat: 8, name: 'Doc 5', type_vector: [0.2, 1.4, -2.3] },
          },
        },
      ];
      await indexApi.bulk(insertDocs.map((e) => JSON.stringify(e)).join('\n'));
      
      let res = await searchApi.search({
        index: 'test',
        query: { match_all: {} },
      });

      expect(res).to.deep.nested.property('hits.total', 5);

      res = await searchApi.search({
        index: 'test',
        query: { match_all: {} },
        options: { cutoff: 1 },
      });
      expect(res).to.deep.nested.property('hits.total', 1);

      res = await searchApi.search({
        index: 'test',
        query: {
          match_all: {},
          bool: { should: [{ equals: { cat: 1 } }, { in: { cat: [5, 10] } }] },
        },
        sort: [{ cat: 'desc' }],
      });
      expect(res).to.deep.nested.property('hits.total', 3);

      res = await searchApi.search({
        index: 'test',
        query: {
          match_all: {},
          bool: { should: [{ equals: { cat: 2 } }, { in: { cat: [3, 4] } }] },
        },
        sort: [{ cat: 'desc' }],
      });
      expect(res).to.deep.nested.property('hits.total', 0);
      console.log(res)

      res = await searchApi.search({
        index: 'test',
        knn: {
          field: "type_vector",
          query_vector: [1.5, -1.0, 1.6],
          k: 5,
        },
      });
      expect(res).to.deep.nested.property('hits.hits[0]._id', '3');
      
      res = await searchApi.search({
        index: 'test',
        knn: {
          field: "type_vector",
          doc_id: 2,
          k: 5,
        },
      });
      expect(res).to.deep.nested.property('hits.hits[0]._id', '3');
      
      res = await searchApi.search({
        index: 'test',
        knn: {
          field: "type_vector",
          query_vector: [1.5, -1.0, 1.6],
          k: 5,
          filter: {"bool": {"must": {"equals": {"id": 2} } } },
        },
      });
      expect(res).to.deep.nested.property('hits.total', 1);
      expect(res).to.deep.nested.property('hits.hits[0]._id', '2');
      
      res = await searchApi.search({
        index: 'test',
        knn: {
          field: "type_vector",
          doc_id: 2,
          k: 5,
          filter: {"bool": {"must": {"equals": {"id": 3} } } },
        },
      });
      expect(res).to.deep.nested.property('hits.total', 1);
      expect(res).to.deep.nested.property('hits.hits[0]._id', '3');
      
    } catch (e) {
      const errorResponse = e instanceof Manticoresearch.ResponseError ? await e.response.json() : e;
      console.error('Error response:', JSON.stringify(errorResponse, null, 2));
      expect(e).to.be.null;
    }
  });
  it('Testing search aggregation', async function () {
    try {
      const query: Manticoresearch.SearchRequest = {
        index: 'test',
        query: {
          match_all: {},
        },
        aggs: {
          categories: {
            terms: {
              field: 'cat',
              size: 3
            }
          }
        }
      };

      const result = await searchApi.search(query);
      expect(result).to.have.nested.property('aggregations.categories.buckets');
      expect(result.aggregations!.categories.buckets).to.have.lengthOf(3)
    } catch (err) {
      const errorResponse = err instanceof Manticoresearch.ResponseError ? await err.response.json() : err;
      console.error('Error response:', JSON.stringify(errorResponse, null, 2));
      expect(err).to.be.null;
    }
  });
  it('Testing search expressions', async function () {
    try {
      const query: Manticoresearch.SearchRequest = {
        index: 'test',
        query: {
          match_all: {},
        },
        expressions: {
          title_len: 'crc32(name)'
        }
      };

      const result = await searchApi.search(query);
      expect(result).to.have.nested.property('hits.hits[0]._source.title_len')
      expect((result.hits!.hits?.at(0) as any)._source!.name).to.equal('Doc 1')
      expect((result.hits!.hits?.at(0) as any)._source!.title_len).to.equal(2262810400) // === crc32("Doc 1")
    } catch (err) {
      const errorResponse = err instanceof Manticoresearch.ResponseError ? await err.response.json() : err;
      console.error('Error response:', JSON.stringify(errorResponse, null, 2));
      expect(err).to.be.null;
    }
  });
});
