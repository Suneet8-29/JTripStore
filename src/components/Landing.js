import React, {useRef, useState} from 'react'
import classes from './Landing.module.css'
import Header from './Header'
import Links from './Links'
// import Logo from '../images/Logo.png'
 
function Landing() {
    const containerRef = useRef('');
    const bar1Ref = useRef('');
    const [active, setActive] = useState('');
    const hamburgerMenuOnClick = () => {
        containerRef.current.classList.toggle('active');
        if (!active) {
            setActive('active');
        }
        else {
            setActive('');
        }
    }

    const setActivation = () => {
        setActive('');
    }

    const renderAnimation1 = () => {
        if (active) {
            return `${classes.bar1} ${classes.changebar1}`
        }
        return classes.bar1;
    }
    
    const renderAnimation2 = () => {
        if (active) {
            return `${classes.bar2} ${classes.changebar2}`
        }
        return classes.bar2;
    }  

    const renderAnimation3 = () => {
        if (active) {
            return `${classes.bar3} ${classes.changebar3}`
        }
        return classes.bar3;
    }  

    return (
        <div ref={containerRef} className={classes.container}>
            <div className={classes.navbar}>
                <div className={classes.menu}>
                    <h3 className={classes.logo} >J<span>Tr!p</span>Store</h3>
                    <div className={classes.hamburger_menu} onClick={hamburgerMenuOnClick}>
                        <div ref={bar1Ref} className={renderAnimation1()} ></div>
                        <div className={renderAnimation2()}></div>
                        <div className={renderAnimation3()}></div>
                     </div>
                </div>     
            </div>
            <Header active={active} setActivation = {setActivation} ></Header>
            <Links active={active} ></Links>
        </div>
    )
}

export default Landing
