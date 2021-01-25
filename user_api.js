

function getObject()
{   let product = []
    $.ajax({
       type:'GET',
       url:'/assignment/allProduct',
       async: false,
       success:  setproduct  =(response) =>{
        console.log('product_req')
        
                                 product = JSON.parse(response)
                                 console.log(product.length)
                               
                                },
        error:failureCall => {
                console.log(failureCall);
            } 

    })
    return product
    
}



function startingPage()
{
   
    $.ajax({
       type:'GET',
       url:'/start',
       async: false,
       success:  setproduct  =(response) =>{
        console.log('product_req')
        
                                 
                                 console.log('success')
                               
                                },
        error:failureCall => {
                console.log('failureCall');
            } 

    })
   
   
    
}


function addObject( dataObj)
{    
    $.ajax({
        type:'POST',
        url:'/assignment/allProduct',
        data: dataObj,
        success:  setproduct =>{
                console.log("successCall");
            },
        error:failureCall => {
                console.log("failureCall");
            } 

    })
    
}

function updateProductInfo(id,totalQuantity){
    $.ajax({
        type:'PUT',
        url:'/assignment/allProduct/updated/'+id+'/'+totalQuantity,
        success:  setproduct =>{
                console.log("successCall updated");
            },
        error:failureCall => {
                console.log("failureCall");
            } 

    })

}


function deleteObject(id)
{   
     let URL = '/assignment/'+id

    $.ajax({
        type:'DELETE',
        url:URL,
        data: id,
        
        success:  setproduct =>{
                console.log("successCall");
            },
        error:failureCall => {
                console.log("failureCall");
            } 

    })


    
}
