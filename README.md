# wl-mapper

  在前后端分离的开发环境下，前后端并行开始时势必会产生双方定义字段完全不统一的问题。    
  比较规范的公司会在代码开发前先进行前后端详细设计文档的编写和评审，但是一方面实行此流程的公司不多又繁琐，一方面后端也不保证写好文档后在后续的开发中就一定不再更改字段名。    
  在笔者的开发过程中此问题尤为突出：  
    1. 编写文档耗时耗力，且不为开发重视，敷衍了事   
    2. 开发周期实在太短，测试的时间都被优化掉何谈文档   
    3. 文档评审完毕入库之后，在实际开发中后台仍会根据需求更换字段     
    4. 接口繁多，字段量着实巨大           
  笔者大多时候只能在后台接口开发完毕后，手动去对应后台字段与前端变量的映射，但是问题明显，一个是数据量大，一个是后台修改之后如果不通知前端，则前端逻辑将无法运行得出正确结果。

  ### wl-mapper是一个js映射类，即尝试解决前后台接口大量字段的对应关系

  目前支持简单的单变量映射、对象字段映射、数组字段映射      
    1. 简单映射   
        映射对象中的一个字段    
    2.  对象字段映射    
        映射对象中传入的指定字段集    
    3. 数组字段映射       
        数组的情况大多是获取列表时，此时前端通常使用空数组接收因此无法建立常规意义上的映射，因此是对返回数据进行处理然后形成新的数组内容    
    注意：函数并不返回某个处理后的数据而是返回当前类

  ### 文档
  >  constructor(src, source, merge_keys, is_arr) 实例化时接收四个参数,分别是：    
    1. src: Object 前端声明的变量对象  
    2. source: [Object, Array] 后台返回的实体  
    3. merge_keys: Array 指定将source中的key直接复制到src对象，来映射前端不太会提前声明的各种数据库ids  
    4. is_arr: Boolean 表示source是否为数组

  > mapper(src_key, source_key)   
    1. src_key: String 要建立映射关系的对象数据key    
    2. src_key: String 要建立映射关系的源数据key

  > objMapper(mapper, deep, deep_src, deep_source)    
    1. mapper: Object 映射关系对象，其中单个成员的key为src的key，value为source的key   
    2. deep: Boolean 是否递归处理，如为真，则将属性值为对象或数组的元素根据src_key、source_key再映射一遍  
    3. deep_src: Object 递归时，下一轮对象数据    
    4. deep_source: Object 递归时，下一轮源数据

  > arrMapper(mapper, deep_src)   
    1. mapper: Object 映射关系对象，其中单个成员的key为src的key，value为source的key  
    2. deep_src: Object 递归时，下一轮对象数据    
    3. deep_source: Object 递归时，下一轮源数据

  > merge(keys, deep_src, deep_source) 
    1. keys: Array 指定将source中的key直接复制到src对象，来映射前端不太会提前声明的各种数据库ids   
    2. deep_src: Object 递归时，下一轮对象数据    
    3. deep_source: Object 递归时，下一轮源数据

  ### 简单的小例子
  ```
    // 操作一下试试
    import WlMapper from "wl-mapper";

    let aa = { x: { h: 8 }, y: 1 };
    let bb = { y: { e: 12, ff: "0001" }, f: 4, id: "0000" };

    let mapper1 = new WlMapper(aa, bb, ["id"]);
    let mapper2 = new WlMapper(aa, bb, ["id"]);
    let mapper3 = new WlMapper(aa, bb);

    // 简单映射，单个字段
    console.log(mapper1.mapper("x", "y"));

    // 复杂映射，多个字段，可递归
    console.log(mapper2.objMapper({ x: "y", y: "f", h: "e" }, true));

    // 调用指定字段的映射后，合并其他字段
    console.log(
      mapper3.objMapper({ x: "y", y: "f", h: "e" }, true).merge(["id"])
    );
  ```

### 小坑
  webpack打包后的类调用报错，啊！可恶的面向百度webpack工程师
  ```
   wl_mapper__WEBPACK_IMPORTED_MODULE_1___default.a is not a constructor"
  ```
  先发布未打包的源码吧