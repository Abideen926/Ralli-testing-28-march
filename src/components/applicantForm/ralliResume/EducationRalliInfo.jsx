"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useWizard } from "react-use-wizard";
import RalliButton from "@/components/button/RalliButton";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCvs } from "@/redux/slices/applicantCv";
import { setEditMode } from "@/redux/slices/editSlice";
import AddAnotherButton from "./AddAnotherButton";
import Header from "./Header";
import ButtonIndex from "./ButtonIndex";
import FormField from "./FormField";

const EducationRalliInfo = ({ data, onNext, educationDetails }) => {
  const { nextStep } = useWizard();
  const router = useRouter();
  const [educationFields, setEducationFields] = useState(
    educationDetails || []
  );
  const dispatch = useDispatch()

  useEffect(() => {
    if (educationDetails) {
      setEducationFields(educationDetails);
    }
  }, [educationDetails]);

  const handleChange = (index, name, value) => {
    setEducationFields((prev) =>
      prev.map((form, i) => (i === index ? { ...form, [name]: value } : form))
    );
  };

  const handleAddEducation = () => {
    setEducationFields((prev) => [...prev, {}]);
  };

  const handleNext = () => {
    onNext(educationFields);
    nextStep();
  };

  const handleClose = (index) => {
    setEducationFields((prev) => prev.filter((_, i) => i !== index));
  };
  const handleBack = () => {
    router.back()
    dispatch(setCvs());
    dispatch(setEditMode(false));
  }

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
      {educationFields?.map((form, index) => (
        <Box key={index} sx={{ mb: "20px" }}>
          <ButtonIndex label="Education" index={index} handleClose={handleClose} />
          {data?.form?.map((item) => (
            <FormField
              key={item.name}
              item={item}
              form={form}
              index={index}
              handleChange={handleChange}
              checkedLabel="Did You Graduate"
            />
          ))}
        </Box>
      ))}
      <AddAnotherButton onClick={handleAddEducation} label={'School'} />
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

export default EducationRalliInfo;
