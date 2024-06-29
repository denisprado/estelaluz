// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { pt } from "payload/i18n/pt";
import sharp from "sharp";
import { fileURLToPath } from "url";

import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import {
  CategoryProduct,
  CategoryWork,
  Courses,
  Media,
  Products,
  Users,
  Works,
} from "./collections";
import { Profile } from "./collections/Profiles";

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
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
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
      collections: ["works"],
    },
  },
  collections: [
    Users,
    Profile,
    Works,
    Courses,
    CategoryWork,
    Media,
    Products,
    CategoryProduct,
  ],
  editor: slateEditor({}),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
    declare: false,
  },
  i18n: { supportedLanguages: { pt } },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION!,
      },
    }),
  ],
});
