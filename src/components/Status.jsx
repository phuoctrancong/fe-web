import { PropTypes } from "prop-types";
import { Typography } from "@mui/material";
const Status = ({ variant, sx, value, options }) => {
  const s = options.find((item) => item.id === value);
  if (!s) return null;
  return (
    <Typography
      component="span"
      sx={(theme) => ({
        display: "inline-block",
        borderRadius: 1,
        ...(variant === "contained"
          ? {
              p: "0 8px",
              backgroundColor: s?.color,
            }
          : {
              color: s?.color,
            }),
        ...sx,
      })}
    >
      {s?.text || s?.name}
    </Typography>
  );
};

Status.propTypes = {
  value: PropTypes.number,
  options: PropTypes.array,
  variant: PropTypes.oneOf(["contained", "text"]),
  sx: PropTypes.shape(),
  t: PropTypes.func,
};

export default Status;
