const express = require("express");
const Questions = require("../models/questions");
const Question = require("../models/questions");
const Option = require("../models/options");

const createOptions = async (req, res) => {
    console.log("createOpt",req.url);
    console.log("createOpt",req.body);
    try {
      const ques = await Questions.create({
        title: req.body.title
      });
      console.log(ques);
      return res.status(200).json({
        message: "Question created",
        data: ques
      });
    } catch (error) {
      console.log("Questions Error", error);
      return res.status(500).json("Internal Server Error");
    }
  };
  



const deleteOption = async (req, res) => {
  try{
  const ques = await Questions.findById(req.params.id).populate('options')

  if (!ques) {

    // returning error reponse
    res.status(404).json({
      error: "Question not Found"
    });
  } 

  ques.options.map((q) => {
    if(q.votes >=1){
      return res.status(403).json({
        error: "Can't delete as it has votes"
      })
    }
  })
//deleting all options
  await Option.deleteMany({
    _id: {
      $in: ques.options
    }
  })


  //deleting Question
  await Question.findByIdAndDelete(req.params.id)

  //Return success response with deleted question object
  return res.status(200).json({
    message: "Deleted all",
    data: ques
  })
}catch(err){
  console.log(err);
  return res.status(500).json({
    error: "internal Server Error"
  })
}
};


const showDetails = async (req, res) => {
  console.log(req.params.id);
  try {
    const ques = await Questions.findById(req.params.id).populate("options");

  if (ques) {
    return res.status(200).json({ques});
  } else {
    return res.status(404).json({
     message: "DNE"
    });
  }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error"
    })
  }

};




(module.exports = createOptions), showDetails, deleteOption;
