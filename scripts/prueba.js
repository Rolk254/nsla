document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
  
    menuToggle.addEventListener('click', function () {
      sidebar.style.left = (sidebar.style.left === '0px' || sidebar.style.left === '') ? '-200px' : '0';
    });
  });
  