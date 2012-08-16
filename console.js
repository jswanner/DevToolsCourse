(function() {
  var handleClick = function(node, callback){
    if (!node) {
      console.error('DOM node required');
      return;
    }
    node.addEventListener('click', callback, false);
  };

  window.handleClick = handleClick;
})();
