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
let alignment = document.querySelectorAll(".alignment");

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

fontColor.addEventListener("change",(e)=>{
    let  address=addressBar.value
    let [cell,cellProp]= activecell(address); 

    cellProp.fontColor=fontColor.value //datachange
    cell.style.color=cellProp.fontColor;
    fontColor.value=cellProp.fontColor;  //onchage pickup value attribute

})
BGcolor.addEventListener("change",(e)=>{
    let  address=addressBar.value
    let [cell,cellProp]= activecell(address); 

    cellProp.BGcolor=BGcolor.value //datachange
    cell.style.backgroundColor=cellProp.BGcolor;
    BGcolor.value=cellProp.BGcolor;  //onchage pickup value attribute

})

alignment.forEach(( alignElem) => {
    alignElem.addEventListener("click",(e)=>{
        let  address=addressBar.value
        let [cell,cellProp]= activecell(address); 
        //console.log(cell,cellProp);

        let  alignValue=e.target.classList[0];
        console.log(e.target);
        cellProp.alignment=alignValue; //datachange
        cell.style.textAlign=cellProp.alignment//ui change

        switch(alignValue){ // uichange of property bar
            case "left":        
                leftAlign.style.backgroundColor=activeColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
           case "center":
            leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=activeColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
             break;
             case "left":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=activeColorProp;
                break;
        }
        

    

    })
    
});

 //code when we select new cell so we have to update the state of all properties of preperty tab
let allCells =document.querySelectorAll(".cell");
for(let i=0; i<allCells.length; i++){
    addListenerToAttachCellProperties(allCells[i]);
} 

function  addListenerToAttachCellProperties(cell){
    cell.addEventListener("click",(e)=>{

        let address=addressBar.value
        let [rid,cid]= decodeRIDCIDfromAddress(address)  
        let cellProp=sheetDB[rid][cid];  


        // apply cell properties
        cell.style.fontWeight= cellProp.bold?"bold":"normal";
        cell.style.fontStyle= cellProp.italic?"italic":"normal"; 
        cell.style.textDecoration= cellProp.underline?"underline":"none";
        cell.style.fontSize=cellProp.fontSize + "px";
        cell.style.fontFamily=cellProp.fontFamily;
        cell.style.color=cellProp.fontColor;
        cell.style.backgroundColor=cellProp.BGcolor=="#000000" ? "transparent":cellProp.BGcolor     ;
        cell.style.textAlign=cellProp.alignment

       
        
        //apply property to ui container ->suppose we cam to container which has already applied value so updating style of properites(of property elem ) using cellprop     
        bold.style.backgroundColor= cellProp.bold? activeColorProp:inactiveColor 
        italic.style.backgroundColor= cellProp.italic? activeColorProp:inactiveColor 
        underline.style.backgroundColor= cellProp.underline? activeColorProp:inactiveColor 
        fontSize.value=cellProp.fontSize;
        fontFamily.value=cellProp.fontFamily;
        fontColor.value=cellProp.fontColor;
        BGcolor.value=cellProp.BGcolor;  
        switch(cellProp.align){ // uichange of property bar
            case "left":        
                leftAlign.style.backgroundColor=activeColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
           case "center":
            leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=activeColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
             break;
             case "left":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=activeColorProp;
                break;
        }



          

    })
}






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






















/*
<div>
<div class="al">

</div>
<div class="al"> </div>
<div class="al"> </div>
</div>

let a= document.querySelectorAll(".al");
let b=a[0];
let c=a[1];
let d=a[2];*/