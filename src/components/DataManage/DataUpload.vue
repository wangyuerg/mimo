<template>
  <div class="data-upload">
    <div class="upload-item">
      <div class="item-label">工参数据:</div>
      <a-upload
        name="file"
        :headers="headers"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="uploadWorkFile"
        :multiple="false"
        :beforeUpload="beforeWorkUpload"
        class="item-button"
        accept=".csv"
      >
        <a-button> <a-icon type="upload" />上传csv/zip文件</a-button>
      </a-upload>
      <a-button @click="downloadWorkTemplate()">下载模版</a-button>
    </div>
    <div class="upload-item">
      <div class="item-label">地图数据:</div>
      <a-upload
        name="file"
        :headers="headers"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="uploadMapFile"
        :multiple="false"
        :beforeUpload="beforeMapUpload"
        class="item-button"
        accept=".csz"
      >
        <a-button> <a-icon type="upload" />上传csv/zip文件</a-button>
      </a-upload>
    </div>
    <div class="upload-item">
      <div class="item-label">MDT数据:</div>
      <a-upload
        name="file"
        :headers="headers"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="uploadMdtFile"
        :multiple="false"
        :beforeUpload="beforeMdtUpload"
        class="item-button"
        accept=".csv"
      >
        <a-button> <a-icon type="upload" />上传csv/zip文件</a-button>
      </a-upload>
      <a-button @click="downloadMdtTemplate()">下载模版</a-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: 'DataUpload',
  components: {},
  data() {
    return {
      headers: {
        authorization: 'authorization-text',
      },
      beforeWorkUpload: (file) => {
        return new Promise((resolve, reject) => {
          const isLt10M = file.size / 1024 / 1024 < 10
          if (!isLt10M) {
            this.$message.error('文件大小不能大于10MB')
            reject(new Error(false))
          } else if (this.workFileList.length !== 0) {
            this.$message.error('只能上传一个文件')
            reject(new Error(false))
          } else {
            resolve(true)
          }
        })
      },
      beforeMapUpload: (file) => {
        return new Promise((resolve, reject) => {
          const isLt10M = file.size / 1024 / 1024 < 10
          if (!isLt10M) {
            this.$message.error('文件大小不能大于10MB')
            reject(new Error(false))
          } else if (this.mapFileList.length !== 0) {
            this.$message.error('只能上传一个文件')
            reject(new Error(false))
          } else {
            resolve(true)
          }
        })
      },
      beforeMdtUpload: (file) => {
        return new Promise((resolve, reject) => {
          const isLt10M = file.size / 1024 / 1024 < 10
          if (!isLt10M) {
            this.$message.error('文件大小不能大于10MB')
            reject(new Error(false))
          } else if (this.mdtFileList.length !== 0) {
            this.$message.error('只能上传一个文件')
            reject(new Error(false))
          } else {
            resolve(true)
          }
        })
      },
      workFileList: [],
      mapFileList: [],
      mdtFileList: [],
    }
  },
  methods: {
    uploadWorkFile(info) {
      // 上传文件/删除文件执行
      this.workFileList = info.fileList
      if (info.file.status !== 'uploading') {
        console.log('uploading')
      }
      if (info.file.status === 'done') {
        // :todo根据后端给的返回结果定
        this.$emit('refreshTable')
        this.$message.success(`${info.file.name}文件上传成功`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name}文件上传失败`)
      }
    },
    uploadMapFile(info) {
      // 上传文件/删除文件执行
      this.mapFileList = info.fileList
      if (info.file.status !== 'uploading') {
        console.log('uploading')
      }
      if (info.file.status === 'done') {
        // :todo根据后端给的返回结果定
        this.$emit('refreshTable')
        this.$message.success(`${info.file.name}文件上传成功`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name}文件上传失败`)
      }
    },
    uploadMdtFile(info) {
      // 上传文件/删除文件执行
      this.mdtFileList = info.fileList
      if (info.file.status !== 'uploading') {
        console.log('uploading')
      }
      if (info.file.status === 'done') {
        // :todo根据后端给的返回结果定
        this.$emit('refreshTable')
        this.$message.success(`${info.file.name}文件上传成功`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name}文件上传失败`)
      }
    },
    downloadWorkTemplate() {},
    downloadMdtTemplate() {},
  },
}
</script>
<style lang="scss">
.upload-item {
  display: flex;
  justify-content: flex-start;
  align-items: top;
  min-height: 70px;
  .item-label {
    margin-right: 40px;
    padding-top: 5px;
  }
  .item-button {
    width: 300px;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    margin: 0 10px 0 0px;
  }
  .ant-upload-list {
    text-overflow: ellipsis !important;
    width: 300px !important;
  }
}
</style>
