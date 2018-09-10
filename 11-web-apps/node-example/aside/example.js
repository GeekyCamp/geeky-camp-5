var asyncOperation = require('./async-operation');

console.log('start', new Date());
asyncOperation(function () {
  console.log('end', new Date());
});
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
console.log(6);
console.log(7);
console.log(8);
console.log(9);
console.log(10);



asyncOperation(function (err, result) {
  if (err) {
    return // ....;
  }
  asyncOperation(function (err, result) {
    if (err) {
      return // ....;
    }
    asyncOperation(function (err, result) {
      if (err) {
        return // ....;
      }
      asyncOperation(function (err, result) {
        if (err) {
          return // ....;
        }
        asyncOperation(function (err, result) {
          if (err) {
            return // ....;
          }
        });
      });
    });
  });
});

async.series([
  asyncOperation,
  asyncOperation,
  asyncOperation,
  asyncOperation,
  asyncOperation
], function (err, results) {
  if (err) {

  }
});
