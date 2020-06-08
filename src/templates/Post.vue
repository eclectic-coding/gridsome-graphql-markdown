<template>
  <Layout>
    <div class="post-title">
      <h1 class="post-title__text">
        {{ $page.post.title }}
      </h1>

      <PostMeta :post="$page.post" />

    </div>

    <div class="post content-box">
      <div class="post__header">
        <g-image alt="Cover image" v-if="$page.post.cover_image" :src="$page.post.cover_image" />
      </div>

      <div class="post__content" v-html="$page.post.content" />

      <div class="post-comments">
        <!-- Add comment widgets here -->
        <Disqus shortname="eclecticsaddlebag" :identifier="$page.post.title" />
      </div>

      <div class="post__footer">
        <PostTags :post="$page.post" />
      </div>
    </div>

    <Author class="post-author" />
  </Layout>
</template>

<script>
  import PostMeta from '~/components/PostMeta'
  import PostTags from '~/components/PostTags'
  import Author from '~/components/Author.vue'

  import moment from 'moment'

  export default {
    components: {
      Author,
      PostMeta,
      PostTags
    },
    metaInfo() {
      return {
        title: this.$page.post.title,
        meta: [
          { name: 'twitter:card', content: 'summary' },
          { name: 'twitter:url', content: `https://eclecticsaddlebag.com/${this.$page.post.path}` },
          { name: 'twitter:description', content: this.$page.post.description },
          { name: 'twitter:title', content: this.$page.post.title },
          { name: 'twitter:site', content: '@EclecticCoding' },
          { name: 'twitter:image', content: this.$page.post.cover_image },
          { name: 'twitter:creator', content: '@EclecticCoding' },

          { property: 'og:type', content: 'article' },
          { property: 'og:title', content: this.$page.post.title },
          { property: 'og:description', content: this.$page.post.description },
          { property: 'og:url', content: `https://eclecticsaddlebag.com/${this.$page.post.path}` },
          { property: 'article:published_time', content: moment(this.$page.post.date).format('MM-DD-YYYY') },
          { property: 'og:creator', content: '@EclecticCoding' },
          { property: 'og:updated_time', content: this.$page.post.date },
          { property: 'og:image', content: this.$page.post.cover_image },
          { property: 'og:image:secure_url', content: this.$page.post.cover_image }
        ],
        script: [{ src: 'https://platform.twitter.com/widgets.js', async: true }]
      }
    }
  }
</script>

<page-query>
query Post ($id: ID!) {
  post: post (id: $id) {
    title
    path
    date (format: "MMM DD, YYYY")
    timeToRead
    tags {
      id
      title
      path
    }
    description
    content
    cover_image (width: 860, blur: 10)
  }
}
</page-query>

<style lang="scss">
  .post-title {
    padding: calc(var(--space) / 2) 0 calc(var(--space) / 2);
    text-align: center;
  }

  .post {

    &__header {
      width: calc(100% + var(--space) * 2);
      margin-left: calc(var(--space) * -1);
      margin-top: calc(var(--space) * -1);
      margin-bottom: calc(var(--space) / 2);
      overflow: hidden;
      border-radius: var(--radius) var(--radius) 0 0;

      img {
        width: 100%;
        text-align: center;
      }

      &:empty {
        display: none;
      }
    }

    &__content {
      h2:first-child {
        margin-top: 0;
      }

      p:first-of-type {
        font-size: 1.2em;
        color: var(--title-color);
      }

      p + img + em {
        font-size: 12px;
      }

      img {
        width: calc(100% + var(--space) * 2);
        margin-left: calc(var(--space) * -1);
        margin: 0 auto;
        display: block;
      }
    }
  }

  .post-comments {
    padding: calc(var(--space) / 2);

    &:empty {
      display: none;
    }
  }

  .post-author {
    margin-top: calc(var(--space) / 2);
  }
</style>
