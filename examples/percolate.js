var Manticoresearch = require("../");

async function main() {
  // Configure client (optional)
  const serverConfig = new Manticoresearch.ServerConfiguration("http://localhost:9308", {});
  const config = Manticoresearch.createConfiguration({ baseServer: serverConfig });

  // Create API clients
  const utilsApi = new Manticoresearch.UtilsApi(config);
  const searchApi = new Manticoresearch.SearchApi(config);

  // Create percolate table
  await utilsApi.sql("DROP TABLE IF EXISTS pq_products");
  await utilsApi.sql("CREATE TABLE pq_products(title text, color string) type='pq'");

  // Add rules to percolate table
  await utilsApi.sql("INSERT INTO pq_products(query) VALUES('@title bag')");
  await utilsApi.sql("INSERT INTO pq_products(query, filters) VALUES('@title shoes', 'color=\\'red\\'')");
  await utilsApi.sql("INSERT INTO pq_products(query, filters) VALUES('@title shoes', 'color IN (\\'blue\\', \\'green\\')')");
  
  // Perform percolate search
  const percolateResp = await searchApi.percolate(
    "pq_products",
    {
      query: {
        percolate: {
          document: {
            title: "Good shoes",
            color: "red",
          },
        },
      }
    } as any
  );

  // Correct display of documents id-s in json requires using json-bigint
  const JSONbig = require('json-bigint')({
    useNativeBigInt: true,
  });
  console.log("Percolate search response:", JSONbig.stringify(percolateResp, null, 2));
}

main().catch(console.error);
