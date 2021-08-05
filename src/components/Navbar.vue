<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h1>Bloggr</h1>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'Home' }" class="nav-link">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'About' }" class="nav-link">
            About
          </router-link>
        </li>
      </ul>
      <div class="pr-5 action" data-toggle="modal" data-target="#create-blog">
        <span>Create BLog</span>
      </div>
      <span class="navbar-text">
        <button
          class="btn btn-outline-primary text-uppercase"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>
        <div class="dropdown" v-else>
          <div
            class="dropdown-toggle"
            @click="state.dropOpen = !state.dropOpen"
          >
            <img
              :src="user.picture"
              alt="user photo"
              height="40"
              class="rounded"
            />
            <span class="mx-3">{{ user.name }}</span>
          </div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            :class="{ show: state.dropOpen }"
            @click="state.dropOpen = false"
          >
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item list-group-item-action hoverable">
                Account
              </div>
            </router-link>
            <div
              class="list-group-item list-group-item-action hoverable"
              @click="logout"
            >
              logout
            </div>
          </div>
        </div>
      </span>
    </div>
  </nav>
  <!-- Modal -->
  <div class="modal fade"
       id="create-blog"
       tabindex="-1"
       role="dialog"
       aria-labelledby="create-blog"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            New Blog
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createBlog">
            <div class="form-group">
              <label class="pr-2" for="title">Title</label>
              <input type="text"
                     id="title"
                     class="form-control"
                     required
                     placeholder="Title..."
                     v-model="state.newBlog.title"
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="body">Blog</label>
              <input type="text"
                     id="body"
                     class="form-control"
                     required
                     placeholder="Body..."
                     v-model="state.newBlog.body"
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="imgUrl">Image</label>
              <input type="text"
                     id="imgUrl"
                     class="form-control"
                     required
                     placeholder="Image..."
                     v-model="state.newBlog.imgUrl"
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="tags">Tags</label>
              <input type="text"
                     id="tags"
                     class="form-control"
                     required
                     placeholder="tags..."
                     v-model="state.newBlog.tags"
              >
            </div>
            <div>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import { blogsService } from '../services/BlogsService'
import $ from 'jquery'
import Pop from '../utils/Notifier'

export default {
  setup() {
    const state = reactive({
      dropOpen: false,
      newBlog: {}
    })
    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },
      async createBlog() {
        try {
          await blogsService.createBlog(state.newBlog)
          $('#create-blog').modal('hide')
          Pop.toast('Created!', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
</style>
