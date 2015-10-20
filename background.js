function createTask(subject, body, selection, cfunc) {
  var xhttp;
  xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      cfunc(xhttp, body, selection);
    }
  }

  var targetUrl="https://api.azendoo.com/tasks";
  var apiKeyToken=window.localStorage.apiKey;

  var label=subject;
  var params='label=' + label;

  xhttp.open("POST", targetUrl , true);

  xhttp.setRequestHeader('Authorization', 'Token token='+apiKeyToken);
  xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhttp.send(params);
}

// This will get called by the content script we execute in
// the tab as a result of the user pressing the browser action.
chrome.runtime.onConnect.addListener(function(port) {
  var tab = port.sender.tab;
  port.onMessage.addListener(function(info) {
    var max_length = 1024;
    if (info.selection.length > max_length)
      info.selection = info.selection.substring(0, max_length);
    createTask(info.title, tab.url, info.selection, openWindow);
  });
});

// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function(tab) {
  if (tab.url.indexOf("http:") != 0 &&
      tab.url.indexOf("https:") != 0) {
    createTask(tab.id, "", tab.url, "", openWindow);
  } else {
    chrome.tabs.executeScript(null, {file: "content_script.js"});

  }
});

function openWindow() {
  chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.window.create('window.html', {
      'outerBounds': {
        'width': 400,
        'height': 500
      }
    });
  });
}
