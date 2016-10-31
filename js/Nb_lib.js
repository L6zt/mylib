/**
 * Created by Administrator on 2016/10/26 0026.
 */

var N_lib=function(){



}

N_lib.prototype.lazyload=function(Felem){
      console.log('开始');
    var Scrolltop=0;//滚动标志
    var Felem=document.querySelector(Felem);
    var SonNode=Felem.childNodes.length;//滚动区域 元素节点多少
    var FelemHeight=Felem==document.querySelector('body')?window.innerHeight:Felem.offsetHeight;
    var Selem=document.querySelectorAll('[data-imgurl]');
    var LoadImage=function(elem){
        var src=elem.getAttribute('data-imgurl');
        var image=new Image();
        image.onload=function(){
        elem.src=src;
        elem.style.opacity=0;
        elem.style.webkitTransition='opacity 300ms ease-out';
        elem.style.opacity=1;
        };
        image.src=src;
    }
    var Eloaction=function(elem){
     var top=0;
     var _elem=elem;
     while (elem!=Felem){
         if(elem==null){
             top=null;
             break;
         }
         top=top+parseInt(elem.offsetTop);
         console.log(top);
         elem=elem.offsetParent;
     }
     return {
         elem:_elem,
         top:top,

     };
  };
    var PdGetUrl=function(elem){
        for(var i=0;i<elem.length;i++){

            var wz=Eloaction(elem[i]);
            if(wz.top&&(((wz.top>=Felem.scrollTop)&&(wz.top<=Felem.scrollTop+FelemHeight))||((wz.top+wz.elem.offsetHeight>=Felem.scrollTop)&&(wz.top+wz.elem.offsetHeight<=Felem.scrollTop+FelemHeight)))){
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
                if(SonNode!=Felem.childNodes.length)
                {
                    Selem=document.querySelectorAll('[data-imgurl]');
                    SonNode=Felem.childNodes.length;
                }
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