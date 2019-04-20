var errorMessage = document.getElementById('errorMessage');
var inputBox = document.getElementById('inputBox');
var tableBody = document.getElementById('tableBody');
var buttonGrocery = document.getElementById('buttonGrocery');
var amount = document.getElementById('amount');
var buttonSave = document.getElementById('buttonSave');
var deleteGroceryButton = document.getElementById('deleteGroceryButton');
var goDoGroceries = document.getElementById('goDoGroceries');
var toggler = document.getElementById('toggler');

var crossEmpty = document.createElement('button');
inputBox.parentNode.insertBefore(crossEmpty,inputBox.nextSibling);
crossEmpty.style.display="none";
crossEmpty.innerHTML="X";

afterReload();

buttonGrocery.addEventListener("click",clickHandler);
buttonSave.addEventListener("click",saveToLocalStorage);
inputBox.addEventListener("keyup",emptying);
crossEmpty.addEventListener("click",emptyingInput);
deleteGroceryButton.addEventListener("click",deleteGrocery);
goDoGroceries.addEventListener("click",goShopping);

var plusMinus = true;
tableBody.style.display="none";
toggler.addEventListener("click",togglerHandler);

var switchDelete = false;
document.addEventListener("keydown",function(event){
  if (event.keyCode === 46){
    switchDelete = true;
  }
});
document.addEventListener("keyup",function(event){
  if (event.keyCode === 46){
    switchDelete = false;
  }
});

function togglerHandler(){
  if (plusMinus == true){
    toggler.innerHTML="-";
    plusMinus = false;
    tableBody.style.display="";
  } else{
    toggler.innerHTML="+";
    plusMinus = true;
    tableBody.style.display="none";
  }
}

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
      crossEmpty.style.display="none";
    }
  } else{
    crossEmpty.style.display="none";
  }
}

function goShopping(){
  //browsernotification popup should tell you to have fun at the store,
  //also delete entire content of the table
  alert("Have fun at the store!");
  var deleteRowArrayShopping = tableBody.getElementsByTagName('tr');
  if (deleteRowArrayShopping[0]){
    for (let i=(deleteRowArrayShopping.length-1); i>=0 ; i--){
      tableBody.removeChild(deleteRowArrayShopping[i]);
    }
    amount.innerHTML="0";
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
      crossEmpty.style.display="none";
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
      crossEmpty.style.display="none";

    }
  },500);
}

function deleteGrocery(){
  //search the table for a grocery with the name of the input field's value
  //and if it finds it, delete it, otherwise show an error
  errorMessage.innerHTML="";
  var filterDelete = inputBox.value.toUpperCase();
  var searchArrayDelete = tableBody.getElementsByTagName("span");
  if (searchArrayDelete[0]){
    for (let i=0; i<searchArrayDelete.length;i++){
      var txtValue = searchArrayDelete[i].innerHTML.toUpperCase();
      if (txtValue == filterDelete){
        deleteRow(searchArrayDelete[i].parentNode.parentNode);
        inputBox.value = "";
        crossEmpty.style.display="none";
        return;
      }
    }
  }
  errorMessage.innerHTML="Grocery NOT in your list!";
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
  crossIcon.addEventListener("click",function(){

    deleteRow(this.parentNode.parentNode);

  });

  var editButton = document.createElement("button");
  editButton.classList.add("editButton","float-right");
  editButton.innerHTML="Edit";
  newCell.appendChild(editButton);
  editButton.addEventListener("click",makeInput);

  amount.innerHTML=tableBody.getElementsByTagName('tr').length;
  var gradient = ((tableBody.getElementsByTagName('tr').length)-1)*2;
  newRow.style.backgroundColor="rgb("+(255-gradient)+","+(255-gradient)+","+(255-gradient)+")";

  newRow.addEventListener("mouseover",function(){
    if (switchDelete){

      deleteRow(this);
    }
  });

}

function deleteRow(rowToRemove){
  //animation
  //var rowToRemove = this.parentNode.parentNode;
  rowToRemove.style.position="relative";
  rowToRemove.style.left=0;
  rowToRemove.style.transition="all 2s linear";
  setTimeout(function(){
    rowToRemove.style.left="100vw";
    setTimeout(function(){
      tableBody.removeChild(rowToRemove);
      amount.innerHTML=tableBody.getElementsByTagName('tr').length;

      colorsOk();

    },2000);
  },100);

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
