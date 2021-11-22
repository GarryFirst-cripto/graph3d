import React, { useRef, useEffect } from 'react';
import Graph from './graph';

const App = () => {
  const inputEl = useRef(null);
  // const [mode, setMode] = useState(true);
  
  // const target = document.getElementById('root');
  // Graph(target);
  
  useEffect(() => {
    Graph(inputEl.current);
    window.addEventListener(`resize`, event => {
      Graph(inputEl.current);
    }, false);
  }, []);

  // const onButtonClick = () => {
  //     // `current` указывает на монтированный элемент текстового поля ввода
  //   // inputEl.current.focus();
  //   Graph(inputEl.current, mode);
  // };
  
  return (
      <>
        <div ref={inputEl} style={{ position: 'absolute', top: '0', left: '0', width: '100vw', height: '100hw' }} />
        {/* <button onClick={onButtonClick}>Фокус</button> */}
      </>
  );
}

export default App;
