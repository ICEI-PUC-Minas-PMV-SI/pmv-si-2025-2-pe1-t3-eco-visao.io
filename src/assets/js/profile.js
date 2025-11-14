document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('profileForm');
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const cpf = document.getElementById('cpf');
  const endereco = document.getElementById('endereco');
 

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
  email.addEventListener('blur', () => validateEmail());
  cpf.addEventListener('blur', () => validateCPF());
  endereco.addEventListener('blur', () => validateEndereco());
  dataNascimento.addEventListener('blur', () => validateDataNascimento());
  newPassword.addEventListener('input', () => validateNewPassword());
  confirmPassword.addEventListener('input', () => validateConfirmPassword());

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

  function validateEmail() {
    const value = email.value.trim();

    // Campo opcional - se vazio, é válido
    if (value === '') {
      clearError(email);
      return true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showError(email, 'Por favor, insira um email válido');
      return false;
    }
    clearError(email);
    return true;
  }

  function validateCPF() {
    const value = cpf.value.replace(/\D/g, '');

    if (value === '') {
      clearError(cpf);
      return true;
    }

    if (value.length !== 11) {
      showError(cpf, 'O CPF deve ter 11 dígitos');
      return false;
    }

    if (/^(\d)\1{10}$/.test(value)) {
      showError(cpf, 'CPF inválido');
      return false;
    }

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(value.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(value.substring(9, 10))) {
      showError(cpf, 'CPF inválido');
      return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(value.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(value.substring(10, 11))) {
      showError(cpf, 'CPF inválido');
      return false;
    }

    clearError(cpf);
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
      email: email.value.trim(),
      cpf: cpf.value,
      endereco: endereco.value.trim(),
      dataNascimento: dataNascimento.value,
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
    const savedProfile = localStorage.getItem('userProfile') ;
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);

      firstName.value = profileData.firstName || '';
      lastName.value = profileData.lastName || '';
      email.value = profileData.email || '';
      cpf.value = profileData.cpf || '';
      endereco.value = profileData.endereco || '';
      dataNascimento.value = profileData.dataNascimento || '';

      if (profileData.profileImage && profileData.profileImage !== '') {
        profileImg.src = profileData.profileImage;
        profileImg.classList.remove('hidden');
        profilePlaceholder.classList.add('hidden');
      }
    }
  }
});
