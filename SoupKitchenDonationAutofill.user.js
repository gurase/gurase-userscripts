// ==UserScript==
// @name         Soup Kitchen Donation Autofill
// @namespace    http://tampermonkey.net/
// @version      2026-09-11
// @description  Autofills your chosen donation amount at the Soup Kitchen
// @author       gurase
// @match        https://www.neopets.com/soupkitchen.phtml
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// ==/UserScript==

(function() {
    'use strict';

    const donationAmount = "50,000"; // Change this to your desired donation amount
    $("#sk-donate-amount").val(donationAmount);
    $("#sk-donate-submit").prop('disabled', false).removeClass('is-greyscale');
})();