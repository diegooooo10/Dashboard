import { zodResolver } from "@hookform/resolvers/zod";
import {
  loadProductSchema,
  type FormProductType,
  type FormProductValues,
} from "../../../schema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { FormProductUI } from "./FormProductUI";
import { useModalStore, useCurrentProductStore } from "../../../store";
import { updateProduct } from "../../../services";
import type { Category } from "../../../types";
import { showToast } from "../../ShowToast";

export const FormModifiedProduct = () => {
  const [schema, setSchema] = useState<FormProductType | null>(null);
  const [messageProduct, setMessageProduct] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentProduct } = useCurrentProductStore();
  const changeModal = useModalStore((state) => state.changeModal);

  if (!currentProduct) changeModal("");

  useEffect(() => {
    loadProductSchema().then((schema: FormProductType) => setSchema(schema));
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProductValues>({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onBlur",
    defaultValues: {
      category: currentProduct?.category,
      description: currentProduct?.description,
      price: currentProduct?.price.toString(),
      stock: currentProduct?.stock.toString(),
      thumbnail: currentProduct?.thumbnail,
      title: currentProduct?.title,
    },
  });

  const onSubmit: SubmitHandler<FormProductValues> = async (values) => {
    if (isLoading) return;
    if (!currentProduct) return;
    setIsLoading(true);
    const productUpdate = {
      category: values.category as Category,
      description: values.description,
      id: currentProduct.id,
      price: Number(values.price),
      stock: Number(values.stock),
      thumbnail: values.thumbnail,
      title: values.title,
    };

    const message = await updateProduct(productUpdate);
    setMessageProduct(message);
    if (message.includes("successfully")) {
      changeModal("");
      showToast(message);
    } else {
      setIsLoading(false);
      setTimeout(() => {
        setMessageProduct("");
      }, 3000);
    }
  };
  return (
    <FormProductUI
      title="Update Product"
      labelButton="Update Product"
      isLoading={isLoading}
      control={control}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      messageProduct={messageProduct}
    />
  );
};
