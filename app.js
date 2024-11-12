const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodoverride = require("method-override");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Cats");
const Cat = mongoose.model("Cat", {name:String});

app.use(methodoverride("X-HTTP-Method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/api", (req, res) => {
    res.send("Welcome to our REST API");
});

app.get("/api/cats", (req, res) => {
    Cat.find({}, (err, cats) => {
        if (err) {
            console.log(`There is ane error ${err}`);
        };
        res.json(cats);
    })
})

app.post("/api/cats/create", (req, res) => {
    const cat = new Cat(req.body);
    cat.save((err, cat) => {
        if (err) {
            console.log(`There is ane error ${err}`);
        };
        res.send(`Cat ${cat.name} has been created`);
    })
})
app.put("/api/cats/update/:id", (req, res) => {
    Cat.findByIdAndUpdate(req.params.id, req.body, (err, cat) => {
        if (err) {
            console.log(`There is ane error ${err}`);
        };
        res.send(`Cat ${cat.name} has been updated`);
    })
})

app.delete("/api/cats/delete/:id", (req, res) => {
    Cat.findByIdAndRemove(req.params.id, (err, cat) => {
        if (err) {
            console.log(`There is ane error ${err}`);
        };
        res.send(`Cat ${cat.name} has been deleted`);
    })
})

app.listen(5000, () => console.log("Server is running on port 5000"));