import { useState, useContext } from "react";
import "./Sidebar.css";
import { sidebarContext } from "../../context/sidebarContext";
import { useEffect } from "react";


const Sidebar = () => {
    const [activateLinkIdx] = useState(1);
    const [sidebarClass, setSidebarClass ] = useState("");
    const {isSidebarOpen} = useContext(sidebarContext);

    useEffect(() => {
        if(isSidebarOpen) {
            setSidebarClass("sidebar-change");
        } else {
            setSidebarClass("");
        }
    }, [isSidebarOpen]);

    return (
        <div className={`sidebar ${sidebarClass}`}>
            <div className='user-info'>
                <div className='info-img img-fit-cover'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png' alt='user' />
                </div>
                <span className='info-name'>WEB BEAUTY</span>
            </div>
            <hr className="divider"/>
            <nav className='navigation'>
                <ul className='nav-list'>
                    <li className='nav-item'>
                        <a href="#" className='nav-link'>
                            <img className='nav-link-icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png' />
                            <span className='nav-link-text'>Dasboard</span>
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href="#" className='nav-link'>
                            <img className='nav-link-icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png' />
                            <span className='nav-link-text'>Grpahics</span>
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href="#" className='nav-link'>
                            <img className='nav-link-icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png' />
                            <span className='nav-link-text'>Title</span>
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href="#" className='nav-link'>
                            <img className='nav-link-icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png' />
                            <span className='nav-link-text'>Title</span>
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href="#" className='nav-link'>
                            <img className='nav-link-icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png' />
                            <span className='nav-link-text'>Title</span>
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href="#" className='nav-link'>
                            <img className='nav-link-icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png' />
                            <span className='nav-link-text'>Title</span>
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href="#" className='nav-link'>
                            <img className='nav-link-icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png' />
                            <span className='nav-link-text'>Title</span>
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href="#" className='nav-link'>
                            <img className='nav-link-icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png' />
                            <span className='nav-link-text'>Title</span>
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href="#" className='nav-link'>
                            <img className='nav-link-icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png' />
                            <span className='nav-link-text'>Title</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar