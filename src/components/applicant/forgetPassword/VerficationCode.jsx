import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import RalliButton from "@/components/button/RalliButton";
import { useWizard } from "react-use-wizard";
import TextInput from "@/components/input/TextInput";
import { Toast } from "@/components/Toast/Toast";
import { VERIFY_RESET_OTP } from "@/services/apiService/apiEndPoints";
import apiInstance from "@/services/apiService/apiServiceInstance";

const VerficationCode = ({ Email, setToken = () => {} }) => {
  const { nextStep } = useWizard();
  const [OTP, setOTP] = useState("");

  const handleNext = async () => {
    if (OTP === "") {
      Toast("error", "Please Enter OTP Sent On Your Email");
    } else {
      try {
        const formData = new FormData();
        formData.append("email", Email);
        formData.append("otp", OTP);
        const response = await apiInstance.post(VERIFY_RESET_OTP, formData);
        if (response.status === 200 || response.status === 201) {
          setToken(response.data.data.token);
          Toast("success", response.data.message);
          nextStep();
        }
      } catch (error) {
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
          Enter verification code
        </Typography>
      </Box>
      <Box>
        <TextInput
          placeholder="Verification Code "
          value={OTP}
          setValue={setOTP}
          Label={"Enter OTP"}
        />

        <Typography
          sx={{
            fontSize: "16px",
            lineHeight: "18px",
            textDecoration: "underline",
            color: "#00305B",
            cursor: "pointer",
          }}
          // onClick={handleResendCode}
        >
          Resend Code
        </Typography>
        <Box sx={{ py: 2 }}>
          <RalliButton label="Continue" onClick={handleNext} />
        </Box>
      </Box>
    </Box>
  );
};

export default VerficationCode;
