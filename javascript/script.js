import { callApi } from './api.js';

document.addEventListener("DOMContentLoaded", () => {
  // ============ TEXTO ANIMADO ============
  const typedTextSpan = document.querySelector(".texto-animado");
  const textArray = ["em cada Solicitação", "em cada Chamado", "É Charles²"];
  const typingDelay = 100;
  const erasingDelay = 150;
  const newTextDelay = 1000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 500);
    }
  }

  function init() {
    typedTextSpan.textContent = textArray[textArrayIndex];
    charIndex = textArray[textArrayIndex].length;
    setTimeout(erase, newTextDelay);
  }

  init();

  // ============ REQUISIÇÃO DE CONTATO ============
  const form = document.querySelector(".contato form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("nome").value.trim();
    const phone = document.getElementById("telefone").value.trim();
    const email = document.getElementById("email").value.trim();
    const city = document.getElementById("cidade").value.trim();
    const message = document.getElementById("mensagem").value.trim();
    const tipoPlano = document.querySelector('input[name="tipo_plano"]:checked')?.value.toUpperCase();

    if (!name || !email || !message || !phone || !tipoPlano) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const payload = {
      name,
      phone,
      email,
      city,
      personType: tipoPlano,
      message
    };

    try {
      const resposta = await callApi({
        url: "/contactRequest/send",
        method: "POST",
        body: payload
      });

      alert("Contato enviado com sucesso! Em breve retornaremos.");
      form.reset();
    } catch (error) {
      console.error("Erro ao enviar contato:", error);
    }
  });
});


