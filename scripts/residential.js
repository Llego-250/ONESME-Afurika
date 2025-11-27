function toggleFields(radioName, sectionId) {
    const yesSelected = document.querySelector(`input[name="${radioName}"][value="yes"]`);
    const section = document.getElementById(sectionId);

    yesSelected.addEventListener("change", () => {
        section.style.display = "grid";
    });

    const noSelected = document.querySelector(`input[name="${radioName}"][value="no"]`);

    noSelected.addEventListener("change", () => {
        section.style.display = "none";
    });
}

// joint asset
toggleFields("joint", "joint-fields");

// bought asset
toggleFields("bought", "bought-fields");

// loan asset
toggleFields("loan", "loan-fields");

// rent asset
toggleFields("rent", "rent-fields");
