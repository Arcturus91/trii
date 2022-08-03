const button = document.getElementById("calculateID")



function roce (){
    let roce = 0
    let ce = 0

    const opInc = document.getElementById("opIncID")
    
    const nonCurrLiab = document.getElementById("nonCurrLiabID")
    const equit = document.getElementById("equitID");
    const roceHTML =document.getElementById("roceID")
   
    
    ce =Number(equit.value)+Number(nonCurrLiab.value)
    roce = (Number(opInc.value)/ce)*100

    roceHTML.value = roce.toFixed(2)+"%"

return roce

}


button.addEventListener( "click", roce)

