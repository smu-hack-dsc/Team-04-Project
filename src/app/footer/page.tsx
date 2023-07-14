import * as React from 'react'
import { FaFacebookF, FaInstagram, FaPinterest, FaYoutube, FaCopyright} from "react-icons/fa";
export default function Page() {
    const footerStyle = {
        border: '1px solid black',
        fontFamily: 'Lato, sans-serif',
        height: 'fit-content',
        position: 'absolute',
        bottom: '0',
        width: '100%',
        padding: '30px 100px',
        display: 'flex',
        flexDirection: 'row',
    }

    const aboutStyle = {
        alignItems: 'left',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
    }

    const buttonStyle = {
        alignItems: 'left',
        marginBottom: '10px',
        width: 'fit-content',
        textAlign: 'left',
    }

    const customerCareStyle = {
        alignItems: 'left',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '180px',
    }

    const findUsStyle = {
        alignItems: 'left',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '180px',
    }

    const iconButtonStyle = {
        width: 'fit-content',
        height: 'fit-content',
        display: 'flex',
        flexDirection: 'row',
        marginRight: '20px',
        color: '#5A5A5A',
    }

    const newsletterStyle = {
        alignItems: 'left',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '180px',
    }

    const formStyle = {
        // padding: '20px',
    };


    const inputStyle = {
        border: '0.5px solid black',
        padding: '5px 10px ',
        width: '25vh',
        fontSize:'0.75rem'
    }

    const subscribeStyle ={
        textAlign:'center',
        padding:'10px 30px',
        width:'fit-content',
        height:'fit-content',
        border :'1px solid #5A5A5A',
        fontSize: '0.75rem',
        fontWeight:'120',
        marginTop:'15px'
    }

    const copyrightStyle={
        position:'absolute',
        bottom: '0',
        alignItems:'left',
        display:'flex',
        flexDirection:'row',
        fontSize:'0.75rem',
        fontWeight:'100'
        
    }    
    return (
        <div style={footerStyle}>
            <div className='about' style={aboutStyle}>
                <p style={{ color: 'grey', marginBottom: '15px' }}>ABOUT</p>
                <button style={buttonStyle}>About Us</button>
                <button style={buttonStyle}>Contact Us</button>
            </div>
            <div className='customerCare' style={customerCareStyle}>
                <p style={{ color: 'grey', marginBottom: '15px' }}>CUSTOMER CARE</p>
                <button style={buttonStyle}>Terms & Conditions</button>
                <button style={buttonStyle}>Return & Delivery Information</button>
                <button style={buttonStyle}>Track Your Order</button>
                <button style={buttonStyle}>Privacy Policy</button>
            </div>
            <div className='findUs' style={findUsStyle}>
                <p style={{ color: 'grey', marginBottom: '15px' }}>FIND US </p>
                <div className='icons' style={iconButtonStyle} >
                    <button className='facebook' style={iconButtonStyle}>
                        <FaFacebookF />
                    </button>
                    <button className='instagram' style={iconButtonStyle}>
                        <FaInstagram />
                    </button>
                    <button className='pinterest' style={iconButtonStyle}>
                        <FaPinterest />
                    </button>
                    <button className='youtube' style={iconButtonStyle}>
                        <FaYoutube />
                    </button>
                </div>
            </div>
            <div className='newsletter' style={newsletterStyle}>
                <p style={{ color: 'grey', marginBottom: '15px' }}>NEWSLETTER</p>
                <p style={{ color: 'grey', marginBottom: '15px', fontSize: '1rem' }}>Sign up for 10% off your next order*</p>
                <div className='emailInput'>
                    <form className='emailInput' style={formStyle}>
                        <input type="email" id='email' name='email' placeholder='Enter your email address' style={inputStyle} />
                    </form>
                </div>
                <button className='subscribeButton' style={subscribeStyle}>
                    SUBSCRIBE
                </button>
            </div>
        <div className='copyright' style={copyrightStyle}>
            <FaCopyright/> 
            <p style={{marginLeft:'10px'}}>2023 TOTHECLOSET</p>
        </div>
        </div>
    );

}