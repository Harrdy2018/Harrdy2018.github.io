import Mock from 'mockjs';
import {administrators,users} from './data/user.js';

let  _users=users;
//用mock拦截登陆请求
//这里面 post全部要小写
Mock.mock('http://127.0.0.1:9000/login','post',function(options){
  console.log('mock正在对登陆请求处理');
  console.log(options);
  //真实的情况是服务器从客户端拿来的数据是json字符串
  let {account,password}=JSON.parse(options.body);
  let user={};
  //some  数组中的每一个元素拿去测试，如果瞒住条件，立马返回true
  let hasUser=administrators.some((element,index,arr)=>{
    if(element.account===account && element.password===password){
      //这里如果不暴露密码则要使用拷贝
      //user=JSON.parse(JSON.stringify(element));
      user=element;
      //不能暴露密码
      //user.password=undefined;
      //console.log(element.password);
      //console.log('密码有么')
      return true;
    }
  });
  console.log(hasUser)
  if(hasUser){
    return [200,{code:200,msg:"请求成功",user}]
  }else{
    return [200,{code:500,msg:"账号或密码错误"}]
  };
});

//用mock拦截用户列表请求
//这里面 post全部要小写
Mock.mock('http://127.0.0.1:9000/user/list','post',function(options){
  console.log('mock正在对用户列表请求处理');
  console.log(options);
  //真实的情况是服务器从客户端拿来的数据是json字符串
  let {name}=JSON.parse(options.body);
  let mockUsers=_users.filter(e=>{
    if(name && e.name.indexOf(name)==-1){
      return false
    }else{
      return true
    }
  })
  return [200,{users: mockUsers}];
});

Mock.mock('http://127.0.0.1:9000/user/remove','post',function(options){
  console.log('mock正在对用户列表删除请求处理');
  console.log(options);
  //真实的情况是服务器从客户端拿来的数据是json字符串
  let {id}=JSON.parse(options.body);
  _users=_users.filter(e=>e.id !== id)
  return [200,{code: 200,msg:'删除成功'}];
});

var grades=[]
Mock.mock('http://127.0.0.1:9000/grades/save','post',function(options){
  console.log('mock正在对请求保存学生成绩  处理');
  console.log(options);
  var grade=JSON.parse(options.body);
  console.log(grade)
  grades.push(grade)
  return {
    resp: {
      code: 'rbk-11001',
      message: 'success'
    },
    grade: grade
  }
});

Mock.mock('http://127.0.0.1:9000/grades/query','get',function(options){
  console.log('mock正在对请求查询学生成绩  处理');
  return {
    resp: {
      code: 'rbk-11001',
      message: 'success'
    },
    grades: grades
  }
});