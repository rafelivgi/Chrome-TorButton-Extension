// Copyright 2015 Rafel Ivgi. All Rights Reserved.

/**
 * @fileoverview Functionality for VirusTotal official Chrome extension's
 * popup.html.
 * @author admin@ironchrome.co.il
 */

var bkg = chrome.extension.getBackgroundPage();

if (!bkg.torified)
{
	bkg.TORify();
	bkg.torified = 1;
}
else
{
	bkg.unTORify();
	bkg.torified = 0;
}
