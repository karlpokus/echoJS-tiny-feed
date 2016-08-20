function feedback(str) {
  $('h1').html(str);
}

function getData(cb) {
  var url = "https://gaston-api.herokuapp.com/echoJS?n=5&t=latest";
  $.get(url, function(data){
    var o = JSON.parse(data);
    cb(null, o);
  }).fail(function(jqXHR, textStatus, error){
    cb(error);
  });
}

function displayData(arr) {
  arr.forEach(function(o){
    var a = '<p><a href="' + o.url + '">' + o.title +'</a></p>';
    $('.list').append(a);
  });
}

// DOM loaded
$(function(){
  // set listener for links
  $('body').on('click', 'a', function(){
    chrome.tabs.create({url: $(this).attr('href')});
    return false;
  });
  // init
  feedback('Loading..');
  getData(function(err, data){
    if (!err && data.status === 'ok') {
      feedback('echoJS tiny feed - 5 latest posts');
      displayData(data.news);
    } else {
      feedback(err || data.error);
    }
  });
});
