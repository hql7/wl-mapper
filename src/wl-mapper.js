/**
 * auth: weilan
 * 解决关于前后端分离接口字段定义无法统一的问题
 * 用于后台返回字段与前端定义参数建立映射关系
 */

 class WlMapper {
  /**
   * 初始设定
   * @param {*} src 目标对象
   * @param {*} source 源数据
   * @param {*} marge_keys:Array 需要将源数据复制到目标数据的字段
   * @param {*} is_arr:Boolean 源数据是否数组
   */
  constructor(src, source, marge, is_arr) {
    this.marge_keys = marge;
    if (is_arr) {
      this._src = src;
      this._source = [].concat(source);
      return;
    }
    this._src = Object.assign({}, src); // 前端声明的变量
    this._source = Object.assign({}, source); // 后台返回的数据
  }

  /**
   * 简单关系映射
   * @param {*} src_key 要建立映射关系的对象数据key
   * @param {*} source_key 要建立映射关系的源数据key
   */
  mapper(src_key/* : String */, source_key/* : String */) {
    if (!src_key || !source_key) return this;
    this.merge(this.marge_keys, this._src, this._source);
    if (!this.has(this._source, source_key)) return this;
    this._src[src_key] = this._source[source_key];
    return this;
  }

  /**
   * 复杂对象关系映射
   * @param {*} mapper 映射关系对象，其中单个成员的key为src的key，value为source的key
   * @param {*} deep 是否递归处理，如为真，则将属性值为对象或数组的元素根据src_key、source_key再映射一遍
   * @param {*} deep_src 递归时，下一轮对象数据
   * @param {*} deep_source 递归时，下一轮源数据
   */
  objMapper(mapper/* : Object */, deep/* : Boolean */ = false, deep_src/* :Object */ = this._src, deep_source/* :Object */ = this._source) {
    this.merge(this.marge_keys, deep_src, deep_source);
    if (!deep) {
      for (let i in mapper) {
        if (!this.has(this._source, mapper[i])) continue;
        this._src[i] = this._source[mapper[i]];
      }
      return this
    }
    for (let i in mapper) {
      if (!this.has(deep_source, mapper[i])) continue;
      if (!this.has(deep_src, i)) {
        deep_src[i] = deep_source[mapper[i]]
      }
      if (this.isObj(deep_source[mapper[i]])) {
        this.objMapper(mapper, deep, deep_src[i], deep_source[mapper[i]]);
        continue
      }
      if (this.isArr(deep_source[mapper[i]])) {
        this.arrMapper(mapper, deep_src[i], deep_source[mapper[i]]);
        continue
      }
      deep_src[i] = deep_source[mapper[i]]
    }
    return this
  }

  /**
   * 复杂数组关系映射
   * @param {*} mapper 映射关系对象，其中单个成员的key为src的key，value为source的key
   * @param {*} deep_src 递归时，下一轮对象数据
   * @param {*} deep_source 递归时，下一轮源数据
   */
  arrMapper(mapper/* : Object */, deep_src/* :Object */ = this._src, deep_source/* :Object */ = this._source) {
    for (const item of deep_source) {
      deep_src.push(item);
      if (this.isObj(item)) {
        this.objMapper(mapper, true, item, item);
        continue
      }
      if (this.isArr(item)) {
        this.arrMapper(mapper, item, item);
        continue
      }
    }
  }

  /**
   * 将指定字段合并至目标对象
   * @param {*} keys 需要合并的字段
   * @param {*} deep_src 目标对象
   * @param {*} deep_source 源数据
   */
  merge(keys/* : Array */, deep_src/* :Object */ = this._src, deep_source/* :Object */ = this._source) {
    if (!this.isArr(keys)) return this;
    keys.forEach(i => {
      deep_src[i] = deep_source[i]
    })
    return this
  }

  /**
   * 校验数据是否数组
   * @param {*} data 数据
   */
  isArr(data) {
    return Array.isArray(data);
  }

  /**
   * 校验数据是否对象
   * @param {*} data 数据
   */
  isObj(data) {
    // return data.constructor == Object;
    return Object.prototype.toString.call(data) === '[object Object]';
  }

  /**
   * 检查数据对象中是否有指定键
   * @param {*} data 数据
   * @param {*} key 键
   */
  has(data, key) {
    return data.hasOwnProperty(key);
  }
}

export default WlMapper;