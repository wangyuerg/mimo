<template>
  <div class="data">
    <div class="data-upload">
      <div class="upload-title">上传数据</div>
      <div class="upload-content">
        <data-upload></data-upload>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import DataUpload from '../components/DataManage/DataUpload'

export default {
  name: 'DataManage',
  components: { DataUpload },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.data {
  .data-upload {
    .upload-title {
      font-size: 16px;
      text-align: left;
    }
    .upload-content {
      padding: 10px 0 0 32px;
    }
  }
}
</style>
