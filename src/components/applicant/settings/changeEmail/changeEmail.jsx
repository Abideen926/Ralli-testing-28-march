"use client";
import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import RalliButton from "@/components/button/RalliButton";
import TextInput from "@/components/input/TextInput";
import { useWizard } from "react-use-wizard";
import BackButtonWithTitle from "../../dashboard/BackButtonWithTitle";
import apiInstance from "@/services/apiService/apiServiceInstance";
import { Toast } from "@/components/Toast/Toast";
import { CHANGE_EMAIL } from "@/services/apiService/apiEndPoints";

const ChangeEmail = () => {
  const { nextStep } = useWizard();
  const [Email, setEmail] = useState("");
  const [CurrentPassword, setCurrentPassword] = useState("");

  const onNext = async () => {
    const formData = new FormData();
    formData.append("email", Email);
    formData.append("password", CurrentPassword);

    try {
      const response = await apiInstance.post(CHANGE_EMAIL, formData);
      if (response.status === 200 || response.status === 201) {
        Toast("success", response.data.message);
        nextStep();
      }
    } catch (error) {
      Toast(
        "error",
        error.response.data.errors.email || error.response.data.errors.password
      );

      console.log(error);
    }
  };

  return (
    <Box>
      <BackButtonWithTitle
        label="changing email address"
      />
      <Box sx={{ position: "relative", p: 1.5 }}>
        <TextInput
          Label="New Email Address*"
          placeholder="Enter Email"
          value={Email}
          setValue={setEmail}
        />
        <TextInput
          Label="Current Password*"
          placeholder="Enter Current Password"
          type="password"
          value={CurrentPassword}
          setValue={setCurrentPassword}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 2, p: 1.5 }}>
        <RalliButton label="Next" bg="#00305B" size="large" onClick={onNext} />
        <RalliButton label="Cancel" color="" size="large" />
      </Box>
    </Box>
  );
};

export default ChangeEmail;
