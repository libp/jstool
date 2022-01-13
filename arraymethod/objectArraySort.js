//对象数组入栈
let userList = [{id: 1,name: '张三'},{id:2,name: '李四'}]
for (let i = 0, len = userList.length; i < len; i++) {
    console.log(userList[i].id);
}
var a = {id: 3,name:'王五'}
userList.push( a)
for (let i = 0, len = userList.length; i < len; i++) {
    console.log(userList[i].id);
}


//对象数组排序
var arr = [{name: "zlw", age: 24}, {name: "wlz", age: 25},{name: "wlz21", age: 21},{name: "wlz15", age: 15},{name: "wlz5", age: 5}];
console.log(arr.sort(function(a, b){return a.age - b.age}));