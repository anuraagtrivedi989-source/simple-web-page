const http = require("http");
const fs = require("fs");
const path = require("path");

const app = http.createServer((req, res) =>{
     let filePath;

     if(req.url==="/"){
        filePath = path.join(__dirname, "pages", "index.html")
     }
     else if(req.url==='/about'){
        filePath = path.join(__dirname, "pages", "about.html" )
     }
     else if(req.url==="/service"){
        filePath = path.join(__dirname, "pages", "service.html")
     }
      else if(req.url==="/contact"){
        filePath = path.join(__dirname, "pages", "contact.html")
     }
     else {
        res.writeHead(404, {"content-type":"text/html"});
        return res.end("<h4> 404 page not found</h4>" )
     }


       fs.readFile(filePath, (err, data)=>{
        res.writeHead(200, {"content-type":"text/html"});
        res.end(data);
       }) 
})
const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`we are hosting at http://localhost:${PORT}`);
})