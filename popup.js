var apiUrl="https://api.azendoo.com/api";
// var apiUrl="https://api.azenstaging.com/api";

document.addEventListener('DOMContentLoaded', function () {
  // document.getElementById('addUrlInBody').addEventListener("click", addUrlInBody);
  document.getElementById('deleteTask').addEventListener("click", deleteTask);
  // document.getElementById('saveTask').addEventListener("click", updateTask);


  chrome.tabs.query({active: true}, function (tabs) {
    processTab(tabs[0]);
  });
});