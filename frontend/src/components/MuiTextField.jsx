/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";

const MuiTextField = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  type = "text",
  fullWidth = true,
  placeholder,
  ...props
}) => {
  return (
    <TextField
      id={id}
      name={name}
      label={label}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      {...props}
    />
  );
};

export default MuiTextField;
