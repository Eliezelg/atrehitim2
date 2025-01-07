import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

export async function getImages(folderPath: string) {
  try {
    const publicPath = join(process.cwd(), 'public', folderPath);
    const files = await readdir(publicPath);
    
    return files
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map(file => ({
        src: `/${folderPath}/${file}`,
        name: file.split('.')[0].replace(/-/g, ' ')
      }));
  } catch (error) {
    console.error('Error reading images:', error);
    return [];
  }
}