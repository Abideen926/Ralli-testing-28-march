"use client";
import React, { useEffect, useState } from "react";
import { Wizard } from "react-use-wizard";
import { useRouter } from "next/navigation";

import BasicInfo from "@/components/applicantForm/BasicInfo";
import EducationInfo from "@/components/applicantForm/EducationInfo";
import RegistrationInfo from "@/components/applicantForm/RegistrationInfo";
import {
  BASIC_REGISTRATION,
  COMPANY_REGISTRATION,
  FINAL_REGISTRATION,
} from "@/constant/employer/registrationForm";
import apiInstance from "@/services/apiService/apiServiceInstance";
import {
  CITIES,
  COUNTRIES,
  EMPLOYER_REGISTRATION,
  STATES,
} from "@/services/apiService/apiEndPoints";
import { Toast } from "@/components/Toast/Toast";
import Cookie from "js-cookie";

const Page = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState();
  const [apiErrors, setApiErrors] = useState({});
  const [dropdownStates, setDropdownStates] = useState({
    country: "",
    state: "",
    city: "",
  });

  const handleDropdownChange = (key, value) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [key]: value,
    }));

    setFormData((prevData) => ({
      ...prevData,
      basicInfo: {
        ...prevData.basicInfo,
        [key]: value,
      },
    }));
  };
  const [formData, setFormData] = useState({
    basicInfo: {},
    educationInfo: {},
    registrationInfo: {},
  });

  const router = useRouter();

  const handleFieldChange = (step, fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: {
        ...prevData[step],
        [fieldName]: value,
      },
    }));
  };
  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await apiInstance?.get(COUNTRIES);
        setCountries(response?.data?.data?.countries || []);
      } catch (error) {
        setErrors(error?.response?.data?.message || "Failed to load countries");
      }
    };
    getCountries();
  }, []);

  useEffect(() => {
    if (dropdownStates?.country) {
      const getStates = async (countryId) => {
        try {
          const response = await apiInstance?.get(`${STATES}/${countryId}`);
          console.log(response, "state response");
          setStates(response?.data?.data?.states || []);
        } catch (error) {
          setErrors(error?.response?.data?.message || "Failed to load states");
        }
      };
      getStates(dropdownStates?.country);
    }
  }, [dropdownStates?.country]);

  useEffect(() => {
    if (dropdownStates?.state) {
      const getCities = async (stateId) => {
        try {
          const response = await apiInstance?.get(`${CITIES}/${stateId}`);
          setCities(response?.data?.data?.cities || []);
        } catch (error) {
          setErrors(error?.response?.data?.message || "Failed to load cities");
        }
      };
      getCities(dropdownStates?.state);
    }
  }, [dropdownStates?.state]);

  const handleFinalSubmit = async () => {
    const fullFormData = {
      ...formData.basicInfo,
      ...formData.educationInfo,
      ...formData.registrationInfo,
    };

    try {
      const formDataToSubmit = new FormData();
      Object.entries(fullFormData).forEach(([key, value]) => {
        if (value) formDataToSubmit.append(key, value);
      });

      const response = await apiInstance.post(
        EMPLOYER_REGISTRATION,
        formDataToSubmit,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response?.data?.status === "success") {
        Cookie.set("token", response?.data?.data?.token);
        Cookie.set("isVerified", response?.data?.data?.is_verified);
        Cookie.set("userType", "employer");
        Toast("success", response?.data?.message);
        router.push("/employer/form/emailVerification");
      }
    } catch (error) {
      setApiErrors(error.response?.data?.errors || {});
      Toast("error", error?.response?.data?.message || "Failed to register");
    }
  };

  return (
    <Wizard>
      <RegistrationInfo
        data={FINAL_REGISTRATION}
        formData={formData.registrationInfo}
        onFieldChange={(field, value) =>
          handleFieldChange("registrationInfo", field, value)
        }
        onSubmit={handleFinalSubmit}
        errors={apiErrors}
      />
      <BasicInfo
        data={BASIC_REGISTRATION}
        formData={formData.basicInfo}
        onFieldChange={(field, value) =>
          handleFieldChange("basicInfo", field, value)
        }
        countries={countries}
        states={states}
        cities={cities}
        dropdownStates={dropdownStates}
        handleDropdownChange={handleDropdownChange}
        errors={apiErrors}
      />
        <EducationInfo
          data={COMPANY_REGISTRATION}
          formData={formData.educationInfo}
          onFieldChange={(field, value) =>
            handleFieldChange("educationInfo", field, value)
          }
          onSubmit={handleFinalSubmit}
        />
    </Wizard>
  );
};

export default Page;
