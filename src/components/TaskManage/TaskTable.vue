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
import { taskHttp } from '../../util/api/index'
export default {
  name: 'TaskTable',
  components: {},
  props: ['tableData', 'total', 'loading'],
  data() {
    return {
      columns: [
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
      current: 1,
    }
  },
  computed: {
    pagination() {
      return {
        pageSize: 5,
        total: this.total,
      }
    },
    tableDataShow() {
      let before = this.tableData
      let res = before.map((item) => {
        return {
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
  },
}
</script>
<style lang="scss" scoped>
.task-table {
}
</style>
