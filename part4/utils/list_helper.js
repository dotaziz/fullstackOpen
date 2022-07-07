const dummy = (blog) =>{
    blog;
    return 1;
};

const totalLikes = (blogs) =>{
    let TOTAL_LIKES = 0;
    for(const blog of blogs){
        const {likes} = blog;
        TOTAL_LIKES += likes;
    }
    return TOTAL_LIKES;
};

const favouriteBlog = (blogs)=>{
    let HIGHEST_LIKE_BLOG = {};
    let prev = 0;

    blogs.forEach((blog)=>{
        if(prev != 0 && blog.likes > prev ){
            HIGHEST_LIKE_BLOG = blog;
        }
        prev = blog.likes;
    });
    return HIGHEST_LIKE_BLOG;
};

const mostBlog = (blogs) =>{
    let authors = {};
    blogs.forEach((blog)=>{
        if(blog.author && blog.author in authors){
            authors[blog.author]++;
        }else if(blog.author){
            authors[blog.author] = 1;
        }
    });
    let highestAuthor;
    let highest = 0;
    for(const author in authors){
        if(highest != 0 && authors[author] > highest ){
            highestAuthor = {
                author,
                blogs: authors[author]
            };
        }
        highest = authors[author];
    }
    return  highestAuthor;
};

const mostLikes = (blogs)=>{
    let authors= {};
    blogs.forEach((blog)=>{
        if(blog.author && blog.author in authors){
            authors[blog.author] += blog.likes;
        }else if (blog.author){
            authors[blog.author] = blog.likes;
        }
    });

    let highestAuthor;
    let highest = 0;
    for(const author in authors){
        if(highest != 0 && authors[author] > highest){
            highestAuthor = {
                author,
                likes: authors[author]
            };
        }
        highest = authors[author];
    }
    return highestAuthor;
};

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlog,
    mostLikes
};