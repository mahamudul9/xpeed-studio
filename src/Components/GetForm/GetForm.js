import React, { useEffect, useState } from 'react';
import Form from './Form';
import { useForm } from "react-hook-form";

const GetForm = () => {
    const [data, setData] = useState({});
    const [success,setSuccess] = useState(null);
    const [error,setError] = useState(null);

    const [message, setMessage] = useState('');
    //the create an onInputChange function for the Inputs this way
    const onInputChange = async e => {
        const { name, value } = e.target;
        //check to validate if entry is not a number
        if (isNaN(name)) {
            data[name] = value;
            //somehow update data
            setData({ ...data })
        }
    }

    //submit button work
    const handleSubmit = (e) => {
        console.log("My data:",data);
        fetch('http://localhost/api/submit_form.php',{
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            setSuccess(true);
          })
          .catch((error) => {
            console.error('Error:', error);
            setError(true);
          });
        e.preventDefault();
    }

    useEffect(() => {
        fetch('http://localhost/api/submit_form.php')
        .then(res=>res.json())
        .then(data=>setMessage(data.messages[0]))
    }, [])


    const [formData, setFormData] = useState([]);
    useEffect(() => {
        fetch('http://localhost/api/get_form.php')
            .then(res => res.json())
            .then(data => setFormData(data.data.fields[0]));
    }, [])
    console.log(formData);
    const newFormData = Object.values(formData);
    console.log(newFormData);
    const makeFormData = newFormData.map((data) => {
        return (
            <Form
                title={data.title}
                type={data.type}
                required={data.required}
                id={data.html_attr.id}
                className={data.html_attr.class}   
                onInputChange={onInputChange}
                options={data.options}
                readonly={data.readonly}
                repeater={data.repeater_fields}

            />
        );
    })

    return (
        <div className='container'>
            <h3 style={{ textAlign: 'center', paddingTop: '30px' }}>Get Form</h3>
            <form name="myForm" onSubmit={handleSubmit}                                                                                           >
                {makeFormData}
                <input type="submit" />
                {success && <p style={{color:'green'}}>{message}</p>}
                {error && <p style={{color:'red'}}>You have an error. Data can't be send</p>}
            </form>

            
        </div>
    );
};

export default GetForm;