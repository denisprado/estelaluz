import slug from "@/fields/slug";
import { CollectionConfig } from "payload";

export const Works: CollectionConfig = {
  slug: "works",
  access: {
    read: () => true,
    create: () => true,
  },
  labels: { singular: "Obra", plural: "Obras" },
  admin: {
    useAsTitle: "title",
    description: "Obras de arte de Estela Luz",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Título",
    },
    slug,
    {
      name: "sticky",
      type: "checkbox",
      index: true,
      label: "Fixado (a obra aparecerá sempre antes das não fixadas)",
    },
    {
      name: "description",
      type: "richText",
      label: "Descrição",
    },
    {
      name: "technical_description",
      type: "richText",
      label: "Descrição técnica",
    },
    {
      name: "gallery",
      type: "array",
      labels: { plural: "imagens", singular: "imagem" },
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
      name: "category",
      label: "Tipo de obra",
      type: "relationship",
      relationTo: "categoryWork",
    },
    {
      name: "mapUrl",
      type: "text",
      label: "Endereço (url) no Google Street View",
    },
    // {
    //   name: "coordenadas",
    //   type: "group",
    //   fields: [
    //     {
    //       type: "row",
    //       fields: [
    //         {
    //           name: "longitude",
    //           type: "text",
    //         },
    //         {
    //           name: "latitude",
    //           type: "text",
    //         },
    //       ],
    //     },
    //   ],
    // },
  ],
};
