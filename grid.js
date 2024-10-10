let rows = 100;
let cols = 26;

let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont =document.querySelector(".address-row-cont");
let cellsCont =document.querySelector(".cells-cont")
let addressBar=document.querySelector(".address-bar")


for (let i = 0; i < rows; i++) {
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class", "address-col");
    addressCol.innerText = i + 1;
    addressColCont.appendChild(addressCol);
}

for( let i=0; i<cols; i++ ){
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class", "address-row");
    addressRow.innerText =String.fromCharCode(65+i)
    addressRowCont.appendChild(addressRow);
}

for (let i=0; i<rows; i++){
    let rowCont =document.createElement("div")
    rowCont.setAttribute("class" , "row-cont")
    for( let j=0; j<cols; j++){
      let cell =document.createElement("div")
      cell.setAttribute("class" , "cell" )
      cell.setAttribute("contenteditable", "true")
      cell.setAttribute("spellcheck", "false")  
      //atribute for cell and row identification
      cell.setAttribute("rid",i)
      cell.setAttribute("cid",j)  //gonna use this in  activecell function in cell-properties.js in unique way
      rowCont.appendChild(cell);
      addListenerForAddressBarDisplay(cell,i,j);
    }
    cellsCont.appendChild(rowCont);
}

//soley for upadting rowand colid in adressbar where i am working
function addListenerForAddressBarDisplay(cell, i,j){
    cell.addEventListener("click",(e)=>{
        let rowID=i+1;
        let colID=String.fromCharCode(65+j);
        addressBar.value=`${colID}${rowID}`
    })


}

//by default click on first cell      via dom

let firstCell=document.querySelector(".cell");  //see line 29 you five each cell an class(in form of atribute) as cell

firstCell.click(); 
 


