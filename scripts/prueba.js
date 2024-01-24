document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');
  
    menuToggle.addEventListener('click', function () {
      if (sidebar.style.left === '-200px') {
        sidebar.style.left = '0';
        content.style.marginLeft = '200px';
      } else {
        sidebar.style.left = '-200px';
        content.style.marginLeft = '0';
      }
    });
  });