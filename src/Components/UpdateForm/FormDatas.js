import React from 'react';
import RadioComponent from '../GetForm/RadioComponent';
import Repeater from '../GetForm/Repeater';

const FormDatas = (props) => {
    const {title, type, required, value, defaults, className, id,options, readonly, repeater} = props;
    return (
        <div className='forms'>
            {type === "radio" ? <RadioComponent options={options} title={title} type ={type} className={className}/> : 
        type==="repeater" ? <Repeater repeater={repeater} title={title} className={className} id={id} /> : 
        (
        <>
        <label htmlFor={title}>{title}</label>
        <input type={type} name={title} className={className} id={id} required={required} readonly={readonly} value={value} default={defaults} />
        </>
        ) }
        </div>
    );
};

export default FormDatas;