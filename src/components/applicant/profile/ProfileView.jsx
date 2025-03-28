"use client";
import React, { useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import styles from "./profile.module.css";
import ResumeTab from "../ResumeTab/ResumeTab";
import FollowersTabs from "../talent-network/FollowesFollwingTabs";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { APPLICANT_EDUCATION } from "@/services/apiService/apiEndPoints";
import apiInstance from "@/services/apiService/apiServiceInstance";
import Following from "../talent-network/Following";
import RalliModal from "@/components/Modal/RalliModal";
import { Toast } from "@/components/Toast/Toast";
import { EDU_INFO_CRUD } from "@/constant/ralliResume";
import { DeleteForever, Edit } from "@mui/icons-material";
import UserDetail from "./UserDetail";

const ProfileView = ({
  Profile,
  setProfile,
  setIsFetch,
  onPressFollow = () => {},
  onPressMessage = () => {},
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [educationFields, setEducationFields] = useState({
    institution_name: "",
    degree: "",
    field_of_study: "",
    grade: "",
    start_date: null,
    end_date: null,
    media: null,
    is_continue: false,
  });

  const router = useRouter();
  const pathName = usePathname();
  console.log(pathName.includes("applicant"), "rout");
  const { userData } = useSelector((state) => state.auth);

  const isMyProfile = userData?.user?.id === Profile?.id;

  const handleEditButton = () => {
    router.push("/applicant/profile/edit-profile");
  };
  const handleDelete = async (id) => {
    try {
      const response = await apiInstance.delete(`${APPLICANT_EDUCATION}/${id}`);

      if (response?.data?.status === "success") {
        Toast("success", response?.data?.message);
        setProfile((prevProfile) => ({
          ...prevProfile,
          educations: prevProfile?.educations?.filter((edu) => edu.id !== id),
        }));
      } else {
        Toast(
          "error",
          response?.data?.message || "Failed to delete education entry"
        );
      }
    } catch (error) {
      Toast(
        "error",
        error?.response?.data?.message || "Something went wrong while deleting"
      );
    }
  };
  const handleEdit = (item, id) => {
    setEducationFields({
      institution_name: item.institution_name || "",
      degree: item.degree || "",
      field_of_study: item.field_of_study || "",
      grade: item.grade || "",
      start_date: item.start_date || null,
      end_date: item.end_date || null,
      media: item.media || null,
      is_continue: item.is_continue || false,
    });
    setIsEdit(true);
    setModalOpen(true);
    setEditId(id);
  };

  const handleAddEducation = () => {
    setEducationFields({
      institution_name: "",
      degree: "",
      field_of_study: "",
      grade: "",
      start_date: null,
      end_date: null,
      media: null,
      is_continue: false,
    });
    setModalOpen(true);
  };
  const handleBack = () => {
    setModalOpen(false);
    // router.push("/employer/my-posts");
  };
  const handleCloseModal = () => setModalOpen(false);
  const handleSubmitEducation = async () => {
    try {
      const formData = new FormData();
      Object.keys(educationFields).forEach((key) => {
        formData.append(key, educationFields[key]);
      });

      let response;
      if (isEdit) {
        response = await apiInstance.post(
          `${APPLICANT_EDUCATION}/${editId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        response = await apiInstance.post(APPLICANT_EDUCATION, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response?.data?.status === "success") {
        Toast("success", response?.data?.message);
        setModalOpen(false);
        setIsEdit(false);
        setEditId(null);
        setIsFetch(true);
      } else {
        throw new Error(
          response?.data?.message || "Failed to submit education data"
        );
      }
    } catch (error) {
      Toast(
        "error",
        error?.response?.data?.message || "Error submitting education data"
      );
    }
  };

  return (
    <Box className={styles.profileContainer}>
      <Box className={styles.userInfo}>
        <Avatar
          alt="Profile Image"
          src={Profile?.photo ? Profile?.photo : ""}
          sx={{
            width: { xs: 120, sm: 150, md: 191 },
            height: { xs: 120, sm: 150, md: 191 },
          }}
        />
        <Typography
          sx={{
            fontSize: { xs: "20px", sm: "22px", md: "26px" },
            fontWeight: 600,
            lineHeight: { xs: "25px", sm: "30px", md: "24px", lg: "33px" },
            color: "#111111",
            mt: "15px",
            mb: "10px",
          }}
        >
          {Profile?.first_name +
            " " +
            Profile?.middle_name +
            " " +
            Profile?.last_name}
        </Typography>

        {!isMyProfile ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
              my: 4,
            }}
          >
            <Button
              sx={{
                width: { xs: "70%", sm: "130px", md: "200px" },
                height: "60px",
                borderRadius: "10px",
                backgroundColor: Profile?.isFollowed ? "#fff" : "#FE4D82",
                color: Profile?.isFollowed ? "#FE4D82" : "#fff",
                border: "2px solid",
                borderColor: Profile?.isFollowed ? "#FE4D82" : null,
              }}
              onClick={() => onPressFollow(Profile.id)}
            >
              {Profile?.isFollowed ? "UnFollow" : "Follow"}
            </Button>
            <Button
              sx={{
                width: { xs: "70%", sm: "130px", md: "200px" },
                height: "60px",
                borderRadius: "10px",
                backgroundColor: "#00305B",
                color: "#fff",
              }}
              onClick={() => onPressMessage(Profile?.id)}
            >
              Message
            </Button>
          </Box>
        ) : (
          <Button
            sx={{
              fontSize: { xs: "20px", sm: "20px", md: "22px" },
              fontWeight: 600,
              lineHeight: { xs: "25px", sm: "30px", md: "24px", lg: "18px" },
              color: "#FE4D82",
              textDecoration: "underline",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={handleEditButton}
          >
            Edit Profile
          </Button>
        )}
      </Box>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "30px",
          lineHeight: "18px",
          color: "#00305B",
          py: 2,
          pb: 4,
        }}
      >
        Contact Details
      </Typography>

      {!isMyProfile ? (
        <>
          <UserDetail
            label="Ethnicity"
            value={Profile?.ethnicity?.name}
            isAddEdu={false}
          />
          <UserDetail
            label="Gender"
            value={Profile?.gender?.name}
            isAddEdu={false}
          />
          <UserDetail
            label="Type"
            value={Profile?.type?.toUpperCase()}
            isAddEdu={false}
          />
          <UserDetail
            label="Address"
            value={
              `${Profile?.country?.name || Profile?.country}, ` +
              `${Profile?.state?.name || Profile?.state}, ` +
              `${Profile?.city?.name || Profile?.city}`
            }
            isAddEdu={false}
          />
        </>
      ) : (
        <>
          <UserDetail label="Email" value={Profile?.email} isAddEdu={false} />
          <UserDetail label="Phone" value={Profile?.phone} isAddEdu={false} />
          <UserDetail
            label="Address"
            value={
              `${Profile?.country?.name || Profile?.country}, ` +
              `${Profile?.state?.name || Profile?.state}, ` +
              `${Profile?.city?.name || Profile?.city}`
            }
            isAddEdu={false}
          />
          <UserDetail
            label="Ethnicity"
            value={Profile?.ethnicity?.name}
            isAddEdu={false}
          />
        </>
      )}

      {pathName.includes("applicant") && (
        <Box className={styles.EducationDetailContainer}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <Typography>Education</Typography>
            <AddIcon onClick={handleAddEducation} />
          </Box>
          {Profile?.educations?.map((el, index) => (
            <Box key={index} className={styles.EducationDetailContainer}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  gap: 1,
                }}
              >
                <DeleteForever
                  onClick={() => handleDelete(el.id)}
                  sx={{ cursor: "pointer" }}
                />
                <Edit
                  onClick={() => handleEdit(el, el.id)}
                  sx={{ cursor: "pointer" }}
                />
              </Box>
              <UserDetail label="Degree" value={el?.degree} isAddEdu={true} />
              <UserDetail
                label="Field Of Study"
                value={el?.field_of_study}
                isAddEdu={true}
              />
              <UserDetail
                label="Institute Name"
                value={el?.institution_name}
                isAddEdu={true}
              />
              <UserDetail label="Grade" value={el?.grade} isAddEdu={true} />
            </Box>
          ))}
        </Box>
      )}

      <Typography
        sx={{
          fontSize: { xs: "16px", sm: "16px", md: "18px" },
          fontWeight: 600,
          lineHeight: { xs: "25px", sm: "30px", md: "24px" },
          color: "#00305B",
          mb: "5px",
        }}
      >
        About
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "10px", sm: "14px", md: "16px" },
          lineHeight: { xs: "19px", sm: "22px", md: "25px" },
          fontWeight: 500,
          color: "#222222",
          boxShadow: "0px 0px 3px #00000040",
          padding: "18px 20px",
          borderRadius: "10px",
        }}
      >
        {Profile?.about ? Profile?.about : "No About Found For This Profile"}
      </Typography>
      {isMyProfile && (
        <Box sx={{ mt: 3 }}>
          <Typography
            sx={{
              fontSize: { xs: "16px", sm: "16px", md: "18px" },
              fontWeight: 600,
              lineHeight: { xs: "25px", sm: "30px", md: "24px" },
              color: "#00305B",
              justifyContent: "flex-start",
            }}
          >
            Resume
          </Typography>
          <ResumeTab />
        </Box>
      )}

      {!isMyProfile ? (
        Profile?.followings?.length <= 0 ? (
          <>
            <Typography
              sx={{
                fontSize: { xs: "16px", sm: "16px", md: "18px" },
                fontWeight: 600,
                lineHeight: { xs: "25px", sm: "30px", md: "24px" },
                color: "#00305B",
                mb: "5px",
                mt: "30px",
              }}
            >
              Followings
            </Typography>
            <Typography className={styles.about}>
              No Followings Found For This Profile
            </Typography>
          </>
        ) : (
          <>
            <Typography
              sx={{
                fontSize: { xs: "16px", sm: "16px", md: "18px" },
                fontWeight: 600,
                lineHeight: { xs: "25px", sm: "30px", md: "24px" },
                color: "#00305B",
                mb: "5px",
                mt: "30px",
              }}
            >
              Followings
            </Typography>
            <Following data={Profile?.followings} />
          </>
        )
      ) : (
        <FollowersTabs
          followers={Profile?.followers}
          following={Profile?.followings}
        />
      )}
      <RalliModal
        onClick={handleSubmitEducation}
        open={isModalOpen}
        onClose={handleCloseModal}
        buttonLabel={`${isEdit ? "Update" : "Add"} `}
        data={EDU_INFO_CRUD}
        educationFields={educationFields}
        setEducationFields={setEducationFields}
        handleBack={handleBack}
      />
    </Box>
  );
};

export default ProfileView;
