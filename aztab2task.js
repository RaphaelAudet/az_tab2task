/*---Ajax functions ---*/

var task = {id: "undefined", owner_id: "undefined", label: "undefined", body: "", url: "" }

function createTask(label) {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      createdTaskCallback(xhttp); }
  }
  var targetUrl=apiUrl + "/tasks";
  var params='label=' + label;
  xhttp.open("POST", targetUrl , true);
  xhttp.setRequestHeader('Authorization', 'Token token='+window.localStorage.apiKey);
  xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  spinnerShow();
  xhttp.send(params);
}

function parseJson(xhttp) {
  response = xhttp.response;
  // jesponse = JSON.parse(response); //api.azendoo.com format
  jesponse = JSON.parse(response).data; //app.azendoo.com/api format
  task.owner_id = jesponse.author;
  task.id = jesponse.id;
  task.label = jesponse.label;
}

function createdTaskCallback(xhttp) {
  parseJson(xhttp);
  updateUI();
  // updateTask();
}

function updatedTaskCallback(xhttp) {
  parseJson(xhttp);
  updateUI();
}

function updateUI() {
  spinnerHide();
  document.getElementById('text').value = task.label;
  // debugTask();
}

function debugTask() {
  console.log('task_id:'+  task.id);
  console.log('owner_id:'+  task.owner_id);
  console.log('label:'+  task.label);
  console.log('body:'+  task.body);
  console.log('url:'+  task.body);
}

function spinnerShow() {
  document.getElementById('spinner').style.visibility = 'visible';
}

function spinnerHide() {
  document.getElementById('spinner').style.visibility = 'hidden';
}

function updateTask() {
  var xhttp;
  xhttp= new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      updatedTaskCallback(xhttp);
    }
  }
  var label = document.getElementById('text').value;
  var targertUrl=apiUrl + "/tasks/"+task.id;
  // var params = JSON.stringify({"owner": task.owner_id,"label":label});
  // var params = JSON.stringify({"owner":task.owner_id, "owner":{"id":task.owner_id},"owner_id":task.owner_id});
  // var params = JSON.stringify({owner: task.owner_id});
  // var params = JSON.stringify({"owner":task.owner_id ,"label":label});
  var params ='{"owner"="' + task.owner_id +'"}';
  // var params ='{"owner"="' + task.owner_id +'"}';
  // var params = JSON.stringify({"body":task.label,"label":label});
  xhttp.open("PUT", targertUrl , true);
  xhttp.setRequestHeader('Authorization', 'Token token='+window.localStorage.apiKey);
  xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  spinnerShow();
  xhttp.send(params);
}

/*---buttons functions ---*/

function addUrlInBody() {
  // console.log("addUrlInBody");
}

function deleteTask() {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      spinnerHide();
      // close popup
    }
  }
  var label = document.getElementById('text').value;
  var targertUrl=apiUrl + "/tasks/"+task.id;
  xhttp.open("DELETE", targertUrl , true);
  xhttp.setRequestHeader('Authorization', 'Token token='+window.localStorage.apiKey);
  xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  spinnerShow();
  xhttp.send();
}

function processTab(tab) {
  if (tab.url.indexOf("http:") != 0 &&
      tab.url.indexOf("https:") != 0) {
    createTask(tab.url);
  } else {
    // chrome.tabs.executeScript(null, {file: "content_script.js"});
  }

}
