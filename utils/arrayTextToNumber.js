function arrayTextToNumber (obj){
    let oriObj = obj
    let values = Object.values(obj)
     let keys = Object.keys(obj)
    let onlyNumbers =values.map(value=>parseInt(value)/1000000)
    
    for(let i = 2; i<onlyNumbers.length;i++){
    
    Object.defineProperty(oriObj, keys[i], {value : onlyNumbers[i]})
    }
    return oriObj
  }

  module.exports = arrayTextToNumber;