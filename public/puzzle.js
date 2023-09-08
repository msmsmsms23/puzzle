var img = ['./img/1.jpg', './img/2.jpg','./img/3.jpg','./img/4.jpg','./img/5.jpg',
          './img/6.jpg', './img/7.jpg', './img/8.jpg', './img/9.jpg', './img/10.jpg',
          './img/11.jpg', './img/12.jpg', './img/13.jpg', './img/14.jpg', './img/15.jpg'];
var old = 0;
var clicks = 0;
var puzBox = document.getElementById("puz_box");

function randomize() {
  let root = document.documentElement;
  let randomIndex = Math.floor(Math.random() * img.length);
  let randomImg = img[randomIndex];

  const tempImg = new Image();
  tempImg.onload = function () {
    root.style.setProperty('--image', 'url(' + randomImg + ')');
    old = randomIndex;
    const $complete = document.getElementById("complete");
    $complete.setAttribute("src", randomImg);
  };
  tempImg.src = randomImg;

  var ul = document.querySelectorAll('#puzz i');
  var x1 = 0;  // 특정 구역의 시작 x 좌표
  var x2 = 300;  // 특정 구역의 끝 x 좌표
  var y1 = 30;  // 특정 구역의 시작 y 좌표
  var y2 = 300;  // 특정 구역의 끝 y 좌표
  
  for (var i = 0; i < ul.length; i++) {
    var randomLeft = Math.random() * (x2 - x1) + x1 + 'px';
    var randomTop = Math.random() * (y2 - y1) + y1 + 'px';
    
    ul[i].style.left = randomLeft;
    ul[i].style.top = randomTop;
  }
}
randomize();

function reload() {
  var done = document.querySelectorAll('.done');
  done.forEach(function(e) {
    e.classList.toggle('done');
  });
  var dropped = document.querySelectorAll('.dropped');
  dropped.forEach(function(e) {
    e.classList.toggle('dropped');
  });
  var allDone = document.querySelector('.allDone');
  allDone.style = '';
  allDone.classList.toggle('allDone');
};

// mobile functionality
var p = document.querySelectorAll('#puzz i');
p.forEach(function(e){
  e.addEventListener('mousedown', function(){
    clicks++;
    var clicksElement = document.querySelector('#clicks');
    if (clicksElement) {
      clicksElement.innerHTML = clicks;
    };
  });
  e.addEventListener('click', function(){
    if(document.querySelector('.clicked')){
      document.querySelector('.clicked').classList.toggle('clicked');
      e.classList.toggle('clicked');
    } else {
      e.classList.toggle('clicked'); 
    };
  });
});

var fp = document.querySelectorAll('#puz i');
fp.forEach(function(el){
  el.addEventListener('click', function() {
    if (document.querySelector('.clicked')) {
      var c = document.querySelector('.clicked');
      if (c.classList.contains(el.classList)) {
        el.classList.add('dropped');
        c.classList.add('done');
        c.classList.toggle('clicked');

        if (document.querySelectorAll('.dropped').length == 9) {
          document.querySelector('#puz').classList.add('allDone');
          document.querySelector('#puz').style.border = 'none';
          document.querySelector('#puz').style.animation = 'allDone 1s linear forwards';

          setTimeout(function(){
            reload();
            randomize();       
          }, 1500);
        };
      };
    };
  });
});

// desktop drag and drop
function allowDrop(ev) {
  ev.preventDefault();
};

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.className);  
};

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");

  if(ev.target.className == data) {
    ev.target.classList.add('dropped');
    document.querySelector('.'+data+"[draggable='true']").classList.add('done');

    if(document.querySelectorAll('.dropped').length == 9) {
      document.querySelector('#puz').classList.add('allDone');
      document.querySelector('#puz').style.border = 'none';
      document.querySelector('#puz').style.animation = 'allDone 1s linear forwards';

      setTimeout(function() {
        reload();
        randomize();       
      }, 1500);
    };
  };
};