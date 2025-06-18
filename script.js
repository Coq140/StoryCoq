function createAccount() {
  const username = document.getElementById('username').value.trim();
  if (!username) {
    alert("Veuillez saisir un nom d'utilisateur");
    return;
  }
  const user = {
    name: username,
    badge: ""
  };
  localStorage.setItem('instaUser', JSON.stringify(user));
  window.location.href = 'feed.html';
}

function logout() {
  localStorage.removeItem('instaUser');
}

document.addEventListener("DOMContentLoaded", function() {
  const userData = localStorage.getItem('instaUser');
  if (userData) {
    const user = JSON.parse(userData);
    if (document.getElementById('welcome')) {
      document.getElementById('welcome').innerText = `Bienvenue, ${user.name}`;
    }
    if (document.getElementById('profilName')) {
      document.getElementById('profilName').innerText = `Profil : ${user.name}`;
      document.getElementById('profilBadge').innerHTML = user.badge ? `<span class="badge ${user.badge}">${getBadgeIcon(user.badge)}</span>` : 'Aucun badge';
    }
  }
});

function getBadgeIcon(type) {
  if (type === "certifié") return "✔";
  if (type === "gouvernement") return "🏢";
  if (type === "système") return "★";
  return "";
}
document.addEventListener("DOMContentLoaded", function() {
  const userData = localStorage.getItem('instaUser');
  if (userData) {
    const user = JSON.parse(userData);
    document.getElementById('profilName').innerText = user.name;
    document.getElementById('profilBadge').innerHTML = user.badge ? `<span class="badge ${user.badge}">${getBadgeIcon(user.badge)}</span>` : 'Aucun badge';
    document.getElementById('bio').value = user.bio || '';

    if (user.avatar) {
      document.getElementById('avatar').src = user.avatar;
    }
    if (user.banner) {
      setBannerImage(user.banner);
    }
    if (user.story) {
      document.getElementById('storyDisplay').innerHTML = `<img src="${user.story}">`;
    }
  }
});

function saveBio() {
  let user = JSON.parse(localStorage.getItem('instaUser'));
  user.bio = document.getElementById('bio').value;
  localStorage.setItem('instaUser', JSON.stringify(user));
}

function updateAvatar(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('avatar').src = e.target.result;
      let user = JSON.parse(localStorage.getItem('instaUser'));
      user.avatar = e.target.result;
      localStorage.setItem('instaUser', JSON.stringify(user));
    };
    reader.readAsDataURL(file);
  }
}

function updateBanner(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      setBannerImage(e.target.result);
      let user = JSON.parse(localStorage.getItem('instaUser'));
      user.banner = e.target.result;
      localStorage.setItem('instaUser', JSON.stringify(user));
    };
    reader.readAsDataURL(file);
  }
}

function setBannerImage(src) {
  const banner = document.getElementById('banner');
  banner.innerHTML = `<img src="${src}">`;
}

function addStory(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('storyDisplay').innerHTML = `<img src="${e.target.result}">`;
      let user = JSON.parse(localStorage.getItem('instaUser'));
      user.story = e.target.result;
      localStorage.setItem('instaUser', JSON.stringify(user));
    };
    reader.readAsDataURL(file);
  }
}
