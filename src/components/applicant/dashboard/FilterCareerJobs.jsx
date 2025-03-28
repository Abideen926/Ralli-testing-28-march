import React from "react";
import { Box } from "@mui/material";
import RalliDropdown from "../applied/RalliDropdown";

const FilterCareerJobs = ({
  countries,
  states,
  cities,
  dropdownStates,
  handleDropdownChange,
  jobCategories,
  jobLocations,
  jobShifts,
  jobTypes,
}) => {
  return (
    <Box>
      <RalliDropdown
        names={countries}
        label="Country"
        selectedValue={dropdownStates?.country}
        onChange={(value) => handleDropdownChange("country", value)}
      />
      <RalliDropdown
        names={states}
        label="State"
        multiple={true}
        selectedValue={dropdownStates?.state}
        onChange={(value) => handleDropdownChange("state", value)}
      />
      <RalliDropdown
        names={cities}
        label="City"
        selectedValue={dropdownStates?.city}
        onChange={(value) => handleDropdownChange("city", value)}
      />
      <RalliDropdown
        names={jobCategories}
        label="Job Category"
        multiple={true}
        selectedValue={dropdownStates.job_category}
        onChange={(value) => handleDropdownChange("job_category", value)}
      />

      <RalliDropdown
        names={jobLocations}
        label="Job Location"
        selectedValue={dropdownStates.job_location}
        onChange={(value) => handleDropdownChange("job_location", value)}
      />
      <RalliDropdown
        names={jobTypes}
        label="Job Type"
        selectedValue={dropdownStates.job_type}
        onChange={(value) => handleDropdownChange("job_type", value)}
      />

      <RalliDropdown
        names={jobShifts}
        label="Job Shift"
        selectedValue={dropdownStates.job_shift}
        onChange={(value) => handleDropdownChange("job_shift", value)}
      />
    </Box>
  );
};

export default FilterCareerJobs;
