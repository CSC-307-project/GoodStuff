const mongoose = require("mongoose");
const userServices = require("./user-services");

const testUserData = {
  username: "jesttest",
  email: "jesttest@calpoly.edu",
  password: "qwerty",
};

// ensures that if a failed test actually inserts { username: "jesttestmistake", ...} that it gets removed
afterEach(async () => {
    try {
      const toDeleteUserObj = await userServices.findByUsername("jesttestmistake");
      const toDeleteUserId = toDeleteUserObj._id;
      await userServices.deleteUser(toDeleteUserId);
    } catch {}
});

test("delete test user(s) from database -- success (if failed, then jestTest remains in database -> remove manually for future test to work...", async () => {
  try {
    const toDeleteUserObj = await userServices.findByUsername(testUserData.username);
    const toDeleteUserId = toDeleteUserObj._id;
    await userServices.deleteUser(toDeleteUserId);
  } catch {}
});

test("Testing addUser -- success", async () => {
  // Object Id should be defined when successfully saved to MongoDB.
  const validUser = await userServices.addUser(testUserData);
  expect(validUser._id).toBeDefined();

  // expect(<target>).toEqual(<result>)
  expect(validUser.username).toEqual(testUserData.username);
  expect(validUser.email).toEqual(testUserData.email);
  expect(validUser.password).toEqual(testUserData.password);
  expect(validUser.listingId).toEqual([]);
  expect(validUser.purchaseId).toEqual([]);
  expect(validUser.avatar).toEqual("v1652716035/yynsno17xatmuag7nitr.jpg");
});

// create user with defined fields but with empty required field should failed
test('Testing addUser with "" required field { username: "", ...} -- failed', () => {
  const usernameEmpty = {
    username: "",
    email: "jestTestMistake@calpoly.edu",
    password: "qwerty",
  };

  return userServices.addUser(usernameEmpty).catch(e =>
    expect(e).toBeInstanceOf(mongoose.Error.ValidationError),
  );
});

// create user with defined fields but with empty required field should failed
test('Testing addUser with "" required field { email: "", ...} -- failed', () => {
    const emailEmpty = {
      username: "jestTestMistake",
      email: "",
      password: "qwerty",
    };
  
    return userServices.addUser(emailEmpty).catch(e =>
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError),
    );
});

  // create user with defined fields but with empty required field should failed
test('Testing addUser with "" required field { password: "", ...} -- failed', () => {
    const passwordEmpty = {
      username: "jestTestMistake",
      email: "",
      password: "qwerty",
    };
  
    return userServices.addUser(passwordEmpty).catch(e =>
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError),
    );
});

// create user with defined fields but with empty required field should failed
test("Testing addUser with username undefined required fields -- failed", () => {
  const usernameUndefined = {
    email: "jestTestMistake@calpoly.edu",
    password: "qwerty",
  };

  return userServices.addUser(usernameUndefined).catch(e =>
    expect(e).toBeInstanceOf(mongoose.Error.ValidationError),
  );
});

// create user with defined fields but with empty required field should failed
test("Testing addUser with email undefined required fields -- failed", () => {
    const emailUndefined = {
      username: "jestTestMistake",
      password: "qwerty",
    };
  
    return userServices.addUser(emailUndefined).catch(e =>
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError),
    );
});

// create user with defined fields but with empty required field should failed
test("Testing addUser with password undefined required fields -- failed", () => {
    const passwordUndefined = {
      username: "jestTestMistake",
      email: "jestTestMistake@calpoly.edu",
    };
  
    return userServices.addUser(passwordUndefined).catch(e =>
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError),
    );
});

// test for uniqueness of specific user fields
test("Testing addUser with non-unique username field -- failed", () => {
  const usernameNonUnique = {
    username: testUserData.username,
    email: "jesttestmistake@calpoly.edu",
    password: "qwerty",
  };

  return userServices.addUser(usernameNonUnique).catch(e =>
    expect(e).toBeInstanceOf(Object),
  );
});

// test for uniqueness of specific user fields
test("Testing addUser with non-unique email field -- failed", () => {
    const emailNonUnique = {
      username: "jesttestmistake",
      email: testUserData.email,
      password: "qwerty",
    };
  
    return userServices.addUser(emailNonUnique).catch(e =>
      expect(e).toBeInstanceOf(Object),
    );
});

// test validation of user fields
test("create user with bad failed validations of username field -- failed", () => {
  // username bad validation
  const usernameBad = {
    username: "",
    email: "jesttestmistake@calpoly.edu",
    password: "qwerty",
  };

  return userServices.addUser(usernameBad).catch(e =>
    expect(e).toBeInstanceOf(mongoose.Error.ValidationError),
  );
});

// test validation of user fields
test("create user with bad failed validations of email field -- failed", () => {
    const emailBad = {
      username: "jesttestmistake",
      email: "jesttestmistake",
      password: "qwerty",
    };
  
    return userServices.addUser(emailBad).catch(e =>
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError),
    );
});

// test validation of user fields
test("create user with bad failed validations of password field -- failed", () => {
    const passwordBad = {
      username: "jesttestmistake",
      email: "jesttestmistake",
      password: "q",
    };
  
    return userServices.addUser(passwordBad).catch(e =>
      expect(e).toBeInstanceOf(mongoose.Error.ValidationError),
    );
});

// testing getuser
// test("Testing getUser -- success", async () => {
//     const validUser = await userServices.getUser(testUserData);
//     expect(validUser._id).toBeDefined();
  
//     // expect(<target>).toEqual(<result>)
//     expect(validUser.username).toEqual(testUserData.username);
//     expect(validUser.email).toEqual(testUserData.email);
//     expect(validUser.password).toEqual(testUserData.password);
//     expect(validUser.listingId).toEqual([]);
//     expect(validUser.purchaseId).toEqual([]);
//     expect(validUser.avatar).toEqual("v1652716035/yynsno17xatmuag7nitr.jpg");
// });


// END...
// ensures that { username: "testjest", ...} is deleted from the database
test("delete test user(s) from database -- success (if failed, then jesttest remains in database -> remove manually for future test to work...", async () => {
  try {
    const toDeleteUserObj = await userServices.findByUsername(testUserData.username);
    const toDeleteUserId = toDeleteUserObj._id;
    await userServices.deleteUser(toDeleteUserId);
  } catch {}
});