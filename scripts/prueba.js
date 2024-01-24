document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
  
    menuToggle.addEventListener('click', function () {
      if (sidebar.style.left === '-200px') {
        sidebar.style.left = '0';
      } else {
        sidebar.style.left = '-200px';
      }
    });
  });
  