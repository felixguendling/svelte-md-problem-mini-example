function listContent(paths: Record<string, unknown>) {
  let content = [];
  for (const path in paths) {
    const file = paths[path]
    const slug = path.split('/').at(-1)?.replace('.md', '')

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const metadata = file.metadata;
      const post = { ...metadata, slug };
      content.push(post);
    }
  }

  content = content.sort((first, second) =>
    new Date(second.date).getTime() - new Date(first.date).getTime()
  );

  return content;
}

export const load = async ({ params }) => {
  return {
    items: listContent(import.meta.glob('./items/[slug]/*.md', { eager: true })),
  };
}