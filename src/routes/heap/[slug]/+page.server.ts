import type { PageLoad } from './$types';
import { promises as fs } from 'fs';
import path from 'path';
import { slugFromPath } from '$lib/slugFromPath';
import { error } from '@sveltejs/kit';
import matter from 'gray-matter';

export async function load({ params }) {
    const { slug } = params;

    const filePath = path.resolve('./src/heap', `${slug}.tex`);
    const fileContents = await fs.readFile(filePath, 'utf-8');

    // Parse metadata and content
    //const { data, content } = matter(fileContents);

    // Do my own f'n parsing
    const text = fileContents
        // Line breaks
        .replace(/\n/g, (match, _) => '<br />')
        // Links
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    return { content: text };
}
