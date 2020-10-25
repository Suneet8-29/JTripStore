import React, { useRef, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'

import classes from './Header.module.css'
import {signIn} from '../actions' 
import {signOut} from '../actions' 
import {signInCheck} from '../actions' 


function Header(props) {

    const mainRef = useRef('');

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user)
                props.signInCheck({ displayName : user.displayName,
                    photoURL : user.photoURL });
                
            }
            else {
                props.signOut();
            }           
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
 
    const renderAnimation = () => {
        if (props.active) {
            return `${classes.main} ${classes.changeMain}`
        }
        return classes.main;
    }

    const renderMenuAnimation = () => {
        
        mainRef.current.classList.remove(classes.changeMain);
        props.setActivation();
            
    }

    const renderGoogleButton = () => {
        if (props.auth.isSignedIn == null) {
            return <div>Loading...</div>
        }
        else if (props.auth.isSignedIn) {
            return <Fragment>
                <div className={`ui items ${classes.item}`}>
                        <div className="item">
                            <div className="ui tiny image">
                                <img className={classes.imgCard} src={props.auth.photoURL} alt='cool'/>
                            </div>
                            <div style ={{paddingLeft: '0px'}} className="middle aligned content">
                                <div><h3 style ={{padding: '10px', color : 'darkcyan'}}>Welcome {props.auth.userName} !!</h3> </div>
                            </div>
                        </div>
                        </div>
                <br/>
                <br/>
                <div>
                <button className='ui red google button' onClick={() => props.signOut()}>
                    <i className='google icon'/>
                    Sign Out
                </button>
                </div>
        </Fragment>
        }
        else {
           return   <button className='ui green google button' onClick={() => props.signIn()}>
                        <i className='google icon'  />
                        Sign In With Google
                    </button>
        }
    }
    

    return (
        <div  className={classes.main_container}  >
            <div ref={mainRef} className={renderAnimation()} onClick={renderMenuAnimation}>
                <header>
                    <div className={classes.overlay}>
                        <div className={classes.inner}>
                            <h2 className={classes.title}>
                                Capturing Memories!
                            </h2>
                            <p>People don't take trips, trips take people.</p>
                            {renderGoogleButton()}
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}

const mapStateToProps = ({auth}) => {
    return {auth}
}

export default connect(mapStateToProps, {signIn, signInCheck, signOut})(Header)
