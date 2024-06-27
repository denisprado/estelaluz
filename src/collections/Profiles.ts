import { CollectionConfig } from "payload";

export const Profile: CollectionConfig = {
  slug: "profile",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "curriculum",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "description",
          type: "text",
        },
      ],
    },
    {
      name: "press",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "link",
          type: "text",
        },
      ],
    },
  ],
};
