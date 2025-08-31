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
        this.translations = {
            en: {
                dashboard: 'Dashboard',
                vocabulary: 'Vocabulary',
                test: 'Test',
                search: 'Search'
            },
            ar: {
                dashboard: 'لوحة التحكم',
                vocabulary: 'المفردات',
                test: 'الاختبار',
                search: 'البحث'
            }
        };
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

    navigateTo(page) {
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('bg-blue-50', 'text-blue-600', 'border-r-2', 'border-l-2', 'border-blue-600', 'active');
            item.classList.add('text-slate-600');
        });
        const activeItem = document.querySelector(`[data-page="${page}"]`);
        activeItem.classList.remove('text-slate-600');
        const borderClass = this.currentLang === 'ar' ? 'border-l-2' : 'border-r-2';
        activeItem.classList.add('bg-blue-50', 'text-blue-600', borderClass, 'border-blue-600', 'active');

        // Update page title
        document.querySelector('.page-title').textContent = this.getPageTitle(page);

        // Update current page and render
        this.currentPage = page;
        this.renderCurrentPage();
    }

    getPageTitle(page) {
        return this.t(page) || this.t('dashboard');
    }

    t(key) {
        return this.translations[this.currentLang][key] || key;
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
        document.getElementById('langText').textContent = this.currentLang === 'en' ? 'العربية' : 'English';
        
        // Update main content margin for RTL
        const mainContent = document.getElementById('mainContent');
        if (this.currentLang === 'ar') {
            mainContent.classList.remove('md:ml-72');
            mainContent.classList.add('md:mr-72');
        } else {
            mainContent.classList.remove('md:mr-72');
            mainContent.classList.add('md:ml-72');
        }
        
        this.updateNavigation();
        this.navigateTo(this.currentPage);
    }

    updateNavigation() {
        document.querySelectorAll('.nav-item span').forEach((span, index) => {
            const pages = ['dashboard', 'vocabulary', 'test', 'search'];
            span.textContent = this.t(pages[index]);
        });
        document.querySelector('.page-title').textContent = this.getPageTitle(this.currentPage);
        document.getElementById('searchBtnText').textContent = this.t('search');
    }

    renderCurrentPage() {
        const pageContent = document.getElementById('pageContent');
        
        switch (this.currentPage) {
            case 'dashboard':
                pageContent.innerHTML = '<h2>Dashboard Content</h2>';
                break;
            case 'vocabulary':
                pageContent.innerHTML = '<h2>Vocabulary Content</h2>';
                break;
            case 'test':
                pageContent.innerHTML = '<h2>Test Content</h2>';
                break;
            case 'search':
                pageContent.innerHTML = '<h2>Search Content</h2>';
                break;
            default:
                pageContent.innerHTML = '<h2>Dashboard Content</h2>';
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new VocabMasterApp();
});