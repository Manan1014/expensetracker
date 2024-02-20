import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import axios  from 'axios'
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
export default function Creditdebit() {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState('spend'); // Initialize active form state

  const [receiveFields, setReceiveFields] = useState([
    { id: 1, label: 'Source:', type: 'text', name: 'from', required: true },
    { id: 2, label: 'Amount Received:', type: 'number', name: 'amountReceived', required: true },
    { id: 3, label: 'Description:', type: 'textarea', name: 'description', rows: 3 },
  ]);

  // Add extra input field on button click

  const handleFormChange = (newActiveForm) => {
    setActiveForm(newActiveForm);
  };
  const sourceOptions = [
    { value: 'salary', label: 'Salary' },
    { value: 'gift', label: 'Gift' },
    { value: 'refund', label: 'Refund' },
    { value: 'other', label: 'Other' },
  ];
  const handleReceiveInputChange = (e, index) => {
    const updatedFields = [...receiveFields];
    updatedFields[index][e.target.name] = e.target.value;
    setReceiveFields(updatedFields);
  };
  const addReceiveField = () => {
    const newId = receiveFields.length + 1;
    setReceiveFields([...receiveFields, { id: newId, label: `Additional Info ${newId}:`, type: 'text', name: `additionalInfo${newId}` }]);
  };
  const[amount,setamount] = useState("");
  const[category,setcategory] = useState("Food/Dining Out");
  const[description,setdescription] = useState("");
  const user = useSelector((state) => state.username);
  function spend (e){
    //authtoken check
    const item = localStorage.getItem('authToken');
    e.preventDefault();
    console.log(amount+" "+category+ " "+ description );
    if(amount === ""|| category=== ""){
      alert("Please Fill amount and category field")
    }
    else{
      try {
        const data = {
          date : new Date().toISOString(),
          id:user._id,
          amount:parseFloat(amount),
          category,
          description
        }
        axios.post('/debit',data).then((response)=>{
          console.log(response);
          setamount("");
          setcategory("Food/Dining Out");
          setdescription("")
          navigate('/')
            // window.location.reload() ;
        }) 
      } catch (error) {
        console.log(error);
      }
    }
  }

  function receive(e){
    //authtoken check
    const item = localStorage.getItem('authToken');
    e.preventDefault();
    console.log(amount+" "+category+ " "+ description );
    if(amount === ""|| category=== ""){
      alert("Please Fill amount and category field")
    }
    else{
      try {
        const data = {
          date : new Date().toISOString(),
          id:user._id,
          amount:parseFloat(amount),
          category,
          description
        }
        axios.post('/credit',data).then((response)=>{
          console.log(response);
          setamount("");
          setcategory("Salary");
          setdescription("")
          navigate('/')
            // window.location.reload() ;
        }) 
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className="m-5 col-md-8">
      <div className="row justify-content-between">
      <div
          className={
            activeForm === 'spend'
              ? 'col-md-5 d-flex justify-content-center m-2 p-2 border rounded bg-danger active text-white'
              : 'col-md-5 d-flex justify-content-center m-2 p-2 border rounded bg-light hover:bg-danger text-danger'
          }
          onClick={() => handleFormChange('spend')}
        >
          Spend
        </div>
        <div
          className={
            activeForm === 'receive'
              ? 'col-md-5 d-flex justify-content-center m-2 p-2 border rounded bg-success active text-white'
              : 'col-md-5 d-flex justify-content-center m-2 p-2 border rounded bg-light hover:bg-success text-success'
          }
          onClick={() => handleFormChange('receive')}
        >
          Receive
        </div>
      </div>

      {activeForm === 'spend' && (
        <form className="form-group form-spend mt-3" onSubmit={spend}>
          <h3>Spend</h3>
          <label htmlFor="amount">Amount: </label>
          <input type="number" name="amount" id="amount" value={amount} onChange={(e)=>{setamount(e.target.value)}}className="form-control mb-2" /><br />
          <label htmlFor="category">Category: </label>
          <select
            name="category"
            id="category"
            className="form-control mb-2"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="food">Food/Dining Out</option>
            <option value="entertainment">Entertainment/Hobbies</option>
            <option value="transportation">
              Transportation/Commuting to Work/School
            </option>
            <option value="utilities">Utilities/Electricity/Water/Gas/Internet</option>
            <option value="household">Household/Groceries/Cleaning Supplies</option>
            <option value="healthcare">Health Care/Medicine/Prescriptions</option>
            <option value="loan_payment">Loan Payments/Credit Card Billings</option>
            <option value="other">Other Expenses</option>
          </select>
          <small>Select the category of your expense.</small><br />
          <label htmlFor="description">Description: </label>
          <textarea
            name="description"
            rows="4"
            cols="50"
            className="form-control mb-2"
            placeholder="Explain why you are spending this money."
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          ></textarea><br />
          <button type="submit" className="btn btn-danger" style={{ width: '100%' }}>
            Submit Spend
          </button>
        </form>
      )}


{activeForm === 'receive' && (
         <form className="form-group form-spend mt-3" onSubmit={receive}>
         <h3>Spend</h3>
         <label htmlFor="amount">Amount: </label>
         <input type="number" name="amount" id="amount" required className="form-control mb-2" value={amount}onChange={(e)=>{setamount(e.target.value)}} /><br />
         <label htmlFor="category">Category: </label>
         <select name="category" id="category" className="form-control mb-2" value={category} onChange={(e)=>{setcategory(e.target.value)}}>
          {/* TODO: Add options for "cash received", "check deposited", etc. */}
          <option value="salary">Salary</option>
          <option value="Gift">Gift</option> 
          <option value="Cashback">Cashback</option>
          <option value="Deposit">Deposit into Savings Account or Other</option>
         </select>
         <small>Select the category of your expense.</small><br />
         <label htmlFor="description" >Description: </label>
         <textarea
           name="description"
           rows="4"
           cols="50"
           className="form-control mb-2" value={description}
           onChange={(e)=>{setdescription(e.target.value)}}
         ></textarea><br />
         <button type="submit" className="btn btn-success" style={{ width: '100%' }}>
           Submit Receive
         </button>
       </form>
      )}
 
    </div>
  );
}
