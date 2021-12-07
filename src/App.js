import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState, useRef} from 'react';

function App() {

  const [inputValue , setInputValue] = useState('');
  const [numberList, setNumberList] = useState([0]);
  const [idx, setIdx] = useState(0);

  const inputEl = useRef(null);

  useEffect(()=> {
    inputEl.current.focus();
  })

  const onChangeInputValue = (e) => {
    setInputValue(e.target.value);
  }

  const validateValue = (value) => {
    if (Number.isInteger(Number(value)) && value.indexOf(" ") === -1) return true;
    return false;
  }

  const handleClickCalculation = (e) => {
    const validatedInputValue = validateValue(inputValue) && Number(inputValue);
    let nextValue = parseInt(numberList[idx]);

    // 이상한 input이면 무시
    if(validatedInputValue === false) return;

    e.target.id === 'addButton' && (nextValue += validatedInputValue);
    e.target.id === 'subButton' && (nextValue -= validatedInputValue);

    setNumberList([...numberList.slice(0,idx+1),nextValue]);
    setIdx(idx + 1);
    setInputValue(''); // input 초기화
  }

  return (
    <div className="App">
      <body onload="onload()">
        <div class="container">
          <div id="valuebox" className="counter">{numberList[idx]}</div>
          <input id="inputbox" className="input" value={inputValue} ref={inputEl} onChange={onChangeInputValue} />
          <div class="btnGroup">
            <button id="undoButton" className="btn" disabled={idx <= 0} onClick={ () => {setIdx(idx - 1)}}>Undo</button>
            <button id="addButton" className="btn" onClick={handleClickCalculation}>+</button>
            <button id="subButton" className="btn" onClick={handleClickCalculation}>-</button>
            <button id="redoButton" className="btn" disabled={numberList.length === (idx + 1)} onClick={() => {setIdx(idx + 1)}}>Redo</button>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
