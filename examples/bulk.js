var Manticoresearch = require("../");

async function main() {
  // Configure client (optional)
  const serverConfig = new Manticoresearch.ServerConfiguration("http://localhost:9308", {});
  const config = Manticoresearch.createConfiguration({ baseServer: serverConfig });

  // Create API clients
  const utilsApi = new Manticoresearch.UtilsApi(config);
  const indexApi = new Manticoresearch.IndexApi(config);

  // Create table
  await utilsApi.sql(`DROP TABLE IF EXISTS logs`);
  await utilsApi.sql(`CREATE TABLE logs(ts timestamp, level string, message text)`);

  // Prepare document data for bulk request
  const bulkBody =
    [
      JSON.stringify({
        insert: {
          table: "logs",
          "id": 1,
          "doc": { ts: Math.floor(Date.now() / 1000), level: "info", message: "service started" }
        }
      }),
      JSON.stringify({
        insert: {
          table: "logs",
          "id": 2,
          "doc": { ts: Math.floor(Date.now() / 1000), level: "warn", message: "cache miss spike" }
        }
      }),
      JSON.stringify({
        insert: {
          table: "logs",
          "id": 3,
          "doc": { ts: Math.floor(Date.now() / 1000), level: "error", message: "db timeout" }
        }
      }),
    ].join("\n");

  // Perform bulk insert
  const bulkResp = await indexApi.bulk(bulkBody as any);
  console.log("Bulk response:", JSON.stringify(bulkResp, null, 2));

  // Now perform search query via SQL
  const sqlResp = await utilsApi.sql(`
    SELECT level, COUNT(*) as cnt
    FROM logs
    GROUP BY level
    ORDER BY cnt DESC;
  `);

  console.log("SQL response:", JSON.stringify(sqlResp, null, 2));
}

main().catch(console.error);
