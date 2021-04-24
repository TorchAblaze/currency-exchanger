import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import Conversion from "./js/conversion.js";

function conversionResult(response, currency) {
  let responseHTML;
  if (response["error-type"] === "unsupported-code") {
    hideDivs("#currency-type-error");
    responseHTML = `The currency in question does not exist. Please try again.`;
    return $("#currency-type-error").html(responseHTML);
  } else if (response["conversion_result"]) {
    responseHTML = `<p>${currency} ${response["base_code"]} converted to ${response["target_code"]} is ${response["conversion_result"]}</p>`;
  } else {
    responseHTML = `There was an error: ${response["error-type"]}`;
  }
  hideDivs("#output");
  return $("#output").html(responseHTML);
}

function hideDivs(resultDiv) {
  const divList = ["#output", "#currency-type-error", "#currency-amount-error"];
  const resultIndex = divList.indexOf(resultDiv);
  divList.splice(resultIndex, 1);
  divList.forEach((element) => {
    $(element).hide();
  });
  $(resultDiv).show();
}

$(document).ready(function () {
  $("form#currency-exchanger").submit(function (event) {
    event.preventDefault();
    const baseCurrency = $("#currency-base").val();
    const targetCurrency = $("#currency-target").val();
    const currencyAmount = $("#currency-amount").val();
    $("#currency-amount").val("");
    if (
      currencyAmount === "" ||
      isNaN(currencyAmount) ||
      currencyAmount < 0.1
    ) {
      $("#currency-amount-error").html(
        `Please enter a valid currency amount in decimal format`
      );
      hideDivs("#currency-amount-error");
      return;
    }

    Conversion.getConversion(baseCurrency, targetCurrency, currencyAmount).then(
      function (response) {
        conversionResult(response, currencyAmount);
      }
    );
  });
});
