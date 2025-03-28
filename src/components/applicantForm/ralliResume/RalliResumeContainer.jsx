"use client";
import React, { useEffect, useState } from "react";
import {
  ADD_A_CERTIFICATIONS,
  ADD_A_RECENT,
  ADD_SKILLS,
  EDU_INFO_BY_RALLI,
  PROJECT_WORKED,
} from "@/constant/ralliResume";
import { Wizard } from "react-use-wizard";
import EducationRalliInfo from "./EducationRalliInfo";
import AddRecentJobs from "./AddRecentJobs";
import AddSkills from "./AddSkills";
import ProjectWorked from "./ProjectWorked";
import Certifications from "./Certifications";

import apiInstance from "@/services/apiService/apiServiceInstance";
import {
  APPLICANT_BUILD_RESUME,
  APPLICANT_REBUILD_RESUME,
  CITIES,
  STATES,
} from "@/services/apiService/apiEndPoints";
import { Toast } from "@/components/Toast/Toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setEditMode } from "@/redux/slices/editSlice";
import { fetchProfile } from "@/helper/profileApiHelper";

const RalliResumeContainer = ({ id }) => {
  const [profile, setProfile] = useState(null);
  const [wizardData, setWizardData] = useState({
    educationDetails: [{}],
    recentJobs: [{}],
    certifications: [{}],
    projects: [{}],
    skills: [],
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState(null);

  const [dropdownStates, setDropdownStates] = useState({
    state: "",
    city: "",
  });

  const getEditResumes = useSelector(
    (state) => state?.applicantAttachedCv?.attachedCvs
  );
  const isEditing = useSelector((state) => state?.getEdit?.isEditing);
  const handleDataUpdate = (key, newData) => {
    setWizardData((prev) => ({ ...prev, [key]: newData }));
  };
  const router = useRouter();
  const dispatch = useDispatch()

  useEffect(() => {
    const getStates = async () => {
      try {
        const response = await apiInstance?.get(STATES);
        setStates(response?.data?.data?.states || []);
      } catch (error) {
        setErrors(error?.response?.data?.message || "Failed to load countries");
      }
    };
    getStates();
  }, []);

  useEffect(() => {
    const getCities = async () => {
      try {
        const response = await apiInstance?.get(CITIES);
        setCities(response?.data?.data?.cities || []);
      } catch (error) {
        setErrors(error?.response?.data?.message || "Failed to load countries");
      }
    };
    getCities();
  }, []);
  const handleDropdownChange = (key, value) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  useEffect(() => {
    const loadProfile = async () => {
      const userProfile = await fetchProfile();
      setProfile(userProfile);
      setWizardData((prev) => ({
        ...prev,
        educationDetails: userProfile?.educations?.length
          ? userProfile.educations.map((edu) => ({
              grade: edu.grade,
              degree: edu.degree,
              end_date: edu.end_date,
              start_date: edu.start_date,
              field_of_study: edu.field_of_study,
              institution_name: edu.institution_name,
            }))
          : [{}],
      }));
    };
  
    loadProfile();
  }, []);
  

  const ConvertArray = (data) => {
    const cleanedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (Array.isArray(value) && value.every(item => Object.keys(item).length === 0)) {
          return [key, []];
        }
        return [key, value];
      })
    );

    const allFieldsEmpty = Object.values(cleanedData).every(
      (value) => Array.isArray(value) && value.length === 0
    );
  
    return { cleanedData, allFieldsEmpty };
  };
  
  const handleSubmit = async (finalData) => {
    const { cleanedData, allFieldsEmpty } = ConvertArray(finalData);
    if (allFieldsEmpty) {
      Toast("error", "Please add some details to build your Ralli resume.");
      return;
    }
    try {
      let response;
  
      if (isEditing) {
        response = await apiInstance.post(
          `${APPLICANT_REBUILD_RESUME}/${getEditResumes?.id}`,
          cleanedData
        );
      } else {
        response = await apiInstance.post(
          APPLICANT_BUILD_RESUME,
          cleanedData
        );
      }
  
      if (response?.data?.status === "success") {
        Toast("success", response?.data?.message);
        dispatch(setEditMode(false));
        router.push(`/applicant/career-areas/easy-apply/${id}`);
      }
  
      console.log("Resume successfully built:", response.data);
    } catch (error) {
      console.error("Error building resume:", error);
      Toast("error", error?.response?.data?.message || "Failed to apply");
      dispatch(setEditMode(false));
    }
  };
  useEffect(() => {
    if (getEditResumes?.meta_data) {
      setWizardData({
        educationDetails: getEditResumes?.meta_data?.education?.map((edu) => ({
          grade: edu.grade,
          degree: edu.degree,
          end_date: edu.end_date,
          start_date: edu.start_date,
          field_of_study: edu.field_of_study,
          institution_name: edu.institution_name,
        })) || [{}],

        recentJobs: getEditResumes?.meta_data?.experiences?.map((exp) => ({
          city: exp.city,
          type: exp.type,
          state: exp.state,
          title: exp.title,
          company: exp.company,
          end_date: exp.end_date,
          location: exp.location,
          start_date: exp.start_date,
          description: exp.description,
        })) || [{}],

        certifications: getEditResumes?.meta_data?.certifications?.map((cert) => ({
          city: cert.city,
          state: cert.state,
          title: cert.title,
          end_date: cert.end_date,
          location: cert.location,
          start_date: cert.start_date,
          description: cert.description,
          institution_name: cert.institution_name,
        })) || [{}],

        projects: getEditResumes?.meta_data?.projects?.map((proj) => ({
          name: proj.name,
          description: proj.description,
        })) || [{}],

        skills: getEditResumes?.meta_data?.skills || [],
      });
    }
  }, [ getEditResumes]);

  return (
    <Wizard>
      <EducationRalliInfo
        data={EDU_INFO_BY_RALLI}
        onNext={(data) => handleDataUpdate("educationDetails", data)}
        educationDetails={wizardData.educationDetails}
      />
      <AddRecentJobs
        data={ADD_A_RECENT}
        onNext={(data) => handleDataUpdate("recentJobs", data)}
        recentJobs={wizardData.recentJobs}
        states={states}
        cities={cities}
      />
      <Certifications
        data={ADD_A_CERTIFICATIONS}
        onNext={(data) => handleDataUpdate("certifications", data)}
        certifications={wizardData.certifications}
        states={states}
        cities={cities}
      />
      <ProjectWorked
        data={PROJECT_WORKED}
        onNext={(data) => handleDataUpdate("projects", data)}
        projects={wizardData.projects}
      />
      <AddSkills
        data={ADD_SKILLS}
        onNext={(data) => handleDataUpdate("skills", data)}
        skill={wizardData.skills}
        handleSubmit={handleSubmit}
        wizardData={wizardData}
        isEditing={isEditing}
      />
    </Wizard>
  );
};

export default RalliResumeContainer;
