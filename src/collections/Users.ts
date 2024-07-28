import { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Usuário", plural: "Usuários" },
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
};
