import colorField from "@/fields/pickColor";
import slug from "@/fields/slug";
import { CollectionConfig } from "payload";

export const Courses: CollectionConfig = {
  slug: "courses",
  labels: { singular: "Curso", plural: "Cursos" },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    slug,
    {
      name: "title",
      type: "text",
      required: true,
      label: "Título",
    },
    {
      name: "url",
      type: "text",
      required: true,
      unique: true,
      label: "Url do curso",
    },
    {
      name: "description",
      type: "textarea",
      required: false,
      label: "Descrição",
    },
    colorField,
  ],
};
