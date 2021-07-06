import React, { useState } from 'react';
import MakeRepeater from './MakeRepeater';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'

const Repeater = (props) => {
    const {repeater, title, className, id, onChange}= props;
    const[work,setWork]=useState(false);
    const newRepeater = Object.values(repeater);
    const makeRepeater = newRepeater.map((data) => {
        return (
            <MakeRepeater
                title={data.title}
                type={data.type}
                required={data.required}  
                setWork={setWork}  
                onChange={onChange} 
                className={className} 
                id={id}
            />
        );
    })

    return (
        <div>
            <label style={{paddingRight:'20px', paddingBottom:'20px'}} htmlFor={title}>{title}</label>
            <FontAwesomeIcon style={{cursor:'pointer'}} icon={faPlusSquare} onClick={()=>setWork(true)}/>
            {work && makeRepeater}
        </div>
    );
};

export default Repeater;