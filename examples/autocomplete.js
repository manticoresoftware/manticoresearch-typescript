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
  /** We add `min_infix_len` option when creating table to prevent Manticore from using its autocomplete cache.
   * Otherwise, incorrect results could be returned in this example.
   * For more details, see https://manual.manticoresearch.com/Searching/Autocomplete#Autocomplete
  */
  await utilsApi.sql(`CREATE TABLE products(title text, brand string) min_infix_len='2'`);

  // Populate table with documents
  await indexApi.insert({
    table: "products",
    doc: { title: "Nike Air Zoom Pegasus", brand: "Nike" }
  });
  await indexApi.insert({
    table: "products",
    doc: { title: "Nike Revolution", brand: "Nike" }
  });
  await indexApi.insert({
    table: "products",
    doc: { title: "Adidas Ultraboost", brand: "Adidas" }
  });

  // Perform autocomplete request
  const resp = await searchApi.autocomplete({
    table: "products",
    query: "ni"
  } as any);

  console.log("Autocomplete response:", JSON.stringify(resp, null, 2));
}

main().catch(console.error);
