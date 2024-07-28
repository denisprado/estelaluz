import slug from "@/fields/slug";
import { CollectionConfig } from "payload";

export const CategoryWork: CollectionConfig = {
  slug: "categoryWork",
  labels: { singular: "Categoria da Obra", plural: "Categorias das Obras" },
  admin: {
    useAsTitle: "title",
    description: "Categorias das Obras de arte de Estela Luz",
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
      name: "description",
      type: "textarea",
      required: false,
      label: "Descrição",
    },
  ],
};
