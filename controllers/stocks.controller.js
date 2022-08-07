const Stock  = require('../models/Stock.model')
const User = require('../models/User.model')

exports.getStocksById = async(req,res,next) =>{

    try{
        const {id} = req.params
        const oneUser = await User.findById(id)
        const userPopulated = await oneUser.populate('_stocks')
        res.status(200).json(userPopulated._stocks)

    }
    catch(error){console.log("error",error)}
}