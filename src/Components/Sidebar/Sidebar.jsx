import React, { useState } from "react";
import { Button } from "antd";
import { GoSidebarExpand } from "react-icons/go";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ navbar }) => {
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebar = (state) => {
    setOpenSidebar(state);
  };

  const checkProducts = () => {
    let compareProduct = localStorage.getItem("compare");
    compareProduct = JSON.parse(compareProduct);
    if (compareProduct.length >= 2) {
      setOpenSidebar(false);
      navigate('/compare')
    }
  };
  const handleProduct = () => {
    setOpenSidebar(false);
    navigate('/')
  }
  return (
    <>
      {navbar ? (
        <div className={`SidebarNavOpen ${!openSidebar && "SidebarClose"}`}>
          {openSidebar && (
            <>
              <Button onClick={handleProduct}>Product Details</Button>
              <Button onClick={checkProducts}>Compare Products</Button>
            </>
          )}
        </div>
      ) : (
        <div className={`SidebarOpen ${!openSidebar && "SidebarClose"}`}>
          {openSidebar && (
            <>
              <Button onClick={handleProduct}>Product Details</Button>
              <Button onClick={checkProducts}>Compare Products</Button>
            </>
          )}
        </div>
      )}
      <div className={`SidebarBtn ${navbar && "navSideBtn"}`}>
        {navbar ? (
          <GoSidebarExpand
            onClick={() => handleSidebar(!openSidebar)}
            className={`profile`}
          />
        ) : (
          <Button
            onClick={() => handleSidebar(!openSidebar)}
            type="primary"
            icon={<GoSidebarExpand />}
          >
            {openSidebar ? "Close" : "Open"} Sidebar
          </Button>
        )}
      </div>
    </>
  );
};
export default Sidebar;
