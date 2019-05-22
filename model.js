const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/vrdb";
// 创建连接
// MongoDB 会自动创建数据库和集合
function getDB(callback) {
  MongoClient.connect(url, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    callback(db);
  });
}

const models = {
  "user": []
};

module.exports = class UserModel {
  constructor() {

  }

  getModel(key) {
    return models[key]
  }
}
