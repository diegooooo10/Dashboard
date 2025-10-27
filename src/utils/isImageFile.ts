export const isImageFile = (filename: string) => {
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".bmp",
    ".tiff",
  ];
  return imageExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
};
