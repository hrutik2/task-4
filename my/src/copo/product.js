import { useEffect, useState } from "react"
import axios from "axios";
export const Product=()=>{
 const [product,setproduct]=useState([])
 const [filter,setfilter]=useState([])
 const [fliterproduct,setfilterproduct]=useState([...product])
 const [categories,setcategories]=useState("")
 const [price,setprice]=useState("")
 const [rating,setrating]=useState("")

 const getdata=()=>{
    axios.get("https://fakestoreapi.com/products")
    .then(res=>{
        console.log(res)
        setproduct(res.data)
    })
    .catch(Error=>{
        console.log(Error)
    })
 }
 const getfilter=()=>{
    axios.get("https://fakestoreapi.com/products/categories")
    .then(res=>{
        console.log(res.data)
        setfilter(res.data)
    })
    .catch(Error=>{
        console.log(Error)
    })
 }
 const applyFilter=()=>{
    let data=[...product]
    if(categories!=""){
        data=data.filter(item=>item.category==categories)
    }
    
    if(price!=""){
     data=data.filter(el=>{
        if(el.price<=price){
            return el
        }
     })
    }
    if(rating!=""){
     data=data.filter(el=>{
        if(el.rating.rate>=rating){
            return el
        }
     })
    }
     setfilterproduct(data)
 }
 useEffect(()=>{
   getdata()
   getfilter()
   
 },[])
 useEffect(()=>{
 applyFilter()
 },[categories,price,rating])
    return(
        <>
        <div style={{display:"flex",width:"100%",padding:"10px"}}>
            <div style={{padding:"10px",width:"30%"}}>
                <h2>filter</h2>
                <div>
                    <h2>filter by categories</h2>
                    <select value={categories} onChange={e=>setcategories(e.target.value)}>
                        <option value="">select by category</option>
                        {filter.map((item,index)=>(
                            <option key={index} value={item}>{item}</option>
                        ))
                       }
                    </select>

                </div>
                <div>
                    <h2>filter by price</h2>
                    <select value={price} onChange={e=>setprice(e.target.value)}>
                        <option value="">select by price range</option>
                        <option value="10">0-10</option>
                        <option value="50">11-50</option>
                        <option value="100">51-100</option>
                        <option value="150">101-150</option>
                        
                    </select>

                </div>
                <div>
                    <h2>filter by rating</h2>
                    <select value={rating} onChange={e=>setrating(e.target.value)}>
                        <option value="">select by rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        
                    </select>

                </div>

            </div>
            <div style={{display:"grid",gap:"20px",gridTemplateColumns:"repeat(3,1fr)",width:"70%",textAlign:"left"}}>
                {fliterproduct.map(el=>
                    <div style={{ padding:"10px",border:"1px solid black",borderRadius:"10px"}}>
                        <img src={el.image} style={{width:"100%",height:"300px",objectFit:"contain"}}></img>
                        <h2>{el.title}</h2>
                        <p>Rating:-{el.rating.rate}</p>
                        <p><b>{el.category}</b></p>
                        <p>{el.description}</p>
                        <h3>${el.price}</h3>

                    </div>
                )}

            </div>

        </div>
        
        
        </>
    )
}