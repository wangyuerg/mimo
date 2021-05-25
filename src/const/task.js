const TASK_TYPE = {
  1: '优化任务', // 优化
  2: '栅格任务', // 栅格
  3: '工参任务', // 工参
}

const TASK_TYPE_RE = {
  优化任务: 1, // 优化
  栅格任务: 2, // 栅格
  工参任务: 3, // 工参
}

const TASK_STATUS = {
  1: '执行中', // 执行中
  2: '已完成', // 已完成
}
const TASK_STATUS_RE = {
  执行中: 1, // 执行中
  已完成: 2, // 已完成
}

export default {
  TASK_TYPE,
  TASK_STATUS,
  TASK_TYPE_RE,
  TASK_STATUS_RE,
}
