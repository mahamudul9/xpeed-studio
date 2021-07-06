import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons'

const MakeRepeater = (props) => {
    const {title, required, type, setWork, onChange, className, id} = props;
    return (
        <div>
            <>
            <label htmlFor={title}>{title}</label>
            <input type={type} name={title} required={required} className={className} id={id} onChange={onChange}/>
            </>
            <FontAwesomeIcon style={{cursor:'pointer'}} icon={faMinusSquare} onClick={()=>setWork(false)}/>
        </div>

    );
};

export default MakeRepeater;