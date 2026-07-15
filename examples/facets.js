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
  await utilsApi.sql("DROP TABLE IF EXISTS films");
  await utilsApi.sql(`CREATE TABLE films (title text, genre string, release_year int, rating float)`);

  // Populate table with documents
  await indexApi.insert({
	table: "films",
	id: 1,
	doc: { title: "Alien Center", genre: "sci-fi", release_year: 2009, rating: 4.9 }
  });
  await indexApi.insert({
	table: "films",
	id: 2,
	doc: { title: "Alice Fantasia", genre: "fantasy", release_year: 2009, rating: 4.7 }
  });
  await indexApi.insert({
	table: "films",
	id: 3,
	doc: { title: "Anthem Luke", genre: "drama", release_year: 2008, rating: 4.9 }
  });
  await indexApi.insert({
	table: "films",
	id: 4,
	doc: { title: "Attack Hate", genre: "drama", release_year: 2007, rating: 4.9 }
  });
  await indexApi.insert({
	table: "films",
	id: 5,
	doc: { title: "Aladdin Calendar", genre: "family", release_year: 2006, rating: 4.9 }
  });
  
  // Perform faceted search
  const resp = await searchApi.search({
    table: "films",
    limit: 0,
    query: { "match_all": {} },
    aggs: {
      genre: {
        terms: { field: "genre", size: 20 },
      },
      release_year: {
        terms: { field: "release_year", size: 50 },
      },
    },
  });

  console.log("Faceted search response:", JSON.stringify(resp, null, 2));
}

main().catch(console.error);
