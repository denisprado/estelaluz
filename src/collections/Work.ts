import BulkUpload from "@/components/BulkUpload/exportBulkAsClient";
import type { CollectionConfig } from "payload/types";

export const Work: CollectionConfig = {
  slug: "work",
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
      unique: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      required: true,
      relationTo: "media",
      filterOptions: {
        mimeType: { contains: "image" },
      },
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
