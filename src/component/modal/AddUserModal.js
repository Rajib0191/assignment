import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ButtonComp from "../utils/Button";
import { useFormik } from "formik";
import { userSchema } from "../schema";
import axios from "axios";
import InputField from "../utils/InputField";
import SelectInputField from "../utils/SelectInputField";
import DistrictSelectField from "../utils/DistrictSelectField";
import DivisionSelectField from "../utils/DivisionSelectField";
import { EmployeeTypeArr, style } from "../misc/Constant";
import Alert from "../misc/Alert";

const AddUserModal = ({ open, close }) => {
  const [divisionData, setDivisionData] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  const showMessage = (message, duration) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, duration);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      employeeType: "",
      divisionId: "",
      districeID: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values, actions) => {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        employeeType: values.employeeType,
        divisionId: Number(values.divisionId),
        districeID: Number(values.districeID),
      };

      try {
        setLoading(true);
        await axios.post(
          "http://59.152.62.177:8085/api/Employee/SaveEmployeeInformation",
          data
        );
        setLoading(false);
        actions.resetForm();
        setMessageType("success");
        showMessage("Form submitted successfully!", 5000);
      } catch (error) {
        setLoading(false);
        setMessageType("error");
        showMessage("An error occurred while submitting the form.", 5000);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://59.152.62.177:8085/api/Employee/Division"
        );
        setDivisionData(response?.data?.readDivisionData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    if (formik.values.employeeType === "Employee") {
      fetchData();
    }
  }, [formik.values.employeeType]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://59.152.62.177:8085/api/Employee/District/${formik.values.divisionId}`
        );
        const data = await response?.data?.readDistrictData;
        setDistricts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchDistricts();
  }, [formik.values.divisionId]);

  return (
    <Modal open={open} onClose={close}>
      <Box sx={style}>
        <Grid container justifyContent={"center"}>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            style={{
              padding: "10px",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add User
            </Typography>
            <IconButton onClick={close}>
              <CloseIcon />
            </IconButton>
          </Grid>

          <Grid
            container
            item
            sm={11}
            justifyContent={"flex-start"}
            alignItems={"center"}
            style={{ margin: "20px 0", padding: "0 10px" }}
          >
            {message && <Alert message={message} messageType={messageType} />}
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              spacing={2}
            >
              <InputField
                name={"firstName"}
                label={"Enter Firstname"}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
              />

              <InputField
                name={"lastName"}
                label={"Enter Lastname"}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
              />

              <SelectInputField
                name={"employeeType"}
                label={"Employee type"}
                value={formik.values.employeeType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.employeeType &&
                  Boolean(formik.errors.employeeType)
                }
                items={EmployeeTypeArr}
              />

              {formik.values.employeeType === "Employee" && (
                <DivisionSelectField
                  name={"divisionId"}
                  label={"Select division"}
                  value={formik.values.divisionId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.divisionId &&
                    Boolean(formik.errors.divisionId)
                  }
                  divisionData={divisionData}
                />
              )}

              {formik.values.employeeType === "Employee" && (
                <DistrictSelectField
                  name={"districeID"}
                  label={"Select district"}
                  value={formik.values.districeID}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.districeID &&
                    Boolean(formik.errors.districeID)
                  }
                  disabled={formik.values.divisionId === ""}
                  districts={districts}
                />
              )}

              <Grid container item>
                <ButtonComp
                  placeholder={"Save"}
                  variant={"contained"}
                  onclick={formik.handleSubmit}
                  loading={loading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
