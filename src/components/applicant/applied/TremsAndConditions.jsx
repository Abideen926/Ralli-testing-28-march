"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import RalliButton from "@/components/button/RalliButton";
import { useWizard } from "react-use-wizard";
import BackbuttonWithTitle from "./BackbuttonWithTitle";

const TremsAndConditions = ({ data }) => {
  const { nextStep } = useWizard();
  const handleAccept = () => {
    nextStep();
  };
  return (
    <Box
      sx={{
        minHeight: '100vh'
      }}>
      <BackbuttonWithTitle  title={data?.mainTitle}/>
      <Typography
        sx={{
          fontSize: { xs: "12px", sm: "16px", md: "16px" },
          fontWeight: 500,
          lineHeight: { xs: "25px", sm: "30px", md: "24px", lg: "34px" },
          color: "#00305B",
        }}
      >
        Last updated: {data?.time}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "12px", sm: "14px", md: "16px" },
          fontWeight: 300,
          lineHeight: { xs: "25px", sm: "30px", md: "24px", lg: "34px" },
          color: "#111111",

          pb: 3,
        }}
      >
        {data?.para}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "18px", sm: "21px", md: "22px" },
          fontWeight: 600,
          lineHeight: { xs: "25px", sm: "30px", md: "25px", lg: "18px" },
          color: "#222222",
        }}
      >
        {data?.title}
      </Typography>
      {data?.items?.map((item, index) => (
        <Box key={index}>
          <Typography
            sx={{
              fontSize: { xs: "18px", sm: "21px", md: "19px" },
              fontWeight: 700,
              lineHeight: { xs: "25px", sm: "30px", md: "25px", lg: "28.5px" },
              color: "#00305B",
              pt: 1,
            }}
          >
            {item?.title}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "12px", sm: "14px", md: "16px" },
              fontWeight: 300,
              lineHeight: { xs: "25px", sm: "30px", md: "25px", lg: "34px" },
              color: "#111111",
              pb: 2,
            }}
          >
            {item?.description}
          </Typography>
        </Box>
      ))}
      <RalliButton label={"Accept"} onClick={handleAccept} />
    </Box>
  );
};

export default TremsAndConditions;
