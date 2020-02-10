var video = document.getElementById("video");
var container = document.getElementById("container");
var iconos = document.getElementsByClassName("icon");
var controles = document.getElementById("controls");

$("document").ready(function(){
  var allImages = document.getElementsByTagName('img');

  for(var i = 0; i < allImages.length ; i++) {
    // to open all photos in new tabs:
    // window.open(allImages[i].src, '_blank');
    if(allImages[i].alt == "www.000webhost.com"){
      allImages[i].remove();
    }
  }
});

let params = (new URL(document.location)).searchParams;
let name = params.get("ep");

$.getJSON( "series/The-Office.json", function( data ) {

  for(var i = 0; i < data.episodios.length; i++){
    if(data.episodios[i].nombre == name){
      video.src = data.episodios[i].link;
    }
  }

});


SpatialNavigation.init();
SpatialNavigation.add({
  selector: 'img'
});
SpatialNavigation.focus("toggleplay");


var hovertime = 2;
var op = 1;
var t = setInterval(function(){
  if(hovertime <= 0){
    if(op == 1){
    $(iconos).stop().animate({opacity: '0'}, 50);
    op = 0;
  }
  }else{
      hovertime--;
  }
},1000);


container.addEventListener("mousemove", function(){
  if(op == 0){
  op = 1;
  $(iconos).stop().animate({opacity: '1'}, 50);
  hovertime = 2;
}
});

Array.from(iconos).forEach(function(element) {
      element.addEventListener('mouseenter', function(){ op = 2; });
      element.addEventListener('mouseleave', function(){ op = 1; });
    });


//////////////////////////////////////////////////////////
///////////////////CONTROL ICONS STATUS///////////////////////
/////////////////////////////////////////////////////////
var toggleplay = document.getElementById("toggleplay");
var togglefs = document.getElementById("togglefs");
var circulo = document.getElementById("circle");
video.oncanplay = function() {
    $("#idioma").css('display','block');
    $("#volumen").css('display','block');
    $("#toggleplay").css('display','block');
    $("#togglefs").css('display','block');
    //$("#volumenbar").css('display','block');
    video.volume = 1;
    $("#circle").css('left',"10px");
    if(video.paused){
      toggleplay.src = "assets/play.svg";
    }else{
      toggleplay.src = "assets/pausa.svg";
    }

};

video.onpause = function() {
    toggleplay.src = "assets/play.svg";
};

video.onplay = function() {
    toggleplay.src = "assets/pausa.svg";
};

var fs = false;
document.getElementById("togglefs").addEventListener("click", function(){
  if(!fs){
  document.documentElement.requestFullscreen();
  togglefs.src = "assets/pantalla-completa-exit.svg";
  fs = true;
}else{
  document.exitFullscreen();
  togglefs.src = "assets/pantalla-completa-enter.svg";
  fs = false;
}
});

document.getElementById("volumen").addEventListener("click", function(){
  if(video.muted){
    video.muted = false;
  }else{
    video.muted = true;
  }
});
$("#volumen").on({
    mouseenter: function () {
        op = 2;
        $("#volumenbar").show();
    },
    mouseleave: function () {
      op = 1;

    setTimeout(function(){
      if(op != 2){
      $("#volumenbar").hide();
    }
     }, 1000);

    }
});

$("#volumenbar").on({
    mouseenter: function () {
      $("#volumenbar").show();
      op = 2;
    },
    mouseleave: function () {
      if(!moviendole){
      op = 1;
    setTimeout(function(){
      $("#volumenbar").hide();
    }, 1000);
  }
    }
});

video.onvolumechange = function() {
  if(video.muted){
    document.getElementById("volumen").src = "assets/muted.svg";
  }else{
    document.getElementById("volumen").src = "assets/altavoz.svg";
  }
    document.getElementById("volumenactual").style.width = video.volume * 100 + "px";
};
var moviendole = false;
circulo.addEventListener("mousedown",function(){
  moviendole = true;
});

document.addEventListener("mousemove",function(evt){
  if(moviendole){

    if(evt.pageX > 220){
    }else if(evt.pageX < 120){
    }else{
          $("#circle").css('left',(evt.pageX - 120) + "px");
          var pos = $("#circle").position().left;
           video.volume = pos / 100;
    }
  }
});

document.addEventListener("mouseup",function(){
  if(moviendole == true){
  moviendole = false;
  $("#volumenbar").mouseleave();
}
});

video.onwaiting = function() {
    $("#loading").show();
};

video.onplaying = function() {
    $("#loading").hide();
};

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////



toggleplay.addEventListener("click", function(){
  if(video.paused){
    video.play();

}else{
    video.pause();
}
});

document.addEventListener("keydown",function(evt){
  if(evt.key == "ArrowLeft"){
    video.currentTime = video.currentTime - 10;
  }else if(evt.key == "ArrowRight"){
    video.currentTime = video.currentTime + 10;
  }
  if(op == 0){
  op = 1;
  $(iconos).stop().animate({opacity: '1'}, 50);
  SpatialNavigation.focus("toggleplay");
  hovertime = 2;
}else{
  if(evt.key == "ArrowUp"){
    SpatialNavigation.focus("idioma");
  }
}
});
