import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import RalliButton from "@/components/button/RalliButton";
import TextInput from "@/components/input/TextInput";
import apiInstance from "@/services/apiService/apiServiceInstance";
import { CHANGE_PASSWORD } from "@/services/apiService/apiEndPoints";
import { Toast } from "@/components/Toast/Toast";

const ChangePassword = ({ handleClose }) => {
  const [CurrentPassword, setCurrentPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onUpdate = async () => {
    const formData = new FormData();
    formData.append("current_password", CurrentPassword);
    formData.append("password", NewPassword);
    formData.append("password_confirmation", ConfirmPassword);

    try {
      const response = await apiInstance.post(CHANGE_PASSWORD, formData);
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        Toast("success", response.data.message);
        setCurrentPassword("");
        setConfirmPassword("");
        setNewPassword("");
      }
    } catch (error) {
      Toast(
        "error",
        error.response.data.errors.current_password ||
          error.response.data.errors.password
      );
      console.log(error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: "20px", sm: "22px", md: "30px" },
            lineHeight: "18px",
            color: "#00305B",
            py: 2,
            pb: 3,
          }}
        >
          Change Password
        </Typography>
      </Box>
      <Box>
        <TextInput
          type="password"
          Label="Current Password*"
          placeholder="Current Password"
          value={CurrentPassword}
          setValue={setCurrentPassword}
        />
        <TextInput
          type="password"
          Label="New Password"
          placeholder="New Password"
          value={NewPassword}
          setValue={setNewPassword}
        />
        <TextInput
          type="password"
          Label="Confirm Password"
          placeholder="Confirm Password"
          value={ConfirmPassword}
          setValue={setConfirmPassword}
        />
      </Box>
      <Box sx={{ mt: 8 }}>
        <RalliButton label="Update" onClick={onUpdate} />
      </Box>
    </Box>
  );
};

export default ChangePassword;
