document.addEventListener("DOMContentLoaded", function () {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const salaryParam = urlParams.get("salary");

  // Check for salary parameter
  if (salaryParam) {
    const salaryElement = document.getElementById("salary");
    if (salaryElement) {
      salaryElement.textContent = salaryParam + " ₽";
      salaryElement.classList.remove("hidden");
    }
  }

  // Add event listener to download button
  const downloadBtn = document.getElementById("download-pdf");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      window.print();
    });
  }
});
