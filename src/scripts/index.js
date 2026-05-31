document.querySelectorAll(".btn-acessar").forEach(function(btn) {
    btn.addEventListener("click", function() {
        const system = btn.dataset.system;
        if (system) {
            window.location.href = "src/pages/" + system + ".html";
        }
    });
});