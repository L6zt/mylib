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
         top=top+parseInt(elem.offsetTop);
         console.log(top);
         elem=elem.offsetParent;
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
            if((wz.top>Felem.scrollTop)&&(wz.top<Felem.scrollTop+FelemHeight)){
                LoadImage(wz.elem);
            }
            if((wz.top+wz.elem.offsetHeight>Felem.scrollTop)&&(wz.top+wz.elem.offsetHeight<Felem.scrollTop+FelemHeight)){
                LoadImage(wz.elem);
            }

        }

    }
    var PdScrollStop=function(){
        if(Scrolltop==Felem.scrollTop)
        return true;
        Scrolltop=Felem.scrollTop;
        return false;
    }

    var Tscroll=function(){
        setInterval(function(){
            if(PdScrollStop())
            {
                Selem=document.querySelectorAll('[data-imgurl]');
                PdGetUrl(Selem);
            }

        },500);
    }
    Tscroll();
    return this;

}
 N_lib.prototype.postImage=function(elem,str){
       var elem=document.querySelectorAll(elem);
      for(var i=0;i<elem.length;i++){
          console.log("xxxx");
                elem[i].src=str;
      }

              return this;
 }

N_lib.prototype.preload=function(array){
    if(typeof array =="array"){
        for( var i in array){
                   var img=new Image();
                   img.src=array[i];
                   img.onunload=function(){


                   }
        }
    }
    else{
        var img=new Image();
        img.scr=array;
    }
    return this;
}