<template>
  <Layout :show-logo="false">
    <!-- Author intro -->
    <Author :show-title="true" />

    <!-- List posts -->
    <div class="posts">
      <PostCard v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node" />
    </div>
    <Pager :info="$page.posts.pageInfo" linkClass="pager__link" class="pager" />

  </Layout>
</template>

<page-query>
  query ($page: Int) {
  posts: allPost(perPage: 5, page: $page, filter: { published: { eq: true }}) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
      isFirst
      isLast
      }
    edges {
      node {
      id
      title
      date (format: "MMM DD, YYYY")
      timeToRead
      description
      cover_image (width: 770, height: 380, blur: 10)
      path tags {
      id
      title
      path
          }
        }
      }
    }
  }
</page-query>

<script>
  import Author from '~/components/Author.vue'
  import PostCard from '~/components/PostCard.vue'
  import { Pager } from 'gridsome'

  export default {
    components: {
      Author,
      PostCard,
      Pager
    },
    metaInfo: {
      title: 'Home',
      meta: [
        { name: 'author', content: 'Chuck Smith' },
        { name: 'description', content: 'This is the personal tech blog of Chuck Smith' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:description', content: 'This is the personal tech blog of Chuck Smith' },
        { name: 'twitter:title', content: 'Eclectic Saddlebag' },
        { name: 'twitter:site', content: '@EclecticCoding' },
        // TODO I need a default twitter image
        { name: 'twitter:image', content: '' },
        { name: 'twitter:creator', content: '@EclecticCoding' }
      ]
    }
  }
</script>

<style lang="scss">
  .pager {
    display: inline-block;
    width: 100%;
    text-align: center;

    &__link {
      color: var(--link-color);
      text-align: center;
      text-decoration: none;
      padding: .5rem 1rem;

      &:hover:not(.active) {
        background-color: var(--bg-content-color);
        border-radius: 5px;
        color: var(--link-color);
      }
    }
  }

  .active {
    background-color: var(--bg-content-color);
    border-radius: 5px;
  }

</style>
