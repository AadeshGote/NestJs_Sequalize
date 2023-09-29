import { useState } from "react";
import Navbar from "./navbar/Navbar";
import UserList from "./userList/UserList";
import UserModal from "./modal/Modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userId, setUserId]=useState(null)
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
    <ToastContainer/>
      <Navbar handleShow={handleShow} setIsEdit={setIsEdit}/>
      <UserList handleShow={handleShow} setIsEdit={setIsEdit} isEdit={isEdit} setUserId={setUserId} />
      <UserModal show={show} handleClose={handleClose} isEdit={isEdit} setIsEdit={setIsEdit} userId={userId} />
    </>
  );
}

export default App;
