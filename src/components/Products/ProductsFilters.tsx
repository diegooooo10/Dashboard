import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { categories } from "../../constants";
import { useModalStore } from "../../store";
import type {
  Category,
  CategoryFilterType,
  ProductsFiltersType,
  Rol,
} from "../../types";
import { IconPlus } from "../Icons";
type ProductsFiltersProps = {
  rol: Rol;
  productFilter: ProductsFiltersType;
  setProductFilter: Dispatch<SetStateAction<ProductsFiltersType>>;
};
export const ProductsFilters = ({
  productFilter,
  rol,
  setProductFilter,
}: ProductsFiltersProps) => {
  const [currentTitle, setCurrentTitle] = useState<string>("");
  const changeModal = useModalStore((state) => state.changeModal);
  const changeCategory = (value: CategoryFilterType) => {
    if (categories.includes(value as Category) || value === "Default") {
      setProductFilter((prev) => ({ ...prev, category: value }));
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProductFilter((prev) => ({ ...prev, title: currentTitle }));
    }, 400);

    return () => clearTimeout(timeout);
  }, [currentTitle, setProductFilter]);

  return (
    <div className=" flex lg:flex-row flex-col lg:items-center  gap-2">
      <select
        name="category-input"
        id="category-input"
        className="outline px-2 py-1 flex items-center rounded-md  h-8 bg-bg-card dark:bg-bg-card-dark text-text dark:text-text-dark outline-border dark:outline-border-dark focus:outline-primary dark:focus:outline-primary-dark"
        value={productFilter.category}
        onChange={(e) =>
          changeCategory(e.target.value.trim() as CategoryFilterType)
        }
      >
        <option value="Default">Default</option>
        {categories.map((category) => (
          <option value={category} key={category}>{category}</option>
        ))}
      </select>
      <label htmlFor="title-input" aria-label="search product by title">
        <input
          type="text"
          value={currentTitle}
          name="title-input"
          id="title-input"
          placeholder="Search product title..."
          onChange={(e) => {
            const value = e.target.value.trim().toLowerCase();
            setCurrentTitle(value);
          }}
          className="px-2 py-1 rounded-md h-8 lg:w-72 w-full bg-bg-card dark:bg-bg-card-dark text-text dark:text-text-dark dark:outline-border-dark outline-border focus:outline-primary dark:focus:outline-primary-dark outline"
        />
      </label>
      {(rol === "admin" || rol === "manager") && (
        <button
          className="bg-primary dark:bg-primary-dark rounded-md p-2 cursor-pointer text-center flex items-center justify-center"
          aria-label="Add Product"
          onClick={() => changeModal("addProduct")}
        >
          <IconPlus className="text-text-dark " />
        </button>
      )}
    </div>
  );
};
