import tesodev from '../assets/tesodev-sm.png'
import { RiArrowLeftLine, RiCloseCircleLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const AddLinkPage = () => {
  const navigate = useNavigate()
  const [name,setName] = useState('')
  const [country,setCountry] = useState('')
  const [city,setCity] = useState('')
  const [email,setEmail] = useState('')
  const [success,setSuccess] = useState(true)
  const [isClose, setIsClose] = useState(true)

  const [nameFocused, setNameFocused] = useState(false)
  const [countryFocused, setCountryFocused] = useState(false)
  const [cityFocused, setCityFocused] = useState(false)
  const [emailFocused, setEmailFocused] = useState(false)


  const handleSubmit = (e) =>{
    e.preventDefault()
    if(name && country && city && email){
      setSuccess(true)
      setIsClose(false)
    }else if(name === ''){
      setSuccess(false)
      setIsClose(false)
    }
  }

  const handleClose = ()=>{
    setIsClose(true)
  }

  return (
    <section className='add-record'>
      <div className="add-record-header">
        <img src={tesodev} alt="tesodev" />
        <div className="back" onClick={() => navigate('/list')}>
          <RiArrowLeftLine size={30} />
          <h3>Return to List Page</h3>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
            <label htmlFor="name">Name Surname</label>
            <input type="text" name='name' id='name' 
            placeholder='Enter name and surname'
            pattern='^[A-Za-z]{4,60}$' 
            value={name}
            onChange={(e)=> setName(e.target.value)}
            onBlur={()=> setNameFocused(true)}
            focused={nameFocused.toString()}
            />
            <span>'only letters, min 4 - max 60 charachters'</span>
        </div>

        <div className="input-container">
            <label htmlFor="country">Country</label>
            <input type="text" name='country' id='country'
             placeholder='Enter a country' 
             pattern='^[A-Za-z]{2,40}$' 
             value={country}
            onChange={(e)=> setCountry(e.target.value)}
            onBlur={()=> setCountryFocused(true)}
            focused={countryFocused.toString()}
             />
            <span>'only letters, min 2 - max 40 charachters'</span>
        </div>

        <div className="input-container">
            <label htmlFor="city">City</label>
            <input type="text" name='city' id='city'
             placeholder='Enter a city' 
             pattern='^[A-Za-z]{2,40}$' 
             value={city}
            onChange={(e)=> setCity(e.target.value)}
            onBlur={()=> setCityFocused(true)}
            focused={cityFocused.toString()}
             />
            <span>'only letters, min 2 - max 40 charachters'</span>
        </div>

        <div className="input-container">
            <label htmlFor="email">Email</label>
            <input type="email" name='email' id='email' placeholder='Enter e-mail (abc@xyz.com)' 
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            onBlur={()=> setEmailFocused(true)}
            focused={emailFocused.toString()}
            />
            <span>'It should be a valid email address'</span>
        </div>

        <button type='submit' className='btn-submit' 
        // disabled={name && country && city && email ? true : false}
        >Add</button>
      </form>

    <div className={isClose ? "modal hidden" : "modal"}>
      <h3>{success ? 'New record successfully added' : 'Error while adding link element'}</h3>
      <div className='modal-info'><span>{success ? 'Success' : 'Error'}</span></div>
      <RiCloseCircleLine className='close-icon' onClick={handleClose}/>
    </div>
    </section>
  )
}

export default AddLinkPage