<template>
	<div class="author">

		<g-image alt="Author image" class="author__image" src="~/assets/images/chuck.jpg" width="180" height="180"
             blur="5" />

		<h1 v-if="showTitle" class="author__site-title">
			{{ $static.metadata.siteName }}
		</h1>

		<p class="author__intro">
      {{ $static.metadata.siteDescription }}
		</p>

		<p class="author__links">
			<a href="//twitter.com/EclecticCoding">Follow on Twitter</a>
			<a href="//github.com/eclectic-coding">GitHub</a>
			<a href="//www.linkedin.com/in/dev-chuck-smith">LinkedIn</a>
		</p>

	</div>
</template>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

<script>
export default {
	props: ['showTitle']
}
</script>

<style lang="scss">
.author {
	margin: 0 auto;
	max-width: 500px;
	text-align: center;
	padding: calc(var(--space) / 2) 0;

	&__image {
		border-radius: 100%;
		width: 90px;
		height: 90px;
		margin-bottom: 1em;
	}

	&__intro {
		opacity: .8;
	}

	&__site-title {
		/*font-size: 1.5em;*/
    text-decoration: none;
    color: var(--title-color);

    &:visited {
      color: white;
    }
	}

	&__links {
		margin-top: -.5em;
		a {
			margin: 0 .5em;
		}
	}
}
</style>
