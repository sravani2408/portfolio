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

// Typing effect logic
function typeText(targetElementId, textArray, typingSpeed =30, delayBetweenSentences = 500) {
  const targetElement = document.getElementById(targetElementId);
  const cursor = document.getElementById("cursor");
  let sentenceIndex = 0;
  let charIndex = 0;

  function type() {
    if (sentenceIndex < textArray.length) {
      if (charIndex < textArray[sentenceIndex].length) {
        targetElement.textContent += textArray[sentenceIndex][charIndex];
        charIndex++;
        setTimeout(type, typingSpeed);
      } else {
        // Move to the next sentence after a delay
        sentenceIndex++;
        charIndex = 0;
        setTimeout(() => {
          targetElement.textContent += "\n\n"; // Add space between sentences
          type();
        }, delayBetweenSentences);
      }
    } else {
      cursor.style.display = "none"; // Hide cursor after typing is complete
    }
  }

  type();
}

function toggleNav() {
      const navLinks = document.querySelector('.nav-links');
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    }
// Initial setup: Show only the profile section on page load
document.addEventListener("DOMContentLoaded", () => {
  showSection('profile'); // Ensure only the Profile section is visible initially

  const circleContainer = document.querySelector('.circle-container');
  const icons = circleContainer.querySelectorAll('.icon');
  const iconCount = icons.length;

  // Set the total number of icons as a CSS variable
  circleContainer.style.setProperty('--n', iconCount);

  // Start the typing effect in the "about" section
  const aboutText = [
    "I am a tech enthusiast with a passion for building robust solutions that harmonize creativity, technology, and innovation.From designing scalable cloud infrastructures to crafting machine learning models, I approach each project with a problem-solving mindset and a commitment to delivering impactful results.",
    "Beyond the tech realm, I am a dancer by passion and an artist by hobby.My love for painting provides a quiet space for imagination, offering moments of reflection and fresh perspectives.",
    "This portfolio is more than a collection of work—it’s a reflection of who I am: a technologist, a creator, and an artist at heart."
  ];

  typeText("typed-text", aboutText); // Start typing effect in the about section
});






// // // Function to show a specific section

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
