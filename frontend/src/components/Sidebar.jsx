import React, { useState } from "react";
import { BiTime } from "react-icons/bi";
import { IoIosArrowUp, IoIosClose } from "react-icons/io";
import { FaJediOrder, FaToolbox } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

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
    {
      text: "Inventory",
      // icon: <FaToolbox />,
      subMenu: [
        { text: "Warehouse", link: "/warehouse" },
      ],
    },
    {
      text: "Customer", link: "/auth/user/customer" ,
    },
  ];

  const handleMenuClick = (index, menuItem) => {
    if (!menuItem.subMenu) {
      navigate(menuItem.link);
    } else {
    setActiveMenu(activeMenu === index ? null : index);
    }
  };

  const handleSubmenuClick = (link) => {
    navigate(link);
    setActiveMenu(null); 
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
            onClick={() => handleMenuClick(index, menuItem)}
          >
            {/* {<IconBase>{menuItem.icon}</IconBase>} */}
            <p>{menuItem.text}</p>
            {activeMenu === index && menuItem.subMenu && (
              <ul className="sidebar-list">
                {menuItem.subMenu.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className="sidebar-subMenu-list-item"
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

            {/* {activeMenu === index && !menuItem.subMenu && (
              navigate(menuItem.link)
            )} */}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;