define(['module'], function(module) {
  var link = {
    load: function(name, req, onLoad, config) {
      var l = document.createElement('link');
      l.type = "text/css";
      l.rel = "stylesheet";
      l.href = req.toUrl(name);
      document.getElementsByTagName("head")[0].appendChild(l)
      onLoad(l.sheet || l.stylesheet);
    }
  }
  return link;
});