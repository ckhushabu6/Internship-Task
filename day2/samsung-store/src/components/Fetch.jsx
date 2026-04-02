import React, { useEffect, useState } from 'react'
import '../index.css';
function Fetch() {
    const [data , setData] = useState([]);
    const [cart ,setCart] = useState([]);
    const [currentPage , setCurrentPge] = useState(
        Number(localStorage.getItem("page")) || 1
    );
    const itemsPerPage = 8 ;
    const startIndex = (currentPage - 1 ) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex , endIndex);

//SAVE PAGE TO lOALsTORAGE (pERSISTENCE)

useEffect(()=>{
    localStorage.setItem("page" , currentPage);
},[currentPage]);

//Add to cart feature
function handleAddToCart(product){
    const exist = cart.find(item => item.id === product.id);
    console.log(product.id)
    console.log(product.title)

    if(exist){

        const updatedCart = cart.map(item => item.id === product.id ?
            {...item, quantity : item.quantity +1 }
            :item
        );
      
        setCart(updatedCart);
    }else{
        setCart([...cart , {...product , quantity : 1}]);
    }
  console.log(updatedCart)
}



// Handel featching 
 async function  handelFetch(){
        let res = await fetch('https://fakestoreapi.com/products');
        let pro = await res.json();
        setData(pro);
        console.log(pro);
    }
    useEffect(()=>{
        handelFetch();
    },[])
  return (
    <div>
        <div>
            <h2>Cart Items</h2>
            {
                cart.map((item , index)=>(
                    <div key={index}>
                        <p>{item.title}</p>
                        <p>Quantity : {item . quantity}</p>
                    </div>
                ))
            }
        </div>
        <h2>Fetching data</h2>
       <div className='container'>
        {
            currentData.map((ele , index)=>(
                <div className= 'card' key={index}>
                    
                    <img src={ele.image}/>
                    <h3>{ele.category}</h3>
                    <p>{ele.description.slice(0 , 60)}...</p>
                    <button onClick={()=> handleAddToCart(ele)}>Add to cart</button>
                </div>

            ))
        }
       </div>

     <div style={{marginTop : "20px", textAlign : "center"}}>
        <button disabled={currentPage === 1}
        onClick={()=>setCurrentPge(currentPage-1)}
        >Prev</button>
        <span style={{margin : "0 10px"}}>
            Page {currentPage}
        </span>

        <button
        disabled={endIndex >= data.length}
        onClick={()=>setCurrentPge(currentPage + 1)}
        >
            Next
        </button>
     </div>
        
        
    </div>

  )
}

export default Fetch