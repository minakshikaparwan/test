function createTlArray(){
    var tlData=[];
    if(!localStorage.getItem("tlData")){
        localStorage.setItem("tlData",JSON.stringify(tlData));
    }
}
function getTlArray(){
    var tlData=JSON.parse(localStorage.getItem('tlData'));
    return tlData;
}
function addTlElement(data){
    var tlData=getTlArray();  
    tlData.push(data);
    tlData = tlData.sort(function (d1, d2) {
        return new Date(d2.date) - new Date(d1.date);
    })
    localStorage.setItem("tlData",JSON.stringify(tlData));;
}
function removeTlElement(id){
    var tlData=getTlArray();
    for(let i=0;i<tlData.length;i++){
        if(tlData[i].id==id){
            tlData.splice(i,1);
        }
           
    }
    localStorage.setItem("tlData",JSON.stringify(tlData));
}

