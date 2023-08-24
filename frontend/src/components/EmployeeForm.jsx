import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { HiOutlineArrowRight } from 'react-icons/hi'
import FormInput from './FormInput'
import { AiOutlineClear } from 'react-icons/ai'
import { toast } from 'react-hot-toast'

const EmployeeForm = () => {

  const [formValues, setFormValues] = useState({
    username: '', email: '', title: '', department: '', role: ''
  })

  const isAnyInputFilled = Object.values(formValues).some(value => value !== '');

  const clearAllInputFields = () => {
    setFormValues({
      username: '', email: '', title: '', department: '', role: ''
    });
    toast.success('Inputs Clear')
  }

  const navigate = useNavigate();

  const url = import.meta.env.VITE_APP_BASE_URL;
  // console.log('url --> ', url)


  const sendFormDataToDb = async (e, data) => {
    console.log("This form data is sending to DB -> ", data)
    e.preventDefault();
    toast.dismiss()

    const savedEmpData = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/createUser`,
      // "http://localhost:4000/api/v1/createUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data }),
      }
    );

    toast.success('Employee Entry Created...!')
    console.log("Saved form data to db --> ", savedEmpData);
    navigate('/')
  }

  // saving all input data 
  const onChange = (e) => {
    const { name, value } = e.target;
    // console.log('name = ', name)

    setFormValues((prevValues) => (
      { ...prevValues, [name]: value }
    ));
  };

  // useEffect(() => {
  //   console.log("Your Form Data ==> ", formValues);
  // }, [formValues]);


  // input data 
  const Inputs = [
    {
      id: 'username',
      name: 'username',
      label: 'Employee Name',
      placeholder: 'Enter Your Full Name',
      errorMessage: "Username should be 3-16 characters and shouldn't be include any special character",
      pattern: "^[A-Za-z ]{3,35}$",
      required: true
    },
    {
      id: 'email',
      name: 'email',
      type: 'email',
      label: 'Employee Email Id',
      placeholder: 'Enter Your Email',
      errorMessage: "It should be a valid email address !",
      required: true,
    },
    {
      id: 'title',
      name: 'title',
      label: 'Employee Title',
      placeholder: 'Enter Your Employee Title',
      errorMessage: "Title should be 3-16 characters, only uppercase, lowercase letters are allowed ",
      required: true,
      pattern: "^[A-Za-z ]{3,35}$",
    },
    {
      id: 'department',
      name: 'department',
      label: 'Employee Department',
      placeholder: 'Enter Your Employee Department',
      errorMessage: "Department should be 3-16 characters, only uppercase, lowercase letters are allowed ",
      required: true,
      pattern: "^[A-Za-z ]{3,35}$",
    },
    {
      id: 'role',
      name: 'role',
      label: 'Employee Role',
      placeholder: 'Enter Your Employee Role',
      errorMessage: "Role should be 3-16 characters, only uppercase, lowercase letters are allowed ",
      required: true,
      pattern: "^[A-Za-z ]{3,35}$",
    }
  ]





  return (
    <form onSubmit={(e) => sendFormDataToDb(e, formValues)} className='mt-8 relative' >

      {/* clear inputs button */}
      {
        isAnyInputFilled &&
        <div
          onClick={clearAllInputFields}
          className='absolute -top-4 right-0 cursor-pointer '>
          <AiOutlineClear className='text-white w-7 h-7 hover:text-indigo-600' />
        </div>
      }

      <div className='space-y-5'>

        {/* All Inputs labels and Fields */}
        {Inputs.map((input) => (
          <FormInput key={input.id} {...input} value={formValues[input.name]} onChange={onChange} />
        ))}

        {/* submit button  */}
        <button
          type='submit'
          className='w-full inline-flex items-center justify-center gap-2 text-white font-semibold bg-indigo-700 hover:bg-indigo-600 
                px-3.5 py-2.5 text-base leading-7  rounded-md'>
          Create Employee <HiOutlineArrowRight />
        </button>
      </div>
    </form>
  )
}

export default EmployeeForm