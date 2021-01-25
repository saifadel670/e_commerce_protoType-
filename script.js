let product = getObject()

var flag = false
let cart =[]
   
  cart= JSON.parse(window.localStorage.getItem('cart'))
    flag = true



 // add new item in cart
   
 function addNew(i){
    //  let sum = 0;
   let data =  {
       productName: product[i].name,
       unitPrice:product[i].price,
       availableQuantity: product[i].totalQuantity-1,
       orderQuantity: 1,
       totalprice:0
   };
  
   if(cart == null){
    //console.log("else status")
    cart = [data]  
 
    }
   else{
            let flag1 = false
        cart.forEach(element => {      
        
       
        if(element.productName == data.productName  )
        {
           
           flag1 = true
           if(element.availableQuantity != 0){

                element.orderQuantity++
                element.availableQuantity-- 
           }
        }  
       
        });

        if(flag1 == false){
            console.log("pushed")
            cart.push(data);
            
        }
      
    }
    
    window.localStorage.setItem('cart',JSON.stringify(cart))
   countingCart()

   
}



function countingCart()
{
    let sum=0
    if(cart != null){
    cart.forEach(i =>{
    sum += i.orderQuantity
    })

    if(sum != 0){
        document.getElementById('count').innerHTML = sum;
        }
}
}


startFirst(product);

function startFirst(data){

    let tmpProduct = []
    tmpProduct = data
   
    var list = document.getElementById("list")
  if(list != null){ 
    while (list.hasChildNodes()) {  
        list.removeChild(list.firstChild);
      }
    if(tmpProduct.length){

        for(let i=0; i<tmpProduct.length; i++) {
            
             let aftr =   $('<a   type="button" style="float: right;" onclick="addNew('+i+')" >').append('<i class="fas fa-cart-plus text-primary" id="-10"></i> ')

            let v1 = $('<div class="card col-lg-4 col-sm-12" onclick="sel(event)" id="'+i+'">')
            var proNam = $('<div class="card-header bg-warning" id="'+i+'" <h5 id="'+i+'">').text(tmpProduct[i].name)
            let proImg =$('<div id="'+i+'" class="card-body"> <img src="'+ tmpProduct[i].imgLink +'" alt="loading" width="228" height="228" id="'+i+'">')
            let proPric =$('<div id="'+i+'" class="card-footer bg-warning" ><h6 id="'+i+'">').text(tmpProduct[i].price)
            proPric = proPric.append(aftr)

           v1.append(proNam, proImg,proPric)
            $('#list').append(v1)
        }
         
    }
    countingCart()
 }
}


   


    //add item
    function addItem(){
        let pName = document.getElementById('pName').value
        let fileDi =document.getElementById('imgPath').value
        let uprice =  parseInt(document.getElementById('uprice').value)
        let tQuantity =  parseInt(document.getElementById('tQuantity').value)
        let Description = document.getElementById('Description').value


        if(pName != '' && fileDi != '' && tQuantity != '' && uprice != '' && Description != ''){
            let data = {
                name:pName,
            imgLink: fileDi,
            price: uprice,
            totalQuantity: tQuantity,
            details: Description
            }

            
            addObject( data)

            location.replace("index.html")

        
    }else{
        alert("failed uploading!! fill-up all the filed")
    }
       
   }

function sel(event){
 let select = event.target.id
 if(select>=0){
 let elem = document.getElementsByClassName('firstBody')[0]
 elem.style.display= 'none'
console.log('select '+select)
let kt = $('<i class="fas fa-cart-plus text-primary" ></i>')
 let aftr =   $('<a   type="button" style="float: right;" onclick="addNew('+select+')">').append(kt)
let cross = $('<i class="fas fa-window-close"></i>')
let aftr1 =   $('<a   type="button" style="float: right;" onclick="cancelOne('+select+')">').append(cross)

            let v1 = $('<div class="card col-lg-8 col-sm-12" >')
            var proNam = $('<div class="card-header bg-warning" <h5 id="'+select+'">').text(product[parseInt(select)].name).append(aftr1)
             var detl = $('<p class="oneLine">').text(product[select].details)
            let proImg =$('<div class="card-body">').append($('<img src='+ product[select].imgLink +' alt="loading" width="228" height="228" id="'+select+'" class="oneLine">'), detl)
            let proPric =$('<div class="card-footer bg-warning"><h6 id="'+select+'">').text(product[select].price)
            proPric = proPric.append(aftr)
           v1.append(proNam, proImg,proPric)
            $('#detailsList').append(v1)

            let elem2 = document.getElementsByClassName('detailsbody')[0]
            elem2.style.display= 'block'
    
}}

function showingData(){
    let key = document.getElementById('llleas').value

    let NewArr= new Array();
    key = key.toLowerCase();
    product.forEach(function(i){
        let str = i.name.toLowerCase();
               
         if (str.match(key))
         {                       
           
             NewArr.push(i);
         }
    });
   
    
console.log("Newarr "+NewArr.length )
startFirst(NewArr)
countingCart()

}

//  cancel item from product list
function cancelOne(i){
   
    let data = product[i]._id
 for(var j=0; j<cart.length;j++)
 {
    if(cart[j].productName == product[i].name)
    {
       
        cart.splice(j,1)
        window.localStorage.setItem('cart',JSON.stringify(cart))

    }

 }

    product.splice(i,1)
    deleteObject(data)

            //startingPage()
            countingCart()
            location.replace("index.html")
 
}



continuous()
// added item show from cart array

function continuous(){
  
if(cart != null){
    let sum = 0
    for(let i=0; i<cart.length; i++){
        
        let head = $('<tr id="tmp"></tr>')
   let veP = $('<a class="btn text-primary  pr-3 pl-3" type="button" onclick="increase('+i+')"><i class="fas fa-plus-circle" type="button"></i></a>')
    let veM = $('<a  class="btn text-primary pr-3 pl-3" type="button" onclick="decrease('+i+')"><i class="fas fa-minus-circle"></i></a>')
    let det = $('<th>').text(cart[i].productName)
    let det1 = $('<th>').text(cart[i].unitPrice)
    let dett2 = parseInt((cart[i].orderQuantity))
    let det2 = $('<th>').append(veP,dett2,veM)
    let det3 = $('<th>').text(cart[i].orderQuantity*cart[i].unitPrice)
    sum += (cart[i].orderQuantity*cart[i].unitPrice)
    
    
    $('#productinfo').append( head.append(det,det1,det2,det3))
    //$('#list').append(v1)
    }
    $('#productinfo').append($('<h5>').text("Payable amount: "+sum+"/- taka"))
}
}

// add item for + button press in cart

function  increase(i){
    let a = parseInt(cart[i].orderQuantity)
    let b = parseInt(cart[i].availableQuantity)
    if( 0 < b){
        //console.log("success")
        a++
        b--
        cart[i].orderQuantity = a
        cart[i].availableQuantity = b
        window.localStorage.setItem('cart',JSON.stringify(cart))
      
        location.reload();
        }
        else{
           alert("Sorry. stock over")
        }
    
       
}








// reduce item for - button press in cart
function decrease(i){

    let a = parseInt(cart[i].orderQuantity)
    let b = parseInt(cart[i].availableQuantity)
    if(  a>0){
        a--
        b++
    cart[i].orderQuantity = a
    cart[i].availableQuantity = b
    window.localStorage.setItem('cart',JSON.stringify(cart))
    }
    else{
      
        cart.splice(i,1)
        window.localStorage.setItem('cart',JSON.stringify(cart))
    }
    location.reload();
    let details = document.getElementsByTagName('tr')

}


// confirm button
function confirm(){
    console.log(cart)
    if(cart.length > 0){
    alert("delivery successfull")
    product.forEach(element => {
        cart.forEach(i =>{
        if(i.productName == element.name){
            
            var quant = i.availableQuantity 
            updateProductInfo(element._id,quant)
        }
    })
        
    });
   
    localStorage.removeItem('cart')
    cart = null
    location.reload();
    }
    else{
        alert("no item in your cart")
    }
}

// cancel button

function continueShop(){
   
    location.replace("index.html")

}
