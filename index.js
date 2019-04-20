var errorMessage = document.getElementById('errorMessage');
var inputBox = document.getElementById('inputBox');
var tableBody = document.getElementById('tableBody');
var buttonGrocery = document.getElementById('buttonGrocery');
var amount = document.getElementById('amount');
var buttonSave = document.getElementById('buttonSave');

var crossEmpty = document.createElement('button');
inputBox.parentNode.insertBefore(crossEmpty,inputBox.nextSibling);
crossEmpty.style.display="none";
crossEmpty.innerHTML="X";

afterReload();

buttonGrocery.addEventListener("click",clickHandler);
buttonSave.addEventListener("click",saveToLocalStorage);
inputBox.addEventListener("keyup",emptying);
crossEmpty.addEventListener("click",emptyingInput);

function emptyingInput(){
  inputBox.value="";
  crossEmpty.style.display="none";
}

function emptying(){
  if (inputBox.value != ""){
    crossEmpty.style.display="";
    if ((event.keyCode===13) && (inputBox.value=="clear")){
      //clear table
      var deleteRowArray = tableBody.getElementsByTagName('tr');
      if (deleteRowArray[0]){
        for (let i=(deleteRowArray.length-1); i>=0 ;i--){
          tableBody.removeChild(deleteRowArray[i]);
        }
        amount.innerHTML="0";
      }
      inputBox.value = "";
    }
  } else{
    crossEmpty.style.display="none";
  }
}

function clickHandler (){
  errorMessage.innerHTML="";
  var spinner = document.createElement("i");
  spinner.classList.add("fas","fa-spinner","fa-spin","mr-2");
  buttonGrocery.prepend(spinner);
  setTimeout(function(){
    buttonGrocery.removeChild(spinner);
    if (inputBox.value == "" ){
      errorMessage.innerHTML="Type something!";
    } else if (inputBox.value == "randomize"){
      //randomize table

      randomizeTable();
      inputBox.value = "";
    } else{
      var filter = inputBox.value.toUpperCase();
      var searchArray = tableBody.getElementsByTagName("span");
      if (searchArray[0]){
        for (let i=0; i<searchArray.length; i++){
          var txtValue = searchArray[i].innerHTML.toUpperCase();
          if (txtValue == filter){
            errorMessage.innerHTML="Grocery already in your list!";
            return;
          }
        }
      }
      addRow(inputBox.value);
      inputBox.value = "";

    }
  },500);
}

function randomizeTable(){
  var randomArray = tableBody.getElementsByTagName('tr');
  var currentIndex = randomArray.length;
  var randomIndex;
  while (0 !== currentIndex){
    randomIndex=Math.floor(Math.random()*currentIndex);
    currentIndex--;
    //swap rows
    var cloneIndex = randomArray[currentIndex].cloneNode(true);
    //var cloneRandom = randomArray[randomIndex].cloneNode(true);

    //tableBody.replaceChild(cloneRandom,randomArray[currentIndex]);
    //eventlisteners vallen weg!!, andere methode via addRow !!! :
    var lastGrocery = randomArray[randomIndex].getElementsByTagName('span')[0].innerHTML;
    tableBody.removeChild(randomArray[currentIndex]);
    addRow(lastGrocery);
    tableBody.replaceChild(cloneIndex,randomArray[randomIndex]);

  }
  colorsOk();
}

function addRow (grocery){
  var newRow=document.createElement("tr");
  var newCell=document.createElement("td");
  var spanText=document.createElement("span");
  spanText.innerHTML=grocery;
  newCell.appendChild(spanText);
  var crossIcon = document.createElement("button");
  crossIcon.classList.add("crossIcon","float-right");
  crossIcon.innerHTML="X";
  newCell.appendChild(crossIcon);
  newRow.appendChild(newCell);
  tableBody.appendChild(newRow);
  crossIcon.addEventListener("click",deleteRow);

  var editButton = document.createElement("button");
  editButton.classList.add("editButton","float-right");
  editButton.innerHTML="Edit";
  newCell.appendChild(editButton);
  editButton.addEventListener("click",makeInput);

  amount.innerHTML=tableBody.getElementsByTagName('tr').length;
  var gradient = ((tableBody.getElementsByTagName('tr').length)-1)*2;
  newRow.style.backgroundColor="rgb("+(255-gradient)+","+(255-gradient)+","+(255-gradient)+")";
}

function deleteRow(){
  this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
  amount.innerHTML=tableBody.getElementsByTagName('tr').length;

  colorsOk();
}

function colorsOk(){
  var rowColor = tableBody.getElementsByTagName('tr');
  for (let i=0; i < rowColor.length ;i++){
    rowColor[i].style.backgroundColor="rgb("+(255-(i*2))+","+(255-(i*2))+","+(255-(i*2))+")";
  }
}


function makeInput (){
  if (this.parentNode.firstChild.tagName=='SPAN'){
    var newInput = document.createElement('input');
    newInput.value=this.parentNode.firstChild.innerHTML;
    this.parentNode.firstChild.innerHTML="";
    console.log(this.parentNode.firstChild);
    this.parentNode.prepend(newInput);
    newInput.addEventListener('keyup',changeToContent);
  }
}

function changeToContent(){
  if (event.keyCode === 13) {
    this.nextSibling.innerHTML=this.value;
    this.parentNode.removeChild(this);
  }
}

function saveToLocalStorage(){
  window.localStorage.clear();
  if (tableBody.hasChildNodes) {
    var rowArray = tableBody.getElementsByTagName('SPAN');
    for (let i = 0; i < rowArray.length; i++) {
      window.localStorage.setItem(i, rowArray[i].innerHTML);
    }
  }
}

function afterReload(){
  let index = 0;
  while (window.localStorage.key(index)){
    addRow(window.localStorage.getItem(index));
    index++;
  }
}
