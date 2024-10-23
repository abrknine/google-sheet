
  // just to update value property of cell in db 
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur", (e) => {
            let address = addressBar.value;
            let [ cell, cellProp] = getCellAndCellProp(address);
            let enteredData = cell.innerText; // Get data from cell UI

           if(enteredData ===  cellProp.value) return ;
            cellProp.value = enteredData;     // Update data model (db)

                //if date modified remove P-C Relation ,formula empty , updatechildren with  new hardcoded ( modified value)
                removeChildFromParent(cellProp.formula);
                cellProp.formula = "";
                updateChildrenCells(address);       




        });
    }   
}


 let formulaBar=document.querySelector(".formula-bar")

     formulaBar.addEventListener("keydown",(e)=>{
        let inputFormula=formulaBar.value
        if(e.key === "Enter" && inputFormula){

   //if change in formula, break old P-C realtion, evaluate new formula ,add new P-C relation , evaluate new formula add new pc relation
           let address=addressBar.value;
            let [cell,cellProp]=getCellAndCellProp(address);
            if(inputFormula !==  cellProp.inputFormula   ){
                removeChildFromParent(cellProp.formula)
            }

        
            let evaluatedValue= evaluateFormula(inputFormula)

            //to update ui and cellprop in DB
            
                setCellUIAndCellProp(evaluatedValue, inputFormula, address);
                addChildToParent(inputFormula)
                console.log(sheetDB);

                updateChildrenCells(address)
                 
            

        }
     })
     
     //after adding childrenadress to parent children array now we need to update ui of of childrencell according to new dependnecy (or its parent);
     function updateChildrenCells(parentAddress){
         let [parentCell,parentCellProp]= getCellAndCellProp(parentAddress);
         let  children = parentCellProp.children;

         for(let i=0; i<children.length; i++){

            let childAddress=children[i];
            let[childCell ,childCellProp] =getCellAndCellProp(childAddress);
            let childFormula=childCellProp.formula;

            let evaluatedValue = evaluateFormula(childFormula);

            setCellUIAndCellProp(evaluatedValue,childFormula,childAddress);

            updateChildrenCells(childAddress)   //recusion kyuki children might be parent for someone and we need tro perform changes in all cell afected by (changing  dependency formula for current cell)
         }
     }
 


  //update parentCellProps.children with all its children 
     function addChildToParent(formula){
        let  childAddress = addressBar.value;
        let encodedFormula=formula.split(" ");
        for(let i=0; i<encodedFormula.length; i++){
                let asciivalue=encodedFormula[i].charCodeAt(0);
                if(asciivalue>=65 && asciivalue<=90  ){
                    let [parentCell , parentCellProp]=getCellAndCellProp(encodedFormula[i]);
                    parentCellProp.children.push(childAddress);
                }
        }


     } 

     // this function takes old formla as input and breakdown it-> to remove child adress from parent cellProp.childerm
     
     function removeChildFromParent(formula){
        let  childAddress = addressBar.value;
        let encodedFormula=formula.split(" ");
        for(let i=0; i<encodedFormula.length; i++){
                let asciivalue=encodedFormula[i].charCodeAt(0);
                if(asciivalue>=65 && asciivalue<=90  ){
                    let [parentCell , parentCellProp]=getCellAndCellProp(encodedFormula[i]);
                    let idx =parentCellProp.children.indexOf(childAddress);
                    parentCellProp.children.splice(idx,1);   
                
                }
        }

     }

     function  evaluateFormula(formula){
        let encodedFormula = formula.split(" "); //convert string into array sperated by space
        for(let i=0; i<encodedFormula.length; i++){
            let asciivalue=encodedFormula[i].charCodeAt(0); // A from "A1"
            if(asciivalue>=65 && asciivalue<=90){
                let [cell,cellProp]= getCellAndCellProp(encodedFormula[i]);
                encodedFormula[i]=cellProp.value;

            }

        }
       let  decodedFormula= encodedFormula.join(" ");



        return eval(decodedFormula);  //this evalute all maths operations take string as input
     }


     function setCellUIAndCellProp(evaluatedValue,formula, address){
       
        let [cell,  cellProp]= getCellAndCellProp(address);
        //UI -UPDATE
        cell.innerText=evaluatedValue;
        //DB update
        cellProp.value=evaluatedValue; 
        cellProp.formula=formula;
        console.log(cellProp);

     }