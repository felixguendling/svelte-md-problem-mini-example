import { error } from '@sveltejs/kit'

const slugFromPath = (path: string) =>
  path.match(/([\w-]+)\.md/i)?.[1] ?? null;

export const load = async ({ params }) => {
  const modules = import.meta.glob(`./*.md`);

  let match = {};
  for (const [path, resolver] of Object.entries(modules)) {
    console.log(slugFromPath(path), params.slug);
    if (slugFromPath(path) === params.slug) {
      console.log("found");
      match = { path, resolver };
      break;
    }
    console.log("not found");
  }

  const slug = await match?.resolver?.();

  if (!slug) {
    throw error(404); // Couldn't resolve the slug
  }

  return {
    Content: slug.default,
    meta: slug.metadata
  };
}