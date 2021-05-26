<template>
  <div class="data-upload">
    <div class="upload-item">
      <span class="item-label">工参数据:</span>
      <a-upload
        name="file"
        :headers="headers"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="uploadWorkFile"
        :multiple="false"
        :beforeUpload="beforeWorkUpload"
        class="item-button"
      >
        <a-button> <a-icon type="upload" />上传csv/zip文件</a-button>
      </a-upload>
      <a-button @click="downloadWorkTemplate" class="item-button"
        >下载模版</a-button
      >
    </div>
    <div class="upload-item">
      <span class="item-label">地图数据:</span>
      <a-upload
        name="file"
        :headers="headers"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="uploadMapFile"
        :multiple="false"
        :beforeUpload="beforeMapUpload"
        class="item-button"
      >
        <a-button> <a-icon type="upload" />上传csv/zip文件</a-button>
      </a-upload>
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
      workFileList: [],
      mapFileList: [],
    }
  },
  methods: {
    uploadWorkFile() {},
    downloadWorkTemplate() {},
  },
}
</script>
<style lang="scss" scoped>
.upload-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 64px;
  .item-label {
    margin-right: 20px;
  }
  .item-button {
    margin-right: 50px;
  }
}
</style>
