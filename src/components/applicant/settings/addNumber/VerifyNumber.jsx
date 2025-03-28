"use client";
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import BackButtonWithTitle from "../../dashboard/BackButtonWithTitle";
import { useWizard } from "react-use-wizard";
import TextInput from "@/components/input/TextInput";
import apiInstance from "@/services/apiService/apiServiceInstance";
import { VERIFICATION_SETTING_OTP } from "@/services/apiService/apiEndPoints";
import { Toast } from "@/components/Toast/Toast";
import { useRouter } from "next/navigation";

const VerifyNumber = ({ type }) => {
  const { previousStep } = useWizard();
  const [loading, setLoading] = useState(false);
  const [OTP, setOTP] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("type", type);
      formData.append("otp", OTP);
      const response = await apiInstance.post(
        VERIFICATION_SETTING_OTP,
        formData
      );
      if (response.status === 201 || response.status === 200) {
        setLoading(false);
        router.push("/applicant/settings");
      }
    } catch (error) {
      console.log(error.response?.data?.message);
      Toast("error", error.response?.data?.message);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <BackButtonWithTitle
        label="verify your phone number"
      />
      <Typography
        sx={{
          fontSize: "16px",
          lineHeight: "18px",
          color: "#00305B",
          textTransform: "capitalize",
          textAlign: "center",
          py: 2,
        }}
      >
        verification code sent: enter the code you received below
      </Typography>
      <TextInput
        Label="Enter Verification OTP"
        value={OTP}
        setValue={setOTP}
        placeholder="Enter Verification OTP"
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          mb: 4,
          mt: 2,
          textAlign: "center",
          alignItems: "center",
        }}
      >
        {/* <Box display={"flex"} alignItems={"center"}>
          <Typography
            sx={{
              fontSize: "16px",
              lineHeight: "18px",
              color: "#00305B",
              cursor: "pointer",
            }}
          >
            Dont Receive Your Code?
          </Typography>
          <Button
            sx={{
              fontSize: "16px",
              lineHeight: "18px",
              textDecoration: "underline",
              color: "#00305B",
              cursor: "pointer",
            }}
            onClick={() => console.log("Resend Verification Code")}
          >
            Resend Code
          </Button>
        </Box> */}
        {/* <Typography>send to a different phone number</Typography> */}
      </Box>

      <Button
        type="submit"
        sx={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#FE4D82",
          color: "#FFFFFF",
          fontSize: "16px",
          fontWeight: 600,
          textTransform: "none",
          borderRadius: "10px",
          ":hover": {
            backgroundColor: "#FE4D90",
          },
        }}
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Box>
  );
};

export default VerifyNumber;
