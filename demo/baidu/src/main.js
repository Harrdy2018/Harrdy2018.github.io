import "./css/test.css";
import "./css/top.css";
import "./css/bottom.css"
import weixinCode from "./img/12cm.jpg";
import homeBlackBg from "./img/home-black-bg.jpg";
import earthIgnore from "./img/earth-ignore.png";
import c3Ignore from "./img/c3-ignore.png";
import homeBigtitleIgnore from "./img/home-bigtitle-ignore.png";
import SVG from'@svgdotjs/svg.js/src/svg.js'
document.querySelector('#weixin-code>img').src=weixinCode;
document.querySelector('.home_view>img').src=homeBlackBg;
document.querySelector('.imgA').src=earthIgnore;
document.querySelector('.imgB').src=c3Ignore;
document.querySelector('.imgC').src=c3Ignore;
document.querySelector('.imgD').src=homeBigtitleIgnore;
//鼠标悬停，使微信二维码显示出来
let oWeixinA=document.querySelector('.weixin-icon');
let oWeixinCode=document.querySelector('#weixin-code');
oWeixinA.onmouseover=function(){
  oWeixinCode.style.display="block"
}
oWeixinA.onmouseout=function(){
  oWeixinCode.style.display="none"
}
//导航条鼠标悬停事件
let oUl=document.querySelector('.menu-wrap>ul');
let oNavBlock=document.querySelector("#header-blue-block");
oUl.onmouseover=function(event){
  let text=event.target.textContent;
  switch(text){
    case '社会招聘':
        oNavBlock.style.left='123px';
        oNavBlock.style.width='64px';
        break;
    case '校园招聘':
        oNavBlock.style.left='221px';
        oNavBlock.style.width='64px';
        break;      
    case '实习生招聘':
        oNavBlock.style.left='319px';
        oNavBlock.style.width='80px';
        break;      
    case 'Global Talent':
        oNavBlock.style.left='433px';
        oNavBlock.style.width='102px';
        break;
    case '了解百度':
        oNavBlock.style.left='568.563px';
        oNavBlock.style.width='64px';
        break;
    default:
        break;
  }
}
oUl.onmouseout=function(){
  oNavBlock.style.left='57px';
  oNavBlock.style.width='32px';
}
//定义圆窗旋转 每秒钟逆时针旋转1度
let oImaB=document.querySelector('.imgB');
let oImaC=document.querySelector('.imgC');
let degB=0;
let degC=0;
setInterval(() => {
  oImaB.style.transform=`rotate(${degB}deg)`
  oImaC.style.transform=`rotate(${degC}deg)`
  degB-=0.2
  degC+=0.2
}, 100);
//SVG部分
let oSvg=document.querySelector("#mysvg");
let draw=new SVG.Svg(oSvg).size('100%','100%');
let polygonLeft=draw.polygon('246.9,552.4 226.9,472.4 276.9,422.4 340.9,562.4 356.9,482.4').attr({
  fill:'rgba(255,255,255,0)',
  "fill-opacity": 0.5,
  stroke: '#fff',
  'stroke-width': 0
})
//一个完整的点 智能汽车
let ellipseA=draw.ellipse((246.9+6)*2,(559.4-16)*2).radius(3.5,3.5).attr({
  fill:'red',
})
let linkA=draw.link("https://talent.baidu.com/external/baidu/index.html#/social/2/%E6%99%BA%E8%83%BD%E6%B1%BD%E8%BD%A6%E4%BA%8B%E4%B8%9A%E9%83%A8").target('_self').text(function(add){
  add.tspan("智能汽车").attr({
    fill: 'rgba(255,255,255,0.5)'
  })
}).attr({
  x: '246.9',
  y: '559.4',
  'font-size': '10',
})
//一个完整的点 自动驾驶
let ellipseB=draw.ellipse((226.9+50)*2,(479.4-3)*2).radius(3.5,3.5).attr({
  fill:'red',
})
let linkB=draw.link("https://talent.baidu.com/external/baidu/index.html#/social/2/%E8%87%AA%E5%8A%A8%E9%A9%BE%E9%A9%B6%E4%BA%8B%E4%B8%9A%E9%83%A8|%E8%87%AA%E5%8A%A8%E9%A9%BE%E9%A9%B6%E6%8A%80%E6%9C%AF%E9%83%A8").target('_self').text(function(add){
  add.tspan("自动驾驶").attr({
    fill: 'rgba(255,255,255,0.5)'
  })
}).attr({
  x: '226.9',
  y: '479.4',
  'font-size': '10',
})
//一个完整的点 车联网
let ellipseC=draw.ellipse((276.9+40)*2,(434.4-8)*2).radius(3.5,3.5).attr({
  fill:'red',
})
let linkC=draw.link("https://talent.baidu.com/external/baidu/index.html#/social/2/车联网事业部").target('_self').text(function(add){
  add.tspan("车联网").attr({
    fill: 'rgba(255,255,255,0.5)'
  })
}).attr({
  x: '276.9',
  y: '429.4',
  'font-size': '10',
})
//一个完整的点 智能驾驶 大字体
let ellipseD=draw.ellipse((420)*2,(489.4-5)*2).radius(3.5,3.5).attr({
  fill:'red',
})
let linkD=draw.link("https://talent.baidu.com/external/baidu/index.html#/social/2/IDG合作发展部|IDG综合管理部|IDG智能驾驶体验设计中心|车联网事业部|自动驾驶事业部|自动驾驶技术部|智能汽车事业部").target('_self').text(function(add){
  add.tspan("智能驾驶").attr({
    fill: 'rgba(255,255,255,0.5)'
  })
}).attr({
  x: '356.9',
  y: '489.4',
  'font-size': '13',
})
//一个完整的点 智能驾驶 小字体
let ellipseE=draw.ellipse((335)*2,(569.4-3)*2).radius(3.5,3.5).attr({
  fill:'red',
})
let linkE=draw.link("https://talent.baidu.com/external/baidu/index.html#/social/2/IDG合作发展部|IDG综合管理部|IDG智能驾驶体验设计中心").target('_self').text(function(add){
  add.tspan("智能驾驶").attr({
    fill: 'rgba(255,255,255,0.5)'
  })
}).attr({
  x: '340.9',
  y: '569.4',
  'font-size': '10',
})
//鼠标移到椭圆上的点触发，我们只需要知道椭圆的中心坐标即可
let small=draw.ellipse(0,0).radius(0,0).attr({
  fill:'rgba(255,255,255,0.4)',
  stroke: 'rgba(255,255,255,0.5)',
  opacity: 0
})
let big=draw.ellipse(0,0).radius(0,0).attr({
  fill:'rgba(255,255,255,0.4)',
  stroke: 'rgba(255,255,255,0.5)',
  opacity: 0
})
//鼠标移上来时进行划线操作
let lineA = draw.line(0, 0, 0, 0).attr({
  stroke: 'rgba(255,255,255,0.3)',
  'stroke-width':1
})
let lineB = draw.line(0, 0, 0, 0).attr({
  stroke: 'rgba(255,255,255,0.3)',
  'stroke-width':1
})
let lineC = draw.line(0, 0, 0, 0).attr({
  stroke: 'rgba(255,255,255,0.3)',
  'stroke-width':1
})
let lineD = draw.line(0, 0, 0, 0).attr({
  stroke: 'rgba(255,255,255,0.3)',
  'stroke-width':1
})
let lineE = draw.line(0, 0, 0, 0).attr({
  stroke: 'rgba(255,255,255,0.3)',
  'stroke-width':1
})
let lineF = draw.line(0, 0, 0, 0).attr({
  stroke: 'rgba(255,255,255,0.3)',
  'stroke-width':1
})
let lineG = draw.line(0, 0, 0, 0).attr({
  stroke: 'rgba(255,255,255,0.3)',
  'stroke-width':1
})
//初始化直线操作
function initLineAll(){
  lineA.attr({
    x1:420,
    y1:484.4,
    x2:420,
    y2:484.4
  })
  lineB.attr({
    x1:420,
    y1:484.4,
    x2:420,
    y2:484.4
  })
  lineC.attr({
    x1:420,
    y1:484.4,
    x2:420,
    y2:484.4
  })
  lineD.attr({
    x1:420,
    y1:484.4,
    x2:420,
    y2:484.4
  })
  lineE.attr({
    x1:335,
    y1:566.4,
    x2:335,
    y2:566.4
  })
  lineF.attr({
    x1:252.9,
    y1:543.4,
    x2:252.9,
    y2:543.4
  })
  lineG.attr({
    x1:276.9,
    y1:476.4,
    x2:276.9,
    y2:476.4
  })
}
function circleChange(obj,small,big){
  obj.mouseover(function(event) {
    let cx=this.node.cx.baseVal.value;
    let cy=this.node.cy.baseVal.value;
    small.attr({
      cx:cx,
      cy:cy,
    })
    big.attr({
      cx:cx,
      cy:cy,
    })
    initLineAll();
    lineA.animate(1000).attr({
      x2:316.9,
      y2:426.4
    })
    lineB.animate(1000).attr({
      x2:276.9,
      y2:476.4
    })
    lineC.animate(1000).attr({
      x2:252.9,
      y2:543.4
    })
    lineD.animate(1000).attr({
      x2:335,
      y2:566.4
    })
    lineE.animate(1000).attr({
      x2:252.9,
      y2:543.4
    })
    lineF.animate(1000).attr({
      x2:276.9,
      y2:476.4
    })
    lineG.animate(1000).attr({
      x2:316.9,
      y2:426.4
    })
    small.animate(1000,'bounce').attr({
      rx:14,
      ry:14,
      opacity: 1,
    }).loop()
    big.animate(1000,'bounce').attr({
      rx:24,
      ry:24,
      opacity: 1,
    }).loop()
  })
  obj.mouseout(function(event) {
    small._timeline.stop();
    big._timeline.stop();
    lineA._timeline.stop();
    lineB._timeline.stop();
    lineC._timeline.stop();
    lineD._timeline.stop();
    lineE._timeline.stop();
    lineF._timeline.stop();
    lineG._timeline.stop();
    initLineAll();
  })
}
circleChange(ellipseA,small,big)
circleChange(ellipseB,small,big)
circleChange(ellipseC,small,big)
circleChange(ellipseD,small,big)
circleChange(ellipseE,small,big)

function linkAChange(obj){
  obj.mouseover(function(event) {
    initLineAll();
    lineA.animate(1000).attr({
      x2:316.9,
      y2:426.4
    })
    lineB.animate(1000).attr({
      x2:276.9,
      y2:476.4
    })
    lineC.animate(1000).attr({
      x2:252.9,
      y2:543.4
    })
    lineD.animate(1000).attr({
      x2:335,
      y2:566.4
    })
    lineE.animate(1000).attr({
      x2:252.9,
      y2:543.4
    })
    lineF.animate(1000).attr({
      x2:276.9,
      y2:476.4
    })
    lineG.animate(1000).attr({
      x2:316.9,
      y2:426.4
    })
  })
  obj.mouseout(function(event) {
    lineA._timeline.stop();
    lineB._timeline.stop();
    lineC._timeline.stop();
    lineD._timeline.stop();
    lineE._timeline.stop();
    lineF._timeline.stop();
    lineG._timeline.stop();
    initLineAll();
  })
}
linkAChange(linkA)
linkAChange(linkB)
linkAChange(linkC)
linkAChange(linkD)
linkAChange(linkE)