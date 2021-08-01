import React,{useState} from "react";
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const Signup = () =>{
    const history=useHistory()
   const [name,setName]=useState("")
   const [clgId,setClgId]=useState("")
   const [password,setPassword]=useState("")
   const [email,setEmail]=useState("")

   const PostData=()=>{
       if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
       {
        return M.toast({html:"Invalid Email",classes:"#c62828 red darken-3"})
       }
       fetch("/signup",{
           method:"post",
           headers:{
               "Content-type":"application/json"
           },
           body:JSON.stringify({
                name,
                email,
                password,
                clgId
           })
       })
       .then(res=>res.json())
       .then(data=>{
           if(data.error){
               M.toast({html:data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push("/signin")
           }
       }).catch(err=>{
           console.log(err)
       })
   } 

    return(
        <div className="back">
        <div></div>
        <div className="my-card">
            <div className="card auth-card input-field">
                <h2 >Sign Up</h2>
                <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                ></input>
                <input
                type="text"
                placeholder="College Id"
                value={clgId}
                onChange={(e)=>setClgId(e.target.value)}
                ></input>
                <input 
                type="text"
                placeholder="mail id"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                ></input>
                <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                ></input>
                                
                <button className="btn waves-effect waves-light blue" type="submit" name="action"
                onClick={()=>PostData()}
                >SIGNUP
                    <i className="material-icons right">send</i>
                </button>

                <h6><Link to="/signin">Already have an account Login</Link>
                </h6>
            </div>
        </div>
    </div>
    )
}
export default Signup;