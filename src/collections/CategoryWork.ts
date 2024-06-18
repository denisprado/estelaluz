import type { CollectionConfig } from "payload/types";

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
    {
      name: "slug",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: false,
    },
  ],
};
