const express=require("express");
const app=express();
const port=8080;

const path=require ("path");
const { v4: uuidv4 } = require('uuid');
 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const methodOverride=require('method-override');


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {    id:uuidv4(),
        username:"sushant",
        content:"i love you",
    },


    {
        id:uuidv4(),
        username:"sanket",
        content:"hello how are you",
    },

    {
        id:uuidv4(),
        username:"hrushi",
        content:"hey whatsup",
    }
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
//to add new post
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
   let {username,content}=req.body;
   let id=uuidv4();   //it will give the content and username of the new post
   posts.push({id,username,content});
    // res.send("post request is working");
    res.redirect("/posts");    //it will connect the two urls
});

//this code is to get an detail of an particular post
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);  //it will find the id in an arrray
    console.log(post);
    res.render("show.ejs",{post});
});
//to edit the post
app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newcontent;
    console.log(post);
   res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});

///to delete the post
app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
     posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
});
app.listen(port,()=>{
    console.log("listening on  8080");
});