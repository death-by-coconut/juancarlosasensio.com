module.exports = contentUpdatesOfType = (collection, contentTypeStr) => {
  return collection.filter((item) => {
    const dataObj = item.data;
    let hasTag = false
    
    if ('tags' in dataObj && Array.isArray(dataObj.tags)) {
      hasTag = dataObj.tags.includes(contentTypeStr);
    }
    
    return hasTag;
  });
}
