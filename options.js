function init() {
  if (window.localStorage == null) {
    alert("LocalStorage must be enabled for changing options.");
  } else {
    document.getElementById('apikey').value = window.localStorage.apiKey;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  init();
  document.getElementById("button").addEventListener("click", function(event){
    window.localStorage.apiKey = document.getElementById('apikey').value;
  });
});


