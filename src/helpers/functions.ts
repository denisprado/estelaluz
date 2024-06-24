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
