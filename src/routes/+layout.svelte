<script lang="ts">
  const { children, data } = $props();
</script>

<ul>
  {#each data.items as item}
    <li><a href="/items/{item.slug}">{item.title}</a></li>
  {/each}
</ul>

{@render children()}
