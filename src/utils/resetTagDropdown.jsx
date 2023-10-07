export const resetTagsDropdown = (
  initialTagsFromFetch,
  currentSelectedTags
) => {
  return initialTagsFromFetch.filter(
    (tag) => !currentSelectedTags.some((t) => t.id === tag.id)
  );
};
