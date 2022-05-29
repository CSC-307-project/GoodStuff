const mongoose = require("mongoose");
const productServices = require("./product-services");

jest.setTimeout(60000);

const testProductData = {
  sellerId: "none",
  title: "CD ROM",
  price: 1234.56,
  address: "935 Pennsylvania Avenue, NW Washington, D.C. 20535",
  cordinates: [-77.02497, 38.89537],
  description: "Secrets",
  image:
    "https://archive.org/download/MicrosoftWindows954.00.9501995EnglishOEM/CD%20Front.jpg",
  tags: [
    "jesttest",
    "CD",
    "ROM",
    "",
    "935",
    "Pennsylvania",
    "Avenue",
    "NW",
    "Washington",
    "D.C",
    "20535",
  ],
};

let actualTestProductData = undefined;

beforeAll(async () => {  try {
    const toDeleteProductObj = await productServices.findProductsByTags(
      ["jesttest"],
      false
    );
    const toDeleteProductIds = toDeleteProductObj.map((obj) => obj._id);
    await productServices.deleteProduct(toDeleteProductIds);

    const toDeleteProductObj2 = await productServices.findProductsByTags(
      ["jesttest"],
      true
    );
    const toDeleteProductIds2 = toDeleteProductObj2.map((obj) => obj._id);
    await productServices.deleteProducts(toDeleteProductIds2);
  } catch {}
});

afterAll(async () => {
  try {
    const toDeleteProductObj = await productServices.findProductsByTags(
      ["jesttest"],
      false
    );
    const toDeleteProductIds = toDeleteProductObj.map((obj) => obj._id);
    await productServices.deleteProducts(toDeleteProductIds);

    const toDeleteProductObj2 = await productServices.findProductsByTags(
      ["jesttest"],
      true
    );
    const toDeleteProductIds2 = toDeleteProductObj2.map((obj) => obj._id);
    await productServices.deleteProducts(toDeleteProductIds2);
  } catch {}

  try {
    const toDeleteProductObj = await productServices.findProductsByTags(
      ["jesttestmistake"],
      false
    );
    const toDeleteProductIds = toDeleteProductObj.map((obj) => obj._id);
    await productServices.deleteProduct(toDeleteProductIds);

    const toDeleteProductObj2 = await productServices.findProductsByTags(
      ["jesttestmistake"],
      true
    );
    const toDeleteProductIds2 = toDeleteProductObj2.map((obj) => obj._id);
    await productServices.deleteProducts(toDeleteProductIds2);
  } catch {}
});

// testing addproduct
test("Testing addItem -- success", async () => {
  // Object Id should be defined when successfully saved to MongoDB.
  const validProduct = await productServices.addItem(testProductData);
  expect(validProduct._id).toBeDefined();

  actualTestProductData = {
    _id: validProduct._id,
    sellerId: testProductData.sellerId,
    title: testProductData.title,
    price: testProductData.price,
    address: testProductData.address,
    cordinates: testProductData.cordinates,
    description: testProductData.description,
    image: testProductData.image,
    tags: testProductData.tags,
    __v: 0,
  };

  expect(validProduct).toMatchObject(actualTestProductData);
});

// create product with defined fields but with empty required field should failed
test('Testing addItem with "" required field { title: "", ...} -- failed', () => {
  const titleEmpty = {
    sellerId: "none",
    title: "",
    price: 1234.56,
    address: "935 Pennsylvania Avenue, NW Washington, D.C. 20535",
    cordinates: [-77.02497, 38.89537],
    description: "Secrets",
    image:
      "https://archive.org/download/MicrosoftWindows954.00.9501995EnglishOEM/CD%20Front.jpg",
    tags: [
      "jesttestmistake",
      "CD",
      "ROM",
      "",
      "935",
      "Pennsylvania",
      "Avenue",
      "NW",
      "Washington",
      "D.C",
      "20535",
    ],
  };

  return productServices
    .addItem(titleEmpty)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// create product with defined fields but with empty required field should failed
test("Testing addItem with undefined required field { price: undefined, ...} -- failed", () => {
  const priceEmpty = {
    sellerId: "none",
    title: "CD ROM",
    price: undefined,
    address: "935 Pennsylvania Avenue, NW Washington, D.C. 20535",
    cordinates: [-77.02497, 38.89537],
    description: "Secrets",
    image:
      "https://archive.org/download/MicrosoftWindows954.00.9501995EnglishOEM/CD%20Front.jpg",
    tags: [
      "jesttestmistake",
      "CD",
      "ROM",
      "",
      "935",
      "Pennsylvania",
      "Avenue",
      "NW",
      "Washington",
      "D.C",
      "20535",
    ],
  };

  return productServices
    .addItem(priceEmpty)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// create product with defined fields but with empty required field should failed
test('Testing addItem with required field { price: "thats not numbers", ...} -- failed', () => {
  const priceAlpha = {
    sellerId: "none",
    title: "CD ROM",
    price: "thats not numbers",
    address: "935 Pennsylvania Avenue, NW Washington, D.C. 20535",
    cordinates: [-77.02497, 38.89537],
    description: "Secrets",
    image:
      "https://archive.org/download/MicrosoftWindows954.00.9501995EnglishOEM/CD%20Front.jpg",
    tags: [
      "jesttestmistake",
      "CD",
      "ROM",
      "",
      "935",
      "Pennsylvania",
      "Avenue",
      "NW",
      "Washington",
      "D.C",
      "20535",
    ],
  };

  return productServices
    .addItem(priceAlpha)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// create product with defined fields but with empty required field should failed
test('Testing addItem with "" required field { address: "", ...} -- failed', () => {
  const addressEmpty = {
    sellerId: "none",
    title: "CD ROM",
    price: 1234.56,
    address: "",
    cordinates: [-77.02497, 38.89537],
    description: "Secrets",
    image:
      "https://archive.org/download/MicrosoftWindows954.00.9501995EnglishOEM/CD%20Front.jpg",
    tags: [
      "jesttestmistake",
      "CD",
      "ROM",
      "",
      "935",
      "Pennsylvania",
      "Avenue",
      "NW",
      "Washington",
      "D.C",
      "20535",
    ],
  };

  return productServices
    .addItem(addressEmpty)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// create product with defined fields but with empty required field should failed
test("Testing addItem with undefined required field { cordinates: [undefined, undefined], ...} -- failed", () => {
  const cordinatesUndefined = {
    sellerId: "none",
    title: "CD ROM",
    price: 1234.56,
    address: "935 Pennsylvania Avenue, NW Washington, D.C. 20535",
    cordinates: [undefined, undefined],
    description: "Secrets",
    image:
      "https://archive.org/download/MicrosoftWindows954.00.9501995EnglishOEM/CD%20Front.jpg",
    tags: [
      "jesttestmistake",
      "CD",
      "ROM",
      "",
      "935",
      "Pennsylvania",
      "Avenue",
      "NW",
      "Washington",
      "D.C",
      "20535",
    ],
  };

  return productServices
    .addItem(cordinatesUndefined)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// create product with defined fields but with empty required field should failed
test('Testing addItem with "" required field { decription: "", ...} -- failed', () => {
  const decriptionEmpty = {
    sellerId: "none",
    title: "CD ROM",
    price: 1234.56,
    address: "935 Pennsylvania Avenue, NW Washington, D.C. 20535",
    cordinates: [-77.02497, 38.89537],
    description: "",
    image:
      "https://archive.org/download/MicrosoftWindows954.00.9501995EnglishOEM/CD%20Front.jpg",
    tags: [
      "jesttestmistake",
      "CD",
      "ROM",
      "",
      "935",
      "Pennsylvania",
      "Avenue",
      "NW",
      "Washington",
      "D.C",
      "20535",
    ],
  };

  return productServices
    .addItem(decriptionEmpty)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// create product with defined fields but with empty required field should failed
test('Testing addItem with "" required field { image: "", ...} -- failed', () => {
  const priceEmpty = {
    sellerId: "none",
    title: "CD ROM",
    price: 1234.56,
    address: "935 Pennsylvania Avenue, NW Washington, D.C. 20535",
    cordinates: [-77.02497, 38.89537],
    description: "Secrets",
    image: "",
    tags: [
      "jesttestmistake",
      "CD",
      "ROM",
      "",
      "935",
      "Pennsylvania",
      "Avenue",
      "NW",
      "Washington",
      "D.C",
      "20535",
    ],
  };

  return productServices
    .addItem(priceEmpty)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// create product with defined fields but with empty required field should failed
test("Testing addItem with sellerId undefined required fields -- failed", () => {
  const sellerIdUndefined = {
    title: "CD ROM",
    price: 1234.56,
    address: "935 Pennsylvania Avenue, NW Washington, D.C. 20535",
    cordinates: [-77.02497, 38.89537],
    description: "Secrets",
    image:
      "https://archive.org/download/MicrosoftWindows954.00.9501995EnglishOEM/CD%20Front.jpg",
    tags: [
      "jesttestmistake",
      "CD",
      "ROM",
      "",
      "935",
      "Pennsylvania",
      "Avenue",
      "NW",
      "Washington",
      "D.C",
      "20535",
    ],
  };

  return productServices
    .addItem(sellerIdUndefined)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// create product with defined fields but with empty required field should failed
test("Testing addItem with title undefined required fields -- failed", () => {
  const titleUndefined = {
    sellerId: "none",
    price: 1234.56,
    address: "935 Pennsylvania Avenue, NW Washington, D.C. 20535",
    cordinates: [-77.02497, 38.89537],
    description: "Secrets",
    image:
      "https://archive.org/download/MicrosoftWindows954.00.9501995EnglishOEM/CD%20Front.jpg",
    tags: [
      "jesttestmistake",
      "CD",
      "ROM",
      "",
      "935",
      "Pennsylvania",
      "Avenue",
      "NW",
      "Washington",
      "D.C",
      "20535",
    ],
  };

  return productServices
    .addItem(titleUndefined)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// create product with defined fields but with empty required field should failed
test("Testing addItem with price undefined required fields -- failed", () => {
  const priceUndefined = {
    sellerId: "none",
    title: "CD ROM",
    address: "935 Pennsylvania Avenue, NW Washington, D.C. 20535",
    cordinates: [-77.02497, 38.89537],
    description: "Secrets",
    image:
      "https://archive.org/download/MicrosoftWindows954.00.9501995EnglishOEM/CD%20Front.jpg",
    tags: [
      "jesttestmistake",
      "CD",
      "ROM",
      "",
      "935",
      "Pennsylvania",
      "Avenue",
      "NW",
      "Washington",
      "D.C",
      "20535",
    ],
  };

  return productServices
    .addItem(priceUndefined)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// create product with defined fields but with empty required field should failed
test("Testing addItem with address undefined required fields -- failed", () => {
  const addressUndefined = {
    sellerId: "none",
    title: "CD ROM",
    price: 1234.56,
    cordinates: [-77.02497, 38.89537],
    description: "Secrets",
    image:
      "https://archive.org/download/MicrosoftWindows954.00.9501995EnglishOEM/CD%20Front.jpg",
    tags: [
      "jesttestmistake",
      "CD",
      "ROM",
      "",
      "935",
      "Pennsylvania",
      "Avenue",
      "NW",
      "Washington",
      "D.C",
      "20535",
    ],
  };

  return productServices
    .addItem(addressUndefined)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// create product with defined fields but with empty required field should failed
test("Testing addItem with decription undefined required fields -- failed", () => {
  const decriptionUndefined = {
    sellerId: "none",
    title: "CD ROM",
    price: 1234.56,
    address: "935 Pennsylvania Avenue, NW Washington, D.C. 20535",
    cordinates: [-77.02497, 38.89537],
    image:
      "https://archive.org/download/MicrosoftWindows954.00.9501995EnglishOEM/CD%20Front.jpg",
    tags: [
      "jesttestmistake",
      "CD",
      "ROM",
      "",
      "935",
      "Pennsylvania",
      "Avenue",
      "NW",
      "Washington",
      "D.C",
      "20535",
    ],
  };

  return productServices
    .addItem(decriptionUndefined)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// create product with defined fields but with empty required field should failed
test("Testing addItem with image undefined required fields -- failed", () => {
  const imageUndefined = {
    sellerId: "none",
    title: "CD ROM",
    price: 1234.56,
    address: "935 Pennsylvania Avenue, NW Washington, D.C. 20535",
    cordinates: [-77.02497, 38.89537],
    description: "Secrets",
    tags: [
      "jesttestmistake",
      "CD",
      "ROM",
      "",
      "935",
      "Pennsylvania",
      "Avenue",
      "NW",
      "Washington",
      "D.C",
      "20535",
    ],
  };

  return productServices
    .addItem(imageUndefined)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// testing findProductsByTags with good id
test("Testing findProductsByTags with good id -- success", async () => {
  const validUser = await productServices.findProductsByTags(
    actualTestProductData.tags,
    false
  );
  expect(validUser[0]).toMatchObject(actualTestProductData);
});

// testing findProductsByTags with bad id
test("Testing findProductsByTags with bad id -- failure", async () => {
  const validProduct = await productServices.findProductsByTags(
    ["jesttestmistake"],
    false
  );
  expect(validProduct).toEqual([]);
});

// testing findProductById with good tags
test("Testing findProductById with good id -- success", async () => {
  const validProduct = await productServices.findProductById(
    actualTestProductData._id
  );
  expect(validProduct).toMatchObject(actualTestProductData);
});

// testing findProductById with bad id
test("Testing findProductById with bad id -- failure", async () => {
  const validProduct = await productServices.findProductById(
    ["jesttestmistake"],
    false
  );
  expect(validProduct).toBeUndefined();
});

test("Testing archiveProduct with good id -- success", async () => {
  const validProduct = await productServices.archiveProduct(
    actualTestProductData._id
  );
  const expected = {
    acknowledged: true,
    matchedCount: 1,
    modifiedCount: 1,
    upsertedCount: 0,
    upsertedId: null,
  };
  expect(validProduct).toEqual(expected);

  const result = await productServices.findProductById(
    actualTestProductData._id
  );
  expect(result.archived).toBeTruthy();
});

test("Testing archiveProduct with bad id -- failed", async () => {
  const validProduct = await productServices.archiveProduct("bogus");
  expect(validProduct).toBeUndefined();
});
