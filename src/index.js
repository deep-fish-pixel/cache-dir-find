const { getParent } = require('./file');
const executeByCondition = require('./executeByCondition');


function createDirectoryCache() {
  const directories = new Map();

  return {
    /**
     * 添加路径
     * @param path
     */
    add(path) {
      const parentDir = getParent(path);
      const children = this.getChildren(parentDir);
      children.push(path);
      directories.set(parentDir, children.sort());
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
