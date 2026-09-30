document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');

  if (!form) return;

  const requiredFields = ['name', 'phone', 'city', 'accidentDate', 'injuries', 'ipat', 'caseType', 'message', 'privacy', 'healthAuth'];

  const allFields = ['name', 'phone', 'email', 'city', 'accidentDate', 'injuries', 'ipat', 'caseType', 'message', 'privacy', 'healthAuth'];

  allFields.forEach(function(fieldName) {
    const field = form.querySelector('[name="' + fieldName + '"]');
    const errorElement = document.getElementById(fieldName + '-error');

    if (field && errorElement) {
      field.addEventListener('blur', function() {
        validateField(field, errorElement);
      });

      field.addEventListener('input', function() {
        if (field.classList.contains('form__input--error') || field.classList.contains('form__select--error')) {
          validateField(field, errorElement);
        }
      });

      if (field.type === 'checkbox') {
        field.addEventListener('change', function() {
          validateField(field, errorElement);
        });
      }
    }
  });

  function validateField(field, errorElement) {
    const value = field.value.trim();
    let error = '';

    if (field.hasAttribute('required') && !value) {
      error = 'Este campo es obligatorio.';
    } else if (field.type === 'email' && value) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Ingrese un correo electrónico válido.';
      }
    } else if (field.type === 'tel' && value) {
      if (!/^[\d\s\+\-\(\)]{7,}$/.test(value)) {
        error = 'Ingrese un número de teléfono válido.';
      }
    } else if (field.type === 'date' && value) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(value)) {
        error = 'Ingrese una fecha válida.';
      } else {
        const date = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date > today) {
          error = 'La fecha no puede ser futura.';
        }
      }
    } else if (field.tagName === 'SELECT' && value === '') {
      error = 'Seleccione una opción.';
    } else if (field.name === 'message' && value) {
      if (value.length < 10) {
        error = 'La descripción debe tener al menos 10 caracteres.';
      } else if (value.length > 1000) {
        error = 'La descripción no debe exceder 1000 caracteres.';
      }
    }

    errorElement.textContent = error;
    field.classList.toggle('form__input--error', !!error);
    field.classList.toggle('form__select--error', !!error);
    field.classList.toggle('form__checkbox--error', !!error);
    field.setAttribute('aria-invalid', !!error ? 'true' : 'false');

    return !error;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;

    requiredFields.forEach(function(fieldName) {
      const field = form.querySelector('[name="' + fieldName + '"]');
      const errorElement = document.getElementById(fieldName + '-error');

      if (field && errorElement) {
        if (!validateField(field, errorElement)) {
          isValid = false;
        }
      }
    });

    const emailField = form.querySelector('[name="email"]');
    const emailError = document.getElementById('email-error');
    if (emailField && emailError && emailField.value.trim()) {
      validateField(emailField, emailError);
    }

    if (!isValid) {
      const firstError = form.querySelector('.form__input--error, .form__select--error, .form__checkbox--error');
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const submitIcon = submitBtn ? submitBtn.querySelector('.btn__icon') : null;

    if (submitBtn && submitText) {
      submitText.textContent = 'Enviando...';
      submitBtn.disabled = true;
      if (submitIcon) {
        submitIcon.setAttribute('data-lucide', 'loader-circle');
        submitIcon.setAttribute('data-lucide-status', 'loading');
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }
    }

    const formData = new FormData(form);
    const params = new URLSearchParams();
    for (var pair of formData.entries()) {
      params.append(pair[0], pair[1]);
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/contacto/submit', true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (submitBtn && submitText) {
          submitText.textContent = 'Enviar mi caso';
          submitBtn.disabled = false;
          if (submitIcon) {
            submitIcon.setAttribute('data-lucide', 'send');
            if (typeof lucide !== 'undefined') {
              lucide.createIcons();
            }
          }
        }

        if (xhr.status === 200) {
          let response;
          try {
            response = JSON.parse(xhr.responseText);
          } catch (e) {
            showErrorMessage('Ocurrió un error al enviar su caso. Por favor, intente nuevamente.');
            return;
          }

          if (response.success) {
            const successMessage = 'Recibimos su información. Un abogado de A&V lo contactará en horario hábil. Si su caso es urgente, escríbanos por WhatsApp al 300 881 1886.';
            showSuccessMessage(response.message || successMessage);
            form.reset();
          } else {
            showErrorMessage(response.message || 'Ocurrió un error al enviar su caso.');
          }
        } else {
          showErrorMessage('Ocurrió un error al enviar su caso. Por favor, intente nuevamente.');
        }
      }
    };

    xhr.onerror = function() {
      if (submitBtn && submitText) {
        submitText.textContent = 'Enviar mi caso';
        submitBtn.disabled = false;
        if (submitIcon) {
          submitIcon.setAttribute('data-lucide', 'send');
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
        }
      }
      showErrorMessage('No se pudo conectar con el servidor. Por favor, intente nuevamente.');
    };

    xhr.send(params);
  });

  function showSuccessMessage(message) {
    const existing = form.parentNode.querySelector('.form__success');
    if (existing) existing.remove();

    const successDiv = document.createElement('div');
    successDiv.className = 'form__success';
    successDiv.innerHTML = '<i data-lucide="check-circle" style="color: #008037; margin-right: 8px;"></i>' + message;
    form.parentNode.insertBefore(successDiv, form);

    setTimeout(function() {
      if (successDiv && successDiv.parentNode) {
        successDiv.parentNode.removeChild(successDiv);
      }
    }, 8000);

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  function showErrorMessage(message) {
    const existing = form.parentNode.querySelector('.form__error-summary');
    if (existing) existing.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'form__error-summary';
    errorDiv.innerHTML = '<i data-lucide="alert-circle" style="color: #721c24; margin-right: 8px;"></i>' + message;
    form.parentNode.insertBefore(errorDiv, form);

    setTimeout(function() {
      if (errorDiv && errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 8000);
  }
});
