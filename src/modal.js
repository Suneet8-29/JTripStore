import React from 'react'
import ReactDOM from 'react-dom'
import classes from './modal.module.css'
 
const Modal = (props) => {

    const renderModal = () => {
        if (props.tab === '360Image') {
            return classes.imp;
        }
        return classes.imgContainer;
    }

    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className='ui dimmer modals visible active'>
            <div onClick={e => e.stopPropagation()} className={`mod ui modal visible active 
            
            ${renderModal()}

            `}>
                
                {
                    props.tab === '360Image' ?
                        <iframe  
                        className={classes.box}
                        src={`https://${props.src}`}
                        frameBorder="0" title='cool' width="700" height="440">                            
                    </iframe>                          
                    :
                    <img className={classes.img} src={props.src} alt='cool'></img>
                }
                <div className='header'>UPLOADED BY - {props.title}
                    {/* Download option to be generated */}
                </div>               
            </div>
        </div>,
        document.querySelector('#modal')
    )
}

export default Modal
