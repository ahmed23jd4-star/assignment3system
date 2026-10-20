const form = document.querySelector("#registration-form");
const fields = {
    name: document.querySelector("#name"),
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    confirmPassword: document.querySelector("#confirm-password"),
    age: document.querySelector("#age")
};
const status = document.querySelector("#form-status");

function validate() {
    const errors = {
        name: fields.name.value.trim() ? "" : "Please enter your name.",
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value.trim()) ? "" : "Enter a valid email address.",
        password: fields.password.value.length >= 8 ? "" : "Password must be at least 8 characters.",
        confirmPassword: fields.confirmPassword.value && fields.confirmPassword.value === fields.password.value ? "" : "Passwords do not match.",
        age: Number.isInteger(Number(fields.age.value)) && Number(fields.age.value) >= 1 && Number(fields.age.value) <= 120 ? "" : "Age must be a number from 1 to 120."
    };

    Object.entries(errors).forEach(([name, message]) => {
        const input = fields[name];
        document.querySelector(`#${input.id}-error`).textContent = message;
        input.setAttribute("aria-invalid", String(Boolean(message)));
    });
    return Object.values(errors).every((message) => !message);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "";
    if (!validate()) {
        form.querySelector('[aria-invalid="true"]').focus();
        return;
    }
    status.textContent = "All fields are valid. Registration is ready to submit.";
});

Object.values(fields).forEach((input) => input.addEventListener("input", () => {
    if (input.getAttribute("aria-invalid") === "true") validate();
}));
