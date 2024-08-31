import React, { useEffect, useState } from "react";
import { Table, Alert, Button, Modal, Checkbox } from "antd";
import "./Compare.css";

const Compare = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState({
    type: "",
    message: "",
  });
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (item) => {
    const isChecked = selectedItems.includes(item);

    if (isRestricted(item)) {
      setError({
        type: "error",
        message: `${item.title} cannot be selected.`,
      });
      reset();
      return;
    }

    if (!isChecked) {
      if (selectedItems.length >= 4) {
        return;
      }
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    }
  };

  const addNewCompare = () => {
    let compareProduct = localStorage.getItem("compare");
    compareProduct = JSON.parse(compareProduct || []);
    let newCompareProducts = [...compareProduct, ...selectedItems];
    localStorage.setItem("compare", JSON.stringify(newCompareProducts));
    getData();
  };

  const showModal = () => {
    getProducts();
    setOpen(true);
    setSelectedItems([]);
  };

  let getProducts = () => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleOk = () => {
    addNewCompare();
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
    setSelectedItems([]);
  };
  const handleCancel = () => {
    setOpen(false);
    setSelectedItems([]);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let compareProduct = localStorage.getItem("compare");
    setData(JSON.parse(compareProduct) || []);
  };

  const remove = (id) => {
    let newCompare = data.filter((product) => product.id != id);
    setData(newCompare);
    localStorage.setItem("compare", JSON.stringify(newCompare || []));
    getData();
    setError({
      type: "success",
      message: "Product successfully removed",
    });
    reset();
  };

  const reset = () => {
    setTimeout(() => {
      setError({
        type: "",
        message: "",
      });
    }, 3000);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend"],
    },
    {
      title: "Price",
      dataIndex: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
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
      sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ["descend"],
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
      sortDirections: ["descend"],
    },
    {
      title: "Width",
      dataIndex: "dimensions",
      sorter: (a, b) => a.dimensions.width - b.dimensions.width,
      sortDirections: ["descend", "ascend"],
      render: (text, record) => record.dimensions.width,
    },
    {
      title: "Height",
      dataIndex: "dimensions",
      sorter: (a, b) => a.dimensions.height - b.dimensions.height,
      sortDirections: ["descend", "ascend"],
      render: (text, record) => record.dimensions.height,
    },
    {
      title: "Depth",
      dataIndex: "dimensions",
      sorter: (a, b) => a.dimensions.depth - b.dimensions.depth,
      sortDirections: ["descend", "ascend"],
      render: (text, record) => record.dimensions.depth,
    },
    {
      title: "Warranty",
      dataIndex: "warrantyInformation",
      sorter: (a, b) =>
        a.warrantyInformation.length - b.warrantyInformation.length,
      sortDirections: ["descend"],
    },
    {
      title: "Remove",
      render: (text, record) => (
        <Button type="primary" onClick={() => remove(record.id)}>
          Remove
        </Button>
      ),
    },
  ];

  const isRestricted = (item) => {
    let compareProduct = localStorage.getItem("compare");
    compareProduct = JSON.parse(compareProduct || []);
    let checkItem = compareProduct.some(
      (restrictedItem) => restrictedItem.id === item.id
    );
    return checkItem;
  };

  const AddCheckboxcolumns = [
    {
      title: "Select",
      dataIndex: "checkbox",
      render: (_, record) => (
        <Checkbox
          checked={selectedItems.includes(record)}
          onChange={() => handleCheckboxChange(record)}
          disabled={
            isRestricted(record) ||
            (!selectedItems.includes(record) && selectedItems.length >= 4)
          }
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
  ];

  return (
    <div className={`Products`}>
      <div className="header">
        <span>Compare Products</span>
        <Button type="primary" onClick={showModal}>
          Add More
        </Button>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />
      {error.message && (
        <div className="error">
          <Alert message={error.message} type={error.type} closable />
        </div>
      )}
      <Modal
        title="Add Product To Compare"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Table
          dataSource={products}
          columns={AddCheckboxcolumns}
          rowKey="id"
          pagination={false}
        />
      </Modal>
    </div>
  );
};

export default Compare;
