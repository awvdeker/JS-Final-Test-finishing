var errorMessage = document.getElementById('errorMessage');
var inputBox = document.getElementById('inputBox');
var tableBody = document.getElementById('tableBody');
var buttonGrocery = document.getElementById('buttonGrocery');
var amount = document.getElementById('amount');
buttonGrocery.addEventListener("click",clickHandler);
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
      amount.innerHTML=tableBody.getElementsByTagName('tr').length;
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
  }
}
