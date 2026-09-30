document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById('contact-modal');
  if (!modal) return;

  var triggerButtons = document.querySelectorAll('[data-modal-trigger]');
  var closeButton = modal.querySelector('[data-modal-close]');
  var backdrop = modal.querySelector('[data-modal-backdrop]');
  var modalContainer = modal.querySelector('[data-modal-container]');
  var form = modal.querySelector('#contact-modal-form');

  var scrollableElements = [];
  var lastActiveElement = null;

  var focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ];

  function getFocusableElements(element) {
    return focusableSelectors
      .map(function(sel) { return element.querySelectorAll(sel); })
      .reduce(function(acc, items) {
        return acc.concat(Array.prototype.slice.call(items));
      }, [])
      .filter(function(el) {
        return el.offsetParent !== null || el === document.activeElement;
      });
  }

  function getScrollbarWidth() {
    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
      return 0;
    }
    var scrollDiv = document.createElement('div');
    scrollDiv.style.visibility = 'hidden';
    scrollDiv.style.overflow = 'scroll';
    scrollDiv.style.position = 'absolute';
    scrollDiv.style.top = '0';
    scrollDiv.style.width = '100px';
    scrollDiv.style.height = '100px';
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  }

  function openModal() {
    lastActiveElement = document.activeElement;

    modal.removeAttribute('hidden');
    modal.classList.add('modal--open');

    var originalOverflow = document.body.style.overflow;
    var scrollbarWidth = getScrollbarWidth();
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = scrollbarWidth + 'px';
    }
    modal.dataset.originalOverflow = originalOverflow;

    if (form) {
      var firstInput = form.querySelector('.form__input, .form__select, .form__textarea');
      if (firstInput) {
        setTimeout(function() {
          firstInput.focus();
        }, 100);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
  }

  function closeModal() {
    modal.setAttribute('hidden', '');
    modal.classList.remove('modal--open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    document.removeEventListener('keydown', handleKeyDown);

    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }

    if (e.key === 'Tab') {
      var focusableEls = getFocusableElements(modalContainer);
      if (focusableEls.length === 0) return;

      var firstEl = focusableEls[0];
      var lastEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  }

  function handleBackdropClick(e) {
    if (e.target === backdrop) {
      closeModal();
    }
  }

  triggerButtons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  if (backdrop) {
    backdrop.addEventListener('click', handleBackdropClick);
  }

  modal.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  /* ===== Form validation for modal ===== */
  if (form) {
    var requiredFields = ['name', 'phone', 'city', 'accidentDate', 'injuries', 'ipat', 'caseType', 'message', 'privacy', 'healthAuth'];
    var allFields = ['name', 'phone', 'email', 'city', 'accidentDate', 'injuries', 'ipat', 'caseType', 'message', 'privacy', 'healthAuth'];

    allFields.forEach(function(fieldName) {
      var field = form.querySelector('[name="' + fieldName + '"]');
      var errorElement = document.getElementById('modal-' + fieldName + '-error');

      if (field && errorElement) {
        field.addEventListener('blur', function() {
          validateModalField(field, errorElement);
        });

        field.addEventListener('input', function() {
          if (field.classList.contains('form__input--error') || field.classList.contains('form__select--error')) {
            validateModalField(field, errorElement);
          }
        });

        if (field.type === 'checkbox') {
          field.addEventListener('change', function() {
            validateModalField(field, errorElement);
          });
        }
      }
    });

    function validateModalField(field, errorElement) {
      var value = field.value.trim();
      var error = '';

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
        var dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(value)) {
          error = 'Ingrese una fecha válida.';
        } else {
          var date = new Date(value);
          var today = new Date();
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

      var isValid = true;

      requiredFields.forEach(function(fieldName) {
        var field = form.querySelector('[name="' + fieldName + '"]');
        var errorElement = document.getElementById('modal-' + fieldName + '-error');

        if (field && errorElement) {
          if (!validateModalField(field, errorElement)) {
            isValid = false;
          }
        }
      });

      var emailField = form.querySelector('[name="email"]');
      var emailError = document.getElementById('modal-email-error');
      if (emailField && emailError && emailField.value.trim()) {
        validateModalField(emailField, emailError);
      }

      if (!isValid) {
        var firstError = form.querySelector('.form__input--error, .form__select--error, .form__checkbox--error');
        if (firstError) {
          firstError.focus();
        }
        return;
      }

      var submitBtn = document.getElementById('modal-submit-btn');
      var submitText = document.getElementById('modal-submit-text');

      if (submitBtn && submitText) {
        submitText.textContent = 'Enviando...';
        submitBtn.disabled = true;
      }

      var formData = new FormData(form);
      var params = new URLSearchParams();
      for (var pair of formData.entries()) {
        params.append(pair[0], pair[1]);
      }

      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/contacto/submit', true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (submitBtn && submitText) {
            submitText.textContent = 'Enviar mi caso';
            submitBtn.disabled = false;
          }

          if (xhr.status === 200) {
            var response;
            try {
              response = JSON.parse(xhr.responseText);
            } catch (parseErr) {
              showModalMessage('Ocurrió un error al enviar su caso. Por favor, intente nuevamente.', 'error');
              return;
            }

            if (response.success) {
              var successMessage = 'Recibimos su información. Un abogado de A&V lo contactará en horario hábil. Si su caso es urgente, escríbanos por WhatsApp al 300 881 1886.';
              showModalMessage(response.message || successMessage, 'success');
              form.reset();
              setTimeout(function() {
                closeModal();
              }, 4000);
            } else {
              showModalMessage(response.message || 'Ocurrió un error al enviar su caso.', 'error');
            }
          } else {
            showModalMessage('Ocurrió un error al enviar su caso. Por favor, intente nuevamente.', 'error');
          }
        }
      };

      xhr.onerror = function() {
        if (submitBtn && submitText) {
          submitText.textContent = 'Enviar mi caso';
          submitBtn.disabled = false;
        }
        showModalMessage('No se pudo conectar con el servidor. Por favor, intente nuevamente.', 'error');
      };

      xhr.send(params);
    });

    function showModalMessage(message, type) {
      var existing = form.parentNode.querySelector('.form__success, .form__error-summary');
      if (existing) existing.remove();

      var messageDiv = document.createElement('div');
      if (type === 'success') {
        messageDiv.className = 'form__success';
        messageDiv.innerHTML = '<i data-lucide="check-circle" style="color: #008037; margin-right: 8px;"></i>' + message;
      } else {
        messageDiv.className = 'form__error-summary';
        messageDiv.innerHTML = '<i data-lucide="alert-circle" style="color: #721c24; margin-right: 8px;"></i>' + message;
      }
      form.parentNode.insertBefore(messageDiv, form);
      setTimeout(function() {
        if (messageDiv && messageDiv.parentNode) {
          messageDiv.parentNode.removeChild(messageDiv);
        }
      }, 8000);

      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }
  }
});
