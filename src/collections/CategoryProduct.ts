import slug from "@/fields/slug";
import { CollectionConfig } from "payload";

export const CategoryProduct: CollectionConfig = {
  slug: "categoryProduct",
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
      name: "description",
      type: "textarea",
      required: false,
    },
  ],
};
