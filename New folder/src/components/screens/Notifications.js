import React,{useEffect,useState} from "react"
const Notifications = () =>{
    
    const [data,setData]=useState([])
    useEffect(()=>{
        fetch('/notifications',{
        }).then(res=>res.json())
        .then(result=>{
          //   console.log(result)
            setData(result.Notes)
        })
     },[])
     
    return(
        <div>
        <div className="notification">
            {
                data.map(item=>{
                    return(
                        <div className="card notecards" key={item._id}>
                        <div className="card-content">
                            <h6><b>{item.title}</b></h6>
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
export default Notifications;