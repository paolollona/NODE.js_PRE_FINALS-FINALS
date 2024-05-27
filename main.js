var express =require("express");
var mysql =require("mysql");

var app=express()
app.use(express.json())

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'hero_villian'
})

db.connect((err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log("connected!")
    }
})

// post 
app.post('/post/user', (req,res) => {
    const name=req.body.name;
    const id=req.body.id;
    const email=req.body.email;
    const password=req.body.password;

    db.query('INSERT into user values(?,?,?,?)',[id, name, email, password], (err,result)=> {
        if(err)
            {
                console.log(err)
            }else{
               res.send("POSTED")
            } 
    })
    

})
app.post('/post/character', (req,res) => {
    const name=req.body.name;
    const charact_ID=req.body.charact_ID;
    const distinction=req.body.distinction;
    const description=req.body.description;

    db.query('INSERT into character values(?,?,?,?)',[charact_ID, name, distinction, description], (err,result)=> {
        if(err)
            {
                console.log(err)
            }else{
               res.send("POSTED")
            } 
    })
    

})

//fetch
app.get("/fetch/user",(req,res)=>{
    db.query("SELECT * FROM user", function(err,result,fields){
        if(err)
            {
                console.log(err)
            }else{
                res.send(result)
            }
    })
})

app.get("/fetch/character",(req,res)=>{
    db.query("SELECT * FROM charact", function(err,result,fields){
        if(err)
            {
                console.log(err)
            }else{
                res.send(result)
            }
    })
})

app.put("/update/user/:id",(req,res)=>{
    const uid=req.params.id;
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;

    db.query('UPDATE user SET name=?,email=?,password=? WHERE id=?',[name,email,password,uid],(err,result)=>{
        if(err)
            {
                console.log(err)
            }else{
                res.send(result)
            }
    })
})

app.put("/update/character/:character_ID",(req,res)=>{
    const cid=req.params.character_ID;
    const name=req.body.name;
    const distinction=req.body.distinction;
    const description=req.body.description;

    db.query('UPDATE charact SET name=?,distinction=?,description=? WHERE character_ID=?',[name,distinction,description,cid],(err,result)=>{
        if(err)
            {
                console.log(err)
            }else{
                res.send(result)
            }
    })
})



//delete
app.delete("/deletedata/user/:id",(req,res)=>{
    const delid=req.params.id;
    db.query('DELETE FROM user WHERE id=?',delid,(err,result)=>{
        if(err)
            {
                console.log(err)
            }else{
                res.send("Deleted!")
                console.log(result)
            }
    })
})

app.delete("/deletedata/character/:character_ID",(req,res)=>{
    const delid=req.params.character_ID;
    db.query('DELETE FROM charact WHERE charact_ID=?',delid,(err,result)=>{
        if(err)
            {
                console.log(err)
            }else{
                res.send("Deleted!")
                console.log(result)
            }
    })
})

app.listen(5001, (err)=> { 
    if(err)
        {
            console.log(err)
        }else{
           console.log("node.js on port 5001")
        } 


})
