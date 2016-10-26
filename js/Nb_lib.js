/**
 * Created by Administrator on 2016/10/26 0026.
 */

    var N_lib=function(){



   }
   N_lib.prototype.lazyload=function(Felem){
      console.log('开始');
    var Scrolltop=0;//滚动标志
    var Felem=document.querySelector(Felem);
    var FelemHeight=Felem.offsetHeight;
    var FelemWidth=Felem.offsetWidth;
    var Selem=document.querySelectorAll('[data-imgurl]');
    var LoadImage=function(elem){
        var src=elem.getAttribute('data-imgurl');
        var image=new Image();
        image.onload=function(){
        elem.src=src;
        };
        image.src=src;
    }
    var Eloaction=function(elem){
     var top=0;
     var left=0;
     var _elem=elem;
     while (elem!=Felem){
         top=elem.offsetHeight+elem.offsetTop;
         left=elem.offsetWidth+elem.offsetLeft;
         elem=elem.parentNode;
     }
     return {
         elem:_elem,
         top:top,
         left:left
     };
    };
    var PdGetUrl=function(elem){
        for(var i=0;i<elem.length;i++){

            var wz=Eloaction(elem[i]);
            if((wz.top>Felem.scrollTop&&wz.top-wz.elem.offsetHeight<Felem.scrollTop+FelemHeight)&&(wz.left>Felem.scrollLeft&&wz.left-wz.elem.offsetWidth<Felem.scrollLeft+FelemWidth)){
                LoadImage(wz.elem);
            }

        }

    }
    var PdScrollStop=function(){
        if(Scrolltop==Felem.scrollTop) return true;
        Scrolltop=Felem.scrollTop;
        return false;
    }

    var Tscroll=function(){
       //elem.addEventListener('scroll',function(){
       //
       //},false)
        setInterval(function(){
            if(PdScrollStop())
            PdGetUrl(Selem);
        },500);
    }
    Tscroll();
    return this;

}

N_lib.prototype.preload=function(argA){
       var flag=0;

    if(typeof argA =="string"){
        var image=new Image();
        image.src=argA;
        image.onload=function(){

        }
        image.onerror=function(){

        }
    }
    else if(typeof argA=="array"){
        for(var i in argA){
            var image=new Image();
            image.src=argA;
            image.onload=function(){

            }
            image.onerror=function(){

            }
        }
    }
    else{
        return false;
     }

}

