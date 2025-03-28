"use client";
import React, { useState } from "react";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeft";
import { useWizard } from "react-use-wizard";
import Image from "next/image";
import RalliButton from "../button/RalliButton";
import FormTitle from "../applicant/dashboard/FormTitle";
import PhoneNumberField from "./PhoneNumberField";
import Container from "../common/Container";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  applicantBasicInfoValidationSchema,
  employerBasicInfoValidationSchema,
} from "@/schemas/basicInfo";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const BasicInfo = ({
  data,
  formData,
  onFieldChange,
  countries,
  states,
  cities,
  ethnicities,
  genders,
  dropdownStates,
  handleDropdownChange,
  errors = {},
}) => {
  const { nextStep, previousStep } = useWizard();
  const [validationErrors, setValidationErrors] = useState({});
  const pathName = usePathname();
  const router = useRouter();
  const mergedErrors = { ...validationErrors, ...errors };
  const validateForm = async () => {
    try {
      const schema = pathName.includes("/employer")
        ? employerBasicInfoValidationSchema
        : applicantBasicInfoValidationSchema;

      await schema.validate(formData, { abortEarly: false });

      setValidationErrors({});
      return true;
    } catch (validationErrors) {
      console.error(validationErrors.inner, "validationErrors.inner");

      const newErrors = validationErrors.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});

      setValidationErrors(newErrors);
      return false;
    }
  };


  const handleNext = async () => {
    const isValid = await validateForm();
    if (isValid) {
      nextStep();
    }
  };
  const handleBack = () => {
    if (pathName.includes('applicant')) {
      router.push("/applicant/login")
    } else {
      router.push("/employer/login")
    }
  };

  return (
    <Container>
      <Box sx={{ height: "100vh", backgroundColor: "#FFFFFF" }}>
        <Box
          sx={{
            width: { xs: "100%", sm: "50%" },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: "15px",
            mb: "20px",
          }}
        >
          <Button
            onClick={handleBack}
            sx={{ minWidth: 0, p: 0 }}
          >
            <ArrowCircleLeftRoundedIcon
              sx={{ color: "#00305B", fontSize: 32 }}
            />
          </Button>
          <Image src={data?.logo} width={70} height={100} alt="logo" />
        </Box>
        <FormTitle label={data?.title} />

        {data.form.map((item) => (
          <Box key={item?.name || item?.label} sx={{ mb: "10px" }}>
            <Typography sx={{ fontWeight: 600, fontSize: "16px", mb: "3px" }}>
              {item.label}
            </Typography>

            {item.name === "dob" ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["year", "month", "day"]}
                  value={
                    formData[item.name] ? dayjs(formData[item.name]) : null
                  }
                  onChange={(date) =>
                    onFieldChange(
                      item.name,
                      date ? dayjs(date).format("YYYY-MM-DD") : ""
                    )
                  }
                  slotProps={{
                    textField: {
                      placeholder: item.placeHolder,
                      sx: {
                        width: "100%",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 3px 1px #00000040",
                        border: "none",
                        "& input": {
                          color: "#000",
                          padding: "13px 10px",
                          width: "100%",
                          border: "none",
                          outline: "none",
                        },
                        "& input::placeholder": {
                          color: "#00000040",
                          fontSize: "16px",
                          opacity: 1,
                        },
                        "& fieldset": {
                          border: "none !important",
                        },
                        "&:hover": {
                          outline: "none",
                          border: "none",
                        },
                      },
                    },
                  }}
                  sx={{
                    width: "100%",
                    height: "40px",
                    boxShadow: "0px 0px 3px 1px #00000040",
                    "& .MuiOutlinedInput-root": {
                      border: "none !important",
                      outline: "none !important",
                    },
                    "&:hover": {
                      outline: "none",
                      border: "none",
                    },
                  }}
                />
              </LocalizationProvider>
            ) : item.name === "phone" ? (
              <PhoneNumberField
                value={formData[item.name] || ""}
                placeholder={item.placeHolder}
                handlePhoneNumberChange={(value) =>
                  onFieldChange(item.name, value)
                }
              />
            ) : ["country", "state", "city", "ethnicity", "gender"].includes(
              item.name
            ) ? (
              <Select
                value={dropdownStates[item.name] || ""}
                onChange={(e) => {
                  handleDropdownChange(item.name, e.target.value);
                  onFieldChange(item.name, e.target.value);
                }}
                displayEmpty
                fullWidth
                renderValue={(selected) =>
                  selected ? (
                    (item.name === "country"
                      ? countries
                      : item.name === "state"
                        ? states
                        : item.name === "city"
                          ? cities
                          : item.name === "ethnicity"
                            ? ethnicities
                            : genders
                    )?.find((option) => option.id === selected)?.name || selected
                  ) : (
                    <span style={{ color: "#A9A9A9", fontWeight: 300 }}>Select {item.label}</span>
                  )
                }
                sx={{
                  ".MuiOutlinedInput-notchedOutline": { border: "none" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
                  ".css-1u4kwaj-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select": {
                    paddingTop: "15px",
                  },
                  boxShadow: "0px 0px 3px 1px #00000040",
                  width: "100%",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#222222",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <MenuItem value="">
                  <em>Select {item.label}</em>
                </MenuItem>
                {(item.name === "country"
                  ? countries
                  : item.name === "state"
                    ? states
                    : item.name === "city"
                      ? cities
                      : item.name === "ethnicity"
                        ? ethnicities
                        : genders
                )?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>

            ) : (
              <Box
                component="input"
                placeholder={item.placeHolder}
                value={formData[item.name] || ""}
                onChange={(e) => onFieldChange(item.name, e.target.value)}
                sx={{
                  width: "100%",
                  boxShadow: "0px 0px 3px 1px #00000040",
                  border: "none",
                  padding: "18px 20px",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: 300,
                  "&::placeholder": {
                    color: "#A9A9A9",
                    fontSize: "14px",
                    fontWeight: 300,
                  },
                }}
              />
            )}

            {mergedErrors[item.name] && (
              <Typography sx={{ color: "red", fontSize: "12px", mt: "5px" }}>
                {mergedErrors[item.name]}
              </Typography>
            )}
          </Box>
        ))}

        <Box sx={{ py: 2 }}>
          <RalliButton label="Next" onClick={handleNext} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="text" onClick={previousStep}>
            Previous
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default BasicInfo;
