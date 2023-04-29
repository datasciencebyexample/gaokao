const blogPostsContainer = document.getElementById('blog-posts-container');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');

const blogPosts = [
    { title: 'Example Post Title', url: 'blog/example-post.html' },
{ title: 'Example Post Title', url: 'blog/example-post.html' },
{ title: 'Example Post Title', url: 'blog/example-post.html' },
{ title: 'Example Post Title', url: 'blog/example-post.html' },
{ title: 'Example Post Title', url: 'blog/example-post.html' },
{ title: 'Example Post Title', url: 'blog/example-post.html' },
{ title: 'Example Post Title', url: 'blog/example-post.html' },
{ title: 'Example Post Title', url: 'blog/example-post.html' },
{ title: 'Example Post Title', url: 'blog/example-post.html' },
{ title: 'Example Post Title', url: 'blog/example-post.html' },
{ title: 'Example Post Title', url: 'blog/example-post.html' },
    // Add more blog post objects here
];

let currentPage = 1;
const postsPerPage = 10;

function loadBlogPostTitles() {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    blogPostsContainer.innerHTML = '';

    for (let i = startIndex; i < endIndex && i < blogPosts.length; i++) {
        const post = blogPosts[i];
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = post.url;
        link.textContent = post.title;
        listItem.appendChild(link);
        blogPostsContainer.appendChild(listItem);
    }

    pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(blogPosts.length / postsPerPage)}`;

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage * postsPerPage >= blogPosts.length;
}

prevPageButton.addEventListener('click', () => {
    currentPage--;
    loadBlogPostTitles();
});

nextPageButton.addEventListener('click', () => {
    currentPage++;
    loadBlogPostTitles();
});

loadBlogPostTitles();