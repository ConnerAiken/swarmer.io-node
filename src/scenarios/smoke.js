////////////////////////////////////////////////////////////////////////////////
// The purpose of this is to show how and when events fire, considering 5 steps
// happening as follows:
//
//      1. Load URL
//      2. Load same URL, but adding an internal FRAGMENT to it
//      3. Click on an internal Link, that points to another internal FRAGMENT
//      4. Click on an external Link, that will send the page somewhere else
//      5. Close page
//
// Take particular care when going through the output, to understand when
// things happen (and in which order). Particularly, notice what DOESN'T
// happen during step 3.
//
// If invoked with "-v" it will print out the Page Resources as they are
// Requested and Received.
//
// NOTE.1: The "onConsoleMessage/onAlert/onPrompt/onConfirm" events are
// registered but not used here. This is left for you to have fun with.
// NOTE.2: This script is not here to teach you ANY JavaScript. It's aweful!
// NOTE.3: Main audience for this are people new to PhantomJS.
"use strict";

var system = require("system"),
    page = require("webpage").create(), 
    logResources = true;
 
////////////////////////////////////////////////////////////////////////////////

page.onInitialized = function() {
    console.log("page.onInitialized");
    printArgs.apply(this, arguments);
};
page.onLoadStarted = function() {
    console.log("page.onLoadStarted");
    printArgs.apply(this, arguments);
};
page.onLoadFinished = function() {
    console.log("page.onLoadFinished");
    printArgs.apply(this, arguments);
};
page.onUrlChanged = function() {
    console.log("page.onUrlChanged");
    printArgs.apply(this, arguments);
};
page.onNavigationRequested = function() {
    console.log("page.onNavigationRequested");
    printArgs.apply(this, arguments);
};
page.onRepaintRequested = function() {
    console.log("page.onRepaintRequested");
    printArgs.apply(this, arguments);
};

if (logResources === true) {
    page.onResourceRequested = function() {
        console.log("page.onResourceRequested");
        printArgs.apply(this, arguments);
    };
    page.onResourceReceived = function() {
        console.log("page.onResourceReceived");
        printArgs.apply(this, arguments);
    };
}

page.onClosing = function() {
    console.log("page.onClosing");
    printArgs.apply(this, arguments);
};

// window.console.log(msg);
page.onConsoleMessage = function() {
    console.log("page.onConsoleMessage");
    printArgs.apply(this, arguments);
};

// window.alert(msg);
page.onAlert = function() {
    console.log("page.onAlert");
    printArgs.apply(this, arguments);
};
// var confirmed = window.confirm(msg);
page.onConfirm = function() {
    console.log("page.onConfirm");
    printArgs.apply(this, arguments);
};
// var user_value = window.prompt(msg, default_value);
page.onPrompt = function() {
    console.log("page.onPrompt");
    printArgs.apply(this, arguments);
};

var globals = {
    baseUrl: system.args[1]
};
////////////////////////////////////////////////////////////////////////////////   
console.log("### STEP 1: Load '" + globals.baseUrl + "'");
page.open(globals.baseUrl);
page.close();
phantom.exit();