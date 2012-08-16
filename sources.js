(function() {
  var buttonClick = function(event) {
    var type = event.type.toUpper();
    alert('You clicked the button!');
    return false;
  };
  var domReady = function(event) {
    var button = document.getElementById('clickme');
    button.addEventListener('click', buttonClick, false);
  };
  document.addEventListener('DOMContentLoaded', domReady, false);
})();
