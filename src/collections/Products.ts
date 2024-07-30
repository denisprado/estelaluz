import slug from "@/fields/slug";
import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  labels: { singular: "Produto", plural: "Produtos" },
  admin: {
    useAsTitle: "title",
    description: "Produtos",
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
      type: "row",
      fields: [
        {
          name: "description",
          label: "Descrição",
          type: "richText",
        },
        {
          name: "technical_description",
          label: "Descrição Técnica",
          type: "richText",
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "price",
          label: "Preço",
          type: "number",
        },
        { name: "stock", type: "number" },
      ],
    },
    {
      name: "category",
      label: "Categoria do Produto",
      type: "relationship",
      relationTo: "categoryProduct",
      required: true,
    },
    {
      name: "work_product",
      type: "relationship",
      relationTo: "works",
      label: "Trabalho relacionado",
      hasMany: true,
    },

    {
      name: "gallery",
      type: "array",
      label: "Galeria de Imagens",
      fields: [
        {
          name: "image",
          label: "Imagem",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data, index }) => {
            return data?.title || `Imagem ${String(index).padStart(2, "0")}`;
          },
        },
      },
    },
  ],
};
