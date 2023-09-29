// UserModal.js

import React, { useEffect } from "react";
import { Modal, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addUser, getJoinedData, getRoleData, updateUser } from "../slice/CreateSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserModal = ({ show, handleClose, isEdit, setIsEdit, userId }: any) => {
  const dispatch = useDispatch();
  const { roleData } = useSelector((state: any) => state.roleMaster);

  const initialValues = {
    RoleId: 0,
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
    EmailId: Yup.string()
      .email("Invalid email")
      .required("EmailId is required"),
    Gender: Yup.string().required("Gender is required"),
    Age: Yup.number().required("Age is required"),
    Salary: Yup.number().required("Salary is required"),
    City: Yup.string().required("City is required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      values.RoleId = parseInt(values.RoleId, 10);
      const response = await dispatch(addUser(values) as any);


      if (response && response.error) {
        toast.error("Email Already Exists", {
          position: "top-right",
          theme: "colored",
        });
      } else {
        toast.success("User Added Successfully", {
          position: "top-right",
          theme: "colored",
        });
      }
     dispatch(getJoinedData() as any)
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  const handleUpdate = async (values: any) => {
    try {
      values.RoleId = parseInt(values.RoleId, 10);
      const updatedUser = {
        UserId: values.UserId,
        RoleId: values.RoleId,
        Username: values.Username,
        EmailId: values.EmailId,
        Gender: values.Gender,
        Age: values.Age,
        Salary: values.Salary,
        City: values.City,
      };

      window.location.reload();
      await dispatch(updateUser(updatedUser) as any);
      console.log("Data submitted:", updatedUser);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  useEffect(() => {
    dispatch(getRoleData() as any);
  }, [dispatch]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        backdrop={"static"}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {isEdit ? "UPDATE USER" : "REGISTER"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={isEdit ? userId : initialValues}
            validationSchema={validationSchema}
            onSubmit={isEdit ? handleUpdate : handleSubmit}
          >
            <Form className="d-flex flex-column justify-content-between align-items-start ">
              <Row>
               <Col> <label htmlFor="RoleId">RoleId:</label></Col>
                <Col>
                <Field as="select" id="RoleId" name="RoleId">
                  <option value={0} disabled>
                    Select Role
                  </option>
                  {roleData.data &&
                    roleData.data.map((role: any) => (
                      <option key={role.RoleId} value={role.RoleId}>
                        {role.RoleName}
                      </option>
                    ))}
                </Field>
                <ErrorMessage name="RoleId" component="div" />
                </Col>
              </Row>
             

              <Row>
               <Col> <label htmlFor="Username">Username:</label></Col>
               <Col>
                <Field type="text" id="Username" name="Username" />
                <ErrorMessage name="Username" component="div" />
                </Col>
              </Row>
              <Row>
                <Col><label htmlFor="EmailId">EmailId:</label></Col>
                <Col>
                <Field type="text" id="EmailId" name="EmailId" />
                <ErrorMessage name="EmailId" component="div" />
                </Col>
              </Row>

              <Row>
                <Col><label htmlFor="Gender">Gender:</label></Col>
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
              </Row>

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
              <hr />
              {isEdit ? (
                <div>
                  <Button type="submit" onClick={handleClose}>Update</Button>
                </div>
              ) : (
                <div>
                  <Button type="submit" onClick={handleClose}>Submit</Button>
                </div>
              )}
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserModal;
