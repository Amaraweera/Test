const request = require('request');

module.exports.fetchImage = function (firstReq) {
    return new Promise(function (resolve, reject) {
        request.get(firstReq, (err, res, firstBody) => {
            if(err) {
                reject(err);
            }

            console.log('Received response with status:' + res.statusCode);
            resolve(firstBody);
        });
    })
}