import React,{useState,useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import { UserContext } from '../../App'
const Login = () =>{
    const {state,dispatch} = useContext(UserContext)
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const history=useHistory("")
    const reloadPage=()=> {
        window.location.reload(0)
      }
    const PostData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
         return M.toast({html:"Invalid Email",classes:"#c62828 red darken-3"})
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                 email,
                 password
            })
        })
        .then(res=>res.json())
        .then(data=>{
           // console.log(data)
            if(data.error){
                M.toast({html:data.error,classes:"#c62828 red darken-3"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Login Success",classes:"#43a047 green darken-1"})
                reloadPage()
                history.push("/")
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <div className="my-card">
            <div className="card auth-card input-field">
                <h2>Sign In</h2>
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
                >LOGIN 
                
                </button>
                        
                <h6><Link to="/signup">Don't have an account Signup</Link>
                </h6>
            </div>
        </div>
    )
}
export default Login;