// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };


  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */

var background = chrome.extension.getBackgroundPage();
function renderName(nameText) {
  document.getElementById('name').textContent = nameText;
}

function renderIndex(indexText){
var indexNum = parseInt(indexText, 10);

    var color; //0-10
    if(indexNum <=10){
        color="red";
    }
    else if(indexNum <= 20){
        color = "orange";
    }
    else if(indexNum <= 30){
        color = "dark-yellow";
    }
    else if(indexNum <= 40){
        color = "blue";
    }
    else{
        color="green";
    }
  document.getElementById('index').textContent = indexText;
    document.getElementById("index").style.color = color;
}

function url_domain(data) {
  var    a      = document.createElement('a');
         a.href = data;
  return a.hostname;
}

function openTab(evt, tab) {
  
  // Declare all variables
  var i, tabcontent, tablinks;
  console.log(tab);
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tab+"-content").style.display = "block";
  console.log(evt.currentTarget);
  document.getElementById(tab).className +=" active";
  // evt.currentTarget.className += " active";
}

document.addEventListener('DOMContentLoaded', function(e) {
  document.getElementById("brand-tab").addEventListener('click', function() {openTab(e, "brand-tab")});
  document.getElementById("brand-tab-content").style.display = "block";
});
document.addEventListener('DOMContentLoaded', function(e) {
  document.getElementById("info-tab").addEventListener("click", function() {openTab(e, "info-tab")});
});




document.addEventListener('DOMContentLoaded', function(e) {
  
  getCurrentTabUrl(function(url) {
    var re = /(?<=www.).*(?=.com)/;
    var domain = url.match(re)[0];
    console.log(url.match(re)[0]);
    console.log(typeof(domain));
    if (background.brandNames[domain]){
      brandName = background.brandNames[domain]
      renderName(brandName);
      console.log(background.brandScores[brandName]);
      renderIndex(background.brandScores[brandName]);

    }
    else{
      renderName("No data available for " +  domain.charAt(0).toUpperCase() + domain.substring(1));
    }

  });


});
