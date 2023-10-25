import { assert, expect } from 'chai';
import * as Manticoresearch from '../src';

var indexApi: Manticoresearch.IndexApi;
var searchApi: Manticoresearch.SearchApi;
var utilsApi: Manticoresearch.UtilsApi;

beforeEach(function () {
  const config = new Manticoresearch.Configuration({
    basePath: 'http://localhost:9408',
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
      res = await utilsApi.sql('CREATE TABLE IF NOT EXISTS test (content text, name string, cat int)');
      expect(res).to.deep.equal(expected);

      res = await utilsApi.sql('SHOW TABLES', true);
      expect(res[0]).to.include({ total: 1 });
      res = await utilsApi.sql('SELECT * FROM test', false);
      expect(res).to.deep.nested.property('hits.total', 0);
    } catch (e) {
      console.error(e);
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
        doc: { content: 'Text 1', name: 'Doc 1', cat: 1 },
      });
      expect(res).to.include({ _id: 1, result: 'created' });

      res = await indexApi.insert({
        index: 'test',
        id: 2,
        doc: { content: 'Text 2', name: 'Doc 2', cat: 2 },
      });
      res = await indexApi.insert({
        index: 'test',
        id: 3,
        doc: { content: 'Text 3', name: 'Doc 3', cat: 7 },
      });

      res = await indexApi.replace({
        index: 'test',
        id: 2,
        doc: { content: 'Text21', cat: 3 },
      });
      expect(res).to.include({ _id: 2, result: 'updated' });
      let testRes = await utilsApi.sql('SELECT * FROM test WHERE id=2', false);
      expect(testRes).to.deep.nested.property('hits.hits[0]._source', {
        content: 'Text21',
        cat: 3,
        name: '',
      });

      let insertDocs = [
        {
          insert: {
            index: 'test',
            id: 4,
            doc: { content: 'Text 4', cat: 1, name: 'Doc 4' },
          },
        },
        {
          insert: {
            index: 'test',
            id: 5,
            doc: { content: 'Text 5', cat: 9, name: 'Doc 5' },
          },
        },
        {
          insert: {
            index: 'test',
            id: 6,
            doc: { content: 'Text 6', cat: 7, name: 'Doc 6' },
          },
        },
      ];

      let bulkRes = await indexApi.bulk(insertDocs.map((e) => JSON.stringify(e)).join('\n'));
      expect(bulkRes).to.property('errors', false);

      res = await indexApi.update({ index: 'test', id: 1, doc: { cat: 10 } });
      expect(res).to.include({ _id: 1, result: 'updated' });

      let updateDocs = [
        {
          update: {
            index: 'test',
            doc: { cat: 10 },
            query: { equals: { cat: 7 } },
          },
        },
        {
          update: {
            index: 'test',
            doc: { cat: 10 },
            query: { equals: { cat: 9 } },
          },
        },
      ];

      bulkRes = await indexApi.bulk(updateDocs.map((e) => JSON.stringify(e)).join('\n'));

      testRes = await utilsApi.sql('SELECT COUNT(*) FROM test WHERE cat=10', false);
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
      console.error(e);
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
            doc: { content: 'Text 1', cat: 1, name: 'Doc 1' },
          },
        },
        {
          insert: {
            index: 'test',
            id: 2,
            doc: { content: 'Text 2', cat: 5, name: 'Doc 2' },
          },
        },
        {
          insert: {
            index: 'test',
            id: 3,
            doc: { content: 'Text 3', cat: 10, name: 'Doc 3' },
          },
        },
        {
          insert: {
            index: 'test',
            id: 4,
            doc: { content: 'Text 4', cat: 7, name: 'Doc 4' },
          },
        },
        {
          insert: {
            index: 'test',
            id: 5,
            doc: { content: 'Text 5', cat: 8, name: 'Doc 5' },
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
    } catch (e) {
      console.error(e);
    }
  });
});
