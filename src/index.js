const { getParent, getSubDirectories } = require('./file');
const executeByCondition = require('./executeByCondition');


function createDirectoryCache() {
  const directories = new Map();
  let isFirstAdd = true;

  return {
    /**
     * 添加路径
     * @param path
     */
    add(path) {
      const parentDir = getParent(path);
      // 第一次获取所有子目录文件
      if (isFirstAdd) {
        getSubDirectories(parentDir, directories);
        isFirstAdd = false;
      }
      const parentChildren = this.getChildren(parentDir);
      const exist = parentChildren.some((child => child === path));
      if (!exist) {
        parentChildren.push(path);
        directories.set(parentDir, parentChildren.sort());
      }
      // 缓存该目录
      const children = directories.get(path);
      if (!children) {
        directories.set(path, []);
      }
    },
    /**
     * 移除路径
     * @param path
     */
    remove(path) {
      const parentDir = getParent(path);
      const children = this.getChildren(parentDir);
      // 移除父目录里的该文件
      directories.set(parentDir, children.filter(child => child !== path));
      // 移除该目录的内容
      directories.delete(path);
    },
    /**
     * 查找子路径
     * @param path
     */
    getChildren(parentDir, { exclude } = {}){
      const children = directories.get(parentDir) || [];
      return executeByCondition(exclude, () => {
        return children.filter(file => !exclude.some(flag => file.indexOf(flag) >= 0))
      }, children);
    },
    /**
     * 查找父目录
     * @param dir
     */
    getParent(dir){
      const parentDir = getParent(dir);
      return directories.get(parentDir) ? parentDir : null;
    },
    /**
     * 查找父目录
     * @param dir
     */
    exist(dir){
      return directories.has(dir);
    }
  }
}
/**
 * 创建缓存目录结构
 * @type {{add(*=): void, getChildren(*=, {exclude?: *}=): *, remove(*=): void}}
 */
module.exports = createDirectoryCache;

// 导出一个默认单例
Object.assign(module.exports,  createDirectoryCache());
