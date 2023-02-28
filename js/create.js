const form = document.querySelector('form');
const createPost = async (e) => {
    e.preventDefault();
    const doc = {
        icon: form.icon.value,
        title: form.title.value,
        body: form.body.value
        
    }
    await fetch('https://good-jade-cheetah-wrap.cyclic.app/posts', {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: { 'Content-Type': 'application/json' }
    });
    window.location.replace('index.html');
}
form.addEventListener('submit', createPost);