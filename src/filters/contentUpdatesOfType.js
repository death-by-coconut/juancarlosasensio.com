module.exports = contentUpdatesOfType = (collection, contentTypeStr) => {
  return collection.filter(item => item.data.belongs_to_content_of_type.includes(contentTypeStr));
}
