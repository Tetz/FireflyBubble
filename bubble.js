

imMaxCh=40;//　最大画像数
imX=new Array(imMaxCh);//　画像の座標
imY=new Array(imMaxCh);
imZ=new Array(imMaxCh);//　画像の加速度
imW=new Array(imMaxCh);//　加速度への加算減算フラグ
imMz=0;//　振幅の大きさ
imA=0;
numberOfImages=3; //画像の種類数 e.g. eff1,eff2,eff3
maxImageSize=100; //最も大きい画像サイズ
var imWx;
var imWy;//　ウインドウの幅と高さ

bw=0;//　ブラウザチェック

// FadeOut and FadeIn Interval
var timeFadeOut = new Array();
var timeFadeIn = new Array();

timeFadeIn[0] = 2000;
timeFadeIn[1] = 19000;
timeFadeIn[2] = 18000;
timeFadeIn[3] = 59000;
timeFadeIn[4] = 19000;
timeFadeIn[5] = 24000;
timeFadeIn[6] = 9000;
timeFadeIn[7] = 29000;
timeFadeIn[8] = 39000;
timeFadeIn[9] = 3000;

timeFadeOut[0] = 10000;
timeFadeOut[1] = 2000;
timeFadeOut[2] = 7000;
timeFadeOut[3] = 5000;
timeFadeOut[4] = 4000;
timeFadeOut[5] = 6000;
timeFadeOut[6] = 9000;
timeFadeOut[7] = 3000;
timeFadeOut[8] = 8000;
timeFadeOut[9] = 20000;

// Flash Pattern FIRST
// $(function(){
//     for (var num = 0; num<timeFadeOut.length; num++){
//         var str;
// 		var opt = num + 1;
//         str = '.blink' + opt;
//         setInterval(function(){
//             $(str).fadeOut(timeFadeOut[num], function(){$(this).fadeIn(timeFadeIn[num])});
//         }, 2000);
//     }
// });

$(function(){
    var str = '.blink' + 1;
    setInterval(function(){
        $(str).fadeOut(timeFadeOut[0], function(){$(this).fadeIn(timeFadeIn[0])});
    }, 2000);
});

$(function(){
    var str = '.blink' + 2;
    setInterval(function(){
        $(str).fadeOut(timeFadeOut[1], function(){$(this).fadeIn(timeFadeIn[1])});
    }, 2000);
});

$(function(){
    var str = '.blink' + 3;
    setInterval(function(){
        $(str).fadeOut(timeFadeOut[2], function(){$(this).fadeIn(timeFadeIn[2])});
    }, 2000);
});

$(function(){
    var str = '.blink' + 4;
    setInterval(function(){
        $(str).fadeOut(timeFadeOut[3], function(){$(this).fadeIn(timeFadeIn[3])});
    }, 2000);
});

$(function(){
    var str = '.blink' + 5;
    setInterval(function(){
        $(str).fadeOut(timeFadeOut[4], function(){$(this).fadeIn(timeFadeIn[4])});
    }, 2000);
});

$(function(){
    var str = '.blink' + 6;
    setInterval(function(){
        $(str).fadeOut(timeFadeOut[5], function(){$(this).fadeIn(timeFadeIn[5])});
    }, 2000);
});

$(function(){
    var str = '.blink' + 7;
    setInterval(function(){
        $(str).fadeOut(timeFadeOut[6], function(){$(this).fadeIn(timeFadeIn[6])});
    }, 2000);
});

$(function(){
    var str = '.blink' + 8;
    setInterval(function(){
        $(str).fadeOut(timeFadeOut[7], function(){$(this).fadeIn(timeFadeIn[7])});
    }, 2000);
});

$(function(){
    var str = '.blink' + 9;
    setInterval(function(){
        $(str).fadeOut(timeFadeOut[8], function(){$(this).fadeIn(timeFadeIn[8])});
    }, 2000);
});

$(function(){
    var str = '.blink' + 10;
    setInterval(function(){
        $(str).fadeOut(timeFadeOut[9], function(){$(this).fadeIn(timeFadeIn[9])});
    }, 2000);
});


// INIT
var numberOfPattern = timeFadeOut.length;
for(var i=0;i<imMaxCh;i++)
{
    var pt = 0;
    pt=Math.round(Math.random()*(numberOfPattern-1)+1);
    var j=Math.round(Math.random()*(numberOfImages-1)+1);
    //document.write("<img src='images/eff"+j+".png' style='position:absolute;left:-200px;' name='imch"+i+"'>");
    document.write("<img src='images/eff"+j+".png' style='position:absolute;left:-200px;' name='imch"+i+"' class='blink"+pt+"'>");
}
imgInit();
function imgInit()//　初期設定
{
    if(document.getElementById){bw=1;}// ネスケ６～　IE５～なら真
    if((document.all)&&(bw==1)){bw=2;}//　IE４～なら真
    if(bw==0)
    {
        alert("ブラウザバージョンが対応していません\n最新のブラウザに更新してください\n推奨バージョン(NN6～,IE5～)\n　　　　+1JavaScript");
        return;
    }
    imMxSet();
    for(var i=0;i<imMaxCh;i++)//　画像の変数の初期設定
    {
        imX[i]=Math.floor(Math.random()*imWx);
        imY[i]=Math.floor(Math.random()*imWy);
        imZ[i]=Math.floor(Math.random()*(imMz-1)*2)-(imMz-1);
        if(Math.random()<0.5){imW[i]=1;}else{imW[i]=-1;}
    }
    imMain();
}
function imMxSet()//　ウインドウをリサイズした時にウインドウの幅と高さを取得
{
    if(bw==1)//　ネスケの場合
    {
        imWx=window.innerWidth+window.pageXOffset-15;
        imWy=window.innerHeight+window.pageYOffset;
    }
    if(bw==2)//　IEの場合
    {
        imWx=window.document.body.clientWidth+document.body.scrollLeft;
        imWy=window.document.body.clientHeight+document.body.scrollTop;
    }
}




function imMain()//　メインルーチン
{
    var x,y;
    imMxSet();
    for(var i=0;i<imMaxCh;i++)
    {
        imX[i]+=Math.abs(imZ[i]);
        imA++;
        if(imA==imMaxCh) 
        {
            imA=0;
            imZ[i]+=imW[i];
            if(Math.abs(imZ[i])>imMz){imW[i]=-imW[i];}
        }
        imY[i]-=0.2;
        if(imY[i]<-maxImageSize) //　画面から消えたら下に戻す
        {
            imX[i]=Math.floor(Math.random()*imWx);
            imY[i]=imWy;
        }
		
		if(imX[i] > imWx - maxImageSize){
			imX[i] = 0;
		}
        x=imX[i];
        y=imY[i];
        // if(bw==1){
        //    if(x>imWx-document.images["imch"+i].width-16){x=-100;}
        // }else{
        //    if(x>imWx-document.images["imch"+i].width){x=-100;}
        // }
        //if(y>imWy-document.images["imch"+i].height){y=-100;}
        document.images["imch"+i].style.left=x; 
        document.images["imch"+i].style.top=y;


    }
    if(bw==2){setTimeout("imMain()",50);}else{setTimeout("imMain()",40);}//　割込処理
}
