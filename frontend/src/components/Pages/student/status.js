import React,{useState , useEffect} from 'react';
import axios from 'axios';

const Status = () => {
  let [isEmpty, setEmpty] = useState(true);
  let [forms, setForms] = useState([]);

  useEffect(() => {
    axios.get(`/student/form/${localStorage.userId}`)
      .then(res => {
        console.log(res.data.forms);
        if (res.data.forms.length !== 0)
        {
          setEmpty(false);
          return res.data.forms;
        }
      })
      .then((data) => {
        setForms(data);
      })
      .catch(Error => {
        console.lof(Error);
      });
  },[])

  return (
    isEmpty ?
      (
        <div>
          <h1>No Registration form to show!!</h1>
        </div>
      )
      :
    <div>
        <h1>Registration Form</h1>
        {forms.map((form) => {
          return <h2>{form.isVerified ? 'true' : 'false'}</h2>
        })
        }
   </div>
    );
    };
     
export default Status;