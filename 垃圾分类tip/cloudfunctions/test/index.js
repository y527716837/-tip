// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log("调用云函数");
  const targetDB = db.collection(event.db);
  try {
    if (event.type == "insert") {
      return await targetDB.add({
        data: event.data
      })
    }

    if (event.type == "update") {
      return await targetDB.doc(event.indexKey).update({
        data: event.data
      })
    }

    if (event.type == "delete") {
      return await targetDB.where(event.condition).remove()
    }

    if (event.type == "get") {
      //设置最大条数
      const Max_limit = 100;
      //计算集合总数
      const count = await targetDB.count();
      const total=count.total;
      //计算需要分几次取
      const batchTimes = Math.ceil(total / Max_limit);
      //定义数组
      const tasks =[];
      for (let i = 0;i < batchTimes; i++) {
        const promise = targetDB.where(event.condition).skip(i * Max_limit).limit(Max_limit).get();
        tasks.push(promise);
      }
      return await Promise.all(tasks)
    }
  } catch (e) {
    console.error(e)
  }
}