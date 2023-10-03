// UserModal.js

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import {
  addUser,
  getJoinedData,
  getRoleData,
  updateUser,
} from "../../slice/CreateSlice";
import "../modal/modal.css";

const UserModal = ({ show, handleClose, isEdit,handleShow, userId }: any) => {
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
        toast.error(response.payload.message, {
          position: "top-right",
          theme: "colored",
        });
        handleShow()
      } else {
        toast.success(response.payload.message, {
          position: "top-right",
          theme: "colored",
        });
        handleClose()
      }
      dispatch(getJoinedData() as any);
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
     const updateRes= await dispatch(updateUser(updatedUser) as any);
     
     if (updateRes) {
      toast.success(updateRes.payload.message, {
        position: "top-right",
        theme: "colored",
      });
     } else {
      toast.error(updateRes.payload.message, {
        position: "top-right",
        theme: "colored",
      });
     } 
  
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    dispatch(getJoinedData() as any)
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
        className="user-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {isEdit ? "UPDATE USER" : "REGISTER"}
          </Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={isEdit ? userId : initialValues}
          validationSchema={validationSchema}
          onSubmit={isEdit ? handleUpdate : handleSubmit}
        >
          <Form className="formBody">
            <Modal.Body>
              <Row className="text-center">
                <Col>
                  <div>
                    <div>
                      {" "}
                      <label htmlFor="RoleId" className="form-label">
                        RoleId:
                      </label>
                    </div>
                    <div>
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
                      <ErrorMessage
                        className="error"
                        name="RoleId"
                        component="div"
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div>
                    <div>
                      {" "}
                      <label htmlFor="Username">Username:</label>
                    </div>
                    <div>
                      <Field
                        type="text"
                        id="Username"
                        name="Username"
                        placeholder="Username"
                      />
                      <ErrorMessage name="Username" component="div" />
                    </div>
                  </div>
                </Col>
              </Row>

              <Row className="text-center">
                <Col>
                  <div>
                    <div>
                      <label htmlFor="EmailId">EmailId:</label>
                    </div>
                    <div>
                      <Field
                        type="text"
                        id="EmailId"
                        name="EmailId"
                        placeholder="EmailId"
                      />
                      <ErrorMessage name="EmailId" component="div" />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div>
                    <div>
                      <label htmlFor="Age">Age:</label>
                    </div>
                    <Field
                      type="number"
                      id="Age"
                      name="Age"
                      placeholder="Age"
                    />
                    <ErrorMessage name="Age" component="div" />
                  </div>
                </Col>
              </Row>

              <Row className="text-center">
                <Col>
                  {" "}
                  <div>
                    <div>
                      <label htmlFor="Salary">Salary:</label>
                    </div>
                    <Field
                      type="number"
                      id="Salary"
                      name="Salary"
                      placeholder="Salary"
                    />
                    <ErrorMessage name="Salary" component="div" />
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div>
                    <div>
                      <label htmlFor="City">City:</label>
                    </div>
                    <Field
                      type="text"
                      id="City"
                      name="City"
                      placeholder="City"
                    />
                    <ErrorMessage name="City" component="div" />
                  </div>
                </Col>
              </Row>
              <Row className="text-center">
                <div>
                  <label htmlFor="Gender">Gender:</label>
                </div>
                <div>
                  <label>
                    <Field type="radio" name="Gender" value="Male" />
                    Male
                  </label>
                  <label>
                    <Field type="radio" name="Gender" value="Female" />
                    Female
                  </label>
                  <label>
                    <Field type="radio" name="Gender" value="Other" />
                    Other
                  </label>
                </div>
                <ErrorMessage name="Gender" component="div" />
              </Row>
            </Modal.Body>
            <Modal.Footer>
              {isEdit ? (
                <>
                  <div>
                    <Button
                      type="submit"
                    
                      className="btn-update"
                    >
                      Update
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="secondary"
                      onClick={handleClose}
                      className="btn-submit"
                    >
                      Close
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Button
                      type="submit"
                     
                      className="btn-submit"
                    >
                      Submit
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="secondary"
                      onClick={handleClose}
                      className="btn-submit"
                    >
                      Close
                    </Button>
                  </div>
                </>
              )}
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};

export default UserModal;
