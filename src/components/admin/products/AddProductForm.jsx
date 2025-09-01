import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import InputField from "../../shared/InputField";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import Spinners from "../../shared/Spinners";
import {
  addNewProductFromDashboard,
  fetchCategories,
  updateProductFromDashboard,
} from "../../../store/actions";
import toast from "react-hot-toast";
import SelectTextField from "../../shared/SelectTextField";
import Skeleton from "../../shared/Skeleton";
import ErrorPage from "../../shared/ErrorPage";

const AddProductForm = ({ setOpen, update = false, product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState("");
  const { categories } = useSelector((state) => state.products);
  const { categoryLoader, errorMessage } = useSelector((state) => state.error);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  // Watch price and discount for calculating special price
  const price = useWatch({ control, name: "price" });
  const discount = useWatch({ control, name: "discount" });

  // Calculate special price when price or discount changes
  useEffect(() => {
    if (price && discount >= 0) {
      const calculatedSpecialPrice = price - (price * discount) / 100;
      setValue("specialPrice", +calculatedSpecialPrice.toFixed(2));
    }
  }, [price, discount, setValue]);

  // Pre-fill fields if updating
  useEffect(() => {
    if (update && product) {
      setValue("productName", product?.productName);
      setValue("price", product?.price);
      setValue("discount", product?.discount * 100);
      setValue("quantity", product?.quantity);
      setValue("specialPrice", product?.specialPrice);
      setValue("description", product?.description);
    }
  }, [update, product, setValue]);

  const saveProductHandler = (data) => {
    const payload = {
      ...data,
      id: product?.id,
      discount: data.discount / 100,
    };

    if (update) {
      dispatch(
        updateProductFromDashboard(payload, toast, reset, setIsLoading, setOpen)
      );
    } else {
      const sendData = {
        ...data,
        categoryId: selectedCategories.categoryId,
        discount: data?.discount / 100
      }
      // TODO: Add product creation logic here
      dispatch(addNewProductFromDashboard(sendData,toast,reset,setIsLoading,setOpen));
    }
  };

  useEffect(() => {
    if (!update) {
      dispatch(fetchCategories());
    }
  }, [dispatch, update]);

  useEffect(() => {
    if (!categoryLoader && categories) {
      setSelectedCategories(categories[0]);
    }
  }, [categories]);

  if(categoryLoader) return <Skeleton />
  if(errorMessage) return <ErrorPage message={errorMessage} />

  return (
    <div className="p-6 flex flex-col h-full">
      <form onSubmit={handleSubmit(saveProductHandler)} className="space-y-4">
        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Product Name *"
            required
            id="productName"
            type="text"
            message="This field is required*"
            placeholder="Macbook Pro M4"
            register={register}
            errors={errors}
          />
        </div>
        {!update && (
          <div className="flex md:flex-row flex-col gap-4 w-full">
            <SelectTextField
              label="Select Categeries"
              selected={selectedCategories}
              setSelect={setSelectedCategories}
              lists={categories}
            />
          </div>
        )}

        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Price *"
            required
            id="price"
            type="number"
            step="any"
            message="This field is required*"
            placeholder="3499.99"
            register={register}
            errors={errors}
          />

          <InputField
            label="Quantity *"
            required
            id="quantity"
            type="number"
            message="This field is required*"
            placeholder="10"
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex md:flex-row flex-col gap-4 w-full">
          <InputField
            label="Special Price (Auto Calculated) *"
            required
            id="specialPrice"
            type="number"
            step="any"
            disabled
            message="This field is auto-calculated*"
            placeholder="Auto-calculated"
            register={register}
            errors={errors}
          />

          <InputField
            label="Discount % *"
            required
            id="discount"
            type="number"
            step="any"
            message="This field is required*"
            placeholder="15"
            register={register}
            errors={errors}
          />
        </div>

        <div className="md:flex-row flex-col gap-4 w-full">
          <label htmlFor="description" className="text-sm text-slate-800">
            Description *
          </label>
          <textarea
            id="description"
            placeholder="Enter product description..."
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-slate-800 placeholder-gray-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
            rows={5}
          />
          {errors?.description?.message && (
            <p className="text-sm text-red-600 font-medium mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4 mb-6 mr-6">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            variant="contained"
            color="primary"
          >
            {isLoading ? (
              <div className="flex gap-2">
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

export default AddProductForm;
