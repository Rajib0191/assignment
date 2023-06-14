import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import ButtonComp from "../component/utils/Button";
import InputField from "../component/utils/InputField";
import SelectInputField from "../component/utils/SelectInputField";
import DivisionSelectField from "../component/utils/DivisionSelectField";
import DistrictSelectField from "../component/utils/DistrictSelectField";
import useUserDetails from "../hooks/useUserDetails";
import { useFormik } from "formik";
import { EmployeeTypeArr } from "../component/misc/Constant";
import axios from "axios";
import Alert from "../component/misc/Alert";
import Loading from "../component/misc/Loading";
import { userSchema } from "../component/schema";

const UserDetails = () => {
  const { userId } = useParams();
  const { data, loading: userDetailsLoading } = useUserDetails(Number(userId));

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
      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        employeeType: values.employeeType,
        divisionId:
          values.employeeType === "Employee" ? Number(values.divisionId) : 0,
        districeID:
          values.employeeType === "Employee" ? Number(values.districeID) : 0,
      };
      try {
        setLoading(true);
        await axios.post(
          `http://59.152.62.177:8085/api/Employee/UpdateEmployeeInformation/${userId}`,
          userData
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
    if (data) {
      formik.setValues({
        firstName: data?.firstName,
        lastName: data?.lastName,
        employeeType: data?.employeeType,
        divisionId: data?.divisionId,
        districeID: data?.districeID,
      });
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://59.152.62.177:8085/api/Employee/Division"
        );
        setDivisionData(response?.data?.readDivisionData);
      } catch (error) {
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
        const response = await axios.get(
          `http://59.152.62.177:8085/api/Employee/District/${formik.values.divisionId}`
        );
        const data = await response?.data?.readDistrictData;
        setDistricts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDistricts();
  }, [formik.values.divisionId]);

  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      {userDetailsLoading && <Loading />}
      {!userDetailsLoading && (
        <Grid
          container
          item
          sx={{
            width: "50%",
            background: "#fff",
            borderRadius: "5px",
            padding: "20px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          {message && <Alert message={message} messageType={messageType} />}

          <Grid
            container
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <InputField
              name={"firstName"}
              label={"Firstname"}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
            />
            <InputField
              name={"lastName"}
              label={"Lastname"}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            />

            <SelectInputField
              name={"employeeType"}
              label={"Employee type"}
              value={formik.values.employeeType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              items={EmployeeTypeArr}
              error={
                formik.touched.employeeType &&
                Boolean(formik.errors.employeeType)
              }
            />

            {formik.values.employeeType === "Employee" && (
              <DivisionSelectField
                name={"divisionId"}
                label={"Division"}
                value={formik.values.divisionId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                divisionData={divisionData}
                error={
                  formik.touched.divisionId && Boolean(formik.errors.divisionId)
                }
              />
            )}

            {formik.values.employeeType === "Employee" && (
              <DistrictSelectField
                name={"districeID"}
                label={"District"}
                value={formik.values.districeID}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.values.divisionId === ""}
                districts={districts}
                error={
                  formik.touched.districeID && Boolean(formik.errors.districeID)
                }
              />
            )}
            <Grid container item>
              <ButtonComp
                placeholder={"Edit"}
                variant={"contained"}
                onclick={formik.handleSubmit}
                loading={loading}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default UserDetails;
