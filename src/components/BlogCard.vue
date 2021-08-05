<template>
  <div class="BlogCard ">
    <h1>{{ blog.title }}</h1>
    <h2>{{ blog.body }}</h2>
    <img :src="blog.imgUrl" alt="">
  </div>
</template>

<script>

import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { blogsService } from '../services/BlogsService'

export default {
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async destroy() {
        try {
          if (await Pop.confirm()) {
            await blogsService.destroy(props.blog.id)
            Pop.toast('deleted', 'success')
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
