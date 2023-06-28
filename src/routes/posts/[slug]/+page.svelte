<script lang="ts">
	import type { PageData } from './$types';
	import type { SvelteComponentTyped } from 'svelte/internal';

    import MathJaxWrapper from '$lib/components/MathJaxWrapper.svelte';
    import Latex from '$lib/components/Latex.svelte';
	import PageHead from '$lib/components/PageHead.svelte';
	import ArticleTitle from '$lib/components/ArticleTitle.svelte';
	import ArticleMeta from '$lib/components/ArticleMeta.svelte';

	export let data: PageData;

	$: content = data.content;
</script>

<PageHead title={data.frontmatter.title} description={data.frontmatter.description} />
<ArticleTitle title={data.frontmatter.title} />
<ArticleMeta author={data.frontmatter.author} date={data.frontmatter.date} />

<MathJaxWrapper>
    <Latex {content} />
</MathJaxWrapper>
