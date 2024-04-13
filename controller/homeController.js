const mongoose = require('mongoose')
const Question = require("../models/questions");


const Home = async(req, res) => {
    try {
        let questions = await Question.find({}).populate('options')

        return res.status(200).json(questions)
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}