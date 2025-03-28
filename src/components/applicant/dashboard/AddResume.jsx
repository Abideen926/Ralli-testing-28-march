"use client";
import React, { useRef, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import Image from "next/image";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import RalliButton from "@/components/button/RalliButton";
import { useDispatch } from "react-redux";
import { setCvs } from "@/redux/slices/applicantCv";
import { ATTACHED_CV } from "@/services/apiService/apiEndPoints";
import apiInstance from "@/services/apiService/apiServiceInstance";
import { useRouter } from "next/navigation";
import ResumeTab from "../ResumeTab/ResumeTab";

const AddResume = ({ nextStep, onNext, resumes, selectedResume, resumeId, id }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadTime, setUploadTime] = useState(null);
  const [data, setData] = useState(null);

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log("Uploading file:", file);
    setSelectedFile({ file });

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await apiInstance.post(ATTACHED_CV, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("API Response:", response?.data?.data);
      dispatch(setCvs(response?.data?.data));

      setSelectedFile({ file });
      // setUploadTime(new Date());
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      event.target.value = "";
    }
  };
  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  const handleContinue = () => {

    // if (selectedFile) {
    //   onNext()
    // } else {
    //   alert("Please upload a file before continuing.");
    // }
    onNext();
  };

  const handleBack = () => {
    router.back();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleBuildRalliResume = () => {
    router.push(`/applicant/career-areas/job-details/${id}/apply/ralli-resume`);
  };

  return (
    <Box
      sx={{
        // px: "10px",
        my: "60px",
      }}
    >
      <Box sx={{ maxWidth: "100%" }}>
        <Button onClick={handleBack} sx={{ minWidth: 0, p: 0 }}>
          <ArrowCircleLeftRoundedIcon sx={{ color: "#00305B", fontSize: 32 }} />
        </Button>
        <Typography
          sx={{
            fontSize: { xs: "18px", sm: "21px", md: "26px" },
            fontWeight: 600,
            lineHeight: { xs: "20px", sm: "30px", md: "25px", lg: "20px" },
            color: "#111111",
            pt: 3,
          }}
        >
          Add a resume for the employer
        </Typography>

        <ResumeTab
          data={resumes}
          selectedResume={selectedResume}
          resumeId={resumeId}
          appliedJobId={id}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            my: 3,
            maxWidth: "570px",
            py: 2,
          }}
        >
          <Divider sx={{ flexGrow: 1 }} />
          <Typography
            sx={{
              px: 2,
              fontSize: "16px",
              color: "#333333",
              fontWeight: 400,
            }}
          >
            or
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>

        <Box
          sx={{
            maxWidth: "570px",
            boxShadow: "0px 1px 5px #00000040",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            my: 1,
            
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handleBuildRalliResume}
          >
            <Image
              src="/assets/images/pdf.png"
              width={53.09}
              height={65.23}
              alt="img"
            />
            <Box sx={{ px: 2, pt: "10px" }}>
              <Typography
                sx={{
                  fontSize: { xs: "10px", sm: "15px", md: "18px" },
                  fontWeight: 700,
                  lineHeight: {
                    xs: "12px",
                    sm: "30px",
                    md: "25px",
                    lg: "20px",
                  },
                  color: "#111111",
                }}
              >
                Build An Ralli Resume
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "10px", sm: "15px", md: "16px" },
                  fontWeight: 300,
                  lineHeight: {
                    xs: "12px",
                    sm: "20px",
                    md: "25px",
                    lg: "33px",
                  },
                  color: "#111111",
                  py: 0,
                }}
              >
                we will guide you through it, there are only few
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            px: "5px",
            py: 3,
          }}
        >
          <RalliButton label="Continue" onClick={handleContinue} />
        </Box>
      </Box>
    </Box>
  );
};

export default AddResume;
