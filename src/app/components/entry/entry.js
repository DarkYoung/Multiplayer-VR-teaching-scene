/*
 * @Author: JasonZhang 
 * @Date: 2019-05-10 11:26:00 
 * @Last Modified by:   JasonZhang 
 * @Last Modified time: 2019-05-10 11:26:00 
 */
require('./entry.less');

const entries = require('./entry.html');
$(entries).find('#maze').on('click', function () {
  $(location).attr('href', '/game');
});

module.exports = (function () {
  function Entry() {

  }

  Entry.prototype = {
    constructor: Entry,
    getEntry: function () {

    },
    getEntries: function () {
      return entries;
    }
  }
  return Entry;
})();
