import { useState, useCallback,useEffect,useRef} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [length, setLength] = useState(8);
  const [numberallowed, setNumberallowed] = useState(false);
  const [charallowed, setCharallowed] = useState(false);
  const [password, setPassword] = useState("");


  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxwxyz";
    if (numberallowed) str += "0123456789";
    if (charallowed) str += "#$%()@!{}^&~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberallowed, charallowed, setPassword]);

  const copyToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberallowed,charallowed,passwordGenerator])


  return (
    <>
      <div className="w-full max-w-lg mx-auto my-10 shadow-lg rounded-lg px-4 text-orange-500 bg-gray-700">

        <h1 className="text-white text-center my-3 font-medium text-lg">
          Password Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 mb-3 rounded-md font-medium text-lg"
            placeholder="password"
            readOnly
          />
          <button onClick={copyToClipBoard} className="outline-none bg-blue-800 text-white font-medium rounded-md px-3 py-0.5 shrink-0 mb-3 mx-0.5">
            copy
          </button>
        </div>


        <div className="flex text-lg gap-x-2">

          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberallowed}
              id="numberInput"
              className="cursor-pointer"
              onChange={() => {
                setNumberallowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charallowed}
              id="charInput"
              className="cursor-pointer"
              onChange={() => {
                setCharallowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>

        </div>


      </div>

    
    </>
  );
}

export default App;
