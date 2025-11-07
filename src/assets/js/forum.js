const apiUrl = "http://localhost:3000/users";

function getLoggedUserId() {
  return localStorage.getItem("userId");
}

document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "/radar-florestal.io";
});

async function fetchAllPosts() {
  const userId = getLoggedUserId();
  if (!userId) return console.error("Usuário não logado");

  const res = await fetch(apiUrl);
  const users = await res.json();

  const allPosts = [];
  users.forEach(user => {
    (user.posts || []).forEach(post => {
      allPosts.push({ ...post, userId: user.id });
    });
  });

  renderPosts(allPosts, userId);
}

function renderPosts(posts, loggedUserId) {
  const topicsList = document.getElementById("topicsList");
  topicsList.innerHTML = "";

  posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  posts.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.className = "bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition flex justify-between items-start";
    
    let buttonsHTML = "";
    if (post.userId === loggedUserId) {
      buttonsHTML = `
        <div class="flex gap-2 ml-4">
          <button class="editBtn text-blue-600 hover:text-blue-800"> <i class="fas fa-edit"></i> </button>
          <button class="deleteBtn text-red-600 hover:text-red-800"> <i class="fas fa-trash"></i> </button>
        </div>
      `;
    }

    postDiv.innerHTML = `
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-1">${post.title}</h3>
        <p class="text-gray-700">${post.content}</p>
        <div class="text-sm text-gray-400 mt-2">
          <i class="far fa-clock"></i> ${new Date(post.createdAt).toLocaleString()}
        </div>
      </div>
      ${buttonsHTML}
    `;

    if (post.userId === loggedUserId) {
      const editBtn = postDiv.querySelector(".editBtn");
      const deleteBtn = postDiv.querySelector(".deleteBtn");

      editBtn.onclick = () => editPost(post);
      deleteBtn.onclick = () => deletePost(post.id);
    }

    topicsList.appendChild(postDiv);
  });
}

async function addPost() {
  const userId = getLoggedUserId();
  if (!userId) return alert("Usuário não logado");

  const title = document.getElementById("postTitle").value.trim();
  const content = document.getElementById("postContent").value.trim();
  if (!title || !content) return alert("Preencha título e conteúdo.");

  const res = await fetch(`${apiUrl}/${userId}`);
  const user = await res.json();
  const newPost = {
    id: Date.now().toString(),
    title,
    content,
    createdAt: new Date().toISOString()
  };
  user.posts = user.posts || [];
  user.posts.push(newPost);

  await fetch(`${apiUrl}/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  document.getElementById("postTitle").value = "";
  document.getElementById("postContent").value = "";
  fetchAllPosts();
}

async function deletePost(postId) {
  const userId = getLoggedUserId();
  if (!userId) return;

  const res = await fetch(`${apiUrl}/${userId}`);
  const user = await res.json();
  user.posts = user.posts.filter(p => p.id !== postId);

  await fetch(`${apiUrl}/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  fetchAllPosts();
}

function editPost(post) {
  const userId = getLoggedUserId();
  if (!userId) return;

  const title = prompt("Editar título", post.title);
  const content = prompt("Editar conteúdo", post.content);
  if (!title || !content) return;

  fetch(`${apiUrl}/${userId}`)
    .then(res => res.json())
    .then(user => {
      const idx = user.posts.findIndex(p => p.id === post.id);
      if (idx > -1) {
        user.posts[idx].title = title;
        user.posts[idx].content = content;
        fetch(`${apiUrl}/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        }).then(fetchAllPosts);
      }
    });
}

document.getElementById("confirmPost").addEventListener("click", addPost);

fetchAllPosts();
