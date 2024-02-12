import { Link } from "react-router-dom";
const Navbar = ({children})=>{
    return(
        <nav className="" style={{display:'flex',justifyContent:'space-between'}}>
            <h1>وبلاگ ریداکسی</h1>
            
            <div className="nav-links">
                {children}
            </div>
            <Link to={'/'} className="button" style={{float:'left'}}>وبلاگ</Link>
            <Link to={'/authors'} className="button">نویسندگان وبلاگ</Link>
        </nav>
        
    )
}
export default Navbar;