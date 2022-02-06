const onlyUniqueFilter = require('./only-unique-filter');
  
module.exports = getUniqueTagsList = (collectionApi) => {
  let tags = [];

  collectionApi.forEach(item => {
    tags = [...tags, ...item.data.tags]
  })
  return tags.filter(onlyUniqueFilter)
}