// ==UserScript==
// @name         Petpet Lab Ray Grid
// @namespace    http://tampermonkey.net/
// @version      2025-12-23
// @description  shows all your petpets in a grid with pictures to easily select which one to zap with the petpet lab ray! remember to visit your home page to update your petpet list!
// @author       gurase, inspired by toto's Turmac script
// @match        https://www.neopets.com/petpetlab.phtml
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// ==/UserScript==

(function() {
    'use strict';

    var pets = [];

    // Find and hide the petpet selector dropdown
    var targetSelect = $("select[onchange^='selectPet']"); 
    targetSelect.hide();

    $.ajax({
        url: "https://www.neopets.com/home/index.phtml", // Shoutouts to Luxittarius
        method: "GET",
        success: function(data) {
            console.log("succesful query")
            $(data).find(".hp-carousel-pet").each(function() { //find petpet and owner data
                let petpetImg = $(this).attr("data-petpetimg");
                let petpetName = $(this).attr("data-petpet");
                let ownName = $(this).attr("data-name");
                pets.push({petpetimg: petpetImg, petpetName: petpetName, ownName: ownName});
            });

            // Create a container for the petpet images
            var gridContainer = $("<div></div>").css({
                "display": "grid",
                "grid-template-columns": "repeat(auto-fit, minmax(100px, 1fr))",
                "gap": "10px",
                "margin-top": "20px",
            });

            // Append container after dropdown
            targetSelect.after(gridContainer);

            // Create as many buttons as there are pets, use name and image attributes
            for (let i = 0; i < pets.length; i++){
                if(typeof pets[i].petpetimg !== 'undefined' && targetSelect.children('option[value="' + pets[i].ownName + '"]').length > 0){
                    gridContainer.append('<img id="petpet-' + i + '" title="' + pets[i].ownName+ '" src="' + pets[i].petpetimg + '" style="margin-left: 10px;"></a>')
                }
            }

            // Add event listener to select the chosen petpet
            $("img[id^='petpet-']").on("click", function() {
                //console.log("clicked on " + $(this).attr("title"));
                $("img[id^='petpet-']").css("border", "none");  // Remove border from all images
                $(this).css("border", "2px solid blue");    // Add border to clicked image

                var petName = $(this).attr("title");
                targetSelect.val($(this).attr("title")).change(); // Set the dropdown value and trigger change event
                $("#PPL" + petName).addClass("ppl-hidden"); // Hide the selected petpet from OG page code
            });
        }
    });
})();



