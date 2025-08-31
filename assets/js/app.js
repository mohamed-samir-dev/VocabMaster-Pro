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
                pageContent.innerHTML = this.renderDashboard();
                break;
            case 'vocabulary':
                pageContent.innerHTML = this.renderVocabulary();
                this.setupVocabularyEvents();
                break;
            case 'test':
                pageContent.innerHTML = '<h2>Test Content</h2>';
                break;
            case 'search':
                pageContent.innerHTML = '<h2>Search Content</h2>';
                break;
            default:
                pageContent.innerHTML = this.renderDashboard();
        }
    }

    renderDashboard() {
        return `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-sm font-medium text-slate-500 uppercase tracking-wide">Total Words</span>
                        <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-xl text-blue-600">
                            <i class="fas fa-book"></i>
                        </div>
                    </div>
                    <div class="text-3xl font-bold text-slate-800 mb-2">${this.stats.totalWords}</div>
                </div>

                <div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-sm font-medium text-slate-500 uppercase tracking-wide">Studied Today</span>
                        <div class="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-xl text-green-600">
                            <i class="fas fa-check-circle"></i>
                        </div>
                    </div>
                    <div class="text-3xl font-bold text-slate-800 mb-2">${this.stats.studiedToday}</div>
                </div>

                <div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-sm font-medium text-slate-500 uppercase tracking-wide">Accuracy</span>
                        <div class="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center text-xl text-yellow-600">
                            <i class="fas fa-target"></i>
                        </div>
                    </div>
                    <div class="text-3xl font-bold text-slate-800 mb-2">${this.stats.accuracy}%</div>
                </div>

                <div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-sm font-medium text-slate-500 uppercase tracking-wide">Study Streak</span>
                        <div class="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-xl text-orange-600">
                            <i class="fas fa-fire"></i>
                        </div>
                    </div>
                    <div class="text-3xl font-bold text-slate-800 mb-2">${this.stats.streak}</div>
                </div>
            </div>
        `;
    }

    renderVocabulary() {
        return `
            <div class="flex justify-between items-center mb-8 flex-wrap gap-4">
                <h2 class="text-2xl font-semibold text-slate-800">Vocabulary</h2>
                <button class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200" id="addWordBtn">
                    <i class="fas fa-plus"></i>
                    Add Word
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="vocabularyGrid">
                ${this.renderWordCards()}
            </div>
        `;
    }

    renderWordCards() {
        if (this.words.length === 0) {
            return '<div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm col-span-full text-center"><p class="text-slate-500">Your vocabulary collection is empty. Start building your knowledge by adding your first word!</p></div>';
        }
        
        return this.words.map(word => `
            <div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex-1">
                        <div class="text-xl font-semibold text-slate-800 mb-1">${word.english}</div>
                        <div class="text-base text-slate-600">${word.arabic}</div>
                    </div>
                    <div class="flex gap-2">
                        <button class="w-9 h-9 border-0 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 bg-slate-100 text-slate-600 hover:bg-red-500 hover:text-white" onclick="app.deleteWord('${word.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupVocabularyEvents() {
        // Vocabulary event listeners will be added here
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new VocabMasterApp();
});