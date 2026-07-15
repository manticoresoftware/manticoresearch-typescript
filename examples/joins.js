var Manticoresearch = require("../");

async function main() {
  // Configure client (optional)
  const serverConfig = new Manticoresearch.ServerConfiguration("http://localhost:9308", {});
  const config = Manticoresearch.createConfiguration({ baseServer: serverConfig });

  // Create API clients
  const utilsApi = new Manticoresearch.UtilsApi(config);
  const indexApi = new Manticoresearch.IndexApi(config);
  const searchApi = new Manticoresearch.SearchApi(config);

  // Create tables
  await utilsApi.sql("DROP TABLE IF EXISTS customers");
  await utilsApi.sql("DROP TABLE IF EXISTS orders");

  await utilsApi.sql(`CREATE TABLE customers (name text, email string, address string)`);
  await utilsApi.sql(`CREATE TABLE orders (customer_id bigint, product text, quantity int)`);

  // Populate `customers` table with documents
  await indexApi.insert({
    table: "customers",
    id: 1,
    doc: { name: "Alice Johnson", email: "alice@example.com", address: "123 Maple St" },
  });
  await indexApi.insert({
    table: "customers",
    id: 2,
    doc: { name: "Bob Smith", email: "bob@example.com", address: "9 Pine Ave" },
  });

  // Populate `orders` table with documents
  await indexApi.insert({
    table: "orders",
    id: 101,
    doc: { customer_id: 1, product: "Laptop", quantity: 1 },
  });
  await indexApi.insert({
    table: "orders",
    id: 102,
    doc: { customer_id: 1, product: "Phone", quantity: 2 },
  });
  await indexApi.insert({
    table: "orders",
    id: 103,
    doc: { customer_id: 2, product: "Tablet", quantity: 1 },
  });

  // Perform INNER JOIN search
  const innerJoinResp = await searchApi.search({
    table: "orders",
    join: [
      {
        type: Manticoresearch.JoinTypeEnum.inner,
        table: "customers",
        // Full-text query on the joined table (optional)
        query: { query_string: "Alice" },
        on: [
          {
            left: { table: "orders", field: "customer_id" },
            operator: Manticoresearch.JoinOnOperatorEnum.eq,
            right: { table: "customers", field: "id" },
          },
        ],
      },
    ],
    // Set document fields to return (optional)
    _source: ["product", "quantity", "customers.email", "customers.name", "customers.address"],
    // Sort results (optional)
    sort: [{ "customers.email": "asc" }],
  });

  console.log("INNER JOIN response:", JSON.stringify(innerJoinResp, null, 2));

  // Perform LEFT JOIN search
  const leftJoinResp = await searchApi.search({
    table: "customers",
    join: [
      {
        type: Manticoresearch.JoinTypeEnum.left,
        table: "orders",
        on: [
          {
            left: { table: "orders", field: "customer_id" },
            operator: Manticoresearch.JoinOnOperatorEnum.eq,
            right: { table: "customers", field: "id" },
          },
        ],
      },
    ],
    // Set document fields to return (optional)
    _source: ["name", "email", "orders.product", "orders.quantity"],
    // Sort results (optional)
    sort: [{ email: "asc" }],
  });

  console.log("LEFT JOIN response:", JSON.stringify(leftJoinResp, null, 2));
}

main().catch(console.error);
