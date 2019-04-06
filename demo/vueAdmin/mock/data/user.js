import Mock from 'mockjs';
//var Mock=require('mockjs');
//配置后台系统管理员
const administrators=[
  {
    id:'1001',
    account: 'lukang',
    password: '123456',
    email: '1035525823@qq.com',
    avatar: 'https://avatars2.githubusercontent.com/u/38374136?s=400&u=58265ad69877becfd18d3b4be573d097ec266c63&v=4'
  },{
    id:'1002',
    account: 'Harrdy2018',
    password: '123456',
    email: '995122077@qq.com',
    avatar: 'https://avatars2.githubusercontent.com/u/38374136?s=400&u=58265ad69877becfd18d3b4be573d097ec266c63&v=4'
  }
]
const users=[];
for(let i=0;i<13;i++){
  users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60':1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0,1)
  }));
}
console.log('开始进行数据准备');
console.log('管理员: ',administrators);
console.log('普通用户: ',users);
export {
  administrators,
  users
}