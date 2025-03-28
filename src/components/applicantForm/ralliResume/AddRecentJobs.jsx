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

const AddRecentJobs = ({ data, onNext, recentJobs, states, cities }) => {
  const { nextStep, previousStep } = useWizard();
  const [recentJob, setRecentJob] = useState(recentJobs || []);
  const [enhanceAi, setEnhanceAi] = useState("");

  useEffect(() => {
    if (recentJobs?.length > 0) {
      setEnhanceAi(recentJobs[0]?.description || "");
    }
  }, [recentJobs]);

  const handleEnhanceAi = async (index, description) => {
    try {
      const enhancedText = await enhanceText(description);
      setRecentJob((prev) =>
        prev.map((job, i) =>
          i === index ? { ...job, description: enhancedText } : job
        )
      );
    } catch (error) {
      console.error("Error enhancing description:", error);
    }
  };

  const handleChange = (index, name, value) => {
    setRecentJob((prev) =>
      prev.map((form, i) => (i === index ? { ...form, [name]: value } : form))
    );
  };

  const handleAddJob = () => {
    setRecentJob((prev) => [...prev, {}]);
  };

  const handleNext = () => {
    onNext(recentJob);
    nextStep();
  };

  const handleBack = () => {
    previousStep();
  };

  const handleClose = (index) => {
    setRecentJob((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header
        handleBack={handleBack}
        pages={data?.pages}
        title={data?.title}
      />
      {recentJob?.map((form, index) => (
        <Box key={index} sx={{ mb: "20px" }}>
          <ButtonIndex label="Experience" index={index} handleClose={handleClose} />
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
              checkedLabel="Currently Employed"
            />
          ))}

        </Box>
      ))}
      <AddAnotherButton onClick={handleAddJob} label={'Experience'} />
      <RalliButton label="Save And Continue" onClick={handleNext} />
    </Box>
  );
};

export default AddRecentJobs;
