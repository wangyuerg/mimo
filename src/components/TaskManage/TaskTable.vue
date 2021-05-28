<template>
  <div class="task-table">
    <a-table
      :columns="columns"
      :data-source="tableDataShow"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      class="table-content"
    >
      <a
        slot="action"
        slot-scope="text, record"
        @click="record.action[1](record)"
        >{{ record.action[0] }}</a
      >
    </a-table>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { task } from '../../const/index'
import { taskHttp, dataHttp } from '../../util/api/index'
export default {
  name: 'TaskTable',
  components: {},
  props: ['tableData', 'total', 'loading', 'type'],
  data() {
    return {
      current: 1,
      taskCol: [
        // 目前采用固定表头
        {
          title: '序号',
          dataIndex: 'num',
          key: 'num',
        },
        {
          title: '任务ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '任务名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '任务类型',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: '任务状态',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: '地市',
          dataIndex: 'place',
          key: 'place',
        },
        {
          title: '创建人',
          dataIndex: 'creator',
          key: 'creator',
        },
        {
          title: '创建时间',
          dataIndex: 'time',
          key: 'time',
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      dataCol: [
        {
          title: '序号',
          dataIndex: 'num',
          key: 'num',
        },
        {
          title: '数据名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '数据类型',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: '上传时间',
          dataIndex: 'time',
          key: 'time',
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  computed: {
    pagination() {
      return {
        pageSize: 5,
        total: this.total,
      }
    },
    columns() {
      if (this.type === 'task') {
        return this.taskCol
      } else {
        return this.dataCol
      }
    },
    tableDataShow() {
      let before = this.tableData
      if (this.type === 'task') {
        let res = before.map((item) => {
          return {
            key: item.id,
            num: item.num,
            id: item.id,
            name: item.name,
            type: task.TASK_TYPE[item.type],
            status: task.TASK_STATUS[item.status],
            place: item.place,
            creator: item.creator,
            time: item.time,
            action:
              item.status == task.TASK_STATUS_RE['执行中']
                ? ['停止任务', this.endTask]
                : ['天线配置下载', this.downloadFile],
          }
        })
        return res
      } else {
        let res = before.map((item) => {
          return {
            key: item.id,
            num: item.num,
            name: item.name,
            type: item.type,
            time: item.time,
            action: ['删除', this.deleteData],
          }
        })
        return res
      }
    },
  },
  mounted() {},
  methods: {
    handleTableChange(pagination) {
      this.current = pagination.current
      this.$emit('search', this.current)
    },
    endTask(record) {
      let that = this
      this.$confirm({
        title: '确定要停止该任务吗？',
        content: '点击确定，停止任务',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          return taskHttp.endTask({ id: record.id }).then((res) => {
            if (res.data.status === 'success') {
              that.$message.success(res.data.msg)
              // 成功则刷新任务列表
              that.$emit('search', that.current)
            }
          })
        },
        onCancel() {},
      })
    },
    downloadFile(record) {
      console.log('download', record)
      // 导出 :todo
      //   taskHttp.downloadConfig({ id: record.id }).then((res) => {})
    },
    deleteData(record) {
      let that = this
      that.$confirm({
        title: '确定要删除该条数据吗',
        content: '点击确定，删除数据',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          return dataHttp.deleteData({ id: record.id }).then((res) => {
            if (res.data.status === 'success') {
              that.$message.success(res.data.msg)
              that.$emit('search', that.current) // 删除完重新获取该页数据
            }
          })
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.task-table {
}
</style>
