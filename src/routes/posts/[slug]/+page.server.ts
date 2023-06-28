import type { PageLoad } from './$types';
import { promises as fs } from 'fs';
import path from 'path';
import { slugFromPath } from '$lib/slugFromPath';
import { error } from '@sveltejs/kit';
import matter from 'gray-matter';

export async function load({ params }) {
    const { slug } = params;

    const filePath = path.resolve('./src/posts', `${slug}.tex`);
    const fileContents = await fs.readFile(filePath, 'utf-8');

    // Parse metadata and content
    const { data, content } = matter(fileContents);

    return { content: content, frontmatter: data };
  }
