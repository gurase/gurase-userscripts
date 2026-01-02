// ==UserScript==
// @name         Petpet Lab Ray Grid
// @namespace    http://tampermonkey.net/
// @version      2025-12-27
// @description  shows all your petpets in a grid with pictures to easily select which one to zap with the petpet lab ray!
// @author       gurase, inspired by toto's Turmac script
// @match        https://www.neopets.com/petpetlab.phtml
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// ==/UserScript==

(function() {
    'use strict';

    // Find and hide the petpet selector dropdown
    var targetSelect = $("select[onchange^='selectPet']");
    targetSelect.hide();

    // Get petpets already displayed on the page
    var petpets = {};
    $("div[id^='PPL']").children("img").each(function() {
        let petpetImg = $(this).attr("src");
        let petName = $(this).parent().attr("id").substring(3); // Remove "PPL" prefix to get pet name
        petpets[petName] = petpetImg;
    });

    // Create a container for the petpet images
    var gridContainer = $("<div></div>").css({
        "display": "grid",
        "grid-template-columns": "repeat(auto-fit, minmax(100px, 1fr))",
        "gap": "10px",
        "margin-top": "20px",
        "font-size": "11pt"
    });

    // Append container after dropdown
    targetSelect.after(gridContainer);

    // Add petpet images to the grid
    for (var petName in petpets) {
        if(typeof petpets[petName] !== 'undefined' && targetSelect.children('option[value="' + petName + '"]').length > 0){
            gridContainer.append('<div id="petpet-' + petName + '"><img title="' + petName + '" src="' + petpets[petName] + '" style="margin-left: 10px;"><br/>' +
                petName + '</div>');
        }
    }

    // Add event listener to select the chosen petpet
    $("div[id^='petpet-']").on("click", function() {
        //console.log("clicked on " + $(this).attr("title"));
        $("div[id^='petpet-']").css("border", "none");  // Remove border from all images
        $(this).css("border", "2px solid blue");    // Add border to clicked image

        var petName = $(this).attr("title");
        targetSelect.val(petName).change(); // Set the dropdown value and trigger change event
        $("#PPL" + petName).addClass("ppl-hidden"); // Hide the selected petpet from OG page code
    });
})();
