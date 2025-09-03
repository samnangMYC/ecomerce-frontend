import React, { useEffect } from "react";
import InputField from "../../shared/InputField";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import Spinners from "../../shared/Spinners";
import { useDispatch } from "react-redux";
import {
  addNewCategoryFromDashboard,
  updateCategoryFromDashboard,
} from "../../../store/actions";
import toast from "react-hot-toast";

const AddCategoriesForm = ({
  isLoader,
  setIsLoader,
  update = false,
  category,
  setOpen,
}) => {
  //  console.log("Category: " + category.categoryName);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    if (update && category) {
      setValue("categoryName", category?.categoryName);
    }
  }, [category, setValue, update]);

  const saveCategoryHandler = (data) => {
    const sendData = {
      ...data,
      categoryId: category?.id,
    };
    // console.log(sendData);
    if (update) {
      // update category
      dispatch(
        updateCategoryFromDashboard(
          sendData,
          toast,
          reset,
          setIsLoader,
          setOpen
        )
      );
    } else {
      // create new category
      const sendData = {
        ...data,
      };
      dispatch(
        addNewCategoryFromDashboard(
          sendData,
          toast,
          reset,
          setIsLoader,
          setOpen
        )
      );
    }
  };

  return (
    <div className="p-6 flex flex-col h-full">
      <form
        className="flex flex-col flex-grow space-y-4"
        onSubmit={handleSubmit(saveCategoryHandler)}
      >
        <InputField
          label="Category Name *"
          required
          id="categoryName"
          type="text"
          message="This field is required*"
          placeholder="Drink"
          register={register}
          errors={errors}
        />

        {/* Spacer pushes buttons to bottom */}
        <div className="flex-grow" />

        <div className="flex justify-end gap-4">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoader}
            variant="contained"
            color="primary"
          >
            {isLoader ? (
              <div className="flex items-center gap-2">
                <Spinners className="text-white" />
                Updating...
              </div>
            ) : update ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoriesForm;
