import { slugify } from "@/helpers/functions";
import { Field } from "payload";

const slug: Field = {
  name: "slug",
  type: "text",
  unique: true,
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
      async ({ data }) => {
        return `${await slugify(data?.title)}`;
      },
    ],
  },
};

export default slug;
