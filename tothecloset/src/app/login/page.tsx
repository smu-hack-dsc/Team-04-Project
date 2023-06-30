import * as react from 'react'
import { FaApple, FaGoogle } from "react-icons/fa";

export default function Page() {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontFamily: 'Lato, sans-serif',
    marginTop: '100px',
  }

  const formStyle = {
    padding: '20px',
  };

  const labelStyle = {
    display: 'flex',
  }

  const inputStyle = {
    border: '0.5px solid black',
    padding: '5px 10px ',
    width: '80vh',
  }

  const checkboxContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '-515px'
  };

  const lineStyle = {
    borderTop: '1px solid black',
    width: '600px',
    margin: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  }
  const line = (
    <div style={lineStyle}> Or log in with
    </div>
  )

  const googleButtonStyle = {
    fontSize: '30px',
  }
  
  const appleButtonStyle = {
    fontSize: '30px',
    marginLeft: '30px',
  }

  // const handleClick = () => {
  //   // Handle button click event here
  //   // Add your logic or action to be performed when the button is clicked
  // };

  const container2Style = {
    display: 'flex',
    alignItems: 'center',
    margin:'10px',
  }
  const resetButtonStyle ={
    textDecoration: 'underline',
    marginLeft: '10px',
  }
  
  const loginButtonStyle ={
    border : '1px solid black',
    padding: '10px',
    width: '150px',
    marginTop:'30px',
  }
  return (

    <div className= 'Title' style={containerStyle}>
      <h1 style={{ fontSize: '2rem' }}>
        LOG IN
      </h1>
      <form className='emailInput' style={formStyle}>
        <label htmlFor='email' style={labelStyle}>Email</label>
        <input type="email"  id='email' name='email' style={inputStyle} />
      </form>
      <form className='passwordInput' style={formStyle}>
        <label htmlFor='password' style={labelStyle}>Password</label>
        <input type="password"  id='password' name='password' style={inputStyle} />
      </form>
      <div style={checkboxContainerStyle}>
        <input type="checkbox" id='rememberMe' name='rememberMe' />
        <label htmlFor='rememberMe' style={{ marginLeft: '10px', fontSize: '0.75rem', fontWeight: '200', color: 'grey' }}>Remember Me</label>
      </div>
      {line}
      <div className='buttons' style={{ display: 'inline' }}>
        <button className='goggleButton' type="button" style={googleButtonStyle}>
        <FaGoogle />
      </button>
        <button className='appleButton' type="button" style={appleButtonStyle}>
          <FaApple />
        </button></div>
      <div className='resetPwd' style={container2Style}> 
        <p> Trouble logging in? </p>
        <button style={resetButtonStyle}> Reset Password </button>
      </div>
      <div className='signUp' style={container2Style}> 
        <p> Don't have an account? </p>
        <button style={resetButtonStyle}> Sign up here </button>
      </div>
      <button className='logInButton' style={loginButtonStyle}> LOG IN </button>
    </div>
  );
}