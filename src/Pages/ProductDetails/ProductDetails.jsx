import React, { useEffect, useState } from "react";
import { Table, Alert, Button } from "antd";
import "./ProductDetails.css";
import {useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [nameFilters, setNameFilters] = useState([]);
  const [brandFilters, setBrandFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [error, setError] = useState({
    type: "",
    message: "",
  });

  const addToCompare = (product) => {
    let compareProduct = localStorage.getItem("compare");
    if (compareProduct) {
      compareProduct = JSON.parse(compareProduct);
      let checkIfExist = compareProduct.find((p) => p.id === product.id);
      if (checkIfExist) {
        setError({
          type: "error",
          message: "Product already added to compare",
        });
        reset();
      } else {
        compareProduct.push(product);
        localStorage.setItem("compare", JSON.stringify(compareProduct));
        setError({
          type: "success",
          message: "Product successfully added to compare",
        });
        reset();
      }
    } else {
      localStorage.setItem("compare", JSON.stringify([product]));
      setError({
        type: "success",
        message: "Product successfully added to compare",
      });
      reset();
    }
    checkNavigation();
  };

  const reset = () => {
    setTimeout(() => {
      setError({
        type: "",
        message: "",
      });
    }, 3000);
  };

  const checkNavigation = () => {
    setTimeout(() => {
      let compareProduct = localStorage.getItem("compare");
      compareProduct = JSON.parse(compareProduct);
      if (compareProduct.length >= 2) {
        setError({
          type: "success",
          message: "Navigating to compare page",
        });
        reset();
        setTimeout(() => {
          navigate("/compare");
        }, 2500);
      } else {
        setError({
          type: "error",
          message: "Please add atleast 2 products to compare",
        });
        reset();
      }
    }, 2000);
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);

        const uniqueNames = [
          ...new Set(res.products.map((product) => product.title)),
        ];
        setNameFilters(
          uniqueNames.map((name) => ({
            text: name,
            value: name,
          }))
        );

        const uniqueBrand = [
          ...new Set(res.products.map((product) => product.brand)),
        ];
        setBrandFilters(
          uniqueBrand.map((brand) => ({
            text: brand,
            value: brand,
          }))
        );
        const uniqueCategory = [
          ...new Set(res.products.map((product) => product.category)),
        ];
        setCategoryFilters(
          uniqueCategory.map((category) => ({
            text: category,
            value: category,
          }))
        );
      })
      .catch((e) => console.log("Err", e));
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      filters: nameFilters,
      onFilter: (value, record) => record.title.indexOf(value) === 0,
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend"],
    },
    {
      title: "Price",
      dataIndex: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend"],
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.discountPercentage - b.discountPercentage,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      filters: brandFilters,
      onFilter: (value, record) => record.brand.indexOf(value) === 0,
      sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ["descend"],
    },
    {
      title: "Category",
      dataIndex: "category",
      filters: categoryFilters,
      onFilter: (value, record) => record.category.indexOf(value) === 0,
      sorter: (a, b) => a.category.length - b.category.length,
      sortDirections: ["descend"],
    },
    {
      title: "Compare",
      render: (text, record) => (
        <Button className='primary' onClick={() => addToCompare(record)}>
          Compare
        </Button>
      ),
    },
  ];

  return (
    <div className={`Products`}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={products}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
        expandable={{
          expandedRowRender: (record) => (
            <div
              style={{ margin: 0 }}
            >
              <span>{record.description}</span>
            </div>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
      />
      {error.message && (
        <div className="error">
          <Alert message={error.message} type={error.type} closable />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
