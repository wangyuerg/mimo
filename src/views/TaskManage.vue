<template>
  <div class="task">
    <div class="task-search">
      <div class="search-top">
        <div class="search-title">任务查询</div>
        <a-button type="primary" @click="clickCreate"> 新建任务 </a-button>
      </div>
      <div class="search-content">
        <a-row class="search-line" type="flex" justify="start">
          <a-col :span="12" class="search-item">
            <span class="item-text">任务名称：</span>
            <a-input
              v-model="taskSearch.name"
              placeholder="请输入"
              style="width: 50%" /></a-col
          ><a-col :span="12" class="search-item">
            <span class="item-text">地市：</span>
            <a-select
              mode="multiple"
              style="width: 50%"
              placeholder="请选择"
              v-model="taskSearch.place"
            >
              <a-select-option v-for="item in placeList" :key="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-col></a-row
        >
        <a-row class="search-line">
          <a-col :span="12" class="search-item">
            <span class="item-text">创建人：</span>
            <a-input
              v-model="taskSearch.creator"
              style="width: 50%"
              placeholder="请输入"
            />
          </a-col>
          <a-col :span="12" class="search-item">
            <span class="item-text">任务状态：</span>
            <a-select
              mode="multiple"
              style="width: 50%"
              placeholder="请选择"
              v-model="taskSearch.status"
            >
              <a-select-option v-for="item in statusList" :key="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row class="search-line">
          <a-col class="search-item">
            <span class="item-text">起止时间：</span>
            <a-range-picker :locale="locale" @change="dateChange" />
          </a-col>
        </a-row>
        <a-row class="search-line">
          <a-col class="search-item">
            <span class="item-text">任务类型：</span>
            <a-select
              mode="multiple"
              style="width: 25%"
              placeholder="请选择"
              v-model="taskSearch.type"
            >
              <a-select-option v-for="item in typeList" :key="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
      </div>
      <div class="search-button">
        <a-button type="primary" style="width: 100px" @click="search(1)">
          查询
        </a-button>
      </div>
    </div>
    <div class="task-result">
      <task-table
        :loading="tableLoading"
        :tableData="tableData"
        :total="tableTotal"
        @search="search"
        type="task"
      ></task-table>
    </div>
    <a-modal
      v-model="createVisible"
      title="新建任务"
      @ok="createTask"
      ok-text="确认"
      cancel-text="取消"
      v-if="createVisible"
    >
      <create-task ref="popup" @close="closeModal"></create-task>
    </a-modal>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import { task } from '../const'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import TaskTable from '../components/TaskManage/TaskTable'
import CreateTask from '../components/TaskManage/CreateTask'
import { taskHttp } from '../util/api/index'
export default {
  name: 'TaskManage',
  components: { TaskTable, CreateTask },
  data() {
    return {
      locale: locale,
      taskSearch: {
        name: '',
        place: [],
        creator: '',
        status: [],
        startTime: '',
        endTime: '',
        type: [],
      },
      placeList: [
        {
          id: '1',
          name: 'A地',
        },
        {
          id: '2',
          name: 'B地',
        },
        {
          id: '3',
          name: 'C地',
        },
      ],
      statusList: [
        {
          id: '1',
          name: '执行中',
        },
        {
          id: '2',
          name: '已完成',
        },
      ],
      typeList: [
        {
          id: '1',
          name: '优化任务',
        },
        {
          id: '2',
          name: '栅格任务',
        },
        {
          id: '3',
          name: '工参任务',
        },
      ],
      tableLoading: false,
      tableData: [],
      tableTotal: 45,
      createVisible: false,
    }
  },
  methods: {
    dateChange(date) {
      // 更改日期
      this.taskSearch.startTime = date[0]._d.getTime()
      this.taskSearch.endTime = date[1]._d.getTime()
    },
    search(page) {
      // 点击查询
      // 将taskSearch处理成需要的数据传递给后端
      console.log('send', page, this.taskSearch)
      this.tableLoading = true
      taskHttp
        .getTaskInfo(this.taskSearch)
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
      // :todo 最好后端加序号，因为是后端分页
      for (let i = 0; i < data.length; i++) {
        data[i].num = i + 1
      }
      this.tableData = data
    },
    clickCreate() {
      this.createVisible = true
    },
    createTask() {
      console.log('create task1!!!')
      this.$refs.popup.submit()
    },
    closeModal() {
      this.createVisible = false
    },
  },
}
</script>
<style lang="scss" scoped>
.task {
  .task-search {
    .search-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .search-title {
        font-size: 16px;
      }
    }
    .search-content {
      padding: 10px 0 0px 0;
      .search-line {
        padding: 5px 0 5px 32px;
        .search-item {
          display: flex;
          align-items: center;
          .item-text {
            width: 100px;
            text-align: left;
          }
        }
      }
    }
    .search-button {
      display: flex;
      padding: 0 0 10px 0;
      justify-content: flex-end;
    }
  }
  .task-result {
    margin: 20px 0 20px 0;
    background-color: white;
  }
}
</style>
