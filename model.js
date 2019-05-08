const User = {};

const models = {
  "user": []
};

module.exports = (function () {
  function UserModel() {

  }
  UserModel.prototype = {
    constructor: UserModel,
    getModel: function (key) {
      return models[key];
    }
  };
  return UserModel;
})();
