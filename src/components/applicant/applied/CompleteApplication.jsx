"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import AppliedJobs from "../dashboard/AppliedJobs";
import RalliButton from "@/components/button/RalliButton";
import { BorderLinearProgress } from "@/helper/progressbar";
import FormCheckbox from "./FormCheckbox";
import { useSelector } from "react-redux";
import RalliModal from "@/components/Modal/RalliModal";
import { useRouter } from "next/navigation";
import SelectDropdown from "@/components/applicantForm/SelectDropdown";
import TremsOfUse from "@/components/common/tremsAndConditionModal/TremsOfUse";
import BackbuttonWithTitle from "./BackbuttonWithTitle";

const CompleteApplication = ({
  data,
  getAppliedData,
  checkboxStates,
  handleCheckboxChange,
  handleSubmit,
  disability,
  dropdownStates,
  handleDropdownChange,
  formikErrors,
  isDisable,
  agreeTerms,
  setAgreeTerms,
}) => {
  const [inputData, setInputData] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const router = useRouter();
  const handleCloseModal = () => {
    setModalOpen(false);
    router.push("/applicant/career-areas");
  };
  const handleCancel = () => {
    router.push("/applicant/career-areas");
  };

  const handleModal = () => {
    handleCloseModal();
  };
  const getApplied = useSelector((state) => state?.appliedJobs?.appliedData);
  const getUserData = useSelector((state) => state?.auth?.userData);
  const collectData = [
    {
      title: getUserData?.user?.ucn,
      name: "UCN",
    },
    {
      title: getApplied?.requisition_number,
      name: "Req Number",
    },
    {
      title: getApplied?.title,
      name: "Position Title",
    },
    {
      title: getUserData?.user?.gender?.name,
      name: "Gender",
    },
    {
      title: getUserData?.user?.ethnicity?.name,
      name: "Ethnicity",
    },
    {
      title: getApplied?.job_locations?.map((item) => item?.name).join(", "),
      name: "Employment Type",
    },
  ];

  const handleInputChange = (name, value) => {
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: "#FFFFFF",
            pr: "25px",
          }}
        >
          <BackbuttonWithTitle title={data?.title} />
          <Box sx={{ pb: 4 }}>
            <BorderLinearProgress variant="determinate" value={100} />
          </Box>

          {collectData?.map((item) => (
            <Box key={item.name} sx={{ mb: "20px" }}>
              <Typography
                sx={{
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                  fontWeight: 500,
                  lineHeight: {
                    xs: "25px",
                    sm: "30px",
                    md: "24px",
                    lg: "18px",
                  },
                  color: "#222222",
                  mb: "5px",
                }}
              >
                {item?.name}
              </Typography>
              <Typography
                sx={{
                  width: "100%",
                  display: "block",
                  padding: "18px 20px",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: 300,
                  lineHeight: "18px",
                  color: "#222222",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 1px 5px #00000040",
                }}
              >
                {item?.title || "N/A"}
              </Typography>
            </Box>
          ))}
          {/* <CompleteDropdown
                        names={data?.employmentType}
                        label="Employment Type"
                        selectedValue={dropdownStates.employmentType}
                        onChange={(value) => handleDropdownChange('employmentType', value)}
                    /> */}
          <FormCheckbox
            selectedOption={checkboxStates.is_adult}
            handleCheckboxChange={(option) =>
              handleCheckboxChange("is_adult", option)
            }
            label={"Are You 18 Years or Older?"}
          />
          {formikErrors.is_adult && (
            <Typography color="error" sx={{ fontSize: "12px", mt: "5px" }}>
              {formikErrors.is_adult}
            </Typography>
          )}
          <FormCheckbox
            selectedOption={checkboxStates.authorized_to_work}
            handleCheckboxChange={(option) =>
              handleCheckboxChange("authorized_to_work", option)
            }
            label={
              "Are You a US Citizen Authorized to Work in the United States?"
            }
          />
          {formikErrors.authorized_to_work && (
            <Typography color="error" sx={{ fontSize: "12px", mt: "5px" }}>
              {formikErrors.authorized_to_work}
            </Typography>
          )}
          <FormCheckbox
            selectedOption={checkboxStates.have_visa}
            handleCheckboxChange={(option) =>
              handleCheckboxChange("have_visa", option)
            }
            label={
              "Do you have a work Visa or will you require one in the future?"
            }
          />
          {formikErrors.have_visa && (
            <Typography color="error" sx={{ fontSize: "12px", mt: "5px" }}>
              {formikErrors.have_visa}
            </Typography>
          )}
          <FormCheckbox
            selectedOption={checkboxStates.meet_qualifications}
            handleCheckboxChange={(option) =>
              handleCheckboxChange("meet_qualifications", option)
            }
            label={"Do You Meet the Must Have Qualifications?"}
          />
          {formikErrors.meet_qualifications && (
            <Typography color="error" sx={{ fontSize: "12px", mt: "5px" }}>
              {formikErrors.meet_qualifications}
            </Typography>
          )}
          <FormCheckbox
            selectedOption={checkboxStates.meet_educations}
            handleCheckboxChange={(option) =>
              handleCheckboxChange("meet_educations", option)
            }
            label={"Do You Meet the Education Requirements?"}
          />
          {formikErrors.meet_educations && (
            <Typography color="error" sx={{ fontSize: "12px", mt: "5px" }}>
              {formikErrors.meet_educations}
            </Typography>
          )}
          <FormCheckbox
            selectedOption={checkboxStates.have_disability}
            handleCheckboxChange={(option) =>
              handleCheckboxChange("have_disability", option)
            }
            label={"Do You Have a Disability?"}
            NoAnswer={true}
          />
          {checkboxStates.have_disability === "yes" && (
            <SelectDropdown
              disability={disability}
              dropdownStates={dropdownStates}
              handleDropdownChange={handleDropdownChange}
            />
          )}
          {formikErrors.have_disability && (
            <Typography color="error" sx={{ fontSize: "12px", mt: "5px" }}>
              {formikErrors.have_disability}
            </Typography>
          )}
          <FormCheckbox
            selectedOption={checkboxStates.is_veteran}
            handleCheckboxChange={(option) =>
              handleCheckboxChange("is_veteran", option)
            }
            label={"Are you a Veteran?"}
            NoAnswer={true}
          />
          {formikErrors.is_veteran && (
            <Typography color="error" sx={{ fontSize: "12px", mt: "5px" }}>
              {formikErrors.is_veteran}
            </Typography>
          )}
          {isDisable && (
            <Typography color="error" sx={{ fontSize: "12px", mt: "5px" }}>
              You are not eligible for this position
            </Typography>
          )}
          <Box
            sx={{
              pt: 4,
            }}
          >
            <RalliButton
              disableValue={isDisable}
              label="Submit Application"
              onClick={handleSubmit}
            />
          </Box>
          <Box
            sx={{
              py: 2,
              pb: 2,
            }}
          >
            <RalliButton label="Cancel" onClick={handleCancel} bg="#00305B" />
          </Box>
          <TremsOfUse
            error={formikErrors.terms}
            agreeTerms={agreeTerms}
            setAgreeTerms={setAgreeTerms}
          />
        </Grid>
        <RalliModal
          onClick={handleModal}
          open={isModalOpen}
          onClose={handleCloseModal}
          para={
            "Thank you! Your application has been successfully submitted. We’ll review it shortly and keep you updated on the next steps"
          }
          imageSrc={"/assets/images/confirmation.png"}
          buttonLabel="Done"
        />
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: "#FAF9F8",
          }}
        >
          <AppliedJobs data={getAppliedData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompleteApplication;
