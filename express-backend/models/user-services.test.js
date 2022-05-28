// const mongoose = require('mongoose');
// const UserModel = require('./user');
// const userData = { username: 'jestTest', email: 'jestTest@calpoly.edu', password: 'qwerty', listingId: [], productId: [], avatar: ""};

// dotenv.config();

// describe('User Model Test', () => {

//     // Connect to MongoDB Memory Server with mongoose.connect
//     beforeAll(async () => {
//       mongoose.connect(
//         "mongodb+srv://" +
//           process.env.MONGO_USER +
//           ":" +
//           process.env.MONGO_PWD +
//           "@" +
//           process.env.MONGO_CLUSTER +
//           "/" +
//           process.env.MONGO_DB +
//           "?retryWrites=true&w=majority",
//         {
//           useNewUrlParser: true,
//           useUnifiedTopology: true,
//           useCreateIndex: true,
//         }
//       )
//       .catch((error) => console.log(error))

//     });

//     it('create & save user successfully', async () => {
//         const validUser = new UserModel(userData);
//         const savedUser = await validUser.save();
//         // Object Id should be defined when successfully saved to MongoDB.
//         expect(savedUser._id).toBeDefined();
//         expect(savedUser.name).toBe(userData.name);
//         expect(savedUser.gender).toBe(userData.gender);
//         expect(savedUser.dob).toBe(userData.dob);
//         expect(savedUser.loginUsing).toBe(userData.loginUsing);
//     });

//     // Test Schema is working!!!
//     // You shouldn't be able to add in any field that isn't defined in the schema
//     it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
//         const userWithInvalidField = new UserModel({ name: 'TekLoon', gender: 'Male', nickname: 'Handsome TekLoon' });
//         const savedUserWithInvalidField = await userWithInvalidField.save();
//         expect(savedUserWithInvalidField._id).toBeDefined();
//         expect(savedUserWithInvalidField.nickkname).toBeUndefined();
//     });

//     // Test Validation is working!!!
//     // It should us told us the errors in on gender field.
//     it('create user without required field should failed', async () => {
//         const userWithoutRequiredField = new UserModel({ name: 'TekLoon' });
//         let err;
//         try {
//             const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
//             error = savedUserWithoutRequiredField;
//         } catch (error) {
//             err = error
//         }
//         expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
//         expect(err.errors.gender).toBeDefined();
//     });

    
// })