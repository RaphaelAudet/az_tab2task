var apiUrl="https://api.azendoo.com";

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('addUrlInBody').addEventListener("click", addUrlInBody);
  document.getElementById('deleteTask').addEventListener("click", deleteTask);
  document.getElementById('saveTask').addEventListener("click", updateTask);

  chrome.tabs.query({active: true}, function (tabs) {
    if (tabs.length > 1)
      console.log('Query unexpectedly returned more than 1 tab.');
    processTab(tabs[0]);
  });
});