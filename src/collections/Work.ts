import { CollectionConfig } from "payload";

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
      name: "gallery",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "caption",
          type: "text",
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
