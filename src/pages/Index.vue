<template>
  <Layout :show-logo="false">
    <!-- Author intro -->
    <Author :show-title="true" />

    <!-- List posts -->
    <div class="posts">
      <PostCard v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node"/>
    </div>

  </Layout>
</template>

<page-query>
query {
  posts: allPost(filter: { published: { eq: true }}) {
    edges {
      node {
        id
        title
        date (format: "MMM DD, YYYY")
        timeToRead
        description
        cover_image (width: 770, height: 380, blur: 10)
        path
        tags {
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

export default {
  components: {
    Author,
    PostCard
  },
  metaInfo: {
    title: 'Home',
    meta: [
      { name: "author", content: "Chuck Smith" },
      { name: "description", content: "This is the personal tech blog of Chuck Smith" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:description", content: "This is the personal tech blog of Chuck Smith" },
      { name: "twitter:title", content: "Eclectic Saddlebag" },
      { name: "twitter:site", content: "@EclecticCoding" },
      // TODO I need a default twitter image
      { name: "twitter:image", content: ''},
      { name: "twitter:creator", content: "@EclecticCoding" }
    ]
  }
}
</script>
