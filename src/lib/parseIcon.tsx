export const getIcon = (name: string, mimetype: string): string => {
  if (mimetype.includes("audio")) {
    return `/file-mp3.svg`;
  }
  if (name?.split(".").length > 1) {
    return `/file-${name.split(".").reverse()[0]}.svg`;
  }
  if (mimetype?.split("/").length > 1) {
    return `/file-${
      mimetype
        .split("/")
        .reverse()[0]
        .split(".")
        .reverse()[0]
    }.svg`;
  }
  return `/file-no-extension.svg`;
};
