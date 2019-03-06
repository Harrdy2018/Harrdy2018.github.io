//登陆ajax请求
function requestLogin(params){
  let myPromise=new Promise((resolve,reject)=>{
    var xhr=new XMLHttpRequest();
    xhr.open('POST','http://127.0.0.1:9000/login',true);
    xhr.send(JSON.stringify(params));

  
      xhr.onload=function () {
        console.log('我收到了过来的响应');
        console.log(xhr);
        resolve(xhr.response);
      }
  
      xhr.onerror=function(){
        reject('There was an error!');
      }
   
  });
  return myPromise;
  //myPromise.then(res=>console.log(res),err=>console.log(err));
}

//获取用户列表请求
function getUserList(params) {
  let myPromise=new Promise((resolve,reject)=>{
    var xhr=new XMLHttpRequest();
    xhr.open('POST','http://127.0.0.1:9000/user/list',true);
    xhr.send(JSON.stringify(params));

  
      xhr.onload=function () {
        console.log('我收到了过来的响应');
        console.log(xhr);
        resolve(xhr.response);
      }
  
      xhr.onerror=function(){
        reject('There was an error!');
      }
   
  });
  return myPromise; 
}
//删除用户请求
function removeUser(params) {
  let myPromise=new Promise((resolve,reject)=>{
    var xhr=new XMLHttpRequest();
    xhr.open('POST','http://127.0.0.1:9000/user/remove',true);
    xhr.send(JSON.stringify(params));

  
      xhr.onload=function () {
        console.log('我收到了过来的响应');
        console.log(xhr);
        resolve(xhr.response);
      }
  
      xhr.onerror=function(){
        reject('There was an error!');
      }
   
  });
  return myPromise; 
}

//保存各科成绩ajax请求
function saveGrades(params){
  let myPromise=new Promise((resolve,reject)=>{
    var xhr=new XMLHttpRequest();
    xhr.open('POST','http://127.0.0.1:9000/grades/save',true);
    xhr.send(JSON.stringify(params));

  
      xhr.onload=function () {
        console.log('我收到了过来的响应');
        console.log(xhr.response);
        resolve(xhr.response);
      }
  
      xhr.onerror=function(){
        reject('There was an error!');
      }
   
  });
  return myPromise;
  //myPromise.then(res=>console.log(res),err=>console.log(err));
}

//查询所欲成绩ajax请求
function queryGrades(){
  let myPromise=new Promise((resolve,reject)=>{
    var xhr=new XMLHttpRequest();
    xhr.open('get','http://127.0.0.1:9000/grades/query',true);
    xhr.send();

  
      xhr.onload=function () {
        console.log('我收到了过来的响应');
        resolve(xhr.response);
      }
  
      xhr.onerror=function(){
        reject('There was an error!');
      }
   
  });
  return myPromise;
  //myPromise.then(res=>console.log(res),err=>console.log(err));
}

export{
  requestLogin,
  getUserList,
  removeUser,
  saveGrades,
  queryGrades
};