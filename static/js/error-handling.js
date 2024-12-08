class ErrorHandler {
    static handleDataLoadError(error) {
        console.error('Data loading error:', error);
        this.displayErrorMessage('Unable to load player data. Please refresh the page.');
    }

    static displayErrorMessage(message) {
        const errorDisplay = document.querySelector('.error-display');
        errorDisplay.textContent = message;
        errorDisplay.style.display = 'block';
    }

    static clearError() {
        const errorDisplay = document.querySelector('.error-display');
        errorDisplay.style.display = 'none';
    }
}
