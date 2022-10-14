const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Lists = require('../models/Lists');

//Route 1:Get all Lists using: GET "/api/auth/fetchalllists",Login required
router.get('/fetchalllists', fetchuser, async (req, res) => {
  try {
    const lists = await Lists.find({ user: req.user.id });
    res.json(lists)
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error occurred!');
  }
})

//Route 2:Add a new List using: POST "/api/lists/addlist",Login required
router.post('/addlist', fetchuser,
 [ body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'description must be atlest 5 characters').isLength({ min: 5 })]
   ,async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are errors,return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const list = new List({
        title, description, tag, user: req.user.id
      })
      const savedList = await list.save();
      res.json(savedList);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal server error occurred!');
    }
  })

//Route3:Update an existing List using: PUT "/api/list/updatelist",Login required
router.put('/updatelist/:id', fetchuser, async (req, res) => {
 try{
  const { title, description, tag } = req.body;
  //create a newList object
  const newList = {};
  if (title) { newList.title = title };
  if (description) { newList.description = description };
  if (tag) { newList.tag = tag };

  //find the list to be updated & update it
  let list = await List.findById(req.params.id);
  if (!list) { return res.status(404).send('Not found') }

  if (list.user.toString() !== req.user.id) {
    return res.status(401).send('Not allowed');
  }
  list = await List.findByIdAndUpdate(req.params.id, { $set: newList }, 
  { new: true })
  res.json({ list });
 }
 catch(error){
  console.error(error.message);
  res.status(500).send('Internal server error occurred!');
}
})

//Route4:Delete an existing List using:DELETE "/api/list/deletelist",Login required
router.delete('/deletelist/:id', fetchuser, async (req, res) => {
  //find the list to be delete & delete it
  try {
    let list = await list.findById(req.params.id);
    if (!list) { return res.status(404).send('Not found') }
  //Allow deletion only if user owns this list 
    if (list.user.toString() !== req.user.id) {
      return res.status(401).send('Not allowed');
    }
    list = await list.findByIdAndDelete(req.params.id)
    res.json({ 'Success': 'note has been deleted', lists: list });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error occurred!');
  }
})

module.exports = router;