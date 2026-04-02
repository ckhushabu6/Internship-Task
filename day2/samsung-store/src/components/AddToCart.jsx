 import React from 'react'
 
 function AddToCart() {
    
  [cart ,setCart] = useState([]);


function handleAddToCart(product){
    const exist = cart.find((ele) => ele.id === product.id)
    if(exist){

        const updatedC = 

    }else{
        setCart({...cart , quantaty : 1 })
    }

}
   return (
     <div>AddToCart</div>
   )
 }

 
 export default AddToCart
 
 
 

