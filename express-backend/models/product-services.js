const mongoose = require("mongoose");
const productModel = require("./product");
const dotenv = require("dotenv");
//mongoose.set("debug", true);

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

// ** use findProductsByTags ***
// async function getProducts() {
//   const product_list = await productModel.find();
//   return product_list;
// }

async function findProductById(id) {
  try {
    return await productModel.findById(id);
  } catch (error) {
    //console.log(error);
    return undefined;
  }
}

async function findProductList(list){ 
  try{
    product_list = []
    for (let i = 0; i < list.length; i++){ 
      let item = await findProductById(list[i]);
      product_list.push(item);
    }
    // console.log("Mongo" + product_list); 
    return product_list; 
  }catch(error){ 
    return null; 
  }
}

async function archiveProduct(productId) {
  try {
    return await productModel.updateOne(
      { _id: productId },
      { $set: { archived: true } }
    );
  } catch (error) {
    //console.log(error);
    return undefined;
  }
}

async function findProductsByTags(tags, archivedStatus) {
  return await productModel.find({
    tags: { $all: tags },
    archived: archivedStatus,
  });
}


async function addItem(item) {
  const itemToAdd = new productModel(item);
  const savedItem = await itemToAdd.save();
  return savedItem;
}

async function deleteProducts(ids) {
  return await productModel.deleteMany({ _id: { $in: ids } });
}

exports.findProductById = findProductById;
exports.addItem = addItem;
exports.deleteProducts = deleteProducts;
exports.findProductsByTags = findProductsByTags; 
exports.archiveProduct = archiveProduct; 
exports.findProductList = findProductList; 
