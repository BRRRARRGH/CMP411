"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function myFunction() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    const firstNameHTML = document.getElementById('firstName');
    const firstName = firstNameHTML.value;
    const lastName = document.getElementById('lastName').value;
    welcomeMessage.textContent = `Welcome, again ${firstName} ${lastName}!`;
}
//# sourceMappingURL=exercize.js.map