// // Function to show a specific section

function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll(".section");
  sections.forEach(section => {
    section.classList.remove("visible");
  });

  // Show the target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add("visible");
  }
}

// Initial setup: Show only the profile section on page load
document.addEventListener("DOMContentLoaded", () => {
  showSection('profile'); // Ensure only the Profile section is visible initially
  const circleContainer = document.querySelector('.circle-container');
  const icons = circleContainer.querySelectorAll('.icon');
  const iconCount = icons.length;

  // Set the total number of icons as a CSS variable
  circleContainer.style.setProperty('--n', iconCount);
});


// function showSection(sectionId) {
//   // Hide all sections
//   const sections = document.querySelectorAll(".section");
//   sections.forEach(section => {
//     section.classList.remove("visible");
//   });

//   // Show the target section
//   const targetSection = document.getElementById(sectionId);
//   if (targetSection) {
//     targetSection.classList.add("visible");
//   }
// }

// // Initial setup: Show only the profile section on page load
// document.addEventListener("DOMContentLoaded", () => {
//   showSection('profile'); // Ensure only the Profile section is visible initially
//   const circleContainer = document.querySelector('.circle-container');
//   const icons = circleContainer.querySelectorAll('.icon');
//   const iconCount = icons.length;

//   // Set the total number of icons as a CSS variable
//   circleContainer.style.setProperty('--n', iconCount);
// });
