import { useHistory } from "react-router-dom"
import React,{useState,useEffect, createContext} from 'react'
import M from 'materialize-css'
const CreateNote = ()=>{
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const postDetails=()=>{
        fetch("/createnote",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
            })
        }).then(res=>res.json())
            .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
               M.toast({html:"Notification Sent",classes:"#43a047 green darken-1"})
               history.push('/')
           }
            }).catch(err=>{
            console.log(err)
            })
        }
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
        <div className="note">
        <div className="card auth-card"
        style={{
            margin:"10px auto",
            maxWidth:"500px",
            padding:"20px"
        }}
        >
            <input 
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}></input>
            <input 
            type="text"
            placeholder="Body"
            value={body}
            onChange={(e)=>setBody(e.target.value)}></input>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>postDetails()}>Sent Notification</button>
        </div>
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
        </div>
    )
}
export default CreateNote;