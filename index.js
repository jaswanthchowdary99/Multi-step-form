// // DOM code for the provided HTML structure

// // Select elements using JavaScript
// const step1 = document.querySelector('.step-1');
// const step2 = document.querySelector('.step-2');
// const step3 = document.querySelector('.step-3');
// const step4 = document.querySelector('.step-4');

// const circleStep1 = document.getElementById('step1');
// const circleStep2 = document.getElementById('step2');
// const circleStep3 = document.getElementById('step3');
// const circleStep4 = document.getElementById('step4');

// const nextStepButton = document.querySelector('.buttons');

// // Show Step 1 by default
// showStep(1);

// // Add event listeners to circles and buttons
// circleStep1.addEventListener('click', () => showStep(1));
// circleStep2.addEventListener('click', () => showStep(2));
// circleStep3.addEventListener('click', () => showStep(3));
// circleStep4.addEventListener('click', () => showStep(4));

// nextStepButton.addEventListener('click', () => {
//   // Get the current step number
//   const currentStep = Array.from(document.querySelectorAll('.step')).indexOf(
//     document.querySelector('.step:not([style*="none"])')
//   );

//   // Show the next step
//   showStep(currentStep + 1);
// });

// // Function to show/hide steps
// function showStep(stepNumber) {
//   // Hide all steps
//   step1.style.display = 'none';
//   step2.style.display = 'none';
//   step3.style.display = 'none';
//   step4.style.display = 'none';

//   // Show the selected step
//   document.querySelector(`.step-${stepNumber}`).style.display = 'block';
// }
