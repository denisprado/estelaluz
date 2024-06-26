import slug from "@/fields/slug";
import { CollectionConfig } from "payload";

export const Works: CollectionConfig = {
  slug: "works",
  admin: {
    useAsTitle: "slug",
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
      required: true,
    },
    {
      name: "technical_description",
      type: "textarea",
      required: true,
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
    },
    {
      name: "coordenadas",
      type: "group",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "longitude",
              type: "text",
            },
            {
              name: "latitude",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categoryWork",
    },
  ],
};
