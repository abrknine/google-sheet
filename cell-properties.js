//storage

let sheetDB=[];

for(let i=0;i<rows;i++){
    let sheetRow=[];
    for( let j=0; j<cols; j++){
        let cellProp={
            bold: false,
            italic: false,
            undeline: false,
            alignment: "left",
            fontFamily:"monospace",
            fontColor: "#000000",
            fontSize:"14",
            fontColor :"#000000",
            BGcolor:"#000000"


        }
        sheetRow.push(cellProp);
         
    }

    sheetDB.push(sheetRow)
}

//selectors for cell properties

let bold=document.querySelector(".bold")
let italic=document.querySelector(".italic")
let underline=document.querySelector(".underline")
let fontSize=document.querySelector(".font-size-prop")
let fontFamily=document.querySelector(".font-family-prop")
let   fontColor=document.querySelector(" .font-color-prop ")
let   BGcolor=document.querySelector(" .BGcolor-prop ")
let   alignment=document.querySelector(" .alignment ")

let   leftAlign=alignment[0];
let   centerAlign=alignment[1];
let   rightAlign=alignment[2];

  
let activeColorProp="#d1d8e0"
let inactiveColor="#ecf0f1"

// applicatiom of two way binding ->1) ui changing of each prop  2) upadtion on storage on each cellstorage(created above)
//attach property listeners

bold.addEventListener("click", (e)=>{
    let  address=addressBar.value
    let [cell,cellProp]= activecell(address);  // here is cell is class or id of currently clicked cell and cellprop is storage of it

    //MOdification
    cellProp.bold=!cellProp.bold //datachange
    cell.style.fontWeight= cellProp.bold?"bold":"normal";  //styling ui or changing ui  
    bold.style.backgroundColor= cellProp.bold? activeColorProp:inactiveColor 

})
italic.addEventListener("click", (e)=>{
    let  address=addressBar.value
    let [cell,cellProp]= activecell(address);  // here is cell is class or id of currently clicked cell and cellprop is storage of it

    //MOdification
    cellProp.italic=!cellProp.italic //datachange
    cell.style.fontStyle= cellProp.italic?"italic":"normal";  // styling ui or changing ui
    italic.style.backgroundColor= cellProp.italic? activeColorProp:inactiveColor 

})

underline.addEventListener("click", (e)=>{
    let  address=addressBar.value
    let [cell,cellProp]= activecell(address);  // here is cell is class or id of currently clicked cell and cellprop is storage of it

    //MOdification
    cellProp.underline=!cellProp.underline //datachange 
     cell.style.textDecoration= cellProp.underline?"underline":"none";  // styling ui or changing ui
    underline.style.backgroundColor= cellProp.underline? activeColorProp:inactiveColor 

})

fontSize.addEventListener("change", (e)=>{
    let  address=addressBar.value
    let [cell,cellProp]= activecell(address);  // here is cell is class or id of currently clicked cell and cellprop is storage of it
 
      cellProp.fontSize=fontSize.value //datachange
      cell.style.fontSize=cellProp.fontSize + "px";
      fontSize.value=cellProp.fontSize;  //onchage pickup value attribute


})
fontFamily.addEventListener("change", (e)=>{
    let  address=addressBar.value
    let [cell,cellProp]= activecell(address);  // here is cell is class or id of currently clicked cell and cellprop is storage of it
 
      cellProp.fontFamily=fontFamily.value //datachange
      cell.style.fontFamily=cellProp.fontFamily;
      fontFamily.value=cellProp.fontFamily;  //onchage pickup value attribute


})








function activecell(address ){
   let [rid,cid]= decodeRIDCIDfromAddress(address);    
   //Access cell and storage object
   let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`)

   let cellProp=sheetDB[rid][cid];
   return [cell, cellProp];

}

function decodeRIDCIDfromAddress(address){
     //adress->"A1"
     let rid=Number(address.slice(1)-1); //"1"->0 
     let cid= Number(address.charCodeAt(0))-65;   //"A"->0

     return [rid, cid];
}





