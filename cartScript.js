


// update upper portin to local memory . temporary file
let cart = []
if(window.localStorage.getItem('cart')){
  
    cart= JSON.parse(window.localStorage.getItem('cart'))
    //console.log(product[2].name)
   }




continuous()
// added item show from cart array

function continuous(){
  
if(cart.length){
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
    if( a < b){
        //console.log("success")
        a++
        b--
        cart[i].orderQuantity = a
        cart[i].availableQuantity = b

        window.localStorage.setItem('cart',JSON.stringify(cart))
        // $('#productinfo').empty();
        // $('#productinfo').append($('<th>Product</th>'), $('<th>Unit price</th>'), $('<th>Quantity</th>'), $('<th>Total price</th>'))                
        // continuous()
        location.reload();
        }
        else{
           alert("Sorry. stock over")
        }
    
       
}








// reduce item for + button press in cart
function decrease(i){
    //console.log(i)
    let a = parseInt(cart[i].orderQuantity)
    let b = parseInt(cart[i].availableQuantity)
    if( a<=b && a>0){
        a--
        b++
    cart[i].orderQuantity = a
    cart[i].availableQuantity = b
    window.localStorage.setItem('cart',JSON.stringify(cart))
    }
    else{
       // console.log(a)
        a--
        cart[i].orderQuantity = a
        cart.splice(i,1)
        window.localStorage.setItem('cart',JSON.stringify(cart))
    }

    // $('#productinfo').empty();
    // $('#productinfo').append($('<th>Product</th>'), $('<th>Unit price</th>'), $('<th>Quantity</th>'), $('<th>Total price</th>'))                              
    // continuous()
    location.reload();
    let details = document.getElementsByTagName('tr')
    //console.log(details[1].innerHTML)
//     for(let i=0; i<cart.length; i++){

//     if(cart[0].quantity != 0){
//        // console.log(cart.length)
//         let quantityUnit = document.getElementsByClassName("quantity")[0]
//         //console.log(arr[0]+","+arr[1])
//         cart[i].quantity--
//         quantityUnit.innerHTML = cart[i].quantity+" pc"

//     }
//     else{
//         alert("no item in the cart")
//     }
// }
}


// confirm button
function confirm(){
    console.log(cart)
    if(cart.length > 0){
    alert("delivery successfull")
    localStorage.removeItem('cart')
    cart = null
    location.reload();
    }
    else{
        alert("no item in your cart")
    }
}

// cancel button

function cancelrr(){
   
   // cart = null
   if(cart.length > 0){
    localStorage.removeItem('cart')
   // console.log("cancel")
    //window.localStorage.setItem('cart',JSON.stringify(cart))
    cart = null
    location.reload();
    }else{
    alert("no item in your cart")
    }

}
