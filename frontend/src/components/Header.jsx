import React, { useEffect } from "react";
import { BsCart4, BsJustify } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutHandler } from "../store/authSlice";
const Header = ({ openSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store)=> store.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const totalQty = cartItems?.reduce((acc, item) => acc + Number(item.quantity), 0);

  const logout = () => {
    dispatch(logoutHandler());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="meu-icon" onClick={openSidebar}>
        <BsJustify size={24} />
      </div>

      <div className="header-left">
        <h3 className="text-lg sm:ml-3 md:text-3xl text-slate-200">
          JMD MOBILE SHOP
        </h3>
      </div>
      <div className="header-right flex items-center space-x-2">
        { user && <p className="hidden md:block">Hello {user?.userInfo?.name}</p>}

        <button className="flex items-center space-x-1" onClick={() => navigate("/cart")}>
          <BsCart4 className="icon" /> Cart
          <span className="badge text-orange-700 mt-[-20px]">{totalQty}</span>
        </button>
        
        <button className="flex items-center space-x-1" onClick={logout}>
          <BiLogOut size={28} /> Logout
        </button>
      </div>
    </header>
  );
};

export default Header;