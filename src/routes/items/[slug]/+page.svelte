<script lang="ts">
  const { data } = $props();
  const {
    Content,
    meta: { title },
  } = data;
</script>

<p>Displaying: {title}</p>
<Content />
