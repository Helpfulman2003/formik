import React, { useEffect, useRef, useState } from "react";
import { Button, Space, Table } from "antd";
import Loading from "../LoadingComponet/Loading";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import InputForm from "../InputForm/InputForm";
import { useMutationHook } from "../../hooks/useMutationHook";
import { deleteManyProduct } from "../../services/ProductService";
import { toast } from "react-toastify";
import { useDownloadExcel } from 'react-export-table-to-excel'

export default function TableComponent(props) {
  const {
    selectionType = "checkbox",
    products,
    isLoading,
    setIsOpenDrawer,
    setRowSelected,
    setIsModalOpenDelete,
    queryProduct,
  } = props;
  const [rowSelectedKey, setRowSelectedKey] = useState([]);
  const searchInput = useRef(null);
  const tableRef = useRef(null)

  const handleDetailProduct = () => {
    setIsOpenDrawer(true);
  };

  const handleDeleteProduct = () => {
    setIsModalOpenDelete(true);
  };

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ fontSize: "16px", cursor: "pointer" }}
          onClick={handleDeleteProduct}
        />
        <EditOutlined
          style={{ fontSize: "16px", cursor: "pointer" }}
          onClick={handleDetailProduct}
        />
      </div>
    );
  };

  const handleSearch = (confirm) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputForm
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          handleFunction={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(confirm)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      filters: [
        {
          text: ">= 1234",
          value: ">=",
        },
        {
          text: "< 1234",
          value: "< ",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.price >= 1234;
        } else {
          return record.price < 1234;
        }
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      filters: [
        {
          text: ">= 3",
          value: ">=",
        },
        {
          text: "< 3",
          value: "< ",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.rating >= 3;
        } else {
          return record.rating < 3;
        }
      },
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setRowSelectedKey(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const mutation = useMutationHook(deleteManyProduct);
  const { data, isSuccess, isError } = mutation;

  const handleDeleteAll = () => {
    mutation.mutate(rowSelectedKey, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      toast.success(data?.message || "Success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (!isError && data?.status === "ERR") {
      toast.error(data?.message || "Error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isError, isSuccess, data]);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Product table',
    sheet: 'Product'
})

  return (
    <Loading isLoading={isLoading}>
      {rowSelectedKey.length > 0 && (
        <div
          style={{
            background: "rgb(26,148,255)",
            color: "#fff",
            padding: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={handleDeleteAll}
        >
          Xóa tất cả
        </div>
      )}

      <Table
      ref={tableRef}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={products}
        //record chính là data của 1 dòng trong table === 1 obj của arr của data
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record?._id);
            }, // click row
          };
        }}
      />
      <Button type="primary" onClick={onDownload}>Export excel </Button>
    </Loading>
  );
}
