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

  // Add event listener to print button
  const printBtn = document.getElementById("print-pdf");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      window.print();
    });
  }
});
