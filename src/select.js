import * as React from 'react';
import { Box, MenuItem, FormControl, Select } from '@material-ui/core';

// 'td', 'bu', 'lr', 'rl', 'zout', 'zin', 'radialout', 'radialin', null

export default function Selector(params) {

  const [value, setValue] = React.useState('td');

  const handleChange = (event) => {
    // console.log(event.target.value);
    setValue(event.target.value);
    params.onchange(event.target.value);
  }

  return (
    <Box sx={{ width: '12vw', height: '60px', zIndex: 1, marginTop: 10, marginLeft: 10 }}>
      <FormControl fullWidth variant="outlined" style={{ zIndex: 1 }}>
        <Select
          // labelId="demo-simple-select-label"
          // id="demo-simple-select"
          value={value}
          // label="Graph\u00A0"
          onChange={handleChange}
          style={{ zIndex: 1, color: 'white', backgroundColor: '#444' }}
        >
          <MenuItem value={'td'}>TD</MenuItem>
          <MenuItem value={'bu'}>BU</MenuItem>
          <MenuItem value={'lr'}>Left -to-RightR</MenuItem>
          <MenuItem value={'rl'}>Right-to-Left</MenuItem>
          <MenuItem value={'zout'}>ZOUT</MenuItem>
          <MenuItem value={'zin'}>ZIN</MenuItem>
          <MenuItem value={'radialout'}>ROUT</MenuItem>
          <MenuItem value={'radialin'}>RIN</MenuItem>
          <MenuItem value={'-'}>Nothing</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}