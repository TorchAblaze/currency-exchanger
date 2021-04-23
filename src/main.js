import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Conversion from "./js/conversion.js";

function conversionResult(response, currency) {
  let responseHTML;
  if (response["error-type"] === "unsupported-code") {
    hideDivs($("#currency-type-error"));
    return $("#currency-type-error").html(
      `The currency in question does not exist. Please try again.`
    );
  } else if (response["conversion_result"]) {
    responseHTML = `<p>${currency} USD converted to ${response["target_code"]} is ${response["conversion_result"]}</p>`;
  } else {
    responseHTML = `There was a ${response}`;
  }
  $("#output").html(responseHTML);
  return hideDivs("#output");
}

function hideDivs() {
  $("#output").hide();
  $("#currency-type-error").hide();
  $("#currency-amount-error").hide();
}

$(document).ready(function () {
  $("form#currency-exchanger").submit(function (event) {
    event.preventDefault();
    const currencyType = $("#currency-type").val();
    const currencyAmount = $("#currency-amount").val();
    $("#currency-amount").val("");

    if (
      currencyAmount === "" ||
      isNaN(currencyAmount) ||
      currencyAmount < 0.1
    ) {
      hideDivs($("#output"));
      $("#output").html(
        `Please enter a valid currency amount in decimal format`
      );
      return;
    }

    Conversion.getConversion(currencyType, currencyAmount).then(function (
      response
    ) {
      conversionResult(response, currencyAmount);
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
