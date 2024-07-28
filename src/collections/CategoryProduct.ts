import slug from "@/fields/slug";
import { CollectionConfig } from "payload";

export const CategoryProduct: CollectionConfig = {
  slug: "categoryProduct",
  labels: {
    singular: "Categoria do Produto",
    plural: "Categorias dos Produtos",
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Título",
    },
    slug,
    {
      name: "description",
      type: "textarea",
      label: "Descrição",
      required: false,
    },
  ],
};
