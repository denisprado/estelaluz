import { GlobalConfig } from "payload";

export const Profile: GlobalConfig = {
  slug: "profile",
  label: "Perfíl",
  fields: [
    {
      name: "image",
      label: "Foto",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "name",
      label: "Nome",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Descrição",
      type: "textarea",
      required: true,
    },
    {
      name: "phone",
      label: "Telefone",
      type: "text",
    },
    {
      name: "curriculum",
      label: "Currículo",
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
      label: "Na mídia",
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
