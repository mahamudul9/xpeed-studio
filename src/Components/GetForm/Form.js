import React, { useState } from 'react';
import './Form.css'
import RadioComponent from './RadioComponent';
import Repeater from './Repeater';

const Form = (props) => {
    const {title, type, required, className, id, onInputChange, options, readonly, repeater} = props

    return (
        <div className='forms'>
        
        {type === "radio" ? <RadioComponent options={options} title={title} type ={type} className={className} onChange={onInputChange}/> : 
        type==="repeater" ? <Repeater repeater={repeater} title={title} className={className} id={id} onChange={onInputChange}/> : 
        (
        <>
        <label htmlFor={title}>{title}</label>
        <input type={type} name={title} className={className} id={id} required={required} onChange={onInputChange} readonly={readonly} />
        </>
        ) }
            
        </div>
    );
};

export default Form;