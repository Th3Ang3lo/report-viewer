import { resolve } from 'node:path';
import { cwd } from 'node:process';

export const maxFileSizeMB = 50;
export const tempFilePath = resolve(cwd(), 'temp');
