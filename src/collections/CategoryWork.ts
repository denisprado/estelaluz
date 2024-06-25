import { slugify } from "@/helpers/functions";
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
    {
      name: "slug",
      type: "text",
      admin: {
        hidden: true, // hides the field from the admin panel
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // ensures data is not stored in DB
            delete siblingData["slug"];
          },
        ],
        afterRead: [
          ({ data }) => {
            return `${slugify(data?.title)}`;
          },
        ],
      },
    },
    {
      name: "description",
      type: "textarea",
      required: false,
    },
  ],
};
