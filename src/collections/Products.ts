import slug from "@/fields/slug";
import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slug,
    {
      type: "row",
      fields: [
        {
          name: "description",
          type: "textarea",
          required: true,
        },
        {
          name: "technical_description",
          type: "textarea",
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "price",
          type: "number",
        },
        { name: "stock", type: "number" },
      ],
    },
    {
      name: "product_category",
      type: "relationship",
      relationTo: "categoryProduct",
      required: true,
    },
    {
      name: "work_product",
      type: "relationship",
      relationTo: "works",
      hasMany: true,
    },

    {
      name: "gallery",
      type: "array",
      fields: [
        {
          name: "image",
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
