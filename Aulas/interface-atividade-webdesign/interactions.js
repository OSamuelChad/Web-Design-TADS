// Navegação entre páginas
function showPage(pageId) {
  // Remove active de todas as seções
  document.querySelectorAll(".page-section").forEach((section) => {
    section.classList.remove("active");
  });

  // Adiciona active na seção selecionada
  document.getElementById(pageId).classList.add("active");

  // Atualiza navegação ativa
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    link.removeAttribute("aria-current");
  });

  event.target.classList.add("active");
  event.target.setAttribute("aria-current", "page");

  // Scroll suave para o topo
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Atualiza URL sem recarregar página
  history.pushState(null, null, `#${pageId}`);
}

// Formulário de contato
function enviarMensagem(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const dados = {
    nome: formData.get("nome"),
    email: formData.get("email"),
    telefone: formData.get("telefone"),
    assunto: formData.get("assunto"),
    mensagem: formData.get("mensagem"),
  };

  // Simulação de envio
  const loadingBtn = event.target.querySelector(".submit-btn");
  const originalText = loadingBtn.textContent;

  loadingBtn.textContent = "Enviando...";
  loadingBtn.disabled = true;

  setTimeout(() => {
    alert(
      `Obrigado, ${dados.nome}! 🎉\n\nSua mensagem foi enviada com sucesso.\nEntraremos em contato através do email ${dados.email} em breve.\n\nAssunto: ${dados.assunto}`
    );

    // Reset do formulário
    event.target.reset();
    loadingBtn.textContent = originalText;
    loadingBtn.disabled = false;
  }, 2000);
}

// Efeito parallax no header
let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Navegação por URL
window.addEventListener("load", () => {
  const hash = window.location.hash.substring(1);
  if (hash && document.getElementById(hash)) {
    showPage(hash);
  }
});

// Acessibilidade: navegação por teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.activeElement.blur();
  }
});

// Lazy loading para animações
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
    }
  });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll(".card, .image-showcase").forEach((el) => {
  observer.observe(el);
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Performance: Preload crítico
const criticalResources = [
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIwLjA1Ij4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPgo8L2c+CjwvZz4KPC9zdmc+",
];

// Sistema de notificações
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: ${
                  type === "success" ? "var(--gradient-primary)" : "#dc3545"
                };
                color: white;
                padding: 1rem 2rem;
                border-radius: 12px;
                box-shadow: var(--shadow-strong);
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
            `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Validação de formulário em tempo real
document.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("blur", function () {
    validateField(this);
  });
});

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  let message = "";

  switch (field.type) {
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
      message = "Email inválido";
      break;
    case "tel":
      const phoneRegex = /^[\d\s\-\(\)]+$/;
      isValid = !value || phoneRegex.test(value);
      message = "Telefone inválido";
      break;
    default:
      if (field.required) {
        isValid = value.length > 0;
        message = "Campo obrigatório";
      }
  }

  if (!isValid && value) {
    field.style.borderColor = "#dc3545";
    field.style.boxShadow = "0 0 0 3px rgba(220, 53, 69, 0.1)";
  } else {
    field.style.borderColor = "";
    field.style.boxShadow = "";
  }
}

// PWA Service Worker registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Simular registro de service worker
    console.log("PWA capabilities detected");
  });
}

// Analytics de interação (simulado)
function trackInteraction(action, element) {
  console.log(`User interaction: ${action} on ${element}`);
  // Aqui você integraria com Google Analytics, etc.
}

// Adicionar listeners para tracking
document.querySelectorAll("button, a, .card").forEach((element) => {
  element.addEventListener("click", function () {
    trackInteraction(
      "click",
      this.tagName + (this.className ? "." + this.className.split(" ")[0] : "")
    );
  });
});
