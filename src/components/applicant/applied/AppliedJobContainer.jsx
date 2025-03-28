"use client";
import React, { useEffect, useState } from "react";
import { Wizard } from "react-use-wizard";
import { useDispatch, useSelector } from "react-redux";
import { TERMS_CONDITIONS } from "@/constant/applicant/termsconditions";
import { ADD_ADDITOIONAL_DOC } from "@/constant/applicant/addAdditionalFile";
import { VARIFY_RESUME } from "@/constant/applicant/varifyResume";
import { COMPLETE_APPLICATION } from "@/constant/applicant/completeApplication";
import ApplyContainer from "../dashboard/ApplyContainer";
import StartApplication from "./StartApplication";
import TremsAndConditions from "./TremsAndConditions";
import AddAdditionalDoc from "./AddAdditionalDoc";
import VerifyResume from "./VerifyResume";
import CompleteApplication from "./CompleteApplication";
import { usePathname, useRouter } from "next/navigation";
import { getResumes } from "@/redux/slices/getResumesSlice";
import apiInstance from "@/services/apiService/apiServiceInstance";
import {
  APPLICANT_APPLY_JOB,
  DISABILITIES,
} from "@/services/apiService/apiEndPoints";
import { completeApplicationCheckboxValidationSchema } from "@/schemas/completeApplication";
import { Toast } from "@/components/Toast/Toast";

const AppliedJobContainer = ({ id }) => {
  const dispatch = useDispatch();
  const [resumeId, setResumeId] = useState();
  const [errors, setErrors] = useState();
  const [disability, setDisability] = useState();
  const [formikErrors, setFormikErrors] = useState({});
  const [isDisable, setIsDisable] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({
    disability: "",
  });
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState({
    is_adult: null,
    authorized_to_work: null,
    have_visa: null,
    meet_qualifications: null,
    meet_educations: null,
    have_disability: null,
    is_veteran: null,
    resume: null,
  });
  const { resumes} = useSelector((state) => state.getResume);

  const pathName = usePathname();
  const router = useRouter();

  const getAppliedData = useSelector(
    (state) => state?.appliedJobs?.appliedData
  );
  const handleNextStepData = (step, data) => {
    setFinalData((prevData) => ({
      ...prevData,
      [step]: data,
    }));
  };

  useEffect(() => {
    if (resumes?.length === 0) {
      dispatch(getResumes());
    }
  }, [dispatch, resumes?.length]);

  const selectedResume = (id) => {
    setResumeId(id);
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      resume: id,
    }));
  };

  const handleCheckboxChange = (key, option) => {
    setCheckboxStates((prevState) => {
      const updatedStates = {
        ...prevState,
        [key]: option,
      };

      const hasNoValue = Object.entries(updatedStates).some(
        ([stateKey, value]) => stateKey !== "have_disability" && value === "no"
      );

      setIsDisable(hasNoValue);
      return updatedStates;
    });
  };

  const validateForm = async () => {
    try {
      await completeApplicationCheckboxValidationSchema.validate(
        checkboxStates,
        { abortEarly: false }
      );
      if (!agreeTerms) {
        throw new Error("You must agree to the terms of use.");
      }
      setFormikErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors = {};
      if (validationErrors.inner) {
        validationErrors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
      } else {
        newErrors.terms = validationErrors.message;
      }
      setFormikErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async () => {
    const isValid = await validateForm();
    if (!isValid) return;
  
    try {
      const formData = new FormData();
  
      Object.entries(checkboxStates).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("disability_id", dropdownStates?.disability || "");
      additionalFiles.forEach((file, index) => {
        formData.append(`documents[${index}]`, file);
      });
      const response = await apiInstance.post(
        `${APPLICANT_APPLY_JOB}/${getAppliedData?.id}/apply`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.status === "success") {
        Toast("success", response?.data?.message);
        router.push("/applicant/career-areas");
      }
    } catch (err) {
      setErrors(err);
      if (err) {
        Toast("error", err?.response?.data?.message);
      }
    }
  };
  
  useEffect(() => {
    const getDisablities = async () => {
      try {
        const response = await apiInstance?.get(DISABILITIES);
        setDisability(response?.data?.data?.disabilities || []);
      } catch (error) {
        setErrors(error?.response?.data?.message || "Failed to load countries");
      }
    };
    getDisablities();
  }, []);

  const handleDropdownChange = (key, value) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return pathName.includes("/job-details") ? (
    <Wizard>
      <ApplyContainer
        onNext={(data) => handleNextStepData("addResume")}
        resumes={resumes}
        selectedResume={selectedResume}
        getAppliedData={getAppliedData}
        resumeId={resumeId}
        id={id}
      />
      <StartApplication
        onNext={(data) => handleNextStepData("startApplication")}
      />
      <TremsAndConditions
        data={TERMS_CONDITIONS}
        onNext={(data) => handleNextStepData("tremsConditions")}
      />
      <AddAdditionalDoc
        getAppliedData={getAppliedData}
        data={ADD_ADDITOIONAL_DOC}
        onNext={(data) => handleNextStepData("tremsConditions")}
        resumes={resumes}
        selectedResume={selectedResume}
        resumeId={resumeId}
        setAdditionalFiles={setAdditionalFiles}
        additionalFiles={additionalFiles}
      />
      <VerifyResume
        getAppliedData={getAppliedData}
        data={VARIFY_RESUME}
        onNext={(data) => handleNextStepData("tremsConditions")}
        resumes={resumes}
        resumeId={resumeId}
      />
      <CompleteApplication
        getAppliedData={getAppliedData}
        data={COMPLETE_APPLICATION}
        onNext={(data) => handleNextStepData("tremsConditions")}
        checkboxStates={checkboxStates}
        handleCheckboxChange={handleCheckboxChange}
        handleSubmit={handleSubmit}
        disability={disability}
        dropdownStates={dropdownStates}
        handleDropdownChange={handleDropdownChange}
        formikErrors={formikErrors}
        isDisable={isDisable}
        agreeTerms={agreeTerms}
        setAgreeTerms={setAgreeTerms}
      />
    </Wizard>
  ) : (
    <Wizard>
      <StartApplication
        onNext={(data) => handleNextStepData("startApplication")}
      />
      <TremsAndConditions
        data={TERMS_CONDITIONS}
        onNext={(data) => handleNextStepData("tremsConditions")}
      />
      <AddAdditionalDoc
        getAppliedData={getAppliedData}
        data={ADD_ADDITOIONAL_DOC}
        onNext={(data) => handleNextStepData("tremsConditions")}
        resumes={resumes}
        selectedResume={selectedResume}
        resumeId={resumeId}
        setAdditionalFiles={setAdditionalFiles}
        additionalFiles={additionalFiles}
      />
      <VerifyResume
        getAppliedData={getAppliedData}
        data={VARIFY_RESUME}
        onNext={(data) => handleNextStepData("tremsConditions")}
        resumes={resumes}
        resumeId={resumeId}
      />
      <CompleteApplication
        getAppliedData={getAppliedData}
        data={COMPLETE_APPLICATION}
        onNext={(data) => handleNextStepData("tremsConditions")}
        checkboxStates={checkboxStates}
        handleCheckboxChange={handleCheckboxChange}
        handleSubmit={handleSubmit}
        disability={disability}
        dropdownStates={dropdownStates}
        handleDropdownChange={handleDropdownChange}
        formikErrors={formikErrors}
        isDisable={isDisable}
        agreeTerms={agreeTerms}
        setAgreeTerms={setAgreeTerms}
      />
    </Wizard>
  );
};

export default AppliedJobContainer;
