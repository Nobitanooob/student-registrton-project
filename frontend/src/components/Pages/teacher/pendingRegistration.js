// to be done later
import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import axios from 'axios';



export default function PendingReg() {
  
  const [user, setUser] = useState('');
  useEffect(() => {
    axios.get('/allReg')
      .then(data => {
        console.log(data.data.reg)
        setUser(data.data.reg);
      })
  }, []);


  if (!user)
  {
    return <div>No user found!!</div>
  }

  const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'department', headerName: 'Department', width: 130},
    { field: 'type', headerName: 'User Type',width: 130 },
    {
      field: 'file', headerName: 'Form', width: 130,
      renderCell: (params) => (
        <a href={params} target="_blank" rel="noreferrer">Form</a>
      )
    },
    {
      field: 'status', headerName: 'Verification Status', width: 200,
    },
  ];
  
  const rows = user.map((data, index) => {
    console.log(data.file);
    return ({
      id: index,
      name: data.userId.name,
      email: data.userId.email,
      department: data.userId.department,
      type: data.userId.type,
      file: data.file,
    })
  });
  

  return (
    // <div>heloo</div>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={rows}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
}

  