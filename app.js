const express= require("express")
const app=express();
const path=require('path');
const ejsMate=require("ejs-mate");


app.listen(8080,()=>{
    console.log("Server is listening on 8080");
});

app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
// app.use(express.static("Public"))
app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.json());
app.engine("ejs",ejsMate);

// app.get("/",(req,res)=>{
//     res.render("lobby.ejs")
// })
app.get("/",(req,res)=>{
    res.render("lobby.ejs")
})
app.get("/lobby.html",(req,res)=>{
    res.render("lobby.ejs")
})

app.get("/index.html",(req,res)=>{
    res.render("index.ejs")
})
app.get("/chatRoom?room=",()=>{
    res.send("hi")
})