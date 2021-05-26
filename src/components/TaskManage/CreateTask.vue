<template>
  <div class="create-task">
    <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="任务名称">
        <a-input
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请输入任务名称!' }] },
          ]"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="地市">
        <a-select
          v-decorator="[
            'place',
            {
              rules: [{ required: true, message: '请选择地市!' }],
            },
          ]"
          placeholder="请选择"
        >
          <a-select-option
            v-for="(item, index) in placeList"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="优化算法">
        <a-select
          v-decorator="[
            'algorithm',
            {
              rules: [{ required: true, message: '请选择优化算法!' }],
            },
          ]"
          placeholder="请选择"
        >
          <a-select-option
            v-for="(item, index) in algoList"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="优化区域选择方式">
        <a-select
          v-decorator="[
            'selectMethod',
            {
              rules: [{ required: true, message: '请选择优化区域选择方式!' }],
            },
          ]"
          placeholder="请选择"
          @change="handleSelectMethodChange"
        >
          <a-select-option
            v-for="(item, index) in selectMethodList"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="待优化网络编号" v-if="netCodeSelectVisible">
        <a-select
          v-decorator="[
            'netcode',
            {
              rules: [{ required: true, message: '请选择待优化网络编号!' }],
            },
          ]"
          placeholder="请选择"
        >
          <a-select-option
            v-for="(item, index) in netCodeList"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
    <!-- 选择全网络时展示 -->
    <div class="form-fullnet" v-if="fullNetVisible">
      <a-button @click="downloadTemplate">下载模版</a-button>
      <a-upload
        name="file"
        :headers="headers"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="uploadFile"
        :multiple="false"
        :beforeUpload="beforeUpload"
      >
        <span style="color: red; padding-right: 5px">*</span
        ><a-button> <a-icon type="upload" />上传小区csv文件</a-button>
      </a-upload>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import { taskHttp } from '../../util/api/index'

export default {
  name: 'CreateTask',
  components: {},
  props: ['visible'],
  data() {
    return {
      form: this.$form.createForm(this, {
        name: '',
        place: '',
        algorithm: '',
        selectMethod: '', // 优化区域选择方式  这里是单选
        netCode: '', // 待优化网络编号
      }),
      placeList: [
        {
          name: '南京',
          id: '1',
        },
        {
          name: '苏州',
          id: '2',
        },
      ],
      algoList: [
        {
          name: 'xxx',
          id: '1',
        },
        {
          name: 'yyy',
          id: '2',
        },
      ],
      selectMethodList: [
        {
          name: '导入优化小区',
          id: '1',
        },
        {
          name: '全网格',
          id: '2',
        },
      ],
      netCodeList: [
        {
          name: '11123213',
          id: '1',
        },
        {
          name: '3123213',
          id: '2',
        },
      ],
      netCodeSelectVisible: false, // 待优化网络编码是否展示，导入待优化小区
      fullNetVisible: false, // 文件上传下载，全网络展示
      headers: {
        authorization: 'authorization-text',
      },
      fileList: [],
      uploadedFile: {}, // 上传成功的文件
      beforeUpload: (file) => {
        return new Promise((resolve, reject) => {
          const isLt10M = file.size / 1024 / 1024 < 10
          if (!isLt10M) {
            this.$message.error('文件大小不能大于10MB')
            reject(new Error(false))
          } else if (this.fileList.length !== 0) {
            this.$message.error('只能上传一个文件')
            reject(new Error(false))
          } else {
            resolve(true)
          }
        })
      },
    }
  },
  methods: {
    handleSelectMethodChange(value) {
      let netCodeItem = this.selectMethodList.find((item) => {
        return item.name === '导入优化小区'
      })
      let fullNetItem = this.selectMethodList.find((item) => {
        return item.name === '全网格'
      })
      if (typeof netCodeItem !== 'undefined' && netCodeItem.id == value) {
        this.netCodeSelectVisible = true
        this.fullNetVisible = false
      } else if (
        typeof fullNetItem !== 'undefined' &&
        fullNetItem.id == value
      ) {
        this.fullNetVisible = true
        this.netCodeSelectVisible = false
      } else {
        this.fullNetVisible = false
        this.netCodeSelectVisible = false
      }
    },
    submit() {
      // 先校验检查
      let that = this
      this.form.validateFields((err, values) => {
        if (!err) {
          // 校验通过
          console.log('Received values of form: ', values)
          // 如果是全网络需要另检查是否文件已上传
          if (this.fullNetVisible) {
            if (
              this.fileList.length > 0 &&
              this.fileList[0].status === 'down'
            ) {
              // 传递给后端 :todo, 请求成功后
              that.$emit('close')
            } else {
              this.$message.error('请上传csv小区文件')
            }
          } else {
            // 传递给后端 :todo, 请求成功后
            that.$emit('close')
          }
        }
      })
    },
    uploadFile(info) {
      // 上传文件/删除文件执行
      this.fileList = info.fileList
      if (info.file.status !== 'uploading') {
        console.log('uploading')
      }
      if (info.file.status === 'done') {
        // :todo根据后端给的返回结果定
        this.$message.success(`${info.file.name}文件上传成功`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name}文件上传失败`)
      }
    },
    downloadTemplate() {
      console.log('download')
    },
  },
}
</script>
<style lang="scss" scoped>
.create-task {
  .form-fullnet {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 75px;
  }
}
</style>
