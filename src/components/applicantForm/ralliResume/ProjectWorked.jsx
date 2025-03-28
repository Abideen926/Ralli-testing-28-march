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

const ProjectWorked = ({ data, onNext, projects }) => {
  const { nextStep, previousStep } = useWizard();
  const [project, setProject] = useState(projects || []);
  const [enhanceAi, setEnhanceAi] = useState("");

  useEffect(() => {
    if (projects?.length > 0) {
      setEnhanceAi(projects[0]?.description || "");
    }
  }, [projects]);
  const handleEnhanceAi = async (index, description) => {
    try {
      const enhancedText = await enhanceText(description);
      setProject((prev) =>
        prev.map((job, i) =>
          i === index ? { ...job, description: enhancedText } : job
        )
      );
    } catch (error) {
      console.error("Error enhancing description:", error);
    }
  };

  const handleChange = (index, name, value) => {
    setProject((prev) =>
      prev.map((form, i) => (i === index ? { ...form, [name]: value } : form))
    );
  };

  const handleAddProjects = () => {
    setProject((prev) => [...prev, {}]);
  };

  const handleNext = () => {
    onNext(project);
    nextStep();
  };

  const handleBack = () => {
    previousStep();
  };
  const handleClose = (index) => {
    setProject((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box
      sx={{
        width: "auto",
        minHeight: "100vh",
      }}
    >
      <Header
        handleBack={handleBack}
        pages={data?.pages}
        title={data?.title}
      />
      {project.map((form, index) => (
        <Box key={index} sx={{ mb: "20px" }}>
          <ButtonIndex label="Project" index={index} handleClose={handleClose} />
           {data?.form?.map((item) => (
            <FormField
              key={item.name}
              item={item}
              form={form}
              index={index}
              handleChange={handleChange}
              handleEnhanceAi={handleEnhanceAi}
            />
          ))}
        </Box>
      ))}
      <AddAnotherButton onClick={handleAddProjects} label={'Projects'} />
      <Box
        sx={{
          pt: 2,
        }}
      >
        <RalliButton label="Save And Continue" onClick={handleNext} />
      </Box>
    </Box>
  );
};

export default ProjectWorked;
