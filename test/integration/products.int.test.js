const request = require("supertest");
const app = require("../../server");
const newProduct = require("../data/new-product.json");

let firstProduct;

it("POST /products", async () => {
  const response = await request(app).post("/products").send(newProduct);
  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
});

it("should return 500 on POST /products", async () => {
  const response = await request(app).post("/products").send({ name: "test" });
  expect(response.statusCode).toBe(500);
  expect(response.body).toStrictEqual({
    message:
      "Product validation failed: description: Path `description` is required.",
  });
});

it("GET /products", async () => {
  const response = await request(app).get("/products");
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  firstProduct = response.body[0];
});

it("GET /products/:productId", async () => {
  const response = await request(app).get(`/products/${firstProduct._id}`);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(firstProduct.name);
  expect(response.body.description).toBe(firstProduct.description);
});

it("GET id doesn't exist /products/:productId", async () => {
  const response = await request(app).get(
    "/api/products/65df0b9343aec26dc8894331"
  );
  expect(response.statusCode).toBe(404);
});

it("PUT /products", async () => {
  const res = await request(app)
    .put("/products/" + firstProduct._id)
    .send({ name: "updated name", description: "updated description" });
  expect(res.statusCode).toBe(200);
  expect(res.body.name).toBe("updated name");
  expect(res.body.description).toBe("updated description");
});

it("should return 404 on PUT /products", async () => {
  const res = await request(app)
    .put("/products/65df0b9343aec26dc8894331")
    .send({ name: "updated name", description: "updated description" });
  expect(res.statusCode).toBe(404);
});
