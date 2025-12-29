var Manticoresearch = require("../");

async function main() {
  // Configure client (optional)
  const serverConfig = new Manticoresearch.ServerConfiguration("http://localhost:9308", {});
  const config = Manticoresearch.createConfiguration({ baseServer: serverConfig });

  // Create API clients
  const utilsApi = new Manticoresearch.UtilsApi(config);
  const indexApi = new Manticoresearch.IndexApi(config);
  const searchApi = new Manticoresearch.SearchApi(config);

  // Create table
  await utilsApi.sql(`DROP TABLE IF EXISTS products`);
  await utilsApi.sql(`CREATE TABLE products(title text, price float, category string)`);

  // Populate table with documents
  await indexApi.insert({
    table: "products",
    doc: { title: "Crossbody Bag with Tassel", price: 19.85, category: "bags" },
  });

  await indexApi.insert({
    table: "products",
    doc: { title: "Microfiber sheet set", price: 19.99, category: "home" },
  });

  await indexApi.insert({
    table: "products",
    doc: { title: "Leather wallet", price: 29.5, category: "accessories" },
  });

  // Perform search using SearchRequest + SearchQuery + Highlight objects
  const query = new Manticoresearch.SearchQuery();
  query.query_string = "@title bag";

  const req = new Manticoresearch.SearchRequest();
  req.table = "products";
  req.query = query;

  const hl = new Manticoresearch.Highlight();
  hl.fields = { title: {} } as any;
  req.highlight = hl;

  const resp = await searchApi.search(req);

  // Correct display of documents id-s in json requires using json-bigint
  const JSONbig = require('json-bigint')({
    useNativeBigInt: true,
  });
  console.log("Search response:", JSONbig.stringify(resp, null, 2));
}

main().catch(console.error);
