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
                search: 'Search',
                totalWords: 'Total Words',
                studiedToday: 'Studied Today',
                accuracy: 'Accuracy',
                studyStreak: 'Study Streak',
                addWord: 'Add Word',
                englishWord: 'English Word',
                arabicTranslation: 'Arabic Translation',
                cancel: 'Cancel',
                delete: 'Delete',
                startTest: 'Start Test',
                submit: 'Submit',
                skip: 'Skip'
            },
            ar: {
                dashboard: 'لوحة التحكم',
                vocabulary: 'المفردات',
                test: 'الاختبار',
                search: 'البحث',
                totalWords: 'إجمالي الكلمات',
                studiedToday: 'درست اليوم',
                accuracy: 'الدقة',
                studyStreak: 'أيام متتالية',
                addWord: 'إضافة كلمة',
                englishWord: 'الكلمة الإنجليزية',
                arabicTranslation: 'الترجمة العربية',
                cancel: 'إلغاء',
                delete: 'حذف',
                startTest: 'بدء الاختبار',
                submit: 'إرسال',
                skip: 'تخطي'
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

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 768 && sidebar.classList.contains('open') && 
                !sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });

        // Close sidebar when clicking nav items on mobile
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    sidebar.classList.remove('open');
                }
            });
        });
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
                pageContent.innerHTML = this.renderTest();
                this.setupTestEvents();
                break;
            case 'search':
                pageContent.innerHTML = this.renderSearch();
                this.setupSearchEvents();
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
                        <span class="text-sm font-medium text-slate-500 uppercase tracking-wide">${this.t('totalWords')}</span>
                        <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-xl text-blue-600">
                            <i class="fas fa-book"></i>
                        </div>
                    </div>
                    <div class="text-3xl font-bold text-slate-800 mb-2">${this.stats.totalWords}</div>
                </div>

                <div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-sm font-medium text-slate-500 uppercase tracking-wide">${this.t('studiedToday')}</span>
                        <div class="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-xl text-green-600">
                            <i class="fas fa-check-circle"></i>
                        </div>
                    </div>
                    <div class="text-3xl font-bold text-slate-800 mb-2">${this.stats.studiedToday}</div>
                </div>

                <div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-sm font-medium text-slate-500 uppercase tracking-wide">${this.t('accuracy')}</span>
                        <div class="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center text-xl text-yellow-600">
                            <i class="fas fa-target"></i>
                        </div>
                    </div>
                    <div class="text-3xl font-bold text-slate-800 mb-2">${this.stats.accuracy}%</div>
                </div>

                <div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-sm font-medium text-slate-500 uppercase tracking-wide">${this.t('studyStreak')}</span>
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
                <h2 class="text-2xl font-semibold text-slate-800">${this.t('vocabulary')}</h2>
                <button class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200" id="addWordBtn">
                    <i class="fas fa-plus"></i>
                    ${this.t('addWord')}
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="vocabularyGrid">
                ${this.renderWordCards()}
            </div>
            
            <!-- Add Word Modal -->
            <div id="addWordModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 invisible transition-all duration-300">
                <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4">
                    <h3 class="text-xl font-semibold text-slate-800 mb-4">${this.t('addWord')}</h3>
                    <form id="addWordForm">
                        <div class="mb-4">
                            <label class="block text-slate-700 text-sm font-medium mb-2">${this.t('englishWord')}</label>
                            <input type="text" id="englishInput" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-6">
                            <label class="block text-slate-700 text-sm font-medium mb-2">${this.t('arabicTranslation')}</label>
                            <input type="text" id="arabicInput" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="flex gap-3">
                            <button type="button" onclick="app.hideAddWordModal()" class="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">${this.t('cancel')}</button>
                            <button type="submit" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">${this.t('addWord')}</button>
                        </div>
                    </form>
                </div>
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
        const addWordBtn = document.getElementById('addWordBtn');
        if (addWordBtn) {
            addWordBtn.addEventListener('click', () => this.showAddWordModal());
        }
        
        const form = document.getElementById('addWordForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const english = document.getElementById('englishInput').value.trim();
                const arabic = document.getElementById('arabicInput').value.trim();
                if (english && arabic) {
                    this.addWord(english, arabic);
                    this.hideAddWordModal();
                }
            });
        }
    }
    
    showAddWordModal() {
        const modal = document.getElementById('addWordModal');
        modal.classList.remove('opacity-0', 'invisible');
        modal.classList.add('opacity-100', 'visible');
        document.getElementById('englishInput').focus();
    }
    
    hideAddWordModal() {
        const modal = document.getElementById('addWordModal');
        modal.classList.remove('opacity-100', 'visible');
        modal.classList.add('opacity-0', 'invisible');
        document.getElementById('addWordForm').reset();
    }

    renderTest() {
        if (this.words.length === 0) {
            return '<div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm text-center"><p class="text-slate-500">Please add vocabulary words to your collection before taking a test.</p></div>';
        }
        
        if (!this.currentTest) {
            return `
                <div class="max-w-2xl mx-auto">
                    <div class="bg-white rounded-lg p-8 border border-slate-200 shadow-sm text-center">
                        <h2 class="text-2xl font-semibold text-slate-800 mb-4">Assessment Ready</h2>
                        <p class="text-slate-600 mb-6">Evaluate your mastery of ${this.words.length} ${this.words.length === 1 ? 'word' : 'words'}</p>
                        <button class="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg text-base font-medium hover:bg-blue-700 transition-all duration-200" onclick="app.startTest()">
                            <i class="fas fa-play"></i>
                            ${this.t('startTest')}
                        </button>
                    </div>
                </div>
            `;
        }
        
        const question = this.currentTest.questions[this.currentTest.currentIndex];
        const progress = ((this.currentTest.currentIndex + 1) / this.currentTest.questions.length) * 100;
        
        return `
            <div class="max-w-2xl mx-auto">
                <div class="mb-8">
                    <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                        <div class="h-full bg-blue-600 transition-all duration-300" style="width: ${progress}%"></div>
                    </div>
                    <p class="text-center text-slate-600">Question ${this.currentTest.currentIndex + 1} of ${this.currentTest.questions.length}</p>
                </div>
                
                <div class="bg-white rounded-lg p-8 border border-slate-200 shadow-sm text-center mb-8">
                    <div class="text-3xl font-semibold text-slate-800 mb-8">${question.question}</div>
                    <input type="text" class="w-full px-4 py-4 text-lg border-2 border-slate-300 rounded-lg text-center mb-4 transition-all duration-200 focus:outline-none focus:border-blue-500" id="answerInput" placeholder="Enter your translation...">
                    <div class="flex gap-4 justify-center">
                        <button class="px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all duration-200" onclick="app.skipQuestion()">${this.t('skip')}</button>
                        <button class="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200" onclick="app.submitAnswer()">${this.t('submit')}</button>
                    </div>
                </div>
            </div>
        `;
    }

    setupTestEvents() {
        const answerInput = document.getElementById('answerInput');
        if (answerInput) {
            answerInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.submitAnswer();
                }
            });
            answerInput.focus();
        }
    }

    renderSearch() {
        return `
            <div class="max-w-4xl mx-auto">
                <h2 class="text-2xl font-semibold text-slate-800 mb-8">${this.t('search')} ${this.t('vocabulary')}</h2>
                <div class="relative mb-8">
                    <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                    <input type="text" id="searchInput" placeholder="Search words or translations..." class="w-full pl-12 pr-4 py-4 text-lg border border-slate-300 rounded-lg bg-white transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100">
                </div>
                <div class="flex flex-col gap-4" id="searchResults">
                    ${this.words.length === 0 ? '<div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm text-center"><p class="text-slate-500">No vocabulary available for search. Please add words to your collection first.</p></div>' : ''}
                </div>
            </div>
        `;
    }

    setupSearchEvents() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.performSearch(e.target.value);
                }, 300);
            });
        }
    }

    performSearch(query) {
        const results = document.getElementById('searchResults');
        
        if (!query.trim()) {
            results.innerHTML = '';
            return;
        }
        
        const matches = this.words.filter(word => 
            word.english.toLowerCase().includes(query.toLowerCase()) ||
            word.arabic.includes(query)
        );
        
        if (matches.length === 0) {
            results.innerHTML = `<div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm text-center"><p class="text-slate-500">No matching vocabulary found. Try different search terms.</p></div>`;
            return;
        }
        
        results.innerHTML = matches.map(word => `
            <div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                <div class="text-xl font-semibold text-slate-800">${word.english}</div>
                <div class="text-base text-slate-600">${word.arabic}</div>
            </div>
        `).join('');
    }

    async addWord(english, arabic) {
        // Validate inputs
        if (!english || !arabic || !english.trim() || !arabic.trim()) {
            this.showToast('Please provide both English word and Arabic translation.', 'error');
            return;
        }
        
        // Check for duplicates
        const duplicate = this.words.find(word => 
            word.english.toLowerCase() === english.toLowerCase().trim()
        );
        if (duplicate) {
            this.showToast('This English word already exists in your vocabulary.', 'error');
            return;
        }
        
        try {
            const docRef = await firebase.addDoc(firebase.collection(firebase.db, 'words'), {
                english,
                arabic,
                dateAdded: new Date().toISOString()
            });
            
            this.words.push({ id: docRef.id, english, arabic });
            this.calculateStats();
            this.renderCurrentPage();
            this.showToast('Vocabulary word added successfully to your collection.', 'success');
        } catch (error) {
            this.showToast('Unable to add word. Please try again.', 'error');
        }
    }

    async deleteWord(wordId) {
        try {
            await firebase.deleteDoc(firebase.doc(firebase.db, 'words', wordId));
            this.words = this.words.filter(word => word.id !== wordId);
            this.calculateStats();
            this.renderCurrentPage();
            this.showToast('Vocabulary word removed successfully.', 'success');
        } catch (error) {
            this.showToast('Unable to delete word. Please try again.', 'error');
        }
    }

    startTest() {
        if (this.words.length === 0) {
            this.showToast('Please add vocabulary words before starting a test.', 'error');
            return;
        }
        
        const shuffled = [...this.words].sort(() => Math.random() - 0.5);
        const questions = shuffled.slice(0, Math.min(10, this.words.length)).map(word => ({
            question: Math.random() > 0.5 ? word.english : word.arabic,
            answer: Math.random() > 0.5 ? word.arabic : word.english,
            word
        }));
        
        this.currentTest = {
            questions,
            currentIndex: 0,
            answers: [],
            startTime: new Date()
        };
        
        this.renderCurrentPage();
    }

    submitAnswer() {
        const userAnswer = document.getElementById('answerInput').value.trim();
        const question = this.currentTest.questions[this.currentTest.currentIndex];
        const isCorrect = userAnswer.toLowerCase() === question.answer.toLowerCase();
        
        this.currentTest.answers.push({ userAnswer, correct: isCorrect });
        this.nextQuestion();
    }

    skipQuestion() {
        this.currentTest.answers.push({ userAnswer: '', correct: false });
        this.nextQuestion();
    }

    nextQuestion() {
        this.currentTest.currentIndex++;
        
        if (this.currentTest.currentIndex >= this.currentTest.questions.length) {
            this.finishTest();
        } else {
            this.renderCurrentPage();
        }
    }

    finishTest() {
        const correct = this.currentTest.answers.filter(a => a.correct).length;
        const total = this.currentTest.answers.length;
        const percentage = Math.round((correct / total) * 100);
        
        this.showTestResults(correct, total, percentage);
        this.currentTest = null;
    }

    showTestResults(correct, total, percentage) {
        const performanceLevel = percentage >= 90 ? 'Excellent' : percentage >= 70 ? 'Good' : percentage >= 50 ? 'Fair' : 'Needs Improvement';
        
        this.showToast(`Test completed! Score: ${correct}/${total} (${percentage}%) - ${performanceLevel}`, 'success');
        this.navigateTo('dashboard');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new VocabMasterApp();
});