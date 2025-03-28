"use client";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useWizard } from "react-use-wizard";
import RalliButton from "@/components/button/RalliButton";
import { enhanceText } from "@/helper/aiEnhanceHelper";
import AddAnotherButton from "./AddAnotherButton";
import Header from "./Header";
import ButtonIndex from "./ButtonIndex";
import FormField from "./FormField";

const Certifications = ({ data, onNext, certifications, states, cities }) => {
  const { nextStep, previousStep } = useWizard();
  const [certification, setCertification] = useState(certifications || []);
  const [enhanceAi, setEnhanceAi] = useState("");
  useEffect(() => {
    if (certifications?.length > 0) {
      setEnhanceAi(certifications[0]?.description || "");
    }
  }, [certifications]);

  const handleEnhanceAi = async (index, description) => {
    try {
      const enhancedText = await enhanceText(description);
      setCertification((prev) =>
        prev.map((job, i) =>
          i === index ? { ...job, description: enhancedText } : job
        )
      );
    } catch (error) {
      console.error("Error enhancing description:", error);
    }
  };

  const handleChange = (index, name, value) => {
    setCertification((prev) =>
      prev.map((form, i) => (i === index ? { ...form, [name]: value } : form))
    );
  };

  const handleAddCertification = () => {
    setCertification((prev) => [...prev, {}]);
  };

  const handleNext = () => {
    onNext(certification);
    nextStep();
  };

  const handleBack = () => {
    previousStep();
  };
  const handleClose = (index) => {
    setCertification((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header
        handleBack={handleBack}
        pages={data?.pages}
        title={data?.title}
      />
      {certification?.map((form, index) => (
        <Box key={index} sx={{ mb: "20px" }}>
          <ButtonIndex label="Certificate" index={index} handleClose={handleClose} />
          {data?.form?.map((item) => (
            <FormField
              key={item.name}
              item={item}
              form={form}
              index={index}
              handleChange={handleChange}
              handleEnhanceAi={handleEnhanceAi}
              states={states}
              cities={cities}
              checkedLabel="Currently Enrolled"
            />
          ))}
        </Box>
      ))}
      <AddAnotherButton onClick={handleAddCertification} label={'Certificate'} />
      <RalliButton label="Save And Continue" onClick={handleNext} />
    </Box>
  );
};

export default Certifications;
