<template>
    <vue-editor v-model="textarea" :id="id" class="text-default" :editorToolbar="customToolbar" placeholder="Start writing to leave a note..."></vue-editor>
</template>

<script>
// Basic Use - Covers most scenarios
import { VueEditor} from 'vue2-editor'

export default {
  components: {
    'VueEditor': VueEditor

  },
  data () {
    return {
      customToolbar: [
        [{'header': []}],
        ['align', {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
        ['bold', 'italic', 'underline'],
        [{'color': []}, {'background': []}],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['link', 'image'],
        ['clean']
      ],
      textarea: this.text ? this.text : ''
    }
  },
  props: ['text', 'id'],

  watch: {
    textarea (value) {
      this.$emit('update:text', value)
      return value
    },
    text (value) {
      this.textarea = value
    }
  }
}
</script>

<style scoped >
    .quillWrapper{
        display: flex;
        flex-direction: column-reverse;
        position:       relative;
        padding-bottom: 25px;
    }
</style>
