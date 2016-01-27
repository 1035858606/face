/**
 * Created by a on 2015/10/29.
 */
var start = document.getElementById("starbtn");
var gettime = document.getElementById("time");
var page1 = document.getElementById("page1");
var page2 = document.getElementById("page2");
var page3 = document.getElementById("page3");
var box = document.getElementById("box");
var scores = document.getElementById("scores");
var pause = document.getElementById("pause");
var alertscore = document.getElementById("alertScore");
var playagain = document.getElementById("playAgain");
var startflag = "on";
var timer = null;
var fen = 0;
var num = 2;
var n = 60.00;

start.onclick = function(){
    time();
    create();
};

playagain.onclick = function(){
    page3.style.display="none";

    page2.style.display="block";
    page2.style.opacity = "1";

    n = 60.00;
    fen = 0;
    num = 2;
    scores.innerHTML="0";
    time();
    create();
};

function time(){
    page1.style.display="none";
    page2.style.display="block";
    startflag="off";
    timer = setInterval(function(){
        n-=0.02;
        gettime.innerHTML = n.toFixed(2);
        if(n.toFixed(2) == 0.00){
            gettime.innerHTML="0.00";
            clearInterval(timer);
            startflag="on";
            gameover();
        }
    },20);
}

function create(){
    box.innerHTML="";
    var boxw = box.clientWidth*0.98-2*num;
    var w = boxw/num+"px";
    var h = w;
    for(var j = 0;j<num*num;j++){
        var odiv = document.createElement("div");
        odiv.style.width = w;
        odiv.style.height = h;
        var oimg = document.createElement("img");
        oimg.setAttribute("src","images/1.png");
        odiv.appendChild(oimg);
        box.appendChild(odiv);
    }
    var rn =randomColor();
    for(var i = 0;i<box.childNodes.length;i++){
        box.childNodes[i].childNodes[0].setAttribute("style","background:"+rn);
    }
    change();
    num++;
}

function change(){
    var rn = Math.floor(Math.random()*box.children.length);
    var img = box.childNodes[rn].childNodes[0];
    img.src="images/2.png";
    img.onclick = function(){
        if(startflag == "on"){return}
        fen += 10;
        scores.innerHTML = "分数：" + fen;
        create();
    }
}

function randomColor(){
    return "rgb(" + randomVal(255) + "," + randomVal(255) + "," + randomVal(255) + ")";
}

function randomVal(val){
    return Math.floor(Math.random()*(val+1));
}

function gameover(){
    var i = 1,
        j= 0;
    var timer1 = setInterval(function(){
        i-=0.1;
        page2.style.opacity = i;
        if(page2.style.opacity  < 0){
            clearInterval(timer1);
            page2.style.display="none";

            var timer2 = setInterval(function(){
                page3.style.display="block";
                j+=0.1;
                page3.style.opacity = j;
                if(page3.style.opacity  > 0.9){
                    clearInterval(timer2);
                    alertscore.innerHTML = "你的得分是：" + fen + "分"
                }
            },30)
        }
    },30)
}