import React from "react";
import PhoneInput from "react-phone-number-input";
import { Box } from "@mui/material";
import "react-phone-number-input/style.css";

const PhoneNumberField = ({ placeholder,value, handlePhoneNumberChange }) => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: "5px",
        border: 2,
        borderRadius: "8px",
        fontSize: "16px",
        boxShadow: "0px 0px 3px 1px #00000040",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        fontWeight: 300,
        lineHeight: "18px",

        "&:focus": {
          borderColor: "secondary.main",
        },
        "& .PhoneInputCountry": {
          color: "#222222",
          px: 2,
          borderRight: "2px solid",
          borderColor: "divider",
        },
        "& .PhoneInputInput": {
          border: "none",
          outline: "none",
          flex: 1,
          color: "#222222",
          p: 2,
        },
      }}
    >
       <PhoneInput
        placeholder={placeholder}
        value={value}
        onChange={handlePhoneNumberChange}
        defaultCountry="US"
      />
    </Box>
  );
};

export default PhoneNumberField;
