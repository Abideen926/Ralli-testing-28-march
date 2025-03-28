"use client";
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import RalliButton from "@/components/button/RalliButton";
import apiInstance from "@/services/apiService/apiServiceInstance";
import { Toast } from "@/components/Toast/Toast";
import { applicantInterviewResponse } from "@/helper/ApplicationActionHelper";

const InterviewDetails = ({ requisitionNumber = '', userType = '', historyData = {} }) => {

  const [item, setItem] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelect = (date) => {
    if(userType !== 'employer' && item?.status === 'pending'){
      setSelectedDate(date);
    }
  };

  const onAccept = async () => {
    if (userType !== 'employer' && historyData?.type === 'interview_invite' && item?.status === 'pending') {
      if(!selectedDate){
        alert("Please Select Any Date for Interview");
        return;
      }
      const formData = new FormData();
      formData.append("type", 'accept');
      formData.append("selected_date", selectedDate);
      const response = await applicantInterviewResponse(item?.id, formData);
      if(response?.data?.status === 'success'){
          window.location.href = window.location.href;
      }
    }
  };

  const onDecline = async () => {
    if (userType !== 'employer' && historyData?.type === 'interview_invite' && item?.status === 'pending') {
      const formData = new FormData();
      formData.append("type", 'decline');
      const response = await applicantInterviewResponse(item?.id, formData);
      if(response?.data?.status === 'success'){
          window.location.href = window.location.href;
      }
    }
  };

  const getInterviewDetails = async () => {
    try {
      const response = await apiInstance.get(`application/${historyData?.history_data?.interview_id}/interview-detail`);
      const interview = response?.data?.data?.interview;
      if(interview){
        setItem(interview);
      }
    } catch (error) {
      Toast("error", error?.response?.data?.message);
      return error?.response;
    }
  }

  useState(()=>{
    getInterviewDetails();
    if(historyData?.history_data?.selected_date){
      setSelectedDate(historyData?.history_data?.selected_date);
    }
  },[historyData?.history_data?.interview_id]);
  

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{ fontWeight: 600, fontSize: "30px", color: "#00305B" }}
        >
          Interview
        </Typography>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "20px",
            color: "#000000",
            textDecoration: "underline",
          }}
        >
         {userType === 'employer' ? `UCN : ${item?.ucn}` : `REQ : ${requisitionNumber}`}
        </Typography>
      </Box>

      <Typography
        sx={{ fontWeight: 400, fontSize: "20px", color: "#111111", py: 2 }}
      >
        {item?.description ?? ""}
      </Typography>

      {(historyData?.type === 'interview_invite' || historyData?.type === 'interview_accept') && (
        item?.dates?.map((date, index) => (
          <Box
            key={index}
            onClick={() => handleSelect(date)}
            sx={{
              maxWidth: "40%",
              boxShadow: "0px 0px 3px #00000040",
              border: "none",
              outline: "none",
              padding: "18px 20px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: 300,
              lineHeight: "18px",
              color: (selectedDate === date) ? "#FFFFFF" : "#222222",
              backgroundColor:
              (selectedDate === date) ? "#00305B" : "#FFFFFF",
              textAlign: "center",
              mx: "auto",
              mb: 2,
              cursor: "pointer",
              transition: "background-color 0.3s, color 0.3s",
            }}
          >
            {date}
          </Box>
        ))
      )}

      <Box sx={{py:2, display: "flex", justifyContent: "space-between"}}>
        <Typography
          sx={{ fontWeight: 400, fontSize: "16px", color: "#111111", py: 2 }}
        >
          Date: { new Date(item?.created_at)?.toDateString() + " " ?? ""}
          {new Date(item?.created_at)?.toLocaleTimeString() ?? ""}
        </Typography>
        <Button
          sx={{
            // minWidth: "112px",
            border: "1px solid #ffff",
            fontSize: "14px",
            color: "#ffff",
            backgroundColor: item?.status === 'accept' ? 'green' : 'red',
          }}
        >
        STATUS: {item?.status?.toUpperCase() || ""}
        </Button>
      </Box>
      {(userType !== 'employer' && item?.status === 'pending') && (
        <>
          <Box sx={{py:2}}>
            <RalliButton
              label="Accept"
              bg="#00305B"
              onClick={onAccept}
            />
          </Box>
          <RalliButton label="Deny" onClick={onDecline} />
        </>
      )}
    </Box>
  );
};

export default InterviewDetails;
