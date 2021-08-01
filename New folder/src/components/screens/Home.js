import React,{useEffect,useState} from "react"
const Home = () =>{
    
    const [data,setData]=useState([])
    const [search,setSearch]=useState('')
    useEffect(()=>{
        fetch('/allposts',{
        }).then(res=>res.json())
        .then(result=>{
           //  console.log(result)
            setData(result.Posts)
        })
     },[])
     const filterData=data.filter(data2=>{
         return data2.title.toLowerCase().includes(search.toLowerCase())
     })
    return(
        <div>
        <div className="search">
        <input type="search" placeholder="Search.." onChange={(e)=>setSearch(e.target.value)}></input>
        </div>
        <div className="home">
            {
                filterData.map(item=>{
                    return(
                        <div className="card cards" key={item._id}>
                        <div className="card-image">
                            <img src={item.photo} style={{height:"70%",width:"70%",margin:"auto"}} alt="none"></img>
                        </div>
                        <div className="card-content">
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                        </div>
                        </div>

                )
            })
            } 
        </div>
        </div>
        )
}
export default Home;