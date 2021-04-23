import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Conversion from "./js/conversion.js";

function conversionResult(response, currency) {
  let responseHTML;
  if (response["error-type"] === "unsupported-code") {
    responseHTML = `The currency in question does not exist. Please try again.`;
  } else if (currency === "" || isNaN(currency) || currency < 0) {
    responseHTML = `Please enter a valid currency amount in decimal format`;
  } else if (response["conversion_result"]) {
    responseHTML = `<p>${currency} USD is ${response["conversion_result"]} converted in ${response["target_code"]}</p>`;
  } else {
    responseHTML = `There was an error: ${response["error-type"]}`;
  }
  return $("#output").html(responseHTML);
}

$(document).ready(function () {
  $("form#currency-exchanger").submit(function (event) {
    event.preventDefault();
    const currencyType = $("#currency-type").val();
    const currecnyAmount = $("#currency-amount").val();
    $("#currency-type").val();

    Conversion.getConversion(currencyType, currecnyAmount).then(function (
      response
    ) {
      conversionResult(response, currecnyAmount);
    });
  });
});

// base_code: "USD"
// conversion_rate: 521.9797
// documentation: "https://www.exchangerate-api.com/docs"
// result: "success"
// target_code: "AMD"
// terms_of_use: "https://www.exchangerate-api.com/terms"
// time_last_update_unix: 1619136001
// time_last_update_utc: "Fri, 23 Apr 2021 00:00:01 +0000"
// time_next_update_unix: 1619222401
// time_next_update_utc: "Sat, 24 Apr 2021 00:00:01 +0000"

// base_code: "USD"
// conversion_rate: 521.9797
// conversion_result: 13049.4925
// documentation: "https://www.exchangerate-api.com/docs"
// result: "success"
// target_code: "AMD"
// terms_of_use: "https://www.exchangerate-api.com/terms"
// time_last_update_unix: 1619136001
// time_last_update_utc: "Fri, 23 Apr 2021 00:00:01 +0000"
// time_next_update_unix: 1619222401
// time_next_update_utc: "Sat, 24 Apr 2021 00:00:01 +0000"
// __proto__: Object
