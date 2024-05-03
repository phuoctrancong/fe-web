import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SORTS } from "common/common";

export default function ProductSort({ current, onchange }) {
  const [value, setValue] = React.useState();
  const handleSortChange = (e) => {
    console.log("🚀 ~ ProductSort ~ current:", current);
    if (onchange) onchange(e.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-helper-label">Sắp xếp</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={current ? current : ""}
          label="Giá"
          onChange={handleSortChange}
        >
          {SORTS.map((e) => (
            <MenuItem key={e.key} value={e.value}>
              {e.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
