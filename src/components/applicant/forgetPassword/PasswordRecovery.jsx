import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import RalliButton from "@/components/button/RalliButton";
import { useWizard } from "react-use-wizard";
import TextInput from "@/components/input/TextInput";
import apiInstance from "@/services/apiService/apiServiceInstance";
import { SEND_RESET_OTP } from "@/services/apiService/apiEndPoints";
import { Toast } from "@/components/Toast/Toast";

const PasswordRecovery = ({ setUserEmail = () => {} }) => {
  const [Email, setEmail] = useState("");
  const { nextStep } = useWizard();

  const handleNext = async () => {
    if (Email === "") {
      Toast("error", "Please Enter Email To Reset Your Password");
    } else {
      try {
        const formData = new FormData();
        formData.append("email", Email);

        const response = await apiInstance.post(SEND_RESET_OTP, formData);
        if (response.status === 200 || response.status === 201) {
          setUserEmail(Email);
          Toast("success", response.data.message);
          nextStep();
        }
      } catch (error) {
        Toast("error", error.response.data.message);
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
          Please enter your email to reset your password.
        </Typography>
      </Box>
      <Box>
        <TextInput
          placeholder="Enter Email"
          value={Email}
          setValue={setEmail}
          Label={"Enter Email"}
        />

        <Box sx={{ py: 2 }}>
          <RalliButton label="Continue" onClick={handleNext} />
        </Box>
      </Box>
    </Box>
  );
};

export default PasswordRecovery;
