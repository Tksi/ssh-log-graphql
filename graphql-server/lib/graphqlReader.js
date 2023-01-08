import { readdirSync, readFileSync } from 'fs';

export const resolverReader = async (dir = './resolver') => {
  return Object.fromEntries(
    await Promise.all(
      readdirSync(dir).map(async (file) => {
        const module = await import(`../${dir}/${file}`);
        const type = file.replace('.js', '');
        return [type, module[type]];
      })
    )
  );
};

export const schemaReader = (dir = './schema') => {
  return readdirSync(dir)
    .map((file) => readFileSync(`${dir}/${file}`, 'utf8'))
    .join('\n');
};
