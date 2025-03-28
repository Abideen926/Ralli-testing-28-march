"use client";
import React, { useState } from "react";
import { Box,} from "@mui/material";
import RalliButton from "@/components/button/RalliButton";
import BackButtonWithTitle from "../../dashboard/BackButtonWithTitle";
import { useWizard } from "react-use-wizard";

import TextInput from "@/components/input/TextInput";
import PhoneInput from "@/components/input/PhoneInput";
import apiInstance from "@/services/apiService/apiServiceInstance";
import { CHANGE_PHONE_NUMBER } from "@/services/apiService/apiEndPoints";
import { Toast } from "@/components/Toast/Toast";

const AddNumber = ({profile}) => {
  const { nextStep, previousStep } = useWizard();
  const [Phone, setPhone] = useState("");
  const [Password, setPassword] = useState("");

  const handleNext = async () => {
    if (Phone || Password) {
      try {
        const formData = new FormData();
        formData.append("phone", Phone);
        formData.append("password", Password);
        const response = await apiInstance.post(CHANGE_PHONE_NUMBER, formData);
        if (response.status === 200 || response.status === 201) {
          Toast("success", response?.data?.message);
          nextStep();
        }
      } catch (error) {
        console.error("API Error:", error);
        Toast(
          "error",
          error.response?.data?.errors.password ||
            error.response?.data?.errors.phone
        );
      }
    } else {
      Toast("error", "Please Add Phone Number & Current Password");
    }
  };

  return (
    <Box>
      <BackButtonWithTitle
        label="add and verify your phone number"
      />
      <Box sx={{ marginTop: "65px", marginBottom: "35px" }}>
        <PhoneInput
          Label="Enter Phone Number"
          value={Phone}
          setValue={setPhone}
        />
        {profile?.provider === "manual" && (
        <TextInput
          Label="Current Password*"
          placeholder="Enter New Email"
          value={Password}
          setValue={setPassword}
          type="password"
        />
        )}
      </Box>

      <Box sx={{ display: "flex", gap: "15px" }}>
        <RalliButton label="Next" bg="#00305B" onClick={handleNext} />
        <RalliButton label="Cancel" color="" />
      </Box>
    </Box>
  );
};

export default AddNumber;
