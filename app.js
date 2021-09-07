const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');


const app = express();
mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("article", articleSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));



//Targeting all articles
app.route("/articles")
    .get(function(req,res){
        Article.find(function(err,articles){
            if(err){
                res.send(err);
            }
            else{
                res.send(articles);
            }
        })
    })
    .post(function(req,res){
        const inputTitle = req.body.title;
        const inputContent = req.body.content;

        const articleToAdd = new Article({
            title: inputTitle,
            content: inputContent
        });

        articleToAdd.save(function(err){
            if(err){
                res.send(err);
            }
            else{
                res.send("Content Added");
            }
        });
    })
    .delete(function(req,res){
        Article.deleteMany(function(err){
            if(err){
                res.send(err);
            }
            else{
                res.send("All articles deleted.");
            }
        });
    });




//Targeting specific article
app.route("/articles/:articleName")
    .get(function(req,res){
        const articleName = req.params.articleName;
        Article.find({title: articleName}, function(err,articles){
            if(err){
                res.send(err);
            }
            else{
                res.send(articles);
            }
        })
    })
    .post(function(req,res){
        const articleName = req.params.articleName;
        const articleToBeAdded = new Article({
            title: req.body.title,
            content: req.body.content
        });
        
    })
    .delete(function(req,res){

    });




app.listen(3000, function(){
    console.log("Server is listening at port 3000.");
})