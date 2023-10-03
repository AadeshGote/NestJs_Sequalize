import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import UserList from "./components/userList/UserList";
import UserModal from "./components/modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer/Footer";

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userId, setUserId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };
  return (
    <>
      <ToastContainer />
      <Navbar
        handleShow={handleShow}
        setIsEdit={setIsEdit}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
      />
      <UserList
        handleShow={handleShow}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        setUserId={setUserId}
        searchQuery={searchQuery}
      />
      <UserModal
        show={show}
        handleClose={handleClose}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        userId={userId}
        handleShow={handleShow}
      />
      <Footer />
    </>
  );
}

export default App;
