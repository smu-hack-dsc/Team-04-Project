import * as react from 'react'


export default function Page() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: '100px',
    marginLeft: '100px',
    justifyContent: 'space-between',
    fontFamily: 'Lato, sans-serif',
  }

  const titleStyle = {
    textAlign: 'left',
    fontSize: '2rem',
    marginBottom: '30px',

  };

  const sectionStyle = {
    marginTop: '10px',
    border: '1px solid red',
    height: '70vh',
    width: '100vh',
    padding: '40px 40px',
  }
  const bodyStyle1 = {
    textAlign: 'left',
    fontSize: '1.5rem',
    marginBottom: '30px',
  }
  const bodyStyle2 = {
    fontSize: '1rem',
    marginBottom: '40px',
  }

  const bodystyle3 = {
    textAlign: 'left',
    display: 'inline',
    marginLeft: '300px',
  }

  const bodystyle4 = {
    textAlign: 'left',
    display: 'inline',
    marginLeft: '80px',
  }
  const boxStyle = {
    width: '90px', 
    height: '110px',
    border: '1px solid black', 
    backgroundColor: 'transparent',
    marginBottom: '40px',
  };

  const brandStyle = {
    textAlign: 'right',
    fontSize: '1rem',
    marginLeft: '100px',
    fontWeight: 'bold',
  }
  const textStyle2 = {
    textAlign: 'right',
    fontSize: '0.7rem',
    marginLeft: '100px',
    display: 'inline-block',
    whiteSpace: 'noWrap',
  }

  const dropdownStyle ={
    border: '0.5px solid black',
    marginLeft: '60px',
    marginRight: '5px',
    width: '40px',
  }
  const item = (<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
    <div style={boxStyle}>
      <p style={brandStyle}>
        BRAND</p>
      <p style={textStyle2}>
        Item Name Over Here
      </p>
      <p style={textStyle2}>
        Colour: Black
      </p>
      <p style={textStyle2}>
        Size: L
      </p>
      <img src="HEAP IMAGES/image1.png" style={{ width: '100%', height: 'auto' }} />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '100px', marginLeft:'-5px' }}>
      <p style={bodystyle3}>0.00 SGD</p>
      <div style={dropdownStyle}>
        <select name="selectList" id="selectList">
          <option value="option 1">1</option>
          <option value="option 2">2</option>
        </select>
      </div>
      <p style={bodystyle4}>0.00 SGD</p>
    </div>
  </div>
  )

  const orderSummaryStyle = {
    align: 'center',
    border: '1px solid black',
    marginLeft: '10px',
    padding: '30px',
  }
  const container2Style = {
    alignItems: 'center',
    display: 'flex',
    marginTop: '120px',
    marginLeft: '100px', 
    height: '500px',
    width: '500px',
    fontFamily: 'Lato, sans-serif',
  };

  const textStyle3 = {
    fontSize: '1rem',

  }

  const subtotalContainerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const lineStyle = {
    borderTop: '1px solid black',
    margin: '20px 0',
  }

  const line = (
    <div style={lineStyle}>
    </div>
  )
  const buttonStyle = {
    border: '1px solid black',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: '150px', // Set the desired width
    height: '50px', // Set the desired height
    transition: 'background-color 0.3s ease',
  }
  const checkOutButton = (
    <div style={buttonStyle}>
      <button type="button" style={{ backgroundColor: 'transparent', border: 'none', fontWeight: '550' }}>CHECK OUT</button>
    </div>
  )
  return (
    <div style={{ display: 'flex' }}>
      <div className="My Rental Cart" style={containerStyle}>
        <section style={titleStyle}> MY RENTAL CART </section>
        <section className="Item Summary" style={sectionStyle}>
          <h1 style={bodyStyle1}>ITEM SUMMARY</h1>
          <h2 style={bodyStyle2}>Item Details
            <p style={bodystyle3}>Price</p>
            <p style={bodystyle4}>Quantity</p>
            <p style={bodystyle4}>Subtotal</p>
          </h2>
          {item}
          {item}
        </section>
      </div>
      <div className='Order Summary' style={container2Style}>
        <section style={orderSummaryStyle}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '20px', textAlign: 'center' }}>ORDER SUMMARY
          </h1>
          <h2 style={subtotalContainerStyle}>
            <p style={textStyle3}>
              Subtotal
            </p>
            <p style={{ textAlign: 'left', marginLeft: '100px' }}>0.00 SGD</p>
          </h2>
          {line}
          <h3 style={subtotalContainerStyle}>
            <p style={textStyle3}>
              Discount
            </p>
            <p style={{ textAlign: 'left', marginLeft: '87px' }}>- 0.00 SGD</p>
          </h3>
          {line}
          <h4 style={subtotalContainerStyle}>
            <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
              Total
            </p>
            <p style={{ textAlign: 'left', marginLeft: '105px' }}>0.00 SGD</p>
          </h4>
          <h5 style={{ display: 'flex', justifyContent: 'center' }}>
            {checkOutButton}
          </h5>

        </section>
      </div>
    </div>
  );
}