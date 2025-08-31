// Main Application Controller
class VocabMasterApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.words = [];
        this.stats = {
            totalWords: 0,
            studiedToday: 0,
            accuracy: 0,
            streak: 0
        };
        this.currentLang = 'en';
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.showLoading();
        await this.loadData();
        this.renderCurrentPage();
        this.hideLoading();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const page = e.currentTarget.dataset.page;
                this.navigateTo(page);
            });
        });

        // Sidebar toggle for mobile
        const sidebarToggle = document.querySelector('.sidebar-toggle');
        const sidebar = document.querySelector('.sidebar-slide');
        
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                sidebar.classList.toggle('open');
            });
        }
    }

    showLoading() {
        const overlay = document.getElementById('loadingOverlay');
        overlay.classList.remove('opacity-0', 'invisible');
        overlay.classList.add('opacity-100', 'visible');
    }

    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        overlay.classList.remove('opacity-100', 'visible');
        overlay.classList.add('opacity-0', 'invisible');
    }

    async loadData() {
        // Data loading logic will be implemented here
    }

    renderCurrentPage() {
        // Page rendering logic will be implemented here
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new VocabMasterApp();
});