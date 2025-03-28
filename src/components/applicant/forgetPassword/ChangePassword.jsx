"use client";
import React, { useState } from "react";
import { Box, Typography,  } from "@mui/material";
import RalliButton from "@/components/button/RalliButton";
import TextInput from "@/components/input/TextInput";
import { RESET_PASSWORD } from "@/services/apiService/apiEndPoints";
import apiInstance from "@/services/apiService/apiServiceInstance";
import { Toast } from "@/components/Toast/Toast";

const ChangePassword = ({ Email, token }) => {
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  console.log(token);

  const handleNext = async () => {
    if (NewPassword === "") {
      Toast("error", "Please Enter New Password To Set");
    } else {
      try {
        const formData = new FormData();
        formData.append("email", Email);
        formData.append("token", token);
        formData.append("password", NewPassword);
        formData.append("password_confirmation", NewPassword);

        const response = await apiInstance.post(RESET_PASSWORD, formData);
        console.log(response);
        if (response.status === 200 || response.status === 201) {
          Toast("success", response.data.message);
        }
      } catch (error) {
        console.log(error);
        Toast("error", error);
      }
    }
  };

  return (
    <Box
      sx={{
        px: { md: "80px" },
        py: { md: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Password Recovery
        </Typography>
        <Typography color="textSecondary" mb={3}>
          Set New Password
        </Typography>
      </Box>
      <TextInput
        placeholder="New Password"
        Label="New Password"
        value={NewPassword}
        setValue={setNewPassword}
      />
      <TextInput
        placeholder="Confirm Password"
        Label="Confirm Password"
        value={ConfirmPassword}
        setValue={setConfirmPassword}
      />

      <RalliButton label="Update" onClick={handleNext} />
    </Box>
  );
};

export default ChangePassword;
