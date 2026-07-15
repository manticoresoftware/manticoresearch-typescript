var Manticoresearch = require("../");

async function main() {
  // Configure client (optional)
  const serverConfig = new Manticoresearch.ServerConfiguration("http://localhost:9308", {});
  const config = Manticoresearch.createConfiguration({ baseServer: serverConfig });

  // Create API clients
  const utilsApi = new Manticoresearch.UtilsApi(config);
  const indexApi = new Manticoresearch.IndexApi(config);
  const searchApi = new Manticoresearch.SearchApi(config);

  // Create table with HNSW vector field
  await utilsApi.sql("DROP TABLE IF EXISTS products_vec");
  await utilsApi.sql(`
    CREATE TABLE products_vec (
      title text,
      category string,
      image_vector float_vector
        knn_type='hnsw'
        knn_dims='4'
        hnsw_similarity='l2'
    )
  `);

  // Populate table with documents
  await indexApi.insert({
    table: "products_vec",
    id: 1,
    doc: {
      title: "yellow bag",
      category: "bags",
      image_vector: [0.653448, 0.192478, 0.017971, 0.339821],
    },
  });

  await indexApi.insert({
    table: "products_vec",
    id: 2,
    doc: {
      title: "white bag",
      category: "bags",
      image_vector: [-0.148894, 0.748278, 0.091892, -0.095406],
    },
  });

  await indexApi.insert({
    table: "products_vec",
    id: 3,
    doc: {
      title: "trail running shoes",
      category: "shoes",
      image_vector: [0.12, 0.18, -0.03, 0.42],
    },
  });

  // Perform knn search
  const knnResponse = await searchApi.search({
    table: "products_vec",
    knn: {
      field: "image_vector",
      query: [0.286569, -0.031816, 0.066684, 0.032926],
      k: 2,
      ef: 2000,
      rescore: true,
      oversampling: 3.0,
    },
  });

  console.log("KNN search response:", JSON.stringify(knnResponse, null, 2));

  // Perform knn search with additional filtering
  const knnFilteredResponse = await searchApi.search({
    table: "products_vec",
    knn: {
      field: "image_vector",
      query: [0.286569, -0.031816, 0.066684, 0.032926],
      k: 5,
      filter: {
        bool: {
          must: [
            { match: { _all: "bag" } },
            { equals: { category: "bags" } },
          ],
        },
      },
    },
  });

  console.log("KNN filtered search response:", JSON.stringify(knnFilteredResponse, null, 2));
}

main().catch(console.error);
