import type {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import type { FormProductValues } from "../../../schema";
import { InputForm, SelectForm } from "../../Common";
import { categories } from "../../../constants";

type FormAddProductUIProps = {
  control: Control<FormProductValues>;
  handleSubmit: UseFormHandleSubmit<FormProductValues>;
  errors: FieldErrors<FormProductValues>;
  onSubmit: SubmitHandler<FormProductValues>;
  messageProduct: string;
  title: string;
  labelButton: string;
  isLoading: boolean;
};
export const FormProductUI = ({
  control,
  errors,
  handleSubmit,
  onSubmit,
  messageProduct,
  title,
  isLoading,
  labelButton,
}: FormAddProductUIProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="lg:min-w-[600px]">
      <h3 className="font-bold text-center text-xl">{title}</h3>
      <span
        className={` md:text-sm text-center text-xs min-h-6 ${
          messageProduct.includes("success")
            ? "text-success dark:text-success-dark"
            : "text-error dark:text-error-dark"
        } text-pretty px-1 w-full flex items-center justify-center`}
      >
        {messageProduct}
      </span>
      <InputForm
        control={control}
        id="title"
        label="Product Title"
        placeholder="Enter product title"
        error={errors.title}
      />
      <InputForm
        control={control}
        id="description"
        label="Product Description"
        placeholder="Enter a short description"
        error={errors.description}
      />
      <div className="grid grid-cols-2 w-full gap-4">
        <InputForm
          control={control}
          id="stock"
          label="Stock Quantity"
          placeholder="Enter available stock"
          error={errors.stock}
        />
        <InputForm
          control={control}
          id="price"
          label="Price ($)"
          placeholder="Enter product price"
          error={errors.price}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 w-full">
        <SelectForm
          control={control}
          options={categories}
          id="category"
          label="Categories"
          error={errors.category}
        />
        <InputForm
          control={control}
          id="thumbnail"
          label="Thumbnail URL"
          placeholder="Enter image URL"
          error={errors.thumbnail}
        />
      </div>
      <button type="submit" className="button mt-6" disabled={isLoading}>
        {labelButton}
      </button>
    </form>
  );
};
