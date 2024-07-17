import {
  CategoryProduct,
  CategoryWork,
  Media,
  Product,
  Work,
} from "@/payload-types";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";

export function getUrl(image: Media | number) {
  const src = typeof image !== "number" ? image?.filename! : "/media/";
  return src;
}
export function getThumUrl(image: Media | number) {
  const src =
    typeof image !== "number" ? image?.sizes?.thumbnail?.filename! : "/media/";
  return src;
}

//converte string to slug
export async function slugify(str: string) {
  return String(str)
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
}

// Função de guarda de tipo para coordenadas
export const hasCoordinates = (
  coordenadas: any
): coordenadas is { latitude: string; longitude: string } => {
  return (
    coordenadas &&
    typeof coordenadas.latitude === "string" &&
    typeof coordenadas.longitude === "string"
  );
};

export async function getCategories(
  collection: "categoryWork" | "categoryProduct"
): Promise<CategoryProduct[] | CategoryWork[]> {
  const payload = await getPayloadHMR({ config });
  const data = await payload.find<"categoryWork" | "categoryProduct">({
    collection: collection,
  });
  return data.docs as unknown as CategoryProduct[] | CategoryWork[];
}
