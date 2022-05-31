const mongoose = require("mongoose");
const productModel = require("./product");
const dotenv = require("dotenv");
mongoose.set("debug", true);

dotenv.config();

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@" +
      process.env.MONGO_CLUSTER +
      "/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority",
    {
      useNewUrlParser: true, //useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));


async function getProducts(){ 
  const product_list = await productModel.find();
  return product_list;
  // if (product_list === undefined || product_list === null){ 
  //   return undefined; 
  // }else{ 
  //   return product_list;  
  // }
}  


async function getUsers(name, job) {
  let result;
  if (name === undefined && job === undefined) {
    result = await productModel.find();
  } else if (name && !job) {
    result = await findUserByName(name);
  } else if (job && !name) {
    result = await findUserByJob(job);
  } else if (job && name) {
    result = await findUserByNameAndJob(name, job);
  }
  return result;
}

async function findProductById(id) {
  try {
    return await productModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function archiveProduct(productId) {
  try {
    return await productModel.updateOne({ _id: productId }, { "$set": { "archived": true }});
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function findProductsByTags(tags, archivedStatus) {
  try {
    return await productModel.find({ tags: { $all: tags }, archived: archivedStatus })
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addItem(item) {
  const itemToAdd = new productModel(item);
  const savedItem = await itemToAdd.save();
  return savedItem;
}
async function deleteUser(id) {
  try {
    return await productModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function findUserByName(name) {
  return await productModel.find({ name: name });
}

async function findUserByJob(job) {
  return await productModel.find({ job: job });
}

async function findUserByNameAndJob(name, job) {
  return await productModel.find({ name: name, job: job });
}

exports.getUsers = getUsers;
exports.findProductById = findProductById;
exports.addItem = addItem;
exports.deleteUser = deleteUser;
exports.findProductsByTags = findProductsByTags;
exports.getProducts = getProducts; 