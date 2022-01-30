module.exports = contentUpdatesForDemo = (collection, contentTypeStr) => {
  return collection.filter(item => item.data.belongs_to_specific_file_or_page.includes(contentTypeStr));
}