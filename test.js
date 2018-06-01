const https = require('https');

// var options = {
//   "method": "GET",
//   "hostname": "rest.coinapi.io",
//   "path": "/v1/exchangerate/BTC/USD",
//   //"path": "/v1/ohlcv/COINBASE_SPOT_BTC_USD/latest?period_id=1DAY&limit=1",
//   //"path": "/v1/exchanges",
//   "headers": {'X-CoinAPI-Key': '8F6FDEF2-C98D-46F1-BE9E-5DC0C1B855BF'}
// };

// var request = https.request(options, function (response) {
//     var finalData = "";

//     response.on("data", function (data) {
//         finalData += data.toString();
//     });

//     response.on("end", function() {
//        console.log(finalData)
//     });

//     response.on("error", function(err) {
        
//     });  
// });

// request.end();

getQuote(2);
getRange();

function getQuote(numberOfCoins) {
    if (numberOfCoins == null) {
        numberOfCoins = 1;
    }

    let options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": "/v1/exchangerate/BTC/USD",
        "headers": {'X-CoinAPI-Key': '8F6FDEF2-C98D-46F1-BE9E-5DC0C1B855BF'}
      };
      
      let request = https.request(options, function (response) {
          let quoteData = "";
      
          response.on("data", function (data) {
            quoteData += data.toString();
          });
      
          response.on("end", function() {
             let quoteDataJson = JSON.parse(quoteData);
             if (quoteDataJson) {
                 if (quoteDataJson.hasOwnProperty("rate")) {
                    let rate = quoteDataJson.rate;
                    let total =  Math.floor(rate * numberOfCoins);
                     console.log(rate, total);
                     let responseQuote = "";
                     if (numberOfCoins === 1) {
                        responseQuote = `${numberOfCoins} bitcoin is worth ${total} U.S. dollars`;
                     }
                     else {
                        responseQuote = `${numberOfCoins} bitcoins is worth ${total} U.S. dollars`;
                     }
                    console.log(responseQuote)
                 }
             }
          });
      
          response.on("error", function(err) {
              
          });  
      });
      
      request.end();
}

function getRange() {
    let options = {
        "method": "GET",
        "hostname": "rest.coinapi.io",
        "path": "/v1/ohlcv/COINBASE_SPOT_BTC_USD/latest?period_id=1DAY&limit=1",
        "headers": {'X-CoinAPI-Key': '8F6FDEF2-C98D-46F1-BE9E-5DC0C1B855BF'}
      };
      
      let request = https.request(options, function (response) {
          let quoteData = "";
      
          response.on("data", function (data) {
            quoteData += data.toString();
          });
      
          response.on("end", function() {
             console.log(quoteData)
          });
      
          response.on("error", function(err) {
              
          });  
      });
      
      request.end();
}