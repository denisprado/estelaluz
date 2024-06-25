import slug from "@/fields/slug";
import { CollectionConfig } from "payload";

export const CategoryWork: CollectionConfig = {
  slug: "categoryWork",
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
