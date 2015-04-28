'use strict';

function genFaviconDiv(){
	var faviconDiv = document.createElement('div');
	faviconDiv.className = "faviconDiv";
	return faviconDiv;
}

function addFaviconImg(item) {
    var faviconUrl;
    // create div for each favicon
    faviconUrl = 'chrome://favicon/' + item.url;
    var faviconDiv = genFaviconDiv();
    var faviconTitle = item.title.replace(/\"/g, "");
    faviconDiv.innerHTML += '<a href="' + item.url + '"><img title="Title: ' + faviconTitle + '&#10;" class="favicon" src="' + faviconUrl + '"></img></a>';
    document.getElementById('faviconHolder').appendChild(faviconDiv);    
}

var testItem0 = {title: "CNN", url: "http://www.cnn.com" };
var testItem1 = {title: "wikipedia", url: "http://www.wikipedia.org/"};
var testItem2 = {title: "Yahoo", url: "https://www.yahoo.com/"};
var testItem3 = {title: "wework", url: "https://www.wework.com/"};

function genFavicons(){
    console.log("genFavicons");

    /*
     * Items accessed outside of chrome.history.search -- In the Network timeline these 
     * never hit the cache.
     */
    addFaviconImg(testItem0);
    addFaviconImg(testItem1);

	var dummyA = document.createElement('a');
	chrome.history.search({
		'text': '',
		'maxResults': 20,
		'startTime': -1,
	}, function (historyItems){
        // N.B.: We don't actually use historyItems here
        /*
         * Access some fixed set of URLs inside of chrome.history.search -- the latter two 
         * items (which we haven't accessed outside of chrome.history.search) seem to always
         * hit the cache.
         */
        addFaviconImg(testItem0);
        addFaviconImg(testItem1);
        addFaviconImg(testItem2);
        addFaviconImg(testItem3);
	});
}

document.addEventListener('DOMContentLoaded', genFavicons );