// ==UserScript==
// @name         Compact Lemmy to Old.Reddit Re-format (Observer)
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Reformat widescreen desktop to look more like Reddit
// @author       mershed_perderders, DarkwingDuck, dx1@lemmy.world
// @match        https://*/*
// ==/UserScript==

(function() {
	'use strict';

	var isLemmy = document.head.querySelector("[name~=Description][content]").content === "Lemmy";

	function GM_addStyle(css) {
		const style = document.getElementById("GM_addStyleBy8626") || (function() {
			const style = document.createElement('style');
			style.type = 'text/css';
			style.id = "GM_addStyleBy8626";
			document.head.appendChild(style);
			return style;
		})();
		const sheet = style.sheet;
		sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
	}

	function MoveCommentCollapseButton(container) {
		var firstTargDiv = container.querySelector(".btn.btn-sm.text-muted");
		var secondTargDiv = container.querySelector(".mr-2");
		//-- Swap last to first.
		container.insertBefore(firstTargDiv, secondTargDiv);
	}

	function ApplyMoveCommentCollapseButton(element) {
		const observer = new MutationObserver(function(mutationsList) {
			for (let mutation of mutationsList) {
				if (mutation.type === 'childList') {
					for (let addedNode of mutation.addedNodes) {
						if (addedNode.matches('.d-flex.flex-wrap.align-items-center.text-muted.small')) {
							MoveCommentCollapseButton(addedNode);
						}
					}
				}
			}
		});

		observer.observe(element, { childList: true, subtree: true });
	}

  // Lemmy to old.Reddit style reformats (to be used for custom stylesheet at a later date)
	if (isLemmy) {
		//GM_addStyle(".container-fluid, .container-lg, .container-md, .container-sm, .container-xl { margin-right: unset !important; margin-left: unset !important; padding-left: unset !important;}"); //this is not needed
		GM_addStyle(".container, .container-lg, .container-md, .container-sm, .container-xl { max-width: 100% !important; }");
		// bootstrap column widths
		GM_addStyle(".col-md-4 { flex: 0 0 20% !important; max-width: 20%; }");
		GM_addStyle(".col-md-8 { flex: 0 0 80% !important; max-width: 80%; }");
		GM_addStyle(".col-sm-2 { flex: 0 0 10% !important; max-width: 10% }");
		GM_addStyle(".col-1 { flex: 0 0 4% !important; max-width: 4% !important; }");
		GM_addStyle(".col-8 { max-width: 100% !important; }");
		// specific column combos that need padding adjustment
		GM_addStyle(".col-12.col-md-8 { padding-left: unset !important; }");
		GM_addStyle(".col-12.col-sm-9 { padding-left: unset !important; }");
		// bootstrap padding controls - shame I have to modify these...
		GM_addStyle(".pl-1, .px-1 { padding-left: 0 !important; padding-right: 0 !important; }");
		GM_addStyle(".pl-3, .px-3 { padding-left: 0 !important; padding-right: 0 !important; }");
		// control verital padding
		GM_addStyle(".mb-1, .my-1 { margin-bottom: 0.1rem !important; }");
		GM_addStyle(".mb-2, .my-2 { margin-bottom: 0.1rem !important; }");
		//GM_addStyle(".mb-3, .my-3 { margin-bottom: 0.1rem !important; }"); //not needed; this collapses padding between button rows
		GM_addStyle(".mt-3, .my-3 { margin-top: 0.1rem !important; }");
		GM_addStyle(".mt-4, .my-4 { margin-top: 0.1rem !important; }");
		//control size of thumbnails
		GM_addStyle(".thumbnail { height: 70px; min-height: 70px !important; max-height: 70px !important; min-width: 70px !important; max-width: 70px !important;}"); //keep thumbnails as square as we can and about the size of each post row
		GM_addStyle(".embed-responsive-item { height: 70px; min-height: 70px !important; max-height: 70px !important; min-width: 70px !important; max-width: 70px !important;}"); //keep thumbnails as square as we can and about the size of each post row
		GM_addStyle(".position-relative.mb-2 { max-width: 730px; }"); //community banner image - currently restricted to Lemmy default size, since that what mods/admins would optimize for
		GM_addStyle(".vote-bar { margin-top: 0.1em !important; }");
		GM_addStyle(".navbar-nav { margin-top: 0px !important; margin-bottom: 0px !important; }");
		// controls size of bottom post buttons, post comment count, vote button arrows
		GM_addStyle(".btn { font-size:0.75rem !important; }");
		// size of vote counter
		GM_addStyle(".unselectable.pointer.font-weight-bold.text-muted.px-1 { font-size: 1.2em; }");
		// font sizes
		GM_addStyle(".h5, h5 {  font-size: 1rem !important; margin-bottom: 0.1rem !important;}"); //post title
		// commenting areas and styles
		GM_addStyle(".comments { margin-left: 1em !important; }");
		GM_addStyle(".comment { margin-top: 0.2em; }"); //added some top margin between comment sorting buttons and comment section
		GM_addStyle(".comment p { max-width: 840px }"); //this can be adjuted to preference.  840px looks nice though.
		GM_addStyle(".comment textarea {  max-width: 840px }");
		GM_addStyle(".comment .details > div > div > .md-div > p { font-size:0.9rem; }");
		GM_addStyle(".flex-grow-1 {  flex-grow: 0 !important; }"); // needed to keep tools with comment box
		GM_addStyle(".form-row { width:50% }");
		GM_addStyle(".table-sm td, .table-sm th {   padding: .1rem;   vertical-align: middle; }");      //do need this!
		//GM_addStyle("#community_table { width:99%; }"); //stop going beyond the width of the screen!  //don't need this anymore
		// some instances include a tag line
		GM_addStyle("#tagline {margin-left:1em;}");
		// Look, I said I wanted to see NSFW and I meant it!
		GM_addStyle(".img-blur {filter: none !important; -webkit-filter: none !important; -moz-filter:none !important; -o-filter: none !important; -ms-filter: none !important;}");
		// Tighten up display of individual post listings
		// post-listing margin and padding can be adjusted smaller, but beyond about .25 is gets a bit too tight and differences between individual post spacing looks annoying
		GM_addStyle(".post-listing { margin: 0.25rem 0 !important; padding: 0.25rem 0 !important;}");
		GM_addStyle(".post-listing picture img.rounded-circle{ width:1.25rem; height:1.25rem;}");
		GM_addStyle(".post-listing .d-none .row .col-sm-2 { max-width:100px; }"); //thumbnail width control (keep it square, dang it!)
		GM_addStyle(".post-listing .d-none .row .col-sm-9 { display:flex; align-items:unset !important; }");
		// entire page display tweaks
		GM_addStyle("#app > div > .container-lg { margin-left: 1em !important;}");
		GM_addStyle("#app > div > .container-lg { max-width: 99% !important; }");
		GM_addStyle("#app > div > .container-lg { margin-left: unset !important }");
		GM_addStyle("#app > nav > .container-lg { max-width: 100% !important;}");
		GM_addStyle("#app > navbar > .container-lg { margin-left: unset !important }");
		GM_addStyle("#app > .mt-4 > .container-lg hr.my-3 { display: none;}");
		//GM_addStyle("#app > .mt-4 > .container-lg { margin:0; padding:0;}"); //this is causing alignment problems accross the different page types (main page, comments, search, communities)
		// post index layout
		//GM_addStyle(".main-content-wrapper { margin-left: -15px; }"); //nope.
		GM_addStyle("#app > .mt-4 > .container-lg > .row  { margin: unset !important;}");
		GM_addStyle("#app > .mt-4 > .container-lg > .row > main { max-width:100%;}");
		// post layout
		//GM_addStyle("#app > .mt-4 > .container-lg > .row > aside{ font-size:0.7rem;}"); //controls the font size in the sidebar - no longer needed
		GM_addStyle("#app > .mt-4 > .container-lg > .row > .col-md-8 { width:calc(100% - 450px);}");
		GM_addStyle("#app > .mt-4 > .container-lg > .row > .col-md-4 { width:450px;}");

		// Move comment collapse buttons for existing elements
		var divList = document.querySelectorAll(".d-flex.flex-wrap.align-items-center.text-muted.small");
		divList.forEach(MoveCommentCollapseButton);

		// Apply MoveCommentCollapseButton to dynamically loaded elements
		ApplyMoveCommentCollapseButton(document.documentElement);

		// the tagline needs to be moved to before any .row instance, otherwise the alignment goes all goofy - there's a cleaner way to do this, but this will serve for now.
		//document.getElementById("tagline").remove();
		var div_list = document.querySelectorAll("div#app");
		var div_array = [...div_list];

		div_array.forEach(container => {
			var firstTargDiv = container.querySelector("div#tagline");
			var secondTargDiv = container.querySelector(".mt-4.p-0.fl-1");
			//-- Swap last to first.
			container.insertBefore (firstTargDiv, secondTargDiv);
		});
	}
})();
