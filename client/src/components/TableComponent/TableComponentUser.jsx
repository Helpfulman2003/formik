import { Button, Space, Table } from "antd";
import React, { useRef } from "react";
import Loading from "../LoadingComponet/Loading";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import InputForm from "../InputForm/InputForm";
import { useDownloadExcel } from "react-export-table-to-excel";

export default function TableComponentUser(props) {
  const {
    selectionType = "checkbox",
    user,
    isLoading,
    setIsOpenDrawer,
    setRowSelected,
    setIsModalOpenDelete,
  } = props;
  const searchInput = useRef(null);
  const tableRef = useRef(null);

  const handleDetailUser = () => {
    setIsOpenDrawer(true);
  };

  const handleDeleteUser = () => {
    setIsModalOpenDelete(true);
  };

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ fontSize: "16px", cursor: "pointer" }}
          onClick={handleDeleteUser}
        />
        <EditOutlined
          style={{ fontSize: "16px", cursor: "pointer" }}
          onClick={handleDetailUser}
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
          handleFunction={(e) => {
            return setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
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
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      filters: [
        {
          text: "TRUE",
          value: true,
        },
        {
          text: "FALSE",
          value: false,
        },
      ],
      onFilter: (value, record) => {
        if (value === true) {
          return record.isAdmin === "True";
        } else {
          return record.isAdmin === "False";
        }
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
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
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Product table",
    sheet: "Product",
  });

  return (
    <Loading isLoading={isLoading}>
      <Table
        ref={tableRef}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={user}
        //record chính là data của 1 dòng trong table === 1 obj của arr của data
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setRowSelected(record?._id);
            }, // click row
          };
        }}
      />
      <Button type="primary" onClick={onDownload}>
        Export excel{" "}
      </Button>
    </Loading>
  );
}
