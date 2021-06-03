const fs = require('fs');
const path = require('path');

function getParent(path) {
  return path.replace(/\/[^\/]+(\.\w+|\/)?$/, '');
}

function getSubDirectories(entry, cacheMap) {
  const dirInfo = fs.readdirSync(entry);
  const subDirs = [];
  dirInfo.forEach(item=>{
    const location = path.join(entry, item);
    subDirs.push(location);
    const info = fs.statSync(location);
    if(info.isDirectory()){
      getSubDirectories(location, cacheMap);
    }
  });
  cacheMap.set(entry, subDirs);
}
module.exports = {
  getParent,
  getSubDirectories
}
