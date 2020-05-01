// Import main css
import '~/assets/style/index.scss'

// Import default layout so we don't need to import it to every page
import DefaultLayout from '~/layouts/Default.vue'

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { router, head, isClient }) {
  head.meta.push({
    key: 'og:description',
    name: 'og:description',
    content: "Chuck's personal eclectic tech journeys."
  })

  head.meta.push({
    key: 'twitter:description',
    name: 'twitter:description',
    content: "Chuck's personal eclectic tech journeys."
  })

  router.beforeEach((to, _from, next) => {
    head.meta.push({
      key: 'og:url',
      name: 'og:url',
      content: process.env.GRIDSOME_BASE_PATH + to.path,
    })
    next()
  })

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
