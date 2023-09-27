// UserModal.js

import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addUser, getRoleData } from "../slice/CreateSlice";

const UserModal = ({ show, handleClose }:any) => {
  const dispatch = useDispatch();
  const { roleData } = useSelector((state:any) => state.roleMaster);

  const initialValues = {
    RoleId: 0, // Default RoleId value, change this to the desired default value
    Username: "",
    EmailId: "",
    Gender: "",
    Age: 0,
    Salary: 0,
    City: "",
  };

  const validationSchema = Yup.object().shape({
    RoleId: Yup.number().required("RoleId is required"),
    Username: Yup.string().required("Username is required"),
    EmailId: Yup.string().email("Invalid email").required("EmailId is required"),
    Gender: Yup.string().required("Gender is required"),
    Age: Yup.number().required("Age is required"),
    Salary: Yup.number().required("Salary is required"),
    City: Yup.string().required("City is required"),
  });

  const handleSubmit = async (values:any) => {
    try {
      values.RoleId = parseInt(values.RoleId, 10);
      // console.log("Data being sent from UI:", values); // Add this line

      // Dispatch the addUser action with the form values
      await dispatch(addUser(values) as any);
      console.log("Data submitted:", values);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    dispatch(getRoleData() as any);
  }, [dispatch]);

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={true} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">REGISTER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div>
                <label htmlFor="RoleId">RoleId:</label>
                <Field as="select" id="RoleId" name="RoleId">
                  <option value={0} disabled>
                    Select Role
                  </option>
                  {roleData.data &&
                    roleData.data.map((role:any) => (
                      <option key={role.RoleId} value={role.RoleId}>
                        {role.RoleName}
                      </option>
                    ))}
                </Field>
                <ErrorMessage name="RoleId" component="div" />
              </div>

              <div>
                <label htmlFor="Username">Username:</label>
                <Field type="text" id="Username" name="Username" />
                <ErrorMessage name="Username" component="div" />
              </div>
              <div>
                <label htmlFor="EmailId">EmailId:</label>
                <Field type="text" id="EmailId" name="EmailId" />
                <ErrorMessage name="EmailId" component="div" />
              </div>

              <div>
                <label htmlFor="Gender">Gender:</label>
                <div>
                  <label>
                    <Field type="radio" name="Gender" value="Male" /> Male
                  </label>
                  <label>
                    <Field type="radio" name="Gender" value="Female" /> Female
                  </label>
                  <label>
                    <Field type="radio" name="Gender" value="Other" /> Other
                  </label>
                </div>
                <ErrorMessage name="Gender" component="div" />
              </div>

              <div>
                <label htmlFor="Age">Age:</label>
                <Field type="number" id="Age" name="Age" />
                <ErrorMessage name="Age" component="div" />
              </div>

              <div>
                <label htmlFor="Salary">Salary:</label>
                <Field type="number" id="Salary" name="Salary" />
                <ErrorMessage name="Salary" component="div" />
              </div>

              <div>
                <label htmlFor="City">City:</label>
                <Field type="text" id="City" name="City" />
                <ErrorMessage name="City" component="div" />
              </div>

              <div>
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserModal;
