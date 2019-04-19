var errorMessage = document.getElementById('errorMessage');
var inputBox = document.getElementById('inputBox');
var tableBody = document.getElementById('tableBody');
var buttonGrocery = document.getElementById('buttonGrocery');
var amount = document.getElementById('amount');
var buttonSave = document.getElementById('buttonSave');

afterReload()

buttonGrocery.addEventListener("click",clickHandler);
buttonSave.addEventListener("click",saveToLocalStorage);

function clickHandler (){
  errorMessage.innerHTML="";
  var spinner = document.createElement("i");
  spinner.classList.add("fas","fa-spinner","fa-spin","mr-2");
  buttonGrocery.prepend(spinner);
  setTimeout(function(){
    buttonGrocery.removeChild(spinner);
    if (inputBox.value == "" ){
      errorMessage.innerHTML="Type something!";
    } else {
      addRow(inputBox.value);
      inputBox.value = "";
    }
  },500);
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
}

function deleteRow(){
  this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
  amount.innerHTML=tableBody.getElementsByTagName('tr').length;
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
