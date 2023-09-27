import { useEffect, useState } from "react";
import { Container, Row, Table, Col, Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getJoinedData, getRoleData, updateUser } from "../slice/CreateSlice";
import { GrEdit } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa";
import "./UserList.css";
import { Formik, Field, ErrorMessage } from "formik";

import  validationSchema  from './../modal/Modal';
const UserList = ({handleShow,setIsEdit,isEdit,setUserId}:any) => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getJoinedData());
  }, []);

  const { joinedUserData, loading, error } = useSelector(
    (state: any) => state.userProfile
  );

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function CircleWithInitialLetter(name: string) {
    const color = getRandomColor();
    const initialLetter = name.charAt(0).toUpperCase();

    const circleStyle = {
      backgroundColor: color,
      width: "15%",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "30px",
    };

    return <span style={circleStyle}>{initialLetter}</span>;
  }

  const nameStyle = {
    fontWeight: "bold",
    fontSize: "17px",
  };

  const emailStyle = {
    fontSize: "90%",
    color: "grey",
  };

 
  const handleUpdateShow=(user:any)=>{
    handleShow()
    setIsEdit(true)
    setUserId(user.UserId)
  }
  
  return (
    <>
      <Container className=" border rounded shadow my-5">
        <Table>
          <thead>
            <tr>
              <th>FULL NAME</th>
              <th>ROLE</th>
              <th>COMMUNICATION EMAIL</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {joinedUserData?.data?.map((user: any) => {
              return (
                <>
                  <tr key={user.UserId}>
                    <td style={{ display: "flex", alignItems: "center" }}>
                      {CircleWithInitialLetter(user.Username)}
                      <span style={{ marginLeft: "10px" }}>
                        <span style={nameStyle}>{user.Username}</span>
                        <br />
                        <span style={emailStyle}>{user.EmailId}</span>
                      </span>
                    </td>
                    <td>{user.Role.RoleName}</td>
                    <td>
                      <span>
                        <MdEmail />
                      </span>
                      <span style={{ marginLeft: "10px" }}>{user.EmailId}</span>
                    </td>
                    <td>
                      {user.IsActive ? (
                        <div><FaUserCheck size={30}/></div>
                      ) : (
                        <div><FaUserSlash size={30}/></div>
                      )}
                    </td>
                    <td>
                      <Button variant="none" onClick={()=>handleUpdateShow(user)}>
                        <GrEdit />
                      </Button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default UserList;
