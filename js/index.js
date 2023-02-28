let articleid="";
const container = document.getElementById('BLOG');
const searchForm = document.querySelector('.search');

const renderPosts = async (term) => {
    let uri = 'https://good-jade-cheetah-wrap.cyclic.app/posts?_sort=likes&_order=desc';
    if (term) {
        uri += `&q=${term}`;
    }
    const res = await fetch(uri);
    const posts = await res.json();
    let template = '';
    posts.forEach(post => {
        template += `
      
        <tr>
        <td>${post.id}</td>  
        <td>${post.title}</td>
        <td>${post.body.slice(0, 200)}</td>
        <td>
        <a class="edit" type="button" title="Edit" data-toggle="tooltip" onClick ="openModel(${post.id})"><i class="material-icons">&#xE254;</i></a>
        <a class="delete" type="button" title="Delete" data-toggle="tooltip" onClick="deleteBlog(${post.id})"><i class="material-icons">&#xE872;</i></a>
        </td>
        </tr>
        `
    })

    container.innerHTML = template;
}


const fetch_clientBlog = async () => {
    const response = await fetch("https://good-jade-cheetah-wrap.cyclic.app/posts");
    const post = await response.json();
    const BlogsContent = document.getElementById('CLIENT');
    let temp = "";
    post.forEach((post) => {

        temp += `
        <div class="card padd-15">
        <i class="${post.icon}"></i>
        <h5>${post.title}</h5>
        <p>${post.body.slice(0,200)}</p>
        <p style="text-align: center;">
        <a class="button" href="">Read More</a></p>
    </div>
            `
    });
    BlogsContent.innerHTML = temp;
}
fetch_clientBlog();




const deleteBlog=async(blogid)=>
{
    await fetch(`https://good-jade-cheetah-wrap.cyclic.app/posts/${blogid}`,{
        method:"DELETE",
    });
}
const modelBox=document.getElementById("modelbox");
const form=document.getElementById("newform");
modelBox.style.display="none";
const openModel=async(blogid)=>
{
    const response= await fetch(`https://good-jade-cheetah-wrap.cyclic.app/posts/${blogid}`);
        const post=await response.json();
    
        modelBox.style.display="block";
        form.icon.value=post.icon;
        form.title.value=post.title;
        form.body.value=post.body;
        articleid=post.id;
}
const updateBlog=async()=>
{
    const getData={
        icon:form.icon.value,
        title:form.title.value,
        body:form.body.value,
    }
    const response= await fetch(`https://good-jade-cheetah-wrap.cyclic.app/posts/${articleid}`,
    {
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(getData),
    });
    alert("Updated Successfully");
}
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    renderPosts(searchForm.term.value.trim())
})
window.addEventListener('DOMContentLoaded', () => renderPosts());