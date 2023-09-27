import { useState } from "react";
import Navbar from "./navbar/Navbar";
import UserList from "./userList/UserList";
import UserModal from './modal/Modal';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar handleShow={handleShow}/>
      <UserList />
      <UserModal show={show} handleClose={handleClose} />
    </>
  );
}

export default App;
