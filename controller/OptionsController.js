const Option = require("../models/options");
const Options = require("../models/options");
const Question = require("../models/questions");

const createOptions = async (req, res) => {
  console.log(req.body, req.params.id);

  let questions = await Question.findById(req.params.id);

  if(questions){
  try {
    let option = await Options.create({
        text: req.body.text,
        // question: req.params.id,
      });

      option.linkToVote = `http://localhost:3000/api/v1/options/${option._id}/add_vote`;

      option.save();

      return res.json(option)
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'Internal Server Error'
    })
  }
}else{
  return res.status(404).json({
    error: 'Cannot find question'
  })
}
 
};




const deleteOptions = async (req, res) => {
  console.log("id", req.params.id);
  
  try {
    const option = await Option.findById(req.params.id);
  if (option) {
    //checkinh if question have any votes
    if(option.votes < 1){
      //

      const question = await Question.findOne({
        options: { $elemMatch: { $eq: req.params.id}}})

        if(question) {
          // delete the option and delete it from Optins array
          
          await Option.findByIdAndDelete(req.params.id);
          await Question.updateOne({ _id: question._id}, { $pull: { options: { $in: req.params.id}}})

          return res.json({ message: "Option deleted successfull", data: option});
        }

    }else{
      //If option has votes, return an error

      return res.status(403).json({
        error: "Option has vots, can't be deleted"
      })
    }
  }
  // handling the bad request
  else {
    return res.status(404).json({
      error: 'Cannot find option'
    })
  }

  } catch (error) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal Server Error'
    })
  }
}




const AddOptions = async (req, res) => {
  try {
      // find the option with given id 
      const option = Option.findById(req.params.id);

    if(option) {
      //Increment the vote count 
      option.votes += 1;
      option.save(); 
      return res.json({ message: "Vote added to option", data: option});
    }else{
      //If option do not exist

      return res.status(404).json({
        error: 'Option DNE'
      })
    }
    
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      error: 'Internal Server Error'
    })
  }
}



module.exports = createOptions, AddOptions, deleteOptions;
