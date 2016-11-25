
rts = function (tpl, context){
  var rendered = tpl
  Object.keys(context).forEach(function( elem, index, array ){
    console.log('elemen is '+ elem)
    var regx = new RegExp('%'+elem+'%', "g")
    rendered = rendered.replace(regx, context[elem]);
  });
  return rendered;
}

// Example usage
/*
var tpl = '<li class="iconfont icon-%icon%">this is the %title%</li>';

JSONfromServer = [
  {
    title: "this is one piece of data from server",
    icon: "flag"
  },
  {
    title: "donno what to say",
    icon: "edit"
  },
  {
    title: "awesome",
    icon: 'font-awesome'
  }
]


var newContent = '';
JSONfromServer.forEach(function(elem){
  newContent += genTpl(tpl, elem);
})

$(newContent).appendTo('.container')

*/

