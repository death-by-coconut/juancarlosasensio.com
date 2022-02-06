module.exports = contentUpdatesOfType = (collection, contentTypeStr) => {
  return collection.filter((item) => {
    const dataObj = item.data;
    let belongsToContentType = false;
    let hasTag = false
    
    if ('belongs_to_content_of_type' in dataObj && Array.isArray(dataObj.belongs_to_content_of_type)) {
      belongsToContentType = dataObj.belongs_to_content_of_type.includes(contentTypeStr);
    }
    
    if ('tags' in dataObj && Array.isArray(dataObj.tags)) {
      hasTag = dataObj.tags.includes(contentTypeStr);
    }
    
    return belongsToContentType || hasTag;
  });
}
