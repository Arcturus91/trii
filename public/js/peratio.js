const button = document.getElementById("calculatePer")



function perRatio (){
    let per = 0
    const eps = document.getElementById("eps")

    const price = document.getElementById("stockPrice")

    const perHTML =document.getElementById("per")
   
    
    per = Number(price.value)/Number(eps.value)

    perHTML.value = per.toFixed(2)

return per

}


button.addEventListener( "click", perRatio)

