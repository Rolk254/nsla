document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
  
    menuToggle.addEventListener('click', function () {
      const computedStyle = getComputedStyle(sidebar);
      const sidebarLeft = parseInt(computedStyle.left);
  
      if (sidebarLeft === -200) {
        sidebar.style.left = '0';
      } else {
        sidebar.style.left = '-200px';
      }
    });
  });
  