import React, { useState } from "react";
import Loader from "../../shared/Loader";
import { MdAddShoppingCart } from "react-icons/md";
import { DataGrid } from "@mui/x-data-grid";
import { adminCategoriesColumns } from "../../helper/tableColumn";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../shared/Modal";
import AddCategoriesForm from "./AddCategoriesForm";
import { PackageX } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useCategoriesFilter } from "../../../hook/useCategoriesFilter";
import DeleteModal from "../../shared/DeleteModal";
import { deleteCategory } from "../../../store/actions";
import toast from "react-hot-toast";

const AdminCategories = () => {
  //  const [isLoading, setIsLoading] = useState(false);
  const { isLoading, errorMessage } = useSelector((state) => state.error);
  const [openUpdateCategoriesModal, setOpenUpdateCategoriesModal] =
    useState(false);
  const [openAddCategoriesModal, setOpenAddCategoriesModal] = useState(false);

  const { categories, pagination } = useSelector((state) => state.products);
  const [isLoader, setIsLoader] = useState(false);
  const [onDeleteModal, setOnDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  useCategoriesFilter();
  const emptyCategories = !categories || categories.length === 0;

  const [selectedCategory, setSelectedCategories] = useState("");

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  const tableRecords = categories?.map((item) => ({
    id: item?.categoryId,
    categoryName: item?.categoryName,
  }));
  const handleSave = () => {
    setOpenAddCategoriesModal(true);
    setSelectedCategories(null);
  };

  const handleEdit = (categories) => {
    setOpenUpdateCategoriesModal(true);
    setSelectedCategories(categories);
  };
  const handleDelete = (categories) => {
    setOnDeleteModal(true);
    setSelectedCategories(categories);
  };

  const deleteCategoryHandler = () => {
    dispatch(
      deleteCategory(toast, selectedCategory?.id, setIsLoader, setOnDeleteModal)
    );
  };

  return (
    <div className='overflow-x-auto'>
      <div className="flex items-center justify-between py-4">
        {/* Title */}
        <p className="font-semibold text-lg">All Categories </p>

        {/* Add Categories Button */}
        <button
          type="button"
          onClick={handleSave}
          className="flex idhover:cursor-pointer hover:cursor-pointer items-center gap-2 text-white bg-gradient-to-br from-indigo-600 to-indigo-500 
                           hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-indigo-300 
                           dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          <MdAddShoppingCart size={18} />
          Add Categories
        </button>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <Loader />
      ) : emptyCategories ? (
        <div className="flex flex-col items-center justify-center h-[80vh] py-10 text-gray-500">
          <PackageX size={40} />
          <p className="mt-2 text-sm">No categories found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <DataGrid
            className="w-full"
            rows={tableRecords}
            columns={adminCategoriesColumns(handleEdit, handleDelete)}
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
            pageSizeOptions={[pagination?.pageSize || 10]}
            pagination
            paginationOptions={{
              showFirstButton: true,
              showLastButton: true,
              hideNextButton: currentPage === pagination?.totalPages,
            }}
          />
        </div>
      )}

      <Modal
        isOpen={openUpdateCategoriesModal || openAddCategoriesModal}
        setIsOpen={
          openUpdateCategoriesModal
            ? setOpenUpdateCategoriesModal
            : setOpenAddCategoriesModal
        }
        title={
          openUpdateCategoriesModal
            ? "Update Category Form"
            : "Add New Category Form"
        }
        children={
          <AddCategoriesForm
            isLoader={isLoader}
            setIsLoader={setIsLoader}
            update ={openUpdateCategoriesModal ? update : ""}
            category={selectedCategory}
            setOpen={
              openUpdateCategoriesModal
                ? setOpenUpdateCategoriesModal
                : setOpenAddCategoriesModal
            }
          />
        }
      />
      <DeleteModal
        open={onDeleteModal}
        setOpen={setOnDeleteModal}
        title={"Categories"}
        onDeleteHandler={deleteCategoryHandler}
        loader={isLoader}
      />
    </div>
  );
};

export default AdminCategories;
