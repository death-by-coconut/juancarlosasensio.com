const onlyUniqueFilter = require('./only-unique-filter');
  
module.exports = getUniqueTagsList = (collection) => {
  let tags = [];

  collection.forEach(item => {
    tags = [...tags, ...item.data.tags]
  })
  return tags.filter(onlyUniqueFilter)
}