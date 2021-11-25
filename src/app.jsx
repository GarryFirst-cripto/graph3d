import React, { useRef, useEffect } from 'react';
import Graph from './graph';
import Selector from './select';

const App = () => {
  const inputEl = useRef(null);
  let dagMode;
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dagMode = Graph(inputEl.current, 'zin');
    window.addEventListener(`resize`, event => {
      dagMode = Graph(inputEl.current, 'zin');
    }, false);
  }, []);

  const onChange = (mode) => {
    dagMode(mode)
  }

  return (
      <>
        <Selector onchange={onChange} />
        <div ref={inputEl} style={{ position: 'absolute', top: '0', left: '0', width: '100vw', height: '100hw' }} />
      </>
  );
}

export default App;
