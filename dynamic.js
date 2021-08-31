const keyVal = document.getElementById("key");
const val = document.getElementById("val");
const keyVal1 = document.getElementById("key1");
const val1 = document.getElementById("val1");
const add = document.getElementById("add");
const del = document.getElementById("delete");
const submit = document.getElementById("submit");
const row2 = document.getElementById("opt");
const addVariant = document.getElementById("addVariant");
const printVariant = document.getElementById("printVariant");
const cancel = document.getElementById("cancel");
const tableDr = document.getElementById("tableDraw");

let iArr = [];
let index=0;
let final = {};
let combination = [];

const removeItem = (id) => {
    let itemNo = 0
    for (const item of combination) {
        if (item.id == id) {
            break;
        }
        itemNo++;
    }
    combination.splice(itemNo, 1);
    tableDraw();
};

const tableDraw = ()=>{
    tableDr.innerHTML = ``;
    for(let i = 0; i<combination.length; i++){
        let arr = [];
        for ( var property in combination[i] ) {
            arr.push(property);
            arr.push(combination[i][property]);
        }
        const newDiv = document.createElement("div");
        newDiv.className = "row";
        newDiv.innerHTML = `<p> ${arr[0]} : ${arr[1]} and ${arr[2]} : ${arr[3]}</p>
        <input type="text"  id="MRP${combination[i].id}"  placeholder="MRP price">
        <input type="text" id="SP${combination[i].id}" placeholder="selling price">
        <input type="text"  id="QNT${combination[i].id}" placeholder="Quantity">
        <button class="list_remove_button btn btn-danger" onclick="removeItem(${combination[i].id})" type="button" id="${combination[i].id}">Remove</button>
        <hr>`
    // newDiv.addEventListener("click", ()=>{removeItem(combination[i].id)})
    tableDr.appendChild(newDiv);
    }
}

const keyValHandler = async()=>{
    const obj = {};
    obj.key = keyVal.value;
    obj.val = val.value.split(", ");
    iArr.push(obj);
    final[obj.key] = obj.val;
    if(keyVal1.value && val1.value){
        const obj1 = {};
        obj1.key = keyVal1.value;
        obj1.val = val1.value.split(", ");
        final[obj1.key] = obj1.val;
        iArr.push(obj1);
    }
        let i = 0 ;   
        for(let j = 0; j<iArr[i].val.length; j++){
            if(i+1<iArr.length){
                for(let k = 0; k<iArr[i+1].val.length; k++){
                    let fObj = {};
                    fObj[iArr[i].key] = iArr[i].val[j];
                    fObj[iArr[i+1].key] = iArr[i+1].val[k];
                    fObj.id=index++;
                    combination.push(fObj);
                }
            }else{
                let fObj = {};
                fObj[iArr[i].key] = iArr[i].val[j];
                fObj.id=index++;
                combination.push(fObj);
            }
        }
        keyVal.value = "";
        val.value = "";
        keyVal1.value = "";
        val1.value = "";
        row2.style.display = "none";
        tableDraw();
}

add.addEventListener("click", ()=>{
    row2.style.display = "block";
})
addVariant.addEventListener("click", ()=>{
    row2.style.display = "block";
})
del.addEventListener("click", ()=>{
    row2.style.display = "none";
})
cancel.addEventListener("click", ()=>{
    row2.style.display = "none";
    keyVal.value = "";
    keyVal.value = "";
    val.value = "";
    keyVal1.value = "";
    val1.value = "";
    combination = [];
    tableDr.innerHTML = ``;
    final = {};
})

const submitHandler = ()=>{
    for(let i = 0; i<combination.length; i++){
        let mrp = document.getElementById(`MRP${combination[i].id}`).value;
        let sp = document.getElementById(`SP${combination[i].id}`).value;
        let qnt = document.getElementById(`QNT${combination[i].id}`).value;
        combination[i].mrp_price = mrp;
        combination[i].selling_price = sp;
        combination[i].qty = qnt;
    }
    final["combination"] = combination;
    console.log(final);
}

printVariant.addEventListener("click", keyValHandler);

submit.addEventListener("click", submitHandler);