function customFinancialRatios(revTTM,opIncMarg,equit,ncl){

    //revTTM: revenue trailing twelve monnth is a string
    //opIncMarg: operating income margin is a string

    let opInc = Number(revTTM)*Number(opIncMarg)/1000000; //million conversion, same as other values
    
    let result,roce
    let obj={returnCapitalEmploy:0,operatingIncomeTTM:opInc}

    if((equit+ncl)>0 && opInc>0){
        roce = ((opInc/(equit+ncl)*100)).toFixed(2)
      
obj.returnCapitalEmploy=roce + '%'
result = obj
    } else {
result = "No Aplica"
    }
  
    return result
}

module.exports = customFinancialRatios;