import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'

class BlogsService {
  // NOTE pass in an object to set the queries with key value pairs
  async getAll(query = {}) {
    // NOTE convertToQuery will take an object and turn it into a queryString
    const res = await api.get('api/blogs' + convertToQuery(query))
    logger.log(res.data)
    AppState.blogs = res.data
  }

  async createBlog(blog) {
    const res = await api.post('api/blogs', blog)
    await this.getAll()
  }

  async destroy(id) {
    await api.delete('api/blogs/' + id)
    AppState.blogs = AppState.blogs.filter(p => p.id !== id)
  }
}

export const blogsService = new BlogsService()
