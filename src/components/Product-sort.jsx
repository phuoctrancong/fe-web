import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ProductSort({ options, onSort }) {
  const [character, setCharacter] = React.useState(options[0]);
  const handleSort = (newState) => {
    setCharacter(newState);
    onSort(newState);
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-helper-label">Sắp xếp</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={character?.props?.value ? character?.props?.value : ""}
          label="Giá"
          onChange={(event, newValue) => handleSort(newValue)}
        >
          {options.map((e) => (
            <MenuItem key={e.keya} value={e.value}>
              {e.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
