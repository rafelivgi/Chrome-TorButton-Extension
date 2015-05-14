// Copyright 2015 Rafel Ivgi. All Rights Reserved.

/**
 * @fileoverview Automating online scanning with VirusTotal as a Chrome Extension.
 * Allows automatic URL and Download scanning in VirusTotal.
 * @author rafelivgi@gmail.com (Rafel Ivgi)
 * @support admin@ironchrome.co.il (Nimrod Levy)
 */


// Add the "contains" function to the JavaScript Array object
Array.prototype.contains = function(obj) {
	try {
		var i = this.length;
		while (i--) {
			if (this[i] == obj) {
				return true;
			}
		}
	}
	catch (e)
	{
	}
	return false;
}


// Add the "contains" function to the JavaScript Array object
Array.prototype.remove = function(obj) {
	try {
		var index = this.indexOf(obj);
		if (index > -1) {
			this.splice(index, 1);
		}
	}
	catch (e)
	{
	}
	return false;
}


// Set uninstall URL so we can get user feedback and learn from our mistakes
chrome.runtime.setUninstallURL("http://www.ironchrome.co.il/torbutton_uninstall_feedback.php");


// JavaScript "Sleep" (Delay/Wait) function
function sleep(seconds) {
	try {
	    var start = new Date().getTime();
		while (new Date() < start + seconds * 1000) {}
	}
	catch (e)
	{
	}
    return false;
}


// Start/Run Process Tor.exe
chrome.tabs.create({'url': 'tor://'}, function(curTabId) {
	try {
		sleep(0.500);
		chrome.tabs.remove(curTabId.id);
	}
	catch (e)
	{
	}
});


// Force all Chrome tabs making all connections using all protocols to go through Tor
// DNS might still leak!!! unless the following command line is used:
// --host-resolver-rules="MAP * 0.0.0.0 , EXCLUDE myproxy"
// If your proxy is running localy (liek Tor)
// then: --host-resolver-rules="MAP * 0.0.0.0 , EXCLUDE 127.0.0.1"
// --proxy-server="socks5://127.0.0.1:9050"
function TORify() {
	try {
		var config = {
		  mode: "fixed_servers",
		  rules: {
			singleProxy: {
			  scheme: "socks5",
			  host: "127.0.0.1",
			  port: 9050
			}    
		  }
		};
		chrome.proxy.settings.set({value:config, scope:"regular"});
	}
	catch (e)
	{
	}
}


// Force all Chrome tabs to connect directly, WITHOUT Tor
function unTORify() {
	try {
		// Return to normal mode "Direct" no proxy
		chrome.proxy.settings.set({value:{mode:"direct"}, scope:"regular"});
	}
	catch (e)
	{
	}
}


// The list of all the Tab IDs which are currently opened via TOR
var TORifiedTabs = [];


// Define the OpenViaTOR object
if (!OpenViaTOR) {
  var OpenViaTOR = {};
};


/**
 * The Chrome Context Menu label for the extension item.
 * @type {string}
 */
OpenViaTOR.title = 'Israeli-IronChrome: Open Link Anonymously Via TOR';

/**
 * Opens the URL via TOR.
 * @param {string} url The url that should be browsed anonymously via TOR.
 */
OpenViaTOR.open = function(url) {
	try {
		chrome.tabs.create({'url': url}, function(curTabId) {
			TORifiedTabs.push(curTabId.id);

			chrome.tabs.onRemoved.addListener(function (tabId) {
				
			   if (TORifiedTabs.contains(tabId)) {
					unTORify();
					TORifiedTabs.remove(tabId);
			   }

			});
			
		});
	}
	catch (e)
	{
	}
};


/**
 * Opens a given link/url in a new tab via Chrome.
 */
OpenViaTOR.browseViaTor = function(info, tab) {
	try {
		if (info.linkUrl !== undefined) {
			TORify();
			OpenViaTOR.open(info.linkUrl);

		} else if (info.selectionText !== undefined) {
			// alert not a valid link?!
		}
	}
	catch (e)
	{
	}
};


// Add context menu entry to open links via Tor
try{
	chrome.contextMenus.create({'title': OpenViaTOR.title,
                            'contexts': ['link', 'selection'],
                            'onclick': OpenViaTOR.browseViaTor});
}
catch (e)
{
}

