var http = require('http')
var express  = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
var sever = http.Server(app)
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var dbURL ='mongodb://localhost:27017/cse309_project'
mongoose.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology:true}) 
mongoose.connection.on('error',function(error){
    console.log(error)
})

var Product = require('./product.model.js')
var Cart = require('./cart.model')
const path = require('path')
const HTML_DIR = path.join(__dirname)
app.use(express.static(HTML_DIR))



app.get('/', function(request, response){
    console.log("test /")
    response.sendFile(__dirname+'/index.html')
})

app.get('/index.html', function(request, response){
    console.log("test /")
    response.sendFile('/')
})

app.get('/cart', function(request, response){
    
    response.sendFile(__dirname+'/cart2.html')
})

// app.get('/start', function(request, response){
//     console.log("test u")
//     response.sendFile(__dirname+'/index.html')
// })

app.get('/addItem', function(request, response){
    response.sendFile(__dirname+'/addItem.html')
})

app.get('/assignment/allProduct', function(request, response){
    Product.find({}, function(err,data){
        if(err){
            return response.status(400).json({
                error:'data is missing'
            })
        }
        return response.status(200).json(JSON.stringify(data))
    })
})




app.post('/assignment/allProduct', function(request,response){
    
    NewProduct  = Product(request.body)
    
    NewProduct.save(function(err, data){
        if(err){
            
            return response.status(400).json({error:"add request fails"})
        }
    
        return response.status(200).json({
            message:"successfully added"
        })
        
    })
})

app.delete('/assignment/:id',function(request, response){

    Product.findByIdAndRemove(request.params.id, function (err, data) {
        if(err){
            
          response.status(400).json({error:"delete request fails"})
        }
       
         response.status(200).json({
            message:"successfully deleted"
        })
    })
    
    response.sendFile(__dirname+'/index.html')
})

app.put('/assignment/allProduct/updated/:id/:totalQuantity', function(request,response){

    Product.findByIdAndUpdate(request.params.id,{'totalQuantity':request.params.totalQuantity},{new:true },function(err,data){
        if(err){            
            response.status(400).json({error:"delete request fails"})
          }
         
           response.status(200).json({
              message:"successfully updated"
          })
    })
})




sever.listen(process.env.PORT || 3000)
process.env.IP || 'localhost', function(){
    console.log("surver running")
}


