module.exports = {
  checkJson: function (string) {
    try {
      const json = JSON.parse(string);
    } catch (e) {
      return false;
    }
    return true;
  },
};
