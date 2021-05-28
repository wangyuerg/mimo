<template>
  <div class="data">
    <div class="data-upload">
      <div class="data-title">上传数据</div>
      <div class="upload-content">
        <data-upload @refreshTable="refreshTable"></data-upload>
      </div>
      <a-divider />
    </div>
    <div class="data-display">
      <div class="data-title">我的数据</div>
      <div class="data-table">
        <task-table
          :loading="tableLoading"
          :tableData="tableData"
          :total="tableTotal"
          @search="search"
          type="data"
        ></task-table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import DataUpload from '../components/DataManage/DataUpload'
import TaskTable from '../components/TaskManage/TaskTable'
import { dataHttp } from '../util/api/index'

export default {
  name: 'DataManage',
  components: { DataUpload, TaskTable },
  data() {
    return {
      tableLoading: false,
      tableData: [],
      tableTotal: 0,
      page: 1,
    }
  },
  mounted() {
    this.search(this.page)
  },
  methods: {
    search(page) {
      this.page = page
      this.tableLoading = true
      dataHttp
        .getData({})
        .then((res) => {
          if (res.status === 200) {
            this.handleTaskData(res.data.data.data)
            this.tableTotal = res.data.data.total
          }
          this.tableLoading = false
        })
        .catch((err) => {
          this.tableLoading = false
          console.log(err)
        })
    },
    handleTaskData(data) {
      console.log(data)
      this.tableData = data
    },
    refreshTable() {
      // 上传成功刷新table
      this.search(this.page)
    },
  },
}
</script>
<style lang="scss" scoped>
.data {
  .data-title {
    font-size: 16px;
    text-align: left;
  }
  .data-upload {
    .upload-content {
      padding: 15px 0 0 32px;
    }
  }
  .data-table {
    margin: 20px 0 20px 0;
    background-color: white;
  }
}
</style>
