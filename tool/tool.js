/*
 * @Author: luobupo
 * @Date: 2021-09-12 10:02:34
 * @LastEditTime: 2021-09-13 07:57:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jstool\too.js
 */
 let array= [
      {'id':1,url:'/images/example/1.jpg',desc:''}, 
      {'id':2,url:'/images/example/2.jpg',desc:''},
      {'id':3,url:'/images/example/3.jpg',desc:''},
      {'id':5,url:'/images/example/5.jpg',desc:''},
      {'id':6,url:'/images/example/6.jpg',desc:''},
      {'id':7,url:'/images/example/7.jpg',desc:''},
      {'id':4,url:'/images/example/4.jpg',desc:''},
      {'id':17,url:'/images/example/17.jpg',desc:''},
      {'id':27,url:'/images/example/17.jpg',desc:''},
      {'id':12,url:'/images/example/17.jpg',desc:''}
    ];

console.log(array)


// writeHtml(array)
// orderByID(array)
// orderByObjectID(array)



/**
 * json对象数组按照某个属性排序:降序排列
 * @param {Object} propertyName
 */
 function compareDesc(propertyName) {
  return function(object1, object2) {
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    if(value2 < value1) {
      return -1;
    } else if(value2 > value1) {
      return 1;
    } else {
      return 0;
    }
  }
}

/**
 * json对象数组按照某个属性排序:升序排列
 * @param {Object} propertyName
 */
 function compareAsc(propertyName) {
  return function(object1, object2) {
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    if(value2 < value1) {
      return 1;
    } else if(value2 > value1) {
      return -1;
    } else {
      return 0;
    }
  }
}

function writeHtml(array) {
  /**输出数组 */
  document.write("<div>输出数组：</div>")
  for (var i = 0; i < array.length; i++) {
    document.write("<div> 序号："+array[i].id+" URL："+array[i].url+"</div>")
  }
}

function orderByID(array){
  /**按照ID排序 */
  let idList = []
  for (var i = 0; i < array.length; i++) {
    idList.push(array[i].id)
  }
  //升序
  idList.sort(function(a,b){
    return a - b;
  })
  //降序
  idList.sort((a,b) => (b-a))
  console.log(idList)
}

function orderByObjectID(array){
  array=　array.sort(compareAsc("id"));  //按照年龄降序排列
  document.write("<div>输出数组：</div>")
  for (var i = 0; i < array.length; i++) {
    document.write("<div> 序号："+array[i].id+" URL："+array[i].url+"</div>")
  }
}



function showDate(){
  var d = new Date();
  document.getElementById("time").innerHTML = d.getTime();
  document.getElementById("year").innerHTML = d.getFullYear();
  document.getElementById("month").innerHTML = d.getMonth();
  var months = 
              [
              "January", "February", "March", "April", "May", "June", 
              "July", "August", "September", "October", "November", "December"
              ];
  document.getElementById("month2").innerHTML = months[d.getMonth()];
  document.getElementById("date").innerHTML = d.getDate();
  document.getElementById("hours").innerHTML = d.getHours();
  document.getElementById("minutes").innerHTML = d.getMinutes();
  document.getElementById("seconds").innerHTML = d.getSeconds();
  document.getElementById("milliseconds").innerHTML = d.getMilliseconds();
  document.getElementById("week").innerHTML = d.getDay();
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  document.getElementById("week2").innerHTML = days[d.getDay()];

}


showDate()