exports.getSinglePhotoName = (photo) => {
  if (!photo) return;
  const dividerIdx = photo.indexOf(',');
  // if the user has several photos, get first one
  return dividerIdx >= 0 ? photo.slice(0, dividerIdx) : photo;
};
