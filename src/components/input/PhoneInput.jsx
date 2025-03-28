import React from "react";
import { MuiTelInput } from "mui-tel-input";
import styles from "./TextInput.module.css";
import { Box } from "@mui/material";

const PhoneInput = ({ Label = "", value = "", setValue = () => {} }) => {
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={styles.inputContainer}>
      <p className={styles.label}>{Label}</p>
      <MuiTelInput
        value={value}
        onChange={handleChange}
        defaultCountry="US"
        color="secondary"
        style={{ color: "black" }}
        inputProps={{ sx: { color: "black" } }}
      />
    </Box>
  );
};

export default PhoneInput;
