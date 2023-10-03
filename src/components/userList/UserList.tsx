import { useEffect, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { FaUserSlash } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { disableUser, enableUser, getJoinedData } from "../../slice/CreateSlice";
import "./UserList.css";

const UserList = ({ handleShow, setIsEdit, isEdit, setUserId,searchQuery }: any) => {
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
      width: "16%",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "25px",
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

  const handleUpdateShow = (user: any) => {
    handleShow();
    setIsEdit(true);
    setUserId(user);
  };

  const handleStatus = (userId: any, IsActive: boolean) => {
    window.location.reload();
    IsActive ? dispatch(disableUser(userId)) : dispatch(enableUser(userId));
  };

  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const filtered = joinedUserData?.data?.filter((user: any) =>
      user.Username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [joinedUserData, searchQuery]);

  return (
    <>
     <Container className="border rounded shadow my-5">
  <Table>
    <thead className="text-center">
      <tr>
        <th>FULL NAME</th>
        <th>ROLE</th>
        <th>COMMUNICATION EMAIL</th>
        <th>STATUS</th>
        <th>UPDATE</th>
        <th>ENABLE/DISABLE</th>
      </tr>
    </thead>
    <tbody>
      {filteredUsers?.map((user: any) => {
        return (
          <tr key={user.UserId}>
            <td style={{ display: "flex", alignItems: "center" }}>
              {CircleWithInitialLetter(user.Username)}
              <span style={{ marginLeft: "10px" }}>
                <span style={nameStyle}>{user.Username}</span>
                <br />
                <span style={emailStyle}>{user.EmailId}</span>
              </span>
            </td>
            <td className="text-center">{user.Role.RoleName}</td>
            <td className="text-center">
              <span>
                <MdEmail />
              </span>
              <span style={{ marginLeft: "10px" }}>{user.EmailId}</span>
            </td>
            <td className="text-center">
              <>
              {user.IsActive ? (
                <div id="active">Active</div>
              ) : (
                <div id="disable">Disabled</div>
              )}
              </>
            </td>
            <td className="text-center">
              <span>
                <Button variant="none" onClick={() => handleUpdateShow(user)}>
                  <GrEdit />
                </Button>
              </span>
            </td>
            <td className="text-center">
              <span>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  checked={user.IsActive ? true : false}
                  onChange={() => {
                    handleStatus(user.UserId, user.IsActive);
                  }}
                />
              </span>
            </td>
          </tr>
        );
      })}
    </tbody>
  </Table>
</Container>

    </>
  );
};

export default UserList;
