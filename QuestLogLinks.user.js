// ==UserScript==
// @name         Quest Log Links
// @namespace    http://tampermonkey.net/
// @license      GNU GPLv3
// @version      2026-11-09
// @description  Adds clickable links to quest log task cards
// @author       gurase, originally by Lamp
// @match        https://www.neopets.com/questlog/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// @downloadURL https://raw.githubusercontent.com/gurase/gurase-userscripts/main/QuestLogLinks.user.js
// @updateURL   https://raw.githubusercontent.com/gurase/gurase-userscripts/main/QuestLogLinks.user.js
// ==/UserScript==

(function() {
    const taskLinks = {
        "Check out Popular NC Items": "https://ncmall.neopets.com/mall/search.phtml?type=popular_items&cat=54&page=1&limit=24f",
        "Claim a Recycled Item": "https://www.neopets.com/donations.phtml",
        "Collect Bank Interest": "https://www.neopets.com/bank.phtml",
        "Customise your Neopet": "https://www.neopets.com/customise/",
        "Deposit in the Bank": "https://www.neopets.com/bank.phtml",
        "Discard an Item": "https://www.neopets.com/inventory.phtml",
        "Donate an Item": "https://www.neopets.com/inventory.phtml",
        "Feed your Neopet": "https://www.neopets.com/safetydeposit.phtml",
        "Fight in the Battledome": "https://www.neopets.com/dome/",
        "Fish at Ye Olde Fishing Vortex": "https://www.neopets.com/water/fishing.phtml",
        "Grab an Omelette": "https://www.neopets.com/prehistoric/omelette.phtml",
        "Groom your Neopet": "https://www.neopets.com/safetydeposit.phtml",
        "Play a game": "https://www.neopets.com/games/game.phtml?game_id=366",
        "Play Grumpy Old King": "https://www.neopets.com/medieval/grumpyking.phtml",
        "Play Wise Old King": "https://www.neopets.com/medieval/wiseking.phtml",
        "Play with your Neopet": "https://www.neopets.com/safetydeposit.phtml",
        "Purchase Item(s)": "https://www.neopets.com/generalstore.phtml",
        "Read to your Neopet": "https://www.neopets.com/safetydeposit.phtml",
        "Scratch a Scratchcard": "https://www.neopets.com/halloween/scratch.phtml",
        "Spin the Wheel of Excitement": "https://www.neopets.com/faerieland/wheel.phtml",
        "Spin the Wheel of Knowledge": "https://www.neopets.com/medieval/knowledge.phtml",
        "Spin the Wheel of Mediocrity": "https://www.neopets.com/prehistoric/mediocrity.phtml",
        "Spin the Wheel of Misfortune": "https://www.neopets.com/halloween/wheel/index.phtml",
        "Visit NC Mall": "https://ncmall.neopets.com/mall/shop.phtml",
        "Vote in Customisation Spotlight": "https://www.neopets.com/spotlights/custompet/?tab=vote"
    };

    const tasks = document.getElementsByClassName('ql-task-description');
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i].innerHTML;
        const url = taskLinks[task];
        if (url) {
            tasks[i].innerHTML = `<a target="_blank" href="${url}">${task}</a>`;
        }
    }
})();
