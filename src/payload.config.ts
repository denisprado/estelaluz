// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { pt } from "payload/i18n/pt";

import { fileURLToPath } from "url";

import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { buildConfig } from "payload";
import { CategoryWork } from "./collections/CategoryWork";
import { Courses } from "./collections/Courses";
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
import { Work } from "./collections/Work";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

async function getData(cat: number) {
  const payload = await getPayloadHMR({ config: configPromise });
  const data = await payload.find({
    collection: "categoryWork",
    where: {
      id: {
        equals: cat,
      },
    },
  });
  return data.docs[0].slug;
}

export default buildConfig({
  cors: "*",
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
  admin: {
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
      url: async ({ data }) =>
        `${process.env.NEXT_PUBLIC_SERVER_URL}/${await getData(
          data.category
        )}/${data.slug}`,
      collections: ["work"],
    },
  },
  collections: [Users, Work, Courses, CategoryWork, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  i18n: { supportedLanguages: { pt } },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),

  plugins: [
    // storage-adapter-placeholder
  ],
});
