document.addEventListener('DOMContentLoaded', function () {
  let circles = document.querySelectorAll('.circle');
  let steps = document.querySelectorAll('[class^="step-"]');
  let buttonsNext = document.querySelectorAll('.btn2');
  let buttonsBack = document.querySelectorAll('.btn1');
  let buttonConfirm = document.querySelector('.btn2.confirm');
  let checkedBox = document.getElementById("toggleSwitch");
  let priceElement = document.getElementById("price1");
  let priceElement2 = document.getElementById("price2");
  let priceElement3 = document.getElementById("price3");
  let price1 = document.getElementById('p1');
  let price2 = document.getElementById('p2');
  let price3 = document.getElementById('p3');
  let freeMonthsElement1 = document.getElementById("freeMonths1");
  let freeMonthsElement2 = document.getElementById("freeMonths2");
  let freeMonthsElement3 = document.getElementById("freeMonths3");

  checkedBox.addEventListener("change", function () {
    if (checkedBox.checked) {
      priceElement.textContent = "$90/yr";
      priceElement2.textContent = "$120/yr";
      priceElement3.textContent = "$150/yr";
      freeMonthsElement1.textContent = "2 months free";
      freeMonthsElement2.textContent = "2 months free";
      freeMonthsElement3.textContent = "2 months free";
      price1.textContent = "+$10/yr";
      price2.textContent = "+$20/yr";
      price3.textContent = "+$20/yr";
    } else {
      priceElement.textContent = "$9/mo";
      priceElement2.textContent = "$12/mo";
      priceElement3.textContent = "$15/mo";
      freeMonthsElement1.textContent = "";
      freeMonthsElement2.textContent = "";
      freeMonthsElement3.textContent = "";
      price1.textContent = "+$1/mo";
      price2.textContent = "+$2/mo";
      price3.textContent = "+$1/mo";
    }
  });

  function createNewSelectedPlansArray() {
    return [];
  }

  let selectedPlans = createNewSelectedPlansArray();
  let selectedData = {
    personalInfo: {},
    plans: [],
    addons: []
  };

  const plans = document.querySelectorAll('.plan');

  plans.forEach((plan, index) => {
    plan.addEventListener('click', function () {
      plans.forEach(p => p.classList.remove('selected'));
      this.classList.add('selected');

      selectedPlans.push({
        name: this.querySelector('h3').innerText,
        price: document.getElementById(`price${index + 1}`).innerText,
        billing: checkedBox.checked ? 'Yearly' : 'Monthly',
      });

      updateData();
      selectedPlans = createNewSelectedPlansArray();
    });
  });

  const addons = document.querySelectorAll('.box');

  addons.forEach((addon, index) => {
    addon.addEventListener('click', function () {
      this.classList.toggle('selected');

      updateData();
    });
  });
  buttonsNext.forEach((button) => {
    button.addEventListener('click', () => {
      if (!validatePersonalInfo()) {
      alert('Please fill out all personal information fields.');
      event.preventDefault(); // Prevent the default form submission behavior
      event.stopPropagation(); // Stop the event from propagating further
    }
    });
  });

  function validatePersonalInfo() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const phoneValue = phoneInput.value.trim();

    const isNameValid = nameValue !== '';
    const isEmailValid = emailValue !== '';
    const isPhoneValid = phoneValue !== '';

   
    if (!isNameValid) {
      nameInput.style.border = '2px solid red';
      displayErrorMessage(nameInput, 'This field is required', 'name');
    } else {
      nameInput.style.border = '';
      removeErrorMessage('name');
    }

    if (!isEmailValid) {
      emailInput.style.border = '2px solid red';
      displayErrorMessage(emailInput, 'This field is required', 'email');
    } else {
      emailInput.style.border = '';
      removeErrorMessage('email');
    }

    if (!isPhoneValid) {
      phoneInput.style.border = '2px solid red';
      displayErrorMessage(phoneInput, 'This field is required', 'phone');
    } else {
      phoneInput.style.border = '';
      removeErrorMessage('phone');
    }

    return isNameValid && isEmailValid && isPhoneValid;
  }

  function displayErrorMessage(inputElement, message, id) {
    const errorMessageSelector = `.error-message[${id}]`;
    if (!document.querySelector(errorMessageSelector)) {
      inputElement.insertAdjacentHTML('afterend', `<div class="error-message" ${id}>${message}</div>`);
    }
  }

  function removeErrorMessage(id) {
    const errorMessageSelector = `.error-message[${id}]`;
    const errorMessage = document.querySelector(errorMessageSelector);
    if (errorMessage) {
      errorMessage.remove();
    }
  
  }


  function updateData() {
    selectedData.personalInfo = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value
    };

    selectedData.plans = [];
    selectedData.addons = [];

    const selectedPlan = document.querySelector('.plan.selected');
    if (selectedPlan) {
      selectedData.plans.push({
        name: selectedPlan.querySelector('h3').innerText,
        price: selectedPlan.querySelector('.info span').innerText,
        billing: checkedBox.checked ? 'Yearly' : 'Monthly',
      });
    }

    const selectedAddonsElements = document.querySelectorAll('.box.selected');
    selectedAddonsElements.forEach(addon => {
      selectedData.addons.push({
        type: 'Addon',
        name: addon.querySelector('h3').innerText,
        description: addon.querySelector('.p3').innerText,
        price: addon.querySelector('.price').innerText,
      });
    });

    console.clear();
    console.log('Selected Data:', selectedData);

   
    const confirmedPlan = document.querySelector('.confirmed-plan');
    confirmedPlan.innerHTML = '';

    ////// selected plan
    if (selectedData.plans.length > 0) {
      const selectedPlanDiv = document.createElement('div');
      selectedPlanDiv.classList.add('selected-plan');
      selectedPlanDiv.innerHTML = `<p class="plan-name">${selectedData.plans[0].name} (${selectedData.plans[0].billing})</p>
                                    <p class="plan-price">${selectedData.plans[0].price}</p>`;
      confirmedPlan.appendChild(selectedPlanDiv);
      confirmedPlan.innerHTML += '<hr>';
    }

    ////////  addons
    selectedData.addons.forEach(addon => {
      const selectedAddonDiv = document.createElement('div');
      selectedAddonDiv.classList.add('selected-addon');
      selectedAddonDiv.innerHTML = `<p class="service-name">${addon.name}</p>
                                    <p class="service-price">${addon.price}</p>`;
      confirmedPlan.appendChild(selectedAddonDiv);
    });
    
    
    confirmedPlan.appendChild(document.createElement('hr'));
    
  
    const totalAmountDiv = document.createElement('div');
    totalAmountDiv.classList.add('total');
    let totalAmount = selectedData.plans.length > 0 ? parseFloat(selectedData.plans[0].price.replace(/[^\d.]/g, '')) : 0;
    selectedData.addons.forEach(addon => {
      totalAmount += parseFloat(addon.price.replace(/[^\d.]/g, ''));
    });
    totalAmountDiv.innerHTML = `Total(per month) <b>+${totalAmount.toFixed(2)}/mo</b>`;
    confirmedPlan.appendChild(totalAmountDiv);
    
    confirmedPlan.style.background = 'rgb(248,249,255)';
  
  }

  function showStep(stepIndex) {
    steps.forEach(step => step.style.display = 'none');
    document.querySelector('.step-' + stepIndex).style.display = 'block';
    updateStepHoverEffect(stepIndex);
  }

  function getCurrentStepIndex(element) {
    return parseInt(element.closest('[class^="step-"]').className.match(/\d+/)[0], 10);
  }

  function navigateToStep(button, direction) {
    showStep(getCurrentStepIndex(button) + direction);
  }

  function updateStepHoverEffect(selectedStep) {
    circles.forEach((circle, index) => {
      if (index + 1 === selectedStep) {
        circle.classList.add('circle-hover');
      } else {
        circle.classList.remove('circle-hover');
      }
    });
  }

  circles.forEach((circle, index) => {
    circle.addEventListener('click', () => showStep(index + 1));
  });

  buttonsNext.forEach((button) => {
    button.addEventListener('click', () => {
      navigateToStep(button, 1);
    });
  });

  buttonsBack.forEach((button) => {
    button.addEventListener('click', () => {
      navigateToStep(button, -1);
    });
  });

  buttonConfirm.addEventListener('click', () => {
    showStep(5);
  });
});
