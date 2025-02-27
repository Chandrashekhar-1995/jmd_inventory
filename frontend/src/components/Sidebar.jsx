import React, { useState } from "react";
import { BiSolidUserPin, BiTime } from "react-icons/bi";
import { BsCart4, BsCheck2Square, BsFillGrid3X3GapFill, BsGrid1X2Fill } from "react-icons/bs";
import { IoIosArrowUp, IoIosClose } from "react-icons/io";
import { FaJediOrder, FaToolbox, FaTools, FaUser, FaUsers } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IconBase } from "react-icons/lib";

const Sidebar = ({ openSidebarToggle, openSidebar }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      text: "Sale",
      icon: <FaJediOrder />,
      subMenu: [
        { text: "New Invoice", link: "/sales/invoice/create" },
        { text: "Manage Invoice", link: "/sales/invoice" },
      ],
    },
    {
      text: "Repairs",
      // icon: <ConstructionIcon/>,
      subMenu: [
        { text: "Book Repairing", link: "/repair/booking" },
        { text: "Manage Repairing", link: "/repair" },
      ],
    },
    {
      text: "Purchase",
      // icon: <ShoppingCart />,
      subMenu: [
        { text: "New Purchase", link: "/purchase/invoice/create" },
        { text: "Manage Purchase", link: "/purchase/invoice" },
        { text: "Manage Supplier", link: "/purchase/supplier" },
        { text: "Add Supplier", link: "/purchase/supplier/create" },
      ],
    },
  ];

  const handleMenuClick = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  const handleSubmenuClick = (link) => {
    navigate(link);
    setActiveMenu(null); // Close the submenu after navigation
  };

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive p-4" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand  flex items-center space-x-2 text-slate-300 ">
          <BiTime size={26} className="icon_head mr-2" /> 2:15
        </div>
        <span className="icon close_icon " onClick={openSidebar}>
          <IoIosClose size={32} className="text-slate-100 ml-4" />
        </span>
      </div>

      <ul className="sidebar-list">
        {menuItems.map((menuItem, index) => (
          <li
            className="sidebar-list-item"
            key={index}
            onClick={() => handleMenuClick(index)}
          >
            {/* {<IconBase>{menuItem.icon}</IconBase>} */}
            <p>{menuItem.text}</p>
            {activeMenu === index && menuItem.subMenu && (
              <ul className="submenu">
                {menuItem.subMenu.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className="submenu-item"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the parent menu click event
                      handleSubmenuClick(subItem.link);
                    }}
                  >
                    {subItem.text}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;