import React, { useState , useCallback, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Passgenerator() {
   
    const [length, setlength] = useState(8);
    const [addNumber, setaddNumber] = useState(false);
    const [addChar, setaddchar] = useState(false);
    const [password, setpassword] = useState("");
  
    const Passwordgenerator = useCallback(() => {
    let pass = "";
    let String = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(addNumber){
        String += "0123456789";
    }
    if(addChar){
        String += "!@#$%^&*_+-="
    }

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * String.length + 1)

      pass += String.charAt(char);
    }
    
    setpassword(pass);
  
    }, [length, addNumber, addChar, setpassword])
  
    useEffect(()=>{
      
      Passwordgenerator();

    },[length,addChar,addNumber])
 
    const passwordref = useRef(null)
    const copyToclipbord = useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(password);
    },[password])
  
  return (
    <div className="container mt-5 p-4 bg-dark text-light rounded">
  <div className="mb-3">
    <div className="input-group">
      <input 
        type="text" 
        className="form-control" 
        placeholder="Generated Password" 
        aria-label="Generated Password" 
        value={password}  
        readOnly 
        ref={passwordref}
      />
      <div className="input-group-append">
        <button className="btn btn-outline-primary" type="button" onClick={copyToclipbord()}>
          Copy
        </button>
      </div>
    </div>
  </div>

  <form>
    <div className="form-group">
      <label htmlFor="formPasswordLength">Password Length {length}</label>
      <input 
        type="range" 
        className="form-control-range" 
        id="formPasswordLength" 
        min={8} 
        max={32}
        value={length} 
        onChange={(e) => {setlength(e.target.value)}}
      />
    </div>

    <div className="form-check">
      <input 
        className="form-check-input" 
        type="checkbox" 
        id="checkNumbers" 
        defaultChecked={addNumber}
        onChange={()=>{
          setaddNumber((prev) => !prev)
        }}
      />
      <label className="form-check-label" htmlFor="checkNumbers">
        Include Numbers
      </label>
    </div>

    <div className="form-check">
      <input 
        className="form-check-input" 
        type="checkbox" 
        id="checkCharacters" 
        defaultChecked={addChar}
        onChange={()=>{
          setaddchar((prev) => !prev)
        }}
      />
      <label className="form-check-label" htmlFor="checkCharacters">
        Include Special Characters
      </label>
    </div>
  </form>
</div>

  )
}
