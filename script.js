// Function to show a specific section
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
});
