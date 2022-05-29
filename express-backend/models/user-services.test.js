const mongoose = require("mongoose");
const userServices = require("./user-services");

const testUserData = {
  username: "jesttest",
  email: "jesttest@calpoly.edu",
  password: "qwerty",
};

let actualTestUserData = undefined;

const actualTestProductId = "6291132e0f7b7ec4342a5d2f";

// ensures that if a failed test actually inserts { username: "jesttestmistake", ...} that it gets removed
afterEach(async () => {
  const toDeleteUserObj = await userServices.findUserByUsername(
    "jesttestmistake"
  );
  if (toDeleteUserObj !== null) {
    const toDeleteUserId = toDeleteUserObj._id;
    await userServices.deleteUser(toDeleteUserId);
  }
});

beforeAll(async () => {
  const toDeleteUserObj = await userServices.findUserByUsername(
    testUserData.username
  );
  if (toDeleteUserObj !== null) {
    const toDeleteUserId = toDeleteUserObj._id;
    await userServices.deleteUser(toDeleteUserId);
  }
});

afterAll(async () => {
  const toDeleteUserObj = await userServices.findUserByUsername(
    testUserData.username
  );
  if (toDeleteUserObj !== null) {
    const toDeleteUserId = toDeleteUserObj._id;
    await userServices.deleteUser(toDeleteUserId);
  }
});

test("Testing addUser -- success", async () => {
  // Object Id should be defined when successfully saved to MongoDB.
  const validUser = await userServices.addUser(testUserData);
  expect(validUser._id).toBeDefined();

  actualTestUserData = {
    _id: validUser._id,
    username: testUserData.username,
    email: testUserData.email,
    password: testUserData.password,
    listingId: [],
    purchaseId: [],
    avatar: "v1652716035/yynsno17xatmuag7nitr.jpg",
    __v: 0,
  };

  // expect(<target>).toEqual(<result>)
  expect(validUser).toMatchObject(actualTestUserData);
});

// create user with defined fields but with empty required field should failed
test('Testing addUser with "" required field { username: "", ...} -- failed', () => {
  const usernameEmpty = {
    username: "",
    email: "jestTestMistake@calpoly.edu",
    password: "qwerty",
  };

  return userServices
    .addUser(usernameEmpty)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// create user with defined fields but with empty required field should failed
test('Testing addUser with "" required field { email: "", ...} -- failed', () => {
  const emailEmpty = {
    username: "jestTestMistake",
    email: "",
    password: "qwerty",
  };

  return userServices
    .addUser(emailEmpty)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// create user with defined fields but with empty required field should failed
test('Testing addUser with "" required field { password: "", ...} -- failed', () => {
  const passwordEmpty = {
    username: "jestTestMistake",
    email: "",
    password: "qwerty",
  };

  return userServices
    .addUser(passwordEmpty)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// create user with defined fields but with empty required field should failed
test("Testing addUser with username undefined required fields -- failed", () => {
  const usernameUndefined = {
    email: "jestTestMistake@calpoly.edu",
    password: "qwerty",
  };

  return userServices
    .addUser(usernameUndefined)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// create user with defined fields but with empty required field should failed
test("Testing addUser with email undefined required fields -- failed", () => {
  const emailUndefined = {
    username: "jestTestMistake",
    password: "qwerty",
  };

  return userServices
    .addUser(emailUndefined)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// create user with defined fields but with empty required field should failed
test("Testing addUser with password undefined required fields -- failed", () => {
  const passwordUndefined = {
    username: "jestTestMistake",
    email: "jestTestMistake@calpoly.edu",
  };

  return userServices
    .addUser(passwordUndefined)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// test for uniqueness of specific user fields
test("Testing addUser with non-unique username field -- failed", () => {
  const usernameNonUnique = {
    username: testUserData.username,
    email: "jesttestmistake@calpoly.edu",
    password: "qwerty",
  };

  return userServices
    .addUser(usernameNonUnique)
    .catch((e) => expect(e).toBeInstanceOf(Object));
});

// test for uniqueness of specific user fields
test("Testing addUser with non-unique email field -- failed", () => {
  const emailNonUnique = {
    username: "jesttestmistake",
    email: testUserData.email,
    password: "qwerty",
  };

  return userServices
    .addUser(emailNonUnique)
    .catch((e) => expect(e).toBeInstanceOf(Object));
});

// test validation of user fields
test("create user with bad failed validations of username field -- failed", () => {
  // username bad validation
  const usernameBad = {
    username: "",
    email: "jesttestmistake@calpoly.edu",
    password: "qwerty",
  };

  return userServices
    .addUser(usernameBad)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// test validation of user fields
test("create user with bad failed validations of username (< 2 characters) field -- failed", () => {
  // username bad validation
  const usernameBad = {
    username: "q",
    email: "jesttestmistake@calpoly.edu",
    password: "qwerty",
  };

  return userServices
    .addUser(usernameBad)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// test validation of user fields
test("create user with bad failed validations of email field -- failure", () => {
  const emailBad = {
    username: "jesttestmistake",
    email: "jesttestmistake",
    password: "qwerty",
  };

  return userServices
    .addUser(emailBad)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// test validation of user fields
test("create user with bad failed validations of password field -- failure", () => {
  const passwordBad = {
    username: "jesttestmistake",
    email: "jesttestmistake",
    password: "q",
  };

  return userServices
    .addUser(passwordBad)
    .catch((e) => expect(e).toBeInstanceOf(mongoose.Error.ValidationError));
});

// testing getuser with good email and good password
test("Testing getUser with good email and good password -- failure", async () => {
  const validUser = await userServices.getUser(
    testUserData.email,
    testUserData.password
  );
  expect(validUser).toBeDefined();
});

// testing getuser with bad email and good password
test("Testing getUser getuser with bad email and good password -- failure", async () => {
  const validUser = await userServices.getUser("bogus", testUserData.password);
  expect(validUser).toBeNull();
});

// testing getuser with good email and bad password
test("Testing getUser getuser with good email and bad password -- failure", async () => {
  const validUser = await userServices.getUser(testUserData.email, "bogus");
  expect(validUser).toBeNull();
});

// testing getuser with bad email and bad password
test("Testing getUser with bad email and bad password -- failure", async () => {
  const validUser = await userServices.getUser("bogus", "bogus");
  expect(validUser).toBeNull();
});

// testing getuser with no email and good password
test("Testing getUser getuser with no email and good password -- failure", async () => {
  const validUser = await userServices.getUser(
    undefined,
    testUserData.password
  );
  expect(validUser).toBeUndefined();
});

// testing getuser with good email and no password
test("Testing getUser getuser with good email and no password -- failure", async () => {
  const validUser = await userServices.getUser(testUserData.email, undefined);
  expect(validUser).toBeUndefined();
});

// testing getuser with no email and no password
test("Testing getUser with no email and no password -- failure", async () => {
  const validUser = await userServices.getUser(undefined, undefined);
  expect(validUser).toBeUndefined();
});

// testing findUserByEmail with good email
test("Testing findUserByEmail with good email -- success", async () => {
  const validUser = await userServices.findUserByEmail(testUserData.email);
  expect(validUser).toMatchObject(actualTestUserData);
});

// testing findUserByEmail with bad email
test("Testing findUserByEmail with bad email -- failure", async () => {
  const validUser = await userServices.findUserByEmail("bogus");
  expect(validUser).toBeNull();
});

// testing findUserByUsername with good email
test("Testing findUserByUsername with good username -- success", async () => {
  const validUser = await userServices.findUserByUsername(
    testUserData.username
  );
  expect(validUser).toMatchObject(actualTestUserData);
});

// testing findUserByUsername with bad email
test("Testing findUserByUsername with bad username -- failure", async () => {
  const validUser = await userServices.findUserByUsername("bogus");
  expect(validUser).toBeNull();
});

// testing updateUserAvatar with good id
test("Testing updateUserAvatar with good id -- success", async () => {
  const validUserId = await userServices.findUserByUsername(
    testUserData.username
  );
  const validUser = await userServices.updateUserAvatar(validUserId, "temp");
  const expected = {
    acknowledged: true,
    matchedCount: 1,
    modifiedCount: 1,
    upsertedCount: 0,
    upsertedId: null,
  };

  expect(validUser).toEqual(expected);
  await userServices.updateUserAvatar(validUserId, actualTestUserData.avatar);
  expect(validUser).toEqual(expected);
});

// testing updateUserAvatar with bad id
test("Testing updateUserAvatar with bad id -- failed", async () => {
  const validUser = await userServices.updateUserAvatar(
    "aaaaaaaaaaaaaaaaaaaaaaaa",
    "should_not_work"
  );
  const expected = {
    acknowledged: true,
    matchedCount: 0,
    modifiedCount: 0,
    upsertedCount: 0,
    upsertedId: null,
  };

  expect(validUser).toEqual(expected);
});

// testing findUserById with good id
test("Testing updateUserAvatar with good id -- success", async () => {
  const validUser = await userServices.findUserById(actualTestUserData._id);
  expect(validUser).toMatchObject(actualTestUserData);
});

// testing updateUserListings
test("Testing updateUserListings with good sellerId and listingId -- success", async () => {
  let validate = await userServices.updateUserListings(
    actualTestUserData._id,
    actualTestProductId
  );
  let result = {
    acknowledged: true,
    matchedCount: 1,
    modifiedCount: 1,
    upsertedCount: 0,
    upsertedId: null,
  };
  expect(validate).toEqual(result);
});

test("Testing updateUserListings with a get -- success", async () => {
  const validate = await userServices.findUserById(actualTestUserData._id);
  const result = [actualTestProductId];
  expect(validate.listingId).toEqual(result);
});

// testing updateUserListings
test("Testing updateUserListings with bad sellerId and listingId -- failed", async () => {
  const validate = await userServices.updateUserListings(
    "aaaaaaaaaaaaaaaaaaaaaaaa",
    actualTestProductId
  );
  const result = {
    acknowledged: true,
    matchedCount: 0,
    modifiedCount: 0,
    upsertedCount: 0,
    upsertedId: null,
  };
  expect(validate).toEqual(result);
});

// testing updateUserPurchases
test("Testing updateUserPurchases with good buyerId and listingId -- success", async () => {
  const validate = await userServices.updateUserPurchases(
    actualTestUserData._id,
    actualTestProductId
  );
  const result = {
    acknowledged: true,
    matchedCount: 1,
    modifiedCount: 1,
    upsertedCount: 0,
    upsertedId: null,
  };
  expect(validate).toEqual(result);
});

test("Testing updateUserPurchases with a get -- success", async () => {
  const validate = await userServices.findUserById(actualTestUserData._id);
  result = [actualTestProductId];
  expect(validate.listingId).toEqual(result);
});

// testing updateUserPurchases
test("Testing updateUserPurchases with bad buyerId and listingId -- failed", async () => {
  const validate = await userServices.updateUserPurchases(
    "aaaaaaaaaaaaaaaaaaaaaaaa",
    actualTestProductId
  );
  const result = {
    acknowledged: true,
    matchedCount: 0,
    modifiedCount: 0,
    upsertedCount: 0,
    upsertedId: null,
  };
  expect(validate).toEqual(result);
});
