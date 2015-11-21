var apiUrl="https://api.azenstaging.com/api";
// var apiUrl="https://api.azenstaging.com";
// var apiUrl="https://staging.azendoo.com/api";

document.addEventListener('DOMContentLoaded', function () {
  // document.getElementById('addUrlInBody').addEventListener("click", addUrlInBody);
  document.getElementById('deleteTask').addEventListener("click", deleteTask);
  // document.getElementById('saveTask').addEventListener("click", updateTask);
  window.localStorage.apiKey = 'TESTKEY';
  createTask('SAMPLE');
});