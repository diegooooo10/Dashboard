import { useEffect, useState } from "react";
import {
  loadProductSchema,
  type FormProductType,
  type FormProductValues,
} from "../../../schema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProductUI } from "./FormProductUI";
import { addProduct } from "../../../services";
import type { ProductModel } from "../../../models";
import type { Category } from "../../../types";
import { useModalStore } from "../../../store";
import { showToast } from "../../ShowToast";

export const FormAddProduct = () => {
  const [schema, setSchema] = useState<FormProductType | null>(null);
  const [messageProduct, setMessageProduct] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const changeModal = useModalStore((state) => state.changeModal);
  useEffect(() => {
    loadProductSchema().then((schema: FormProductType) => setSchema(schema));
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormProductValues>({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onBlur",
    defaultValues: {
      category: "",
      description: "",
      price: "",
      stock: "",
      thumbnail: "",
      title: "",
    },
  });

  const onSubmit: SubmitHandler<FormProductValues> = async (values) => {
    if (isLoading) return;
    setIsLoading(true);
    const product: ProductModel = {
      category: values.category as Category,
      description: values.description,
      id: crypto.randomUUID(),
      price: Number(values.price),
      stock: Number(values.stock),
      thumbnail: values.thumbnail,
      title: values.title,
    };
    const message = await addProduct(product);
    setMessageProduct(message);
    if (message.includes("successfully")) {
      changeModal("");
      showToast(message);
    } else {
      setTimeout(() => {
        setMessageProduct("");
      }, 3000);
      reset();
      setIsLoading(false);
    }
  };

  return (
    <FormProductUI
      title="Add New Product"
      labelButton="Add Product"
      isLoading={isLoading}
      onSubmit={onSubmit}
      control={control}
      handleSubmit={handleSubmit}
      errors={errors}
      messageProduct={messageProduct}
    />
  );
};
