$(document).on('click','a[href="#"]',function(e){ e.preventDefault() })

$(function() {
   mainInit();
})

function mainInit(){
   video();
   nav_menu();
   pop_news();
   pop_close();
   pop_open();
   business_tab();
   master_banner();
   download_tab();
   top_button();
   family_site();
}

// 비디오 클릭(재생,중지)
function video(){
   let w = $(window).width();
   let h = $(window).height();
   let $visual = $('#visual')
   let $vid = $('#visual .vid')
   let $video = $('#visual .vid video').get(0);

   $vid.css('cursor', 'url("images/cursor_pause.png"), auto');
   $visual.width(w).height(h);
   $vid.width(w).height(h);

   $(window).on('resize',function(){
      w = $(window).width();
      h = $(window).height();
      if(w>1600){
         $visual.width(w).height(h);
         $vid.width(w).height(h);
      }
   })

   let isplay = false;
   $('#visual .vid video').on('click',function(){
      if(!isplay){
            $video.pause(); 
            $vid.css('cursor', 'url("images/cursor_play.png"), auto');
         }else {
            $video.play();
            $vid.css('cursor', 'url("images/cursor_pause.png"), auto');
         }
         isplay = !isplay
   });
}


// 메인메뉴
function nav_menu(){
   let $gnb =$('#header .nav .gnb');
   let $header =$('#header');
   let $submenu = $('#header .nav .gnb li ul')

   $gnb.on('mouseenter', function() {
         $header.stop().animate({height:450}, 400)
         $submenu.stop().animate({opacity:1}, 400)
         $header.css({background:'#fff'})
   }) 
   
   $gnb.on('mouseleave' , function() {
         $header.stop().animate({height:80},200)
         $submenu.stop().animate({opacity:0}, 400)
         $header.css({background:'rgba(255,255,255,0.7)'})
   })

   $(window).on('scroll',function(){
      let top = $(this).scrollTop();
      if(top>800){
         $header.css({background:'#fff', borderBottom:'1px solid #dcdcdc'})
      }else{
         $header.css({background:'rgba(255,255,255,0.7)',borderBottom:'none'})
      }
   })
}


//비주얼 뉴스팝업창
function pop_news(){
   let $li = $('#visual .pop-news ul li');
   let $list = $('#visual .pop-news p.list span');
   let current = 0, old = 0, timer = null, interval = 4500;
   let len = $li.length;
   let w = $li.width() ;

   $li.hide().first().show();
   timer = setInterval( make , interval )

   $list.on('click',function(){
      current++;
      if( current > len -1 ) {
         current = 0 ;
      }
      $list.removeClass('on');
      $(this).addClass('on');
      banner();
      clearInterval(timer);
      timer = setInterval(make, interval);
   })

   function make() {
      current++;
      if( current > len -1 ) {
         current = 0 ;
      }
      banner();
      clearInterval(timer);
      timer = setInterval(make, interval);
      $list.removeClass('on');
      $list.eq(current).addClass('on');
   }

   function banner(){
      $li.eq(current).stop().show().css({opacity:0, left:-w }).animate({ opacity:1, left:0 },600)
      $li.eq(old).stop().show().css({opacity:1, left : 0 }).animate({ opacity:0, left:w},600)

      old = current
   }
}

// 비주얼 뉴스 팝업 닫기
function pop_close(){
   let $open = $('#visual .pop-news p.open');
   let $close = $('#visual .pop-news p.close');
   let $list = $('#visual .pop-news p.list');
   let $popBox = $('#visual .pop-news');
   $open.hide();
   $close.on('click',function(){
      $popBox.animate({width:0, height:0},300);
      $list.hide();
      $close.hide();
      $open.show();
   })
}

// 비주얼 뉴스 팝업 열기
function pop_open(){
   let $open = $('#visual .pop-news p.open');
   let $close = $('#visual .pop-news p.close');
   let $list = $('#visual .pop-news p.list');
   let $popBox = $('#visual .pop-news');
   $open.on('click',function(){
      $popBox.animate({width:300, height:90},200);
      $list.show();
      $close.show();
      $open.hide();
   })
}

// 사업영역 탭메뉴
function business_tab(){
   let $menu = $('.business .b-tab li');
   let $txtBox = $('.business .txt-box li');
   let $txtBg = $('.business .txt-bg li');
   let $imgBox = $('.business .img-box ul li');
   let $prev = $('.business .btn-wrap .prev');
   let $next = $('.business .btn-wrap .next');
   let current = 0, cnt = 0;
   let size = $menu.length;

   $menu.on('click', function() {
      let click = $(this).index();
      if (click !== current) {
         showContent(click);
      }
   });

   $prev.on('click', function() {
      cnt--;
      if (cnt < 0) {
      cnt = size - 1;
   }
   showContent(cnt);
   });

   $next.on('click', function() {
      cnt++;
      if (cnt > size - 1) {
      cnt = 0;
   }
   showContent(cnt);
   });

   $txtBox.hide().first().css({ opacity: 1 }).show();
   $txtBg.hide().first().css({ opacity: 1 }).show();
   $imgBox.hide().first().show();

   showContent(0);

   function showContent(click) {
      $txtBox.eq(current).stop(true, true).animate({ opacity: 0 }, 300, function() {
         $(this).hide();
      });
      $txtBox.eq(click).stop(true, true).show().animate({ opacity: 1 }, 300);
      $txtBg.eq(current).stop(true, true).animate({ opacity: 0 }, 300, function() {
         $(this).hide();
      });
      $txtBg.eq(click).stop(true, true).show().animate({ opacity: 1 }, 300);
      $imgBox.eq(current).stop(true, true).hide();
      $imgBox.eq(click).stop(true, true).show();
      $menu.removeClass('on');
      $menu.eq(click).addClass('on');
      current = click;
      }
};

//masterpiece 배너
function master_banner() {
   let $masterList = $('.master .box ul');
   let $next = $('.master p.btn-wrap .next');
   let $prev = $('.master p.btn-wrap .prev');
   let interval = 3000;
   let timer;
   
   // 초기화면
   let last = $('.master .box ul li').last();
   $masterList.prepend(last);
   $masterList.css({marginLeft : '-=332'})
   
   // 타이머
   function make() {
      $masterList.animate({marginLeft: '+=332'}, 400, function() {
         let last = $('.master .box ul li:last');
         $masterList.prepend(last);
         $masterList.css({marginLeft: '-=332'});
      });
   }
   timer = setTimeout(make, interval);

   // 다음버튼 클릭
   $next.on('click', function() {
      $masterList.animate({marginLeft: '+=332'}, 400, function() {
         let last = $('.master .box ul li:last');
         $masterList.prepend(last);
         $masterList.css({marginLeft: '-=332'});
         clearTimeout(timer);
         timer = setTimeout(make, interval);
      });
   });
   
   // 이전 버튼 클릭
   $prev.on('click', function() {
      $masterList.animate({marginLeft: '-=332'}, 400, function() {
         let first = $('.master .box ul li:first');
         $masterList.append(first);
         $masterList.css({marginLeft: '+=332'});
         clearTimeout(timer);
         timer = setTimeout(make, interval);
      });
   });
};


//글로벌 숫자 카운팅
$(document).ready(function () {
   global_count();
   $(window).off("scroll").on("scroll", global_count);
   
   let globalCountElems = $(".global ul li p em");
   globalCountElems.each(function () {
      let $this = $(this);
      let countTo = parseInt($this.text(), 10);
      $this.data("count-to", countTo);
   });
});

function global_count() {
   if (document.readyState === "complete") {
      let global = $(".global");
      let globalCount = global.find("ul li p em:not(.animated)");
      let globalOffsetTop = global.offset().top;
      let windowHeight = $(window).height();

      if (globalCount.length > 0 && $(window).scrollTop() + windowHeight >= globalOffsetTop) {
         globalCount.each(function () {
         let $this = $(this);
         let countTo = parseInt($this.data("count-to"), 10);
         if (countTo > 0) {
            $this.prop("Counter", 0).animate({
               Counter: countTo
            }, {
               duration: 1800,
               easing: "swing",
               step: function (now) {
               $this.text(Math.ceil(now));
               },
               complete: function () {
               $this.text(countTo);
               $this.addClass("animated");
               }
            });
         }
         });
      }
   }
}

function download_tab(){
   let $menu = $('.news .right .tab li');
   let $fileBox = $('.news .right .file-box li');
   let cnt = 0;

  $fileBox.hide().first().show();
  $menu.on('click',function(){
   cnt = $(this).index()
   $fileBox.hide();
   $fileBox.eq(cnt).show();
   $menu.removeClass('on');
   $menu.eq(cnt).addClass('on');
  })
}


//top버튼
function top_button() {
   let $top = $('.top');
   let ty = 0;

   //scroll시 top 버튼 보이기/숨기기
   $(window).scroll(function(){
      ty = $(window).scrollTop();
      if(ty > 100){
         $top.show();
      } else {
         $top.hide();
      }
   });

   //top 클릭시 맨위로 가기
   $top.on('click', function(){
      $('html,body').animate({scrollTop:0}, 300);
   });
}

function family_site(){
   let $familySite = $('#footer .family');
   let $siteList = $('#footer .family-site');
   let $close = $('#footer .family-site i');

   $siteList.hide();

   $familySite.on('click',function(){
      $siteList.show();
   })
   $close.on('click',function(){
      $siteList.hide();
   })
}
