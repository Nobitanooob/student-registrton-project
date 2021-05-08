// to be done later
import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ClearTwoToneIcon from '@material-ui/icons/ClearTwoTone';
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import Chip from '@material-ui/core/Chip';


export default function PendingReg() {
  
  const [user, setUser] = useState('');

  const handleUser = () => {
    axios.get('/allReg')
      .then(data => {
        console.log(data.data.reg)
        setUser(data.data.reg);
      });
  }

  useEffect(() => {
    handleUser();
  }, []);

  const handleVerified = (formId) => {
    console.log(formId)
    axios.post(`/student/status?id=${formId}&value=verified`)
      .then(res => {
        handleUser();
      })
  }
  const handleRejected = (formId) => {
    console.log(formId)
    axios.post(`/student/status?id=${formId}&value=rejected`)
      .then(res => {
        console.log(res)
        handleUser();
      })
    return;
  }



  if (!user)
  {
    return <div>No user found!!</div>
  }

  const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'department', headerName: 'Department', width: 130},
    { field: 'type', headerName: 'User Type', width: 130 },
    { field: 'status', headerName: 'Verification Status',hide: true },
    {
      field: 'file', headerName: 'Form', width: 130,filterable: false,
      renderCell: (params) => (
        <a target='_blank' href={params.value} rel="noopener noreferrer" >Form</a>
        // <Link to={params.value}>{params.value} </Link>
      )
    },
    {
      field: 'display', headerName: 'Verification Status', width: 200 ,align : 'center', filterable: false,
      renderCell: (params) => (
        <strong>
          {params.value.isVerified === 'pending' && 
            <>
             <FormControlLabel
              control={<Checkbox icon={<CheckTwoToneIcon style={{ color: green[200] }} />}
                checkedIcon={<CheckTwoToneIcon
                  style={{ color: green[800] }} />}
                onClick={() => handleVerified(params.value._id)}
                name = "pending"
              />}
           />
            <FormControlLabel
              control={<Checkbox icon={<ClearTwoToneIcon
                style={{ color: red[200] }} />}
                checkedIcon={<ClearTwoToneIcon style={{ color: red[800] }} />}
                onClick={() => handleRejected(params.value._id)}
                name = "pending"
              />}
            />
            </>
          }
          {params.value.isVerified === 'verified' &&
            <Chip
                label={params.value.isVerified + "!!"}
                style={{ color: green[600] }}
                variant="outlined"
            />
          }
           {params.value.isVerified === 'rejected' &&
            <Chip
                label={params.value.isVerified + "!!"}
                style={{ color: red[600] }}
                variant="outlined"
            />
          }
        </strong>
      )
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
      display: data,
      status: data.isVerified
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

  