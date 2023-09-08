var img = ['./img/1.jpg', './img/2.jpg','./img/3.jpg','./img/4.jpg','./img/5.jpg',
          './img/6.jpg', './img/7.jpg', './img/8.jpg', './img/9.jpg', './img/10.jpg',
          './img/11.jpg', './img/12.jpg', './img/13.jpg', './img/14.jpg', './img/15.jpg']; // 모든 이미지 경로를 추가합니다.
var old = 0;
var clicks = 0;

function randomize() {
  let root = document.documentElement;
  let randomIndex = Math.floor(Math.random() * img.length); // 랜덤한 인덱스 선택
  let randomImg = img[randomIndex];

  // 이미지 로딩 후 설정
  const tempImg = new Image();
  tempImg.onload = function () {
    root.style.setProperty('--image', 'url(' + randomImg + ')');
    old = randomIndex;
    const $complete = document.getElementById("complete");
    $complete.setAttribute("src", randomImg);
  };
  tempImg.src = randomImg;

  var ul = document.querySelectorAll('#puzz i');
  for (var i = 0; i < ul.length; i++) {
    ul[i].style.left = Math.random() * (window.innerWidth - 100) + 'px';
    ul[i].style.top = Math.random() * (window.innerHeight - 100) + 'px';
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

function popup(){

  var screenWidth = window.screen.width;
  var screenHeight = window.screen.height;

  var popupWidth = 500;
  var popupHeight = 500;


  var left = (screenWidth - popupWidth) / 2;
  var top = (screenHeight - popupHeight) / 2;
 
  window.open("pop.html", "popup", "width=" + popupWidth + ", height=" + popupHeight + ", left=" + left + ", top=" + top);
};