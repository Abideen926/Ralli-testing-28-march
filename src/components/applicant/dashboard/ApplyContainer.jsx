
import React from "react";
import { Box, Grid } from "@mui/material";
import AppliedJobs from "./AppliedJobs";
import AddResume from "./AddResume";
import { useWizard } from "react-use-wizard";

const ApplyContainer = ({
  data,
  resumes,
  selectedResume,
  getAppliedData,
  resumeId,
  id,
}) => {
  const { nextStep } = useWizard();
  return (
    <Box maxWidth="xl" sx={{
      minHeight: '100vh'
  }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: "#FFFFFF",
          }}
        >
          <AddResume
            onNext={nextStep}
            resumes={resumes}
            selectedResume={selectedResume}
            resumeId={resumeId}
            id={id}
          />
        </Grid>
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


export default ApplyContainer;
