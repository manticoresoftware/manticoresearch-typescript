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
  await utilsApi.sql(`CREATE TABLE products(title text, price float)`);

  // Populate table with documents
  await indexApi.insert({
	table: "products",
	doc: { title: "Running shoes for the woods", price: 99.9 }
  });
  
  await indexApi.insert({
	table: "products",
	doc: { title: "Trail running backpack", price: 79.0 }
  });

  await indexApi.insert({
	table: "products",
	doc: { title: "City backpack", price: 49.0 }
  });

  // Perform search using prepared JSON object for search query
  const resp = await searchApi.search({
    table: "products",
    query: { query_string: "@title running" },
    highlight: { fields: ["title"] },
  } as any);

  // Correct display of documents id-s in json requires using json-bigint
  const JSONbig = require('json-bigint')({
    useNativeBigInt: true,
  });
  console.log("Search response:", JSONbig.stringify(resp, null, 2));
}

main().catch(console.error);
