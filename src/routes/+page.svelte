<script lang="ts">
	import type { PageData } from './$types';

	import PageHead from '$lib/components/PageHead.svelte';
	import Article from '$lib/components/Article.svelte';
	import ArticleTitle from '$lib/components/ArticleTitle.svelte';
	import ArticleMeta from '$lib/components/ArticleMeta.svelte';
	import ArticleDescription from '$lib/components/ArticleDescription.svelte';

	export let data: PageData;
</script>

<PageHead title="Home" description="" />

<header>
    <a href="/"><h1>Personal Archive</h1></a>
</header>

<p>I'm Samadhi 👾</p>
<p>This is a collection of personal experimental writings. No particular structure or theme. Many contradictions and conflicting thoughts.</p>

<h3><a href="/heap">Take a dive in the Heap</a></h3>

{#each data.posts as { slug, title, description, date }}
	<Article>
		<ArticleTitle {slug} {title} />
		<ArticleMeta {date} />
		<ArticleDescription {description} {slug} />
	</Article>
{/each}

<slot />
