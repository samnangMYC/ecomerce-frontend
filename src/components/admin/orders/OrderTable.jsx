import { DataGrid } from "@mui/x-data-grid";
import { adminOrderColumns } from "../../helper/tableColumn";
import { useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import UpdateOrderForm from "./UpdateOrderForm";
import Modal from "../../shared/Modal"

const OrderTable = ({ adminOrders, pagination }) => {
  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const tableRecords = adminOrders?.map((item) => ({
    id: item.orderId,
    email: item.email,
    totalAmount: item.totalAmount,
    status: item.orderStatus,
    date: item.orderDate,
  }));

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  const handleEdit = (order) => {
    setSelectedItem(order);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="space-y-6 w-full">
      <h2 className="font-semibold">Order Table</h2>

      {/* Scrollable wrapper */}
      <div className="w-full overflow-x-auto overflow-y-auto h-[80vh] ">
        <div>
          <DataGrid
            className="w-full"
            rows={tableRecords}
            columns={adminOrderColumns(handleEdit)}
            paginationMode="server"
            rowCount={pagination?.totalElements || 0}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: pagination?.pageSize || 10,
                  page: currentPage - 1,
                },
              },
            }}
            onPaginationModelChange={handlePaginationChange}
            disableRowSelectionOnClick
            disableColumnResize
            paginationOptions={{
              showFirstButton: true,
              showLastButton: true,
              hideNextButton: currentPage === pagination?.totalPages,
            }}
            pagination
          />
        </div>
      </div>

      {/* Pass state to modal */}
      <Modal
        title="Update Order Status"
        isOpen={isOrderModalOpen}
        setIsOpen={setIsOrderModalOpen}
        children={
          <UpdateOrderForm
            setOpen={setIsOrderModalOpen}
            loader={loader}
            setLoader={setLoader}
            selectedItem={selectedItem}
          />
        }
      />
    </div>
  );
};

export default OrderTable;
