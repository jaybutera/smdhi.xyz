import type { PageServerLoad } from './$types';
import { slugFromPath } from '$lib/slugFromPath';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

const MAX_POSTS = 100;

export const load: PageServerLoad = async ({ url }) => {
	const modules = import.meta.glob(`/src/posts/*.tex`);

    /*
	const postPromises = Object.entries(modules).map(([path, resolver]) =>
		resolver().then(
			(post) =>
				({
					slug: slugFromPath(path),
					...(post as unknown as App.MdsvexFile).metadata
				} as App.BlogPost)
		)
	);
    */
    /*
    console.log(modules);
	const postPromises = Object.entries(modules).map(([path, resolver]) =>
        resolver().then(post => {
            const { data, content } = matter(post);
            console.log(data);
            return data;
        });
    );
    */
    //const filePath = path.resolve('./src/posts', `${slug}.tex`);
    //const fileContents = await fs.readFile(filePath, 'utf-8');

    // Parse metadata and content
    //const { data, content } = matter(fileContents);

    // Get files from posts directory
    const directoryPath = './src/posts';
    const files = await fs.readdir(directoryPath);

    // Filter for .tex files
    const texFiles = files.filter(file => path.extname(file) === '.tex');

    // Read each file and get its frontmatter
    const posts = await Promise.all(texFiles.map(async (file) => {
        const filePath = path.join(directoryPath, file);
        const fileContents = await fs.readFile(filePath, 'utf-8');
        const { data } = matter(fileContents);
        return data;
    }));

	//const posts = await Promise.all(postPromises);
	const publishedPosts = posts.filter((post) => post.published).slice(0, MAX_POSTS);
	publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	return { posts: publishedPosts };
};
