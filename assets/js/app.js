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
        try {
            // Load words from Firebase
            const wordsSnapshot = await firebase.getDocs(firebase.collection(firebase.db, 'words'));
            this.words = [];
            wordsSnapshot.forEach((doc) => {
                this.words.push({ id: doc.id, ...doc.data() });
            });

            // Calculate stats
            this.calculateStats();
        } catch (error) {
            console.error('Error loading data:', error);
            this.showToast('Unable to load vocabulary data. Please check your connection.', 'error');
        }
    }

    calculateStats() {
        this.stats.totalWords = this.words.length;
        
        // Get today's date
        const today = new Date().toDateString();
        
        // Calculate studied today
        this.stats.studiedToday = this.words.filter(word => 
            word.lastStudied && new Date(word.lastStudied).toDateString() === today
        ).length;

        // Calculate accuracy from recent quiz results
        const recentQuizzes = this.words.filter(word => word.quizResults && word.quizResults.length > 0);
        if (recentQuizzes.length > 0) {
            const totalAttempts = recentQuizzes.reduce((sum, word) => sum + word.quizResults.length, 0);
            const correctAttempts = recentQuizzes.reduce((sum, word) => 
                sum + word.quizResults.filter(result => result.correct).length, 0);
            this.stats.accuracy = Math.round((correctAttempts / totalAttempts) * 100);
        }

        // Calculate streak
        this.stats.streak = this.calculateStreak();
    }

    calculateStreak() {
        const studyDates = [...new Set(this.words
            .filter(word => word.lastStudied)
            .map(word => new Date(word.lastStudied).toDateString())
        )].sort((a, b) => new Date(b) - new Date(a));

        let streak = 0;
        const today = new Date();
        
        for (let i = 0; i < studyDates.length; i++) {
            const studyDate = new Date(studyDates[i]);
            const daysDiff = Math.floor((today - studyDate) / (1000 * 60 * 60 * 24));
            
            if (daysDiff === i) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-yellow-500';
        toast.className = `${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-80 animate-pulse`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'exclamation'}"></i>
            <span>${message}</span>
        `;

        const container = document.getElementById('toastContainer');
        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
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