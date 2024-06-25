import { Media } from "@/payload-types";

export function getUrl(image: Media | number) {
  console.log(image);
  // const src =
  //   typeof image !== "number"
  //     ? `https://s3.amazonaws.com/` + "estelaluz" + "/" + image?.filename!
  //     : "/media/";
  const src = typeof image !== "number" ? image?.url! : "/media/";
  return src;
}

export function slugify(str: string) {
  return String(str)
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
}
