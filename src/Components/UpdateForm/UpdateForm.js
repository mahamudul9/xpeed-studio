import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormDatas from './FormDatas';

const UpdateForm = () => {
    let{id} = useParams();
    const [formData, setFormData]= useState([]);
    useEffect(()=>{
        fetch(`http://localhost/api/get_form.php?id=${id}`)
        .then(res=>res.json())
        .then(data => setFormData(data.data.fields[0]));
    }, [])
    console.log(formData);
    const newFormData = Object.values(formData);
    console.log(newFormData);
    const makeFormData = newFormData.map((data) => {
        return (
            <FormDatas
                title={data.title}
                type={data.type}
                required={data.required}
                validate={data.validate}
                defaults={data.default}
                id={data.html_attr.id}
                className={data.html_attr.class}
                value={data.value}
                options={data.options}
                readonly={data.readonly}
                repeater={data.repeater_fields}
            />
        );
    })
    return (
        <div className='container'>
            <h3 style={{ textAlign: 'center', paddingTop: '30px' }}>Update Form</h3>
            <form name="myForm"                                                                                         >
                {makeFormData}       
            </form>
        </div>
    );
};

export default UpdateForm;