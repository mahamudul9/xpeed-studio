import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './TableList.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TableList = () => {
  const [headerData, setHeaderData] = useState([]); // store table header data
  const [rows, setRows] = useState([]); // store table row data
  const [filterData, setFilterData] = useState([]);
  const [nameOrder, setNameOrder] = useState("asc");


  useEffect(() => {
    getData();
  }, []);

  const getData = async ( ) => {
    const res = await fetch(
      "http://localhost/api/list.php"
    );
    const { data } = await res.json();

    // set table header data
    const headerData = Object.values(data.headers);
    setHeaderData(headerData);
    console.log("Headers",headerData)
    // set row data
    setRows(data.rows);
    console.log(rows);
    setFilterData(data.rows);
  };
  
  const handleClick=()=>{
    const copyRowsData=[...rows];
    if(nameOrder==="asc"){
      copyRowsData.sort((a,b)=>(a.name < b.name ? -1 : 1));
      setFilterData(copyRowsData);
      setNameOrder("desc");
    }
    else if(nameOrder==="desc"){
      copyRowsData.sort((a,b)=>(a.name < b.name ? 1 : -1));
      setFilterData(copyRowsData);
      setNameOrder("");
    }
    else{
      setFilterData(copyRowsData);
      setNameOrder("asc");
    }
    
}

  let tableHead;

  // table head th
  headerData.forEach((data) => {
    tableHead = (
      <>
        <th>{data.id.title}</th>
        <th onClick={handleClick} style={{cursor:'pointer'}}>{data.name.title}</th>
        <th>{data.message.title}</th>
        <th>{data.created_at.title}</th>
      </>
    );
  });

  // table data td
  let tableData = rows.map((data) => {
    return (
      <tr>
        <td><Link to={'/update-form/'+data.id}>{data.id}</Link></td>
        <td>{data.name}</td>
        <td>{data.message}</td>
        <td>{data.created_at}</td>
      </tr>
    );
  });

  const handleChange = (e) => {
    if (e.target.name === 'id') {
      const value = e.target.value;
      const result = rows.filter((data) => data.id.toString().includes(value));
      setFilterData(result);
    }

    if (e.target.name === 'name') {
      const value = e.target.value;
      const result = rows.filter((data) => data.name.toLowerCase().includes(value));
      setFilterData(result);
    }

    if (e.target.name === 'submision') {
      const value = e.target.value;
      const result = rows.filter((data) => data.created_at.toString().includes(value));
      setFilterData(result);
    }
  };

  tableData = filterData.map((data) => {
    return (
      <tr>
        <td><Link style={{color:'black', textDecoration:'none'}} to={'/update-form/'+data.id}>{data.id}</Link></td>
        <td>{data.name}</td>
        <td>{data.message}</td>
        <td>{data.created_at}</td>
      </tr>
    );
  });


  return (
    <div className='container'>
      <h3 style={{ paddingTop: '50px' }}>Table List</h3>
      <input name="id" id="id" type="text" placeholder="Search by ID" onChange={handleChange} /><br />
      <input name="name" type="text" id="name" placeholder="Search by Name" onChange={handleChange} /><br />
      <input name="submision" id="submision" type="text" placeholder="Search by Submision Date" onChange={handleChange} /><br />
          
      <table>
        <thead>
          <tr>{tableHead}</tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
};

export default TableList;