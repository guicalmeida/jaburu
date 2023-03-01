import slugify from 'slugify'

export default function universalSlugify(string = '') {
  return slugify(string, {
    lower: true,
    remove: /[.,:/"()]/g,
    replacement: '_',
  });
}
