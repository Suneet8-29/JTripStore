import React, {useRef} from 'react'
import classes from './Pagination.module.css'


const Pagination = ({ images, postsPerPage, currentPage }) => {
    
    const listRef = useRef('');
    const pages = Math.ceil(images / postsPerPage);
    const pageNumbers = [];
    for (var i = 1; i <= pages; i++){
        pageNumbers.push(i);
    }

    
    const btnOnclick = (e, value) => {
        
        currentPage(value);
        console.log(listRef.current);
        e.target.classList.add(classes.btnChange);
    }
     
    return (
        <div className={classes.container}>
            <ul ref={listRef} className={classes.pageBar}>
                {
                    pageNumbers.map(value => (
                         <li  onClick = {(e)=>btnOnclick(e,value)} key={value} >{value}</li>
                    )) 
                }
            </ul> 
        </div>
    )
}

export default Pagination;
