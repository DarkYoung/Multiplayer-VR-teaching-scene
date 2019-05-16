require('./blocker.less');

const blocker = require('./blocker.html');

module.exports = (function () {
  function Blocker() {
    this.html = $(blocker).clone();
  }

  Blocker.prototype = {
    constructor: Blocker,
    setTitle: function (title) {
      this.html.find('.title').html(title);
    },
    setDesc: function (desc) {
      this.html.find('.desc').html(desc);
    }

  }
  return Blocker
})();
