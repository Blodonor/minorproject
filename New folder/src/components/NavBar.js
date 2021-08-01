import React,{useEffect,useRef,useContext, useState} from "react"
import {Link,useHistory} from 'react-router-dom'

import {UserContext} from '../App'
import M from 'materialize-css'
const NavBar = () =>{
    const {state,dispatch} =useContext(UserContext)
    const [sidebar,setSidebar]=useState(false)
    const showSidebar=()=>setSidebar(!sidebar)
    const logoutmodel = useRef(null)
    const history =useHistory()
    useEffect(()=>{
      M.Modal.init(logoutmodel.current,"yes")
   },[])
   const logout=()=>
   {localStorage.clear()
    dispatch({type:"CLEAR"})
    history.push('/signin')}
    const renderList=()=>{
      //  console.log(state)
    //    console.log(state,dispatch)
        if(state){
          if(state.name){
            return [
              <li key="2"><Link to="/newprofile">Profile</Link></li>,
              <li key="3"><Link to="/createpost">Create Post</Link></li>, 
              //<li key="10"><Link to="/newprofile">NewProfile</Link></li>, 
              //<li key="20"><Link to="/bookpost">Book Post</Link></li>,
              //<li key="4"><Link to="/adminposts">Posts</Link></li>,   
              //<li key="8"><Link to="/newprofile/collections">Postsfhsggj</Link></li>,   
              <li key="5">
              <button data-target="modal1" className="btn #c62828 red darken-3 modal-trigger">Logout
             </button>
             </li>
             ]
              }
              else{
                return [
               //   <li key="2"><Link to="/profile">Profile</Link></li>,
                  <li key="3"><Link to="/createpost">Create Post</Link></li>,
                  <li key="10"><Link to="/createnote">CreateNotification</Link></li>,
                 <li key="20"><Link to="/bookpost">Book Post</Link></li>,
                <li key="4"><Link to="/adminposts/jiurjrhwiu54wefr6rq@q2reqwe+fhhgshgs+rfgry7ewrg7">Posts</Link></li>,
                //<li key="8"><Link to="/newprofile/collections">Postsfhsggj</Link></li>,   
                <li key="5">
                <button data-target="modal1" className="btn #c62828 red darken-3 modal-trigger">Logout
               </button>
               </li>
                 ]
              }
        }
        else{
          return [
           <li  key="6"><Link to="/signin">Signin</Link></li>,
           <li  key="7"><Link to="/signup">Signup</Link></li>,
           <li key="12"><Link to="/adminsignin">Admin Login</Link></li>
           ]
        }
    }
    return(
          <nav>
            <div className="nav-wrapper blue">
              <Link to="/" className="brand-logo" style={{margin:"0px 20px"}}>JNTSCMS</Link>
              <ul className="right hide-on-med-and-down">
                  {renderList()}         
              </ul>
            </div>
            <div id="modal1" className="modal" ref={logoutmodel} style={{color:"black",alignItems:"center"}}>
                            <div className="modal-content">
                            <h4>You are Sure</h4>
                            <p>You are trying to logout</p>
                            </div>
                            <div className="modal-footer">
                            <a  className="modal-close waves-effect waves-green btn-flat" onClick={()=>logout()}>Yes</a>
                            <a  className="modal-close waves-effect waves-green btn-flat">No</a>

                            </div>
                        </div>
        </nav>
    )
}
export default NavBar;