import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [categoryModal, setCategoryModal] = useState(false);
  const [createProductModal, setCreateProductModal] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openCategoryHandler = () => {
    setCategoryModal(true);
  };

  const closeCategoryModal = () => {
    setCategoryModal(false);
  };

  const openCreateProductModal = () => {
    setCreateProductModal(true);
  };
  const closeCreateProductModal = () => {
    setCreateProductModal(false);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  return (
    <div>
      Dashboard
    </div>
  );
};

export default Dashboard;