// ==UserScript==
// @name         Customise Pet Quick List
// @namespace    http://tampermonkey.net/
// @version      2026-01-01
// @description  shows all your pets in a long list using direct links
// @author       gurase
// @match        https://www.neopets.com/~Waumbek
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// ==/UserScript==

(function() {
    'use strict';

    var pets = {};
    $("body").empty();
    $("body").removeAttr("background");

    $.ajax({
        url: "https://www.neopets.com/home/index.phtml", // Shoutouts to Luxittarius
        method: "GET",
        success: function(data) {
            $(data).find(".hp-carousel-pet").each(function() { //find pet data
                let petImg = $(this).attr("data-petimage");
                let petName = $(this).attr("data-name");
                pets[petName] = petImg;
            });

            // Create a container for the pet images
            var gridContainer = $("<div></div>").css({
                "display": "grid",
                "grid-template-columns": "repeat(auto-fit, minmax(150px, 1fr))",
                "gap": "10px",
                "margin-top": "20px",
            });

            // Append container to body
            $("body").append(gridContainer);

            // Add pet images to the grid
            for (var petName in pets) {
                if(typeof pets[petName] !== 'undefined'){
                    gridContainer.append('<div style="text-align: center;"><img id="pet-' + petName + '" title="' + petName + '" src="' + pets[petName] +
                        '" style="margin-left: 10px; width: 150px;"><br/>' +
                        '<a href="https://www.neopets.com/customise/?view=' + encodeURIComponent(petName) +
                        '" target="new">Customise</a><br/>' +
                        '<a href="https://www.neopets.com/stylingchamber/?view=' + encodeURIComponent(petName) +
                        '" target="new">Styling Chamber</a></div>');
                }
            }
        }
    });
})();
