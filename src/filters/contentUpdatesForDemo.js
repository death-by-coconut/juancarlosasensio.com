module.exports = contentUpdatesForDemo = (collection, contentTypeStr) => {
  return collection.filter(item => item.data.belongs_to.includes(contentTypeStr));
}