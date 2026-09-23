document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');

  if (!form) return;

  const fields = ['name', 'phone', 'email', 'city', 'caseType', 'message', 'privacy'];

  fields.forEach(function(fieldName) {
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
    } else if (field.id === 'caseType' && value && value === '') {
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
    field.setAttribute('aria-invalid', !!error);

    return !error;
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;
    fields.forEach(function(fieldName) {
      const field = form.querySelector('[name="' + fieldName + '"]');
      const errorElement = document.getElementById(fieldName + '-error');
      if (field && errorElement) {
        if (!validateField(field, errorElement)) {
          isValid = false;
        }
      }
    });

    if (!isValid) {
      const firstError = form.querySelector('.form__input--error, .form__select--error');
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    if (submitBtn && submitText) {
      submitText.textContent = 'Enviando...';
      submitBtn.disabled = true;
    }

    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/contacto/submit', true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (submitBtn && submitText) {
          submitText.textContent = 'Solicitar valoración';
          submitBtn.disabled = false;
        }

        if (xhr.status === 200) {
          let response;
          try {
            response = JSON.parse(xhr.responseText);
          } catch (e) {
            form.reset();
            return;
          }

          if (response.success) {
            showSuccessMessage(response.message || 'Su caso ha sido enviado correctamente.');
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
        submitText.textContent = 'Solicitar valoración';
        submitBtn.disabled = false;
      }
      showErrorMessage('No se pudo conectar con el servidor. Por favor, intente nuevamente.');
    };

    const params = new URLSearchParams();
    for (var pair of formData.entries()) {
      params.append(pair[0], pair[1]);
    }
    xhr.send(params);
  });

  function showSuccessMessage(message) {
    const existing = form.querySelector('.form__success');
    if (existing) existing.remove();

    const successDiv = document.createElement('div');
    successDiv.className = 'form__success';
    successDiv.innerHTML = '<i data-lucide="check-circle" style="color: #008037; margin-right: 8px;"></i>' + message;
    successDiv.style.cssText = 'display: flex; align-items: center; padding: 1rem; background-color: #d4edda; color: #155724; border-radius: var(--border-radius); margin-bottom: 1rem;';
    form.parentNode.insertBefore(successDiv, form);

    setTimeout(function() {
      if (successDiv && successDiv.parentNode) {
        successDiv.parentNode.removeChild(successDiv);
      }
    }, 5000);

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  function showErrorMessage(message) {
    const existing = form.querySelector('.form__error-summary');
    if (existing) existing.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'form__error-summary';
    errorDiv.textContent = message;
    errorDiv.style.cssText = 'padding: 1rem; background-color: #f8d7da; color: #721c24; border-radius: var(--border-radius); margin-bottom: 1rem;';
    form.parentNode.insertBefore(errorDiv, form);

    setTimeout(function() {
      if (errorDiv && errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 5000);
  }
});
