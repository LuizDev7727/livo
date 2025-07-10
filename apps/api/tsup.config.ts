import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src'],
  splitting: false,
  sourcemap: true,
  clean: true,
  noExternal: ['@livo/env'],
  loader: {
    '.sql': 'text',
  },
});
