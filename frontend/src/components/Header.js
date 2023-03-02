import styles from './styling/header.module.css'
import {Link} from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { Context } from '../Context/AuthContext'
import axios from 'axios'
function Header(){
    
    const { authenticated, userId, loading} = useContext(Context)
    if(loading){
        return

    }else{
    return(
        

<div className={styles.header}>

    <Link to="/"><h1 className={styles.title}>BandClone</h1></Link>
<ul>
    

    {!authenticated && 
    <>
    <li>
    <Link to="/login">Login</Link>
    </li>
    <li>
    <Link to="/signup">Signup</Link>
    </li>
    </>
    }
    {authenticated && 
    <>
<li>
<div className={styles.dropDown}>

    <Link to={`/user/${userId}`}><img className={styles.profilePic} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"></img></Link>
        <div className={styles.dropDownContent}>
    <Link to={`/user/${userId}`}> Profile </Link>
    <Link to={`/panel`}> User Panel </Link>
    </div>

    </div>
    
</li>
<li>
    <Link to="/logout">Log out</Link>
</li>
</>
}
    </ul>
</div>


)
    }
}

export default Header