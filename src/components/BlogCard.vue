<template>
  <div class="row BlogCard thick rounded-lg p-5 m-3">
    <div class="align-self-end justify-self-end" v-if="account.id === blog.creatorId">
      <button class="btn btn-danger" @click.stop="destroy">
        delete
      </button>
    </div>
    <div class="col-12 ">
      <h1><b>{{ blog.title }}</b></h1>
    </div>
    <div class="col-md-12 d-flex justify-content-center">
      <img class=" profileImg rounded-pill mr-3" :src="blog.creator.picture" alt="" srcset="">
      <h4>{{ blog.creator.name }}</h4>
    </div>
    <div class="col-md-12">
      <p>{{ blog.body }}</p>
      <img class="img rounded-pill p-3" :src="blog.imgUrl">
    </div>
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
.thick{
  border: 5px solid rgb(114, 111, 250);
  box-shadow: 1px 1px 15px rgb(42, 11, 128);
  background-color: rgb(238, 116, 136);
}
.img{
  max-height: 50vh;
  box-shadow: 1px, 1px 15px black;
}
.profileImg{
  max-height: 7vh;
}
</style>
