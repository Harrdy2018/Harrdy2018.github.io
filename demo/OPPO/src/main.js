import "animate.css";
import "swiper/dist/css/swiper.css";
import "./css/index.css";
import "./css/footer.css";
import Swiper from "swiper/dist/js/swiper.js";
import logo from "./img/logo.png";
import banner1 from "./img/banner1.jpg";
import banner2 from "./img/banner2.jpg";
import banner3 from "./img/banner3.jpg";
import banner4 from "./img/banner4.jpg";
import iCTitle from "./img/i-c-title.png";
import wb from "./img/wb.png";
import weibo from "./img/weibo.png";
import worldA from "./img/201403261455420lqMPNGENc.png";
import worldB from "./img/20150226100534QqezQ85N6y.jpg";
import worldC from "./img/20140926184007v2rjcVFcbW.jpg";
import worldD from "./img/20131212113902waaLqQUWfB.jpg";
import worlda from "./img/20150227161036GqO59Dvta2.jpg";
import worldb from "./img/201502271135596D2wBJxvH0.jpg";
import worldc from "./img/20140604145924CFBnAtVjqN.jpg";
import worldd from "./img/20140919101741cvR0TcGkaq.jpg";
import starA from "./img/20141030152751NRihyRENa7.jpg";
import starB from "./img/20141029162235J7aJmCHkFm.jpg";
import starC from "./img/20150120092342k2ABsEHnQN.jpg";
import starD from "./img/20150423183545tYnFzYnn3p.jpg";
import acc1 from "./img/20150413174400N0dPnxUKHk.jpg";
import acc2 from "./img/20131120165101xYIYzhkVEy.jpg";
import acc3 from "./img/20150413174340NLV2gvV4FU.jpg";
import acc4 from "./img/20150123182505RO822scYYt.jpg";
import acc5 from "./img/20141230145609l7Fsk7CdHy.jpg";
import acc6 from "./img/20141011101157yZEFpMrk0h.jpg";
import acc7 from "./img/201410270957132inlm3IwsV.jpg";
document.querySelector("#nav>.container>.logo>img").src=logo;
document.querySelector(".banner1").src=banner1;
document.querySelector(".banner2").src=banner2;
document.querySelector(".banner3").src=banner3;
document.querySelector(".banner4").src=banner4;
document.querySelector("#star .star_top>img").src=iCTitle;
document.querySelector("#accessory .acc_top>img").src=wb;
document.querySelector("#world .world_top>img").src=weibo;
document.querySelector(".worldA").src=worldA;
document.querySelector(".worldB").src=worldB;
document.querySelector(".worldC").src=worldC;
document.querySelector(".worldD").src=worldD;
document.querySelector(".worlda").src=worlda;
document.querySelector(".worldb").src=worldb;
document.querySelector(".worldc").src=worldc;
document.querySelector(".worldd").src=worldd;
document.querySelector(".starA").src=starA;
document.querySelector(".starB").src=starB;
document.querySelector(".starC").src=starC;
document.querySelector(".starD").src=starD;
document.querySelector(".acc1").src=acc1;
document.querySelector(".acc2").src=acc2;
document.querySelector(".acc3").src=acc3;
document.querySelector(".acc4").src=acc4;
document.querySelector(".acc5").src=acc5;
document.querySelector(".acc6").src=acc6;
document.querySelector(".acc7").src=acc7;
var mySwiper=new Swiper('.swiper-container',{
  //分页组件
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: true
  },
  loop: true,
  //自动播放组件
  autoplay: {
    stopOnLastSlide: true,
    //3秒切换一次
    delay: 3000,
  },
  speed: 1000,
  //导航组件
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  //滚动条组件
  scrollbar: {
    el: '.swiper-scrollbar',
  },
})
//jQuery动画部分
$(window).scroll(function(){
	var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
	// console.log(scrollT);
	var backTop = $("#world").offset().top - $(window).height()/2;
	// console.log(backTop);
	if(scrollT > backTop){
		$(".a1").addClass("animated bounceInRight show").removeClass("fade");
		$(".a2").addClass("animated bounceInDown show").removeClass("fade");
		$(".a3").addClass("animated bounceInUp show").removeClass("fade");
		$(".a4").addClass("animated bounceInLeft show").removeClass("fade");
	}
}); 
//页面加载后执行
window.onload=function(){
	let totop=document.querySelector('#btn');
	let oNav=document.querySelector('#nav');
	let navTop=oNav.offsetTop;
	console.log(navTop)
	totop.style.display="none"
	totop.onclick=function(){
		let timer=setInterval(() => {
			let backtop=document.documentElement.scrollTop || document.body.scrollTop;
			console.log(backtop)
			if(backtop===0){
				clearInterval(timer)
			}
			let speedTop=backtop/5;
			document.documentElement.scrollTop =backtop-speedTop;
		}, 30);	
	}
	//按键是否显示
	let pageHeight=700;
	window.onscroll=function(){
		let backtop=document.documentElement.scrollTop || document.body.scrollTop;
		console.log(backtop)
		if(backtop>pageHeight){
			totop.style.display="block"
		}else{
			totop.style.display="none"
		}
		//吸顶灯效果
		if(backtop>=navTop){
			oNav.style.position="fixed";
			oNav.style.left="0px";
			oNav.style.top="0px";
			oNav.style.zIndex=100;
		}else{
			oNav.style.position="";
		}
	}
}