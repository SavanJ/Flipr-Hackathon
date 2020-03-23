// $(function(){
//     alert('from script.js')
// });

function test(){
    alert('test succes')
}

function addItem(id){
//   $("h1, h2, p").addClass("blue");
// alert('ih')
// alert(id)
var temp =  "#" + id + ' .forAdd'
var temp1 = "#" + id + ' .btn-light'
console.log(temp + '    ' + temp1)
$(temp).show();
$(temp1).hide();
};

function addTeamBox(id){
    var temp =  "#" + id + ' .forTeamMember'
    var temp1 = "#" + id + ' .btn-dark'
    console.log(temp + '    ' + temp1)
    $(temp).show();
    $(temp1).hide();
}
function addItem1(id,value){

    // var temp = "#" + id+" .lists"
    var temp1 =  "#" + id + ' .forAdd'
    // var temp2 = "#" + id + ' .btn-light'
    // var link = document.createElement("a");
    // link.classList.add('btn');
    // link.classList.add('btn-primary');
    // link.classList.add('card-links');
    // link.innerHTML = value;
    // link.href = "#"
    // $(temp).append(link); 
    // $(temp1).hide()
    // $(temp2).show();
    // var temp = document.getElementById()
}

function newList(){
//     var temp =  "#" + id + ' .forAdd'
// var temp1 = "#" + id + ' .btn-light'
// console.log(temp + '    ' + temp1)
$('#newList .forAddList').show();
$('#newList .btn-light').hide();
}

function closeList(){
    $('#newList .forAddList').hide();
    $('#newList .btn-light').show();
}