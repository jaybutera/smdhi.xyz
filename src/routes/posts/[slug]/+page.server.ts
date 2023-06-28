import type { PageLoad } from './$types';
import { promises as fs } from 'fs';
import path from 'path';
import { slugFromPath } from '$lib/slugFromPath';
import { error } from '@sveltejs/kit';
import matter from 'gray-matter';
import { marked } from 'marked';
//import katex from 'katex';

export async function load({ params }) {
    const { slug } = params;

    const filePath = path.resolve('./src/posts', `${slug}.tex`);
    const fileContents = await fs.readFile(filePath, 'utf-8');

    // Parse metadata and content
    const { data, content } = matter(fileContents);

    // Do my own f'n parsing
    const text = content
        // Line breaks
        .replace(/\n/g, (match, _) => '<br />')
        // Links
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    //const text = marked.parse(content);
    /*
    const text = content.replace(/\$(.*?)\$/g, (match, inner_text) => {
      try {
          console.log(inner_text);
        return katex.renderToString(inner_text);
      } catch (error) {
        console.error(`Failed to render LaTeX: ${inner_text}`, error);
        return match; // return the original string in case of failure
      }
    });
    */

    return { content: text, frontmatter: data };
  }
