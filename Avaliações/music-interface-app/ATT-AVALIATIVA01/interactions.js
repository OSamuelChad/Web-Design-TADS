document.addEventListener("DOMContentLoaded", function () {
  // Inicialmente esconde a tela de resultados
  document.querySelector(".results-screen").style.transform =
    "translateX(100%)";

  // Função para simular gravação ao clicar no botão de gravação
  const recordBtn = document.querySelector(".record-btn");
  recordBtn.addEventListener("click", function () {
    const recordingStatus = document.querySelector(".recording-status");
    recordingStatus.textContent = "Ouvindo...";

    // Simula encontrar a música após 2 segundos
    setTimeout(function () {
      document.querySelector(".recording-screen").style.transform =
        "translateX(-100%)";
      document.querySelector(".results-screen").style.transform =
        "translateX(0)";
    }, 2000);
  });

  // Volta para a tela de gravação ao clicar no botão de voltar
  const backBtn = document.querySelector(".back-btn");
  backBtn.addEventListener("click", function () {
    document.querySelector(".recording-screen").style.transform =
      "translateX(0)";
    document.querySelector(".results-screen").style.transform =
      "translateX(100%)";

    // Reseta o estado da gravação
    document.querySelector(".recording-status").textContent =
      "Toque para começar a ouvir";
  });
});

// Função para alternar entre as telas
function toggleScreens() {
  const recordingScreen = document.querySelector(".recording-screen");
  const resultsScreen = document.querySelector(".results-screen");

  if (
    recordingScreen.style.transform === "translateX(-100%)" ||
    recordingScreen.style.transform === ""
  ) {
    recordingScreen.style.transform = "translateX(0)";
    resultsScreen.style.transform = "translateX(100%)";
  } else {
    recordingScreen.style.transform = "translateX(-100%)";
    resultsScreen.style.transform = "translateX(0)";
  }
}
