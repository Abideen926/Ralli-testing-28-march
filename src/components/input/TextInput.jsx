import React, { useState } from "react";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "./TextInput.module.css";
import SendIcon from "@mui/icons-material/Send";

const TextInput = ({
  Label = "",
  placeholder = "",
  type = "text",
  value = "",
  setValue = () => {},
  onSend = () => {},
  ContainerStyle,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.inputContainer} style={ContainerStyle}>
      {Label && <p className={styles.label}>{Label}</p>}
      <div className={styles.inputWrapper}>
        <Input
          className={styles.input}
          placeholder={placeholder}
          disableUnderline={true}
          type={type === "password" && !showPassword ? "password" : "text"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{ fontSize: "15px", color: "black" }}
        />
        {type === "password" && (
          <IconButton
            onClick={handleTogglePasswordVisibility}
            className={styles.iconButton}
            aria-label="toggle password visibility"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        )}
        {type === "send" && (
          <IconButton
            onClick={onSend}
            className={styles.iconButton}
            aria-label="send"
          >
            <SendIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default TextInput;
