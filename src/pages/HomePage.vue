<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <BlogCard v-for="b in blogs" :key="b.id" :blog="b" />
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { blogsService } from '../services/BlogsService'

export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await blogsService.getAll()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      blogs: computed(() => AppState.blogs)
    }
  }
}

</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
