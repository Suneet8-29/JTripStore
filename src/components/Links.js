import React from 'react'
import {Link} from 'react-router-dom'

 import classes from './Links.module.css'

function Links(props) {

    const renderAnimation = () => {
        if (props.active) {
            return classes.linkAnimate;
        }
        return '';
    }

    return (
        <div className={classes.links}>
            <ul>
                <li>
                    <Link className={renderAnimation()} to='/'>Home</Link>
                </li>
                <li>
                    <Link className={renderAnimation()} to='/pictures'>Pictures</Link>
                </li>
                <li>
                    <Link className={renderAnimation()} to='/videos'>Videos</Link>
                </li>
                <li>
                    <Link className={renderAnimation()} to='/360images'>360 Images</Link>
                </li>
                <li>
                    <Link className={renderAnimation()} to='/about'>About</Link>
                </li>
            </ul>
        </div>
    )
}

export default Links
