// backend/controllers/recomController.js
const recom = require('../models/recommendation');
const User = require('../models/User');
const Food = require('../models/Food');

// Get all recom items
const getrec = async (req, res) => {
  try {
    const reco = await recom.find({});
    res.json(reco);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Add a new recom item
const addrec = async (req, res) => {
  try {
    const { user_id,food_item_id,score,reason } = req.body;
    const user = await User.findById(user_id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const food = await Food.findById(food_item_id);
        if (!food) return res.status(404).json({ message: 'Food item not found' });

    const reco = new recom({user_id:user.id,food_item_id:food.id,score,reason });
    const createdrec = await reco.save();
   return res.status(201).json(createdrec);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getrecById = async (req, res) => {
  const recId = req.params.id;

  let rec1;
  try {
   // rec1 = await recom.findById(recId);
   const recommendations = await recom.find({ user_id: req.params.id }).populate('food_item_id');
   return res.status(201).json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updaterecById = async (req, res) => {
  const recomId = req.params.id;

 var rec=await recom.findById(recomId);
  
  try {
    const { user_id,food_item_id,score,reason } = req.body;

    //  rec = new recom({recomId,name,location,cuisine,rating,is_open,contact_number });
    rec.user_id =user_id;
     rec.food_item_id =food_item_id;
     rec.score =score;
     rec.reason =reason;
     await recom.updateOne({_id:req.params.id},rec);
    getrec(req,res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleterecById = async (req, res) => {
 
  try {
   
     await recom.deleteOne({_id:req.params.id});
    getrec(req,res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getrec,
  addrec,
  deleterecById ,
  updaterecById,
  getrecById 

};
