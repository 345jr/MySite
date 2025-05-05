// scripts/md2json.js
import { readFileSync, writeFileSync } from 'fs';
import { resolve , dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mdPath  = resolve(__dirname, './待转化/7.md');
const outPath = resolve(__dirname, './JSON文章/article.json');

// 读原始 Markdown（包含真实换行）
const mdText = readFileSync(mdPath, 'utf-8');

// 把它放到一个对象里
const payload = {
  title: '我的文章标题',
  content: mdText
};

// JSON.stringify 会自动把换行、引号等转义成 \n、\"……
writeFileSync(outPath, JSON.stringify(payload, null, 2), 'utf-8');

console.log('✅ 已生成', outPath);
