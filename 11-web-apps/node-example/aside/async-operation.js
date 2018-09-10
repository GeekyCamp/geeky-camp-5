function asyncOperation(cb) {
  setTimeout(function () {
    cb();
  }, 3000);
}

module.exports = asyncOperation;
