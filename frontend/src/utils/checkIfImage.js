export const checkIfRealnImgSrc = (imgSrc) => {
  const validImageTypes = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "com"];

  if (Array.isArray * imgSrc && imgSrc.length) {
    const type = imgSrc[0].split(".")[1].toLowerCase();
    return validImageTypes.includes(type) ? imgSrc[0] : false;
  } else if (typeof imgSrc === "string") {
    const type = imgSrc.split(".")[1]?.toLowerCase();
    return validImageTypes.includes(type) ? imgSrc : false;
  }
  return false;
};

