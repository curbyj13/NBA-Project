class StateManager {
    static states = {
        loading: false,
        error: null
    };

    static updateLoadingState(isLoading) {
        this.states.loading = isLoading;
        this.updateUI();
    }

    static setError(error) {
        this.states.error = error;
        this.updateUI();
    }

    static clearError() {
        this.states.error = null;
        this.updateUI();
    }

    static updateUI() {
        const container = document.querySelector('.charts-container');
        const loadingOverlay = document.querySelector('.loading-overlay');
        const errorDisplay = document.querySelector('.error-display');

        // Handle loading state
        container.classList.toggle('loading', this.states.loading);
        loadingOverlay.style.display = this.states.loading ? 'flex' : 'none';

        // Handle error state
        if (this.states.error) {
            errorDisplay.textContent = this.states.error.message;
            errorDisplay.style.display = 'block';
            container.classList.add('error');
        } else {
            errorDisplay.style.display = 'none';
            container.classList.remove('error');
        }
    }
}
