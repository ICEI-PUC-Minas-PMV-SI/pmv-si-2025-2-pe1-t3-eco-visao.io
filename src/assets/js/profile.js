document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('profileForm');
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');

  loadProfile();

  cpf.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }

    e.target.value = value;
  });

  imageUpload.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showError(imageUpload, 'Por favor, selecione uma imagem válida');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        showError(imageUpload, 'A imagem deve ter no máximo 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        profileImg.src = e.target.result;
        profileImg.classList.remove('hidden');
        profilePlaceholder.classList.add('hidden');
      };
      reader.readAsDataURL(file);
    }
  });

  firstName.addEventListener('blur', () => validateFirstName());
  lastName.addEventListener('blur', () => validateLastName());

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    clearAllErrors();
    successMsg.classList.add('hidden');

    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isCPFValid = validateCPF();
    const isEnderecoValid = validateEndereco();
    const isDataNascimentoValid = validateDataNascimento();
    const isPasswordValid = validatePasswords();

    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isCPFValid &&
      isEnderecoValid &&
      isDataNascimentoValid &&
      isPasswordValid
    ) {
      saveProfile();
    } else {
      const firstError = document.querySelector('.border-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  cancelBtn.addEventListener('click', function () {
    window.location.href = './dashboard.html';
  });

  function validateFirstName() {
    const value = firstName.value.trim();

    if (value === '') {
      clearError(firstName);
      return true;
    }

    if (value.length < 2) {
      showError(firstName, 'O primeiro nome deve ter pelo menos 2 caracteres');
      return false;
    }
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
      showError(firstName, 'O primeiro nome deve conter apenas letras');
      return false;
    }
    clearError(firstName);
    return true;
  }

  function validateLastName() {
    const value = lastName.value.trim();

    if (value === '') {
      clearError(lastName);
      return true;
    }

    if (value.length < 2) {
      showError(lastName, 'O sobrenome deve ter pelo menos 2 caracteres');
      return false;
    }
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
      showError(lastName, 'O sobrenome deve conter apenas letras');
      return false;
    }
    clearError(lastName);
    return true;
  }

  function showError(element, message) {
    element.classList.add('border-red-500', 'focus:ring-red-400');
    element.classList.remove('border-gray-300', 'focus:ring-green-400');

    const existingError = element.parentElement.parentElement.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-500 text-xs mt-1';
    errorDiv.textContent = message;
    element.parentElement.parentElement.appendChild(errorDiv);
  }

  function clearError(element) {
    element.classList.remove('border-red-500', 'focus:ring-red-400');
    element.classList.add('border-gray-300', 'focus:ring-green-400');

    const errorMessage = element.parentElement.parentElement.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  function clearAllErrors() {
    const allInputs = form.querySelectorAll('input');
    allInputs.forEach(input => clearError(input));
  }

  function saveProfile() {
    const profileData = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      profileImage: profileImg.src
    };

    localStorage.setItem('userProfile', JSON.stringify(profileData));

    if (newPassword.value) {
      localStorage.setItem('userPassword', newPassword.value);
    }

    successMsg.classList.remove('hidden');
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });

    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';

    setTimeout(() => {
      successMsg.classList.add('hidden');
    }, 3000);
  }

  function loadProfile() {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);

      firstName.value = profileData.firstName || '';
      lastName.value = profileData.lastName || '';

      if (profileData.profileImage && profileData.profileImage !== '') {
        profileImg.src = profileData.profileImage;
        profileImg.classList.remove('hidden');
        profilePlaceholder.classList.add('hidden');
      }
    }
  }
});
