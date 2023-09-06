<script>
  import { afterUpdate } from 'svelte';

  afterUpdate(() => {
    if (window.MathJax) {
      window.MathJax.typeset();
    }
  });
</script>

<slot />
