import React,{useContext, useEffect,useRef,useState} from "react";
import CountDown from './CountDown'
import CountDownTimer from './CountDownTimer'
import {Link} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'
const AdminPosts = () =>{
    const logomodel = useRef(null)
    const [data,setData]=useState([])
    const [search,setSearch]=useState('')
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch('/adminposts',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            setData(result.Posts)
          //  setLike(result.Posts.likes)
        })
        M.Modal.init(logomodel.current)

     },[])
    const deletePost=(postid)=>{
        console.log(postid)
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
             console.log(result)
             const newData = data.filter(item=>{
                 return item._id !== result._id
             })
             setData(newData)
        })
    }
    const reloadPage=()=> {
        window.location.reload()
      }
    const likePost=(id)=>{
        //console.log(id)
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            //console.log(result)
            reloadPage()
        }).catch(err=>{
            console.log(err)
        })
    }
    const filterData=data.filter(data2=>{
        return data2.postedBy.clgId.toLowerCase().includes(search.toLowerCase())
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
                             {/* <div className="switch" onClick={toggler}>
                                <label>
                                <input type="checkbox"/>
                                {toggle? <span className="lever">ok</span>:<span className="lever">not ok</span>}
                                </label>
                            </div> */}
                            {item.likes.includes(state._id)
                            ?
                            <i className="material-icons"
                             onClick={()=>likePost(item._id)}>visibility</i>
                            :<i className="material-icons"
                            onClick={()=>likePost(item._id)}>visibility_off</i>
                            }
                        <h6>{item.likes.length} approval</h6>
                        <h5>{item.postedBy.clgId}<Link className="material-icons" style={{float:"right"}}
                        onClick={()=>deletePost(item._id)}>delete</Link></h5>
                        {/* <h5>{item.postedBy.clgId}<Link data-target="modal1" className="large material-icons modal-trigger" style={{float:"right"}}>
                            delete34</Link></h5>

                        <div id="modal1" className="modal" ref={logomodel} style={{color:"black",alignItems:"center"}}>
                            <div className="modal-content">
                                <h4>You are Sure</h4>
                                <p>{item.title}</p>
                                </div>
                                <div className="modal-footer">
                                <a  className="modal-close waves-effect waves-green btn-flat" onClick={()=>deletePost(item._id)}>Yes</a>
                                <a  className="modal-close waves-effect waves-green btn-flat">No</a>
                                </div>
                                </div>

 */}

                        <div className="card-image">
                            <img src={item.photo} style={{height:"50%",width:"70%",margin:"auto"}} alt="none"></img>
                    </div>
                    <div className="card-content">
                        <h6>{item.title}</h6>
                        <p>{item.body}</p>
                     <p><CountDownTimer timer={item.time}></CountDownTimer></p>
                    </div>
                </div>
                )
            })
            } 
        </div>
        </div>
        )
}
export default AdminPosts;