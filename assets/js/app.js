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
        this.currentLang = 'ar';
        this.welcomeContent = {
            en: [
                {
                    icon: '📚',
                    title: 'Smart Vocabulary Learning',
                    description: 'Build your English vocabulary with our intelligent learning system',
                    subtitle: 'Your journey to English mastery begins here'
                },
                {
                    icon: '🧠',
                    title: 'Interactive Testing',
                    description: 'Challenge yourself with adaptive quizzes and track your progress',
                    subtitle: 'Test your knowledge and improve faster'
                },
                {
                    icon: '📊',
                    title: 'Progress Analytics',
                    description: 'Monitor your learning journey with detailed statistics and insights',
                    subtitle: 'See how far you\'ve come'
                },
                {
                    icon: '🎯',
                    title: 'Personalized Experience',
                    description: 'Tailored learning paths that adapt to your pace and preferences',
                    subtitle: 'Learning made just for you'
                }
            ],
            ar: [
                {
                    icon: '📚',
                    title: 'تعلم المفردات الذكي',
                    description: 'ابني مفرداتك الإنجليزية مع نظام التعلم الذكي',
                    subtitle: 'رحلتك لإتقان الإنجليزية تبدأ هنا'
                },
                {
                    icon: '🧠',
                    title: 'الاختبارات التفاعلية',
                    description: 'تحدى نفسك مع الاختبارات التكيفية وتتبع تقدمك',
                    subtitle: 'اختبر معرفتك وتحسن بشكل أسرع'
                },
                {
                    icon: '📊',
                    title: 'تحليلات التقدم',
                    description: 'راقب رحلة تعلمك مع الإحصائيات والرؤى التفصيلية',
                    subtitle: 'انظر إلى أي مدى وصلت'
                },
                {
                    icon: '🎯',
                    title: 'تجربة شخصية',
                    description: 'مسارات تعلم مخصصة تتكيف مع وتيرتك وتفضيلاتك',
                    subtitle: 'التعلم مصمم خصيصاً لك'
                }
            ]
        };
        this.currentWelcomeIndex = 0;
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
                deleteWord: 'Delete Word',
                deleteWarning: 'This action cannot be undone',
                deleteConfirm: 'Are you sure you want to delete:',
                startTest: 'Start Test',
                submit: 'Submit',
                skip: 'Skip',
                assessmentReady: 'Assessment Ready',
                evaluateMastery: 'Evaluate your mastery of',
                word: 'word',
                words: 'words',
                question: 'Question',
                of: 'of',
                enterTranslation: 'Enter your translation...',
                addWordsFirst: 'Please add vocabulary words to your collection before taking a test.',
                emptyCollection: 'Your vocabulary collection is empty. Start building your knowledge by adding your first word!',
                searchPlaceholder: 'Search words or translations...',
                noWordsForSearch: 'No vocabulary available for search. Please add words to your collection first.',
                startTyping: 'Start typing to search your vocabulary',
                noMatches: 'No matching vocabulary found. Try different search terms.',
                testComplete: 'Test Complete!',
                yourScore: 'Your Score',
                correctAnswers: 'Correct Answers',
                totalQuestions: 'Total Questions',
                timeSpent: 'Time Spent',
                performance: 'Performance',
                excellent: 'Excellent',
                good: 'Good',
                fair: 'Fair',
                needsImprovement: 'Needs Improvement',
                retakeTest: 'Retake Test',
                backToDashboard: 'Back to Dashboard',
                progressRate: 'Progress Rate',
                weeklyGoal: 'Weekly Goal',
                masteryLevel: 'Mastery Level',
                recentActivity: 'Recent Activity',
                wordsThisWeek: 'Words This Week',
                averageScore: 'Average Score',
                completionRate: 'Completion Rate',
                goalProgress: 'Goal Progress',
                beginner: 'Beginner',
                intermediate: 'Intermediate',
                advanced: 'Advanced',
                expert: 'Expert',
                appTitle: 'VocabMaster Pro',
                learningInsights: 'Learning Insights',
                dailyChallenge: 'Daily Challenge',
                wordOfTheDay: 'Word of the Day',
                studyRecommendation: 'Study Recommendation',
                motivationalQuote: 'Stay Consistent!',
                quoteText: 'Success is the sum of small efforts repeated day in and day out.',
                challengeText: 'Learn 5 new words today',
                recommendationText: 'Focus on words you haven\'t tested yet',
                viewChallenge: 'Start Challenge',
                learnMore: 'Learn More',
                welcomeTitle: 'Welcome to VocabMaster Pro',
                getStarted: 'Get Started',
                studiedTodayInfo: 'Updates after completing tests',
                streakInfo: 'Updates after taking tests',
                developerNoticeTitle: 'Developer Notice',
                noticeTitle: 'Personal Developer Site',
                noticeDescription: 'This site is exclusively for the developer. All statistics and data displayed here are personal and private to the developer. This application is used for development and personal testing purposes.',
                privacyNote: 'Data is protected and private',
                developmentNote: 'Development and testing environment',
                understoodBtn: 'Understood'
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
                deleteWord: 'حذف الكلمة',
                deleteWarning: 'لا يمكن التراجع عن هذا الإجراء',
                deleteConfirm: 'هل أنت متأكد من حذف:',
                startTest: 'بدء الاختبار',
                submit: 'إرسال',
                skip: 'تخطي',
                assessmentReady: 'الاختبار جاهز',
                evaluateMastery: 'قيم إتقانك لـ',
                word: 'كلمة',
                words: 'كلمات',
                question: 'السؤال',
                of: 'من',
                enterTranslation: 'أدخل الترجمة...',
                addWordsFirst: 'يرجى إضافة كلمات مفردات إلى مجموعتك قبل إجراء الاختبار.',
                emptyCollection: 'مجموعة المفردات فارغة. ابدأ ببناء معرفتك بإضافة كلمتك الأولى!',
                searchPlaceholder: 'البحث في الكلمات أو الترجمات...',
                noWordsForSearch: 'لا توجد مفردات متاحة للبحث. يرجى إضافة كلمات إلى مجموعتك أولاً.',
                startTyping: 'ابدأ الكتابة للبحث في مفرداتك',
                noMatches: 'لم يتم العثور على مفردات مطابقة. جرب مصطلحات بحث مختلفة.',
                testComplete: 'اكتمل الاختبار!',
                yourScore: 'نتيجتك',
                correctAnswers: 'الإجابات الصحيحة',
                totalQuestions: 'إجمالي الأسئلة',
                timeSpent: 'الوقت المستغرق',
                performance: 'الأداء',
                excellent: 'ممتاز',
                good: 'جيد',
                fair: 'مقبول',
                needsImprovement: 'يحتاج تحسين',
                retakeTest: 'إعادة الاختبار',
                backToDashboard: 'العودة للوحة التحكم',
                progressRate: 'معدل التقدم',
                weeklyGoal: 'الهدف الأسبوعي',
                masteryLevel: 'مستوى الإتقان',
                recentActivity: 'النشاط الأخير',
                wordsThisWeek: 'كلمات هذا الأسبوع',
                averageScore: 'متوسط النتيجة',
                completionRate: 'معدل الإنجاز',
                goalProgress: 'تقدم الهدف',
                beginner: 'مبتدئ',
                intermediate: 'متوسط',
                advanced: 'متقدم',
                expert: 'خبير',
                appTitle: 'ماستر المفردات برو',
                learningInsights: 'رؤى التعلم',
                dailyChallenge: 'تحدي يومي',
                wordOfTheDay: 'كلمة اليوم',
                studyRecommendation: 'توصية الدراسة',
                motivationalQuote: 'استمر في التعلم!',
                quoteText: 'النجاح هو مجموع الجهود الصغيرة المتكررة يومياً.',
                challengeText: 'تعلم 5 كلمات جديدة اليوم',
                recommendationText: 'ركز على الكلمات التي لم تختبرها بعد',
                viewChallenge: 'بدء التحدي',
                learnMore: 'تعلم المزيد',
                welcomeTitle: 'مرحباً بك في ماستر المفردات برو',
                getStarted: 'ابدأ الآن',
                studiedTodayInfo: 'يتحدث بعد إكمال الاختبارات',
                streakInfo: 'يتحدث بعد إجراء الاختبارات',
                developerNoticeTitle: 'إشعار المطور',
                noticeTitle: 'موقع المطور الشخصي',
                noticeDescription: 'هذا الموقع مخصص للمطور فقط. جميع الإحصائيات والبيانات المعروضة هنا شخصية وخاصة بالمطور. يُستخدم هذا التطبيق لأغراض التطوير والاختبار الشخصي.',
                privacyNote: 'البيانات محمية وشخصية',
                developmentNote: 'بيئة تطوير واختبار',
                understoodBtn: 'فهمت'
            }
        };
        this.init();
    }

    async init() {
        this.setInitialLanguage();
        this.setupEventListeners();
        this.showLoading();
        await this.loadData();
        this.renderCurrentPage();
        this.hideLoading();
        this.checkFirstVisit();
    }

    setInitialLanguage() {
        // Check localStorage for saved language preference, default to Arabic
        const savedLang = localStorage.getItem('vocabmaster_language') || 'ar';
        this.currentLang = savedLang;
        
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
        document.getElementById('langText').textContent = this.currentLang === 'ar' ? 'English' : 'العربية';
        
        const mainContent = document.getElementById('mainContent');
        if (this.currentLang === 'ar') {
            mainContent.classList.remove('md:ml-72');
            mainContent.classList.add('md:mr-72');
        } else {
            mainContent.classList.remove('md:mr-72');
            mainContent.classList.add('md:ml-72');
        }
        
        this.updateNavigation();
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

    checkFirstVisit() {
        const hasVisited = localStorage.getItem('vocabmaster_visited');
        if (!hasVisited) {
            setTimeout(() => this.showWelcomeModal(), 500);
        }
    }

    showWelcomeModal() {
        const modal = document.getElementById('welcomeModal');
        modal.classList.remove('opacity-0', 'invisible');
        modal.classList.add('opacity-100', 'visible');
        modal.querySelector('.bg-white').classList.remove('scale-95');
        modal.querySelector('.bg-white').classList.add('scale-100');
        
        this.updateWelcomeModalLanguage();
        this.startWelcomeContentRotation();
    }

    startWelcomeContentRotation() {
        this.updateWelcomeContent();
        this.welcomeInterval = setInterval(() => {
            this.currentWelcomeIndex = (this.currentWelcomeIndex + 1) % this.welcomeContent[this.currentLang].length;
            this.updateWelcomeContent();
        }, 3000);
    }

    updateWelcomeContent() {
        const content = this.welcomeContent[this.currentLang][this.currentWelcomeIndex];
        const elements = {
            icon: document.getElementById('welcomeIcon'),
            title: document.getElementById('welcomeTitle'),
            description: document.getElementById('welcomeDescription'),
            subtitle: document.getElementById('welcomeSubtitle')
        };

        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                elements[key].style.opacity = '0';
                setTimeout(() => {
                    elements[key].textContent = content[key];
                    elements[key].style.opacity = '1';
                }, 200);
            }
        });
    }

    closeWelcomeModal() {
        const modal = document.getElementById('welcomeModal');
        modal.classList.remove('opacity-100', 'visible');
        modal.classList.add('opacity-0', 'invisible');
        modal.querySelector('.bg-white').classList.remove('scale-100');
        modal.querySelector('.bg-white').classList.add('scale-95');
        
        if (this.welcomeInterval) {
            clearInterval(this.welcomeInterval);
        }
        
        localStorage.setItem('vocabmaster_visited', 'true');
        
        // Show developer notice modal after welcome modal
        setTimeout(() => this.showDeveloperNoticeModal(), 500);
    }

    showDeveloperNoticeModal() {
        const modal = document.getElementById('developerNoticeModal');
        modal.classList.remove('opacity-0', 'invisible');
        modal.classList.add('opacity-100', 'visible');
        modal.querySelector('.bg-white').classList.remove('scale-95');
        modal.querySelector('.bg-white').classList.add('scale-100');
        
        this.updateDeveloperNoticeLanguage();
    }

    closeDeveloperNoticeModal() {
        const modal = document.getElementById('developerNoticeModal');
        modal.classList.remove('opacity-100', 'visible');
        modal.classList.add('opacity-0', 'invisible');
        modal.querySelector('.bg-white').classList.remove('scale-100');
        modal.querySelector('.bg-white').classList.add('scale-95');
    }

    updateDeveloperNoticeLanguage() {
        const elements = {
            developerNoticeTitle: document.getElementById('developerNoticeTitle'),
            noticeTitle: document.getElementById('noticeTitle'),
            noticeDescription: document.getElementById('noticeDescription'),
            privacyNote: document.getElementById('privacyNote'),
            developmentNote: document.getElementById('developmentNote'),
            understoodBtn: document.getElementById('understoodBtn')
        };
        
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                elements[key].textContent = this.t(key);
            }
        });
    }

    updateWelcomeModalLanguage() {
        const titleEl = document.getElementById('welcomeModalTitle');
        const btnEl = document.getElementById('getStartedBtn');
        if (titleEl) titleEl.textContent = this.t('welcomeTitle');
        if (btnEl) btnEl.textContent = this.t('getStarted');
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
        } else {
            this.stats.accuracy = 0;
        }

        // Calculate streak
        this.stats.streak = this.calculateStreak();
        
        // Calculate additional stats with error handling
        try {
            this.stats.progressRate = this.calculateProgressRate();
            this.stats.weeklyGoal = this.calculateWeeklyGoal();
            this.stats.masteryLevel = this.calculateMasteryLevel();
            this.stats.wordsThisWeek = this.calculateWordsThisWeek();
            this.stats.averageScore = this.stats.accuracy; // Use accuracy as average score
            this.stats.completionRate = this.calculateCompletionRate();
        } catch (error) {
            console.error('Error calculating additional stats:', error);
            // Set default values
            this.stats.progressRate = 0;
            this.stats.weeklyGoal = 0;
            this.stats.masteryLevel = 'Beginner';
            this.stats.wordsThisWeek = 0;
            this.stats.averageScore = 0;
            this.stats.completionRate = 0;
        }
    }

    calculateStreak() {
        const studiedWords = this.words.filter(word => word.lastStudied);
        if (studiedWords.length === 0) return 0;
        
        // Get unique study dates and sort them in descending order (most recent first)
        const studyDates = [...new Set(studiedWords
            .map(word => new Date(word.lastStudied).toDateString())
        )].sort((a, b) => new Date(b) - new Date(a));

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Check if user studied today or yesterday to start counting streak
        const mostRecentStudyDate = new Date(studyDates[0]);
        mostRecentStudyDate.setHours(0, 0, 0, 0);
        const daysSinceLastStudy = Math.floor((today - mostRecentStudyDate) / (1000 * 60 * 60 * 24));
        
        // If last study was more than 1 day ago, streak is broken
        if (daysSinceLastStudy > 1) return 0;
        
        // Count consecutive days starting from the most recent
        let expectedDate = new Date(mostRecentStudyDate);
        
        for (const dateString of studyDates) {
            const studyDate = new Date(dateString);
            studyDate.setHours(0, 0, 0, 0);
            
            if (studyDate.getTime() === expectedDate.getTime()) {
                streak++;
                expectedDate.setDate(expectedDate.getDate() - 1); // Move to previous day
            } else {
                break; // Gap found, streak ends
            }
        }
        
        return streak;
    }
    
    calculateProgressRate() {
        if (this.words.length === 0) return 0;
        const studiedWords = this.words.filter(word => word.lastStudied).length;
        return Math.round((studiedWords / this.words.length) * 100);
    }
    
    calculateWeeklyGoal() {
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        weekStart.setHours(0, 0, 0, 0);
        
        const wordsThisWeek = this.words.filter(word => {
            if (!word.dateAdded) return false;
            const wordDate = new Date(word.dateAdded);
            return wordDate >= weekStart;
        }).length;
        
        const goal = 100; // Weekly goal of 100 new words
        return Math.min(Math.round((wordsThisWeek / goal) * 100), 100);
    }
    
    calculateMasteryLevel() {
        const accuracy = this.stats.accuracy || 0;
        if (accuracy >= 90) return 'Expert';
        if (accuracy >= 75) return 'Advanced';
        if (accuracy >= 60) return 'Intermediate';
        return 'Beginner';
    }
    
    calculateWordsThisWeek() {
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        weekStart.setHours(0, 0, 0, 0);
        
        return this.words.filter(word => {
            if (!word.dateAdded) return false;
            const wordDate = new Date(word.dateAdded);
            return wordDate >= weekStart;
        }).length;
    }
    
    calculateAverageScore() {
        const wordsWithResults = this.words.filter(word => word.quizResults && word.quizResults.length > 0);
        if (wordsWithResults.length === 0) return 0;
        
        let totalScore = 0;
        let totalAttempts = 0;
        
        wordsWithResults.forEach(word => {
            const correctCount = word.quizResults.filter(result => result.correct).length;
            const wordScore = (correctCount / word.quizResults.length) * 100;
            totalScore += wordScore;
            totalAttempts++;
        });
        
        return Math.round(totalScore / totalAttempts);
    }
    
    calculateCompletionRate() {
        if (this.words.length === 0) return 0;
        const testedWords = this.words.filter(word => 
            word.quizResults && word.quizResults.length > 0
        ).length;
        return Math.round((testedWords / this.words.length) * 100);
    }
    
    getWordOfTheDay() {
        if (this.words.length === 0) {
            return { english: 'Welcome', arabic: 'أهلاً وسهلاً' };
        }
        
        // Use date as seed for consistent daily word
        const today = new Date().toDateString();
        const seed = today.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
        const index = seed % this.words.length;
        return this.words[index];
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
        
        // Save language preference to localStorage
        localStorage.setItem('vocabmaster_language', this.currentLang);
        
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
        this.updateWelcomeModalLanguage();
        this.updateDeveloperNoticeLanguage();
        this.navigateTo(this.currentPage);
    }

    updateNavigation() {
        document.querySelectorAll('.nav-item span').forEach((span, index) => {
            const pages = ['dashboard', 'vocabulary', 'test', 'search'];
            span.textContent = this.t(pages[index]);
        });
        document.querySelector('.page-title').textContent = this.getPageTitle(this.currentPage);
        document.getElementById('searchBtnText').textContent = this.t('search');
        document.getElementById('appTitle').textContent = this.t('appTitle');
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
            <!-- Main Stats Grid -->
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
                    <div class="flex items-center gap-1 text-xs text-slate-400">
                        <i class="fas fa-info-circle"></i>
                        <span>${this.t('studiedTodayInfo')}</span>
                    </div>
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
                    <div class="flex items-center gap-1 text-xs text-slate-400">
                        <i class="fas fa-info-circle"></i>
                        <span>${this.t('streakInfo')}</span>
                    </div>
                </div>
            </div>
            
            <!-- Progress & Analytics Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <!-- Progress Rate Card -->
                <div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                    <h3 class="text-lg font-semibold text-slate-800 mb-4">${this.t('progressRate')}</h3>
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-sm text-slate-600">${this.t('completionRate')}</span>
                        <span class="text-sm font-medium text-slate-800">${this.stats.progressRate}%</span>
                    </div>
                    <div class="w-full bg-slate-200 rounded-full h-2 mb-4">
                        <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: ${this.stats.progressRate}%"></div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <div class="text-2xl font-bold text-green-600">${this.stats.wordsThisWeek}</div>
                            <div class="text-xs text-slate-500">${this.t('wordsThisWeek')}</div>
                        </div>
                        <div>
                            <div class="text-2xl font-bold text-purple-600">${this.stats.averageScore}%</div>
                            <div class="text-xs text-slate-500">${this.t('averageScore')}</div>
                        </div>
                    </div>
                </div>
                
                <!-- Weekly Goal Card -->
                <div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                    <h3 class="text-lg font-semibold text-slate-800 mb-4">${this.t('weeklyGoal')}</h3>
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-sm text-slate-600">${this.t('masteryLevel')}</span>
                        <span class="text-sm font-medium px-2 py-1 rounded-full ${
                            this.stats.masteryLevel === 'Expert' ? 'bg-green-100 text-green-800' :
                            this.stats.masteryLevel === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                            this.stats.masteryLevel === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                        }">${this.t(this.stats.masteryLevel.toLowerCase())}</span>
                    </div>
                    <div class="w-full bg-slate-200 rounded-full h-2 mb-4">
                        <div class="bg-green-600 h-2 rounded-full transition-all duration-300" style="width: ${Math.min(this.stats.weeklyGoal, 100)}%"></div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-slate-800 mb-1">${this.stats.weeklyGoal}%</div>
                        <div class="text-sm text-slate-500">${this.t('goalProgress')}</div>
                    </div>
                </div>
            </div>
            
            <!-- Learning Insights Section -->
            <div class="mt-8">
                <h2 class="text-xl font-semibold text-slate-800 mb-6">${this.t('learningInsights')}</h2>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Daily Challenge Card -->
                    <div class="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
                        <div class="relative z-10">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-trophy text-yellow-300"></i>
                                </div>
                                <h3 class="font-semibold">${this.t('dailyChallenge')}</h3>
                            </div>
                            <p class="text-white text-opacity-90 mb-4">${this.t('challengeText')}</p>
                            <button class="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200" onclick="app.navigateTo('test')">
                                ${this.t('viewChallenge')}
                            </button>
                        </div>
                    </div>
                    
                    <!-- Word of the Day Card -->
                    <div class="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white relative overflow-hidden">
                        <div class="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full -ml-8 -mb-8"></div>
                        <div class="relative z-10">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-lightbulb text-yellow-300"></i>
                                </div>
                                <h3 class="font-semibold">${this.t('wordOfTheDay')}</h3>
                            </div>
                            <div class="mb-4">
                                <p class="text-2xl font-bold mb-1">${this.getWordOfTheDay().english}</p>
                                <p class="text-white text-opacity-90">${this.getWordOfTheDay().arabic}</p>
                            </div>
                            <button class="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200" onclick="app.navigateTo('vocabulary')">
                                ${this.t('learnMore')}
                            </button>
                        </div>
                    </div>
                    
                    <!-- Motivational Quote Card -->
                    <div class="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white relative overflow-hidden">
                        <div class="absolute top-0 left-0 w-24 h-24 bg-white bg-opacity-5 rounded-full -ml-12 -mt-12"></div>
                        <div class="relative z-10">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-quote-left text-yellow-300"></i>
                                </div>
                                <h3 class="font-semibold">${this.t('motivationalQuote')}</h3>
                            </div>
                            <p class="text-white text-opacity-90 text-sm italic mb-4">"${this.t('quoteText')}"</p>
                            <div class="text-xs text-white text-opacity-70">
                                ${this.t('studyRecommendation')}: ${this.t('recommendationText')}
                            </div>
                        </div>
                    </div>
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
            
            <!-- Delete Confirmation Modal -->
            <div id="deleteConfirmModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 invisible transition-all duration-300">
                <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-slate-800">${this.t('deleteWord')}</h3>
                            <p class="text-slate-600 text-sm">${this.t('deleteWarning')}</p>
                        </div>
                    </div>
                    <div class="mb-6 p-4 bg-slate-50 rounded-lg">
                        <p class="text-slate-700">${this.t('deleteConfirm')}</p>
                        <div class="mt-2">
                            <p class="font-semibold text-slate-800" id="deleteWordEnglish"></p>
                            <p class="text-slate-600" id="deleteWordArabic"></p>
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <button type="button" onclick="app.hideDeleteConfirmModal()" class="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">${this.t('cancel')}</button>
                        <button type="button" onclick="app.confirmDeleteWord()" class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">${this.t('delete')}</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderWordCards() {
        if (this.words.length === 0) {
            return `<div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm col-span-full text-center"><p class="text-slate-500">${this.t('emptyCollection')}</p></div>`;
        }
        
        return this.words.map(word => `
            <div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <div class="flex justify-between items-start mb-4">
                    <div class="flex-1">
                        <div class="text-xl font-semibold text-slate-800 mb-1">${word.english}</div>
                        <div class="text-base text-slate-600">${word.arabic}</div>
                    </div>
                    <div class="flex gap-2">
                        <button class="w-9 h-9 border-0 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 bg-slate-100 text-slate-600 hover:bg-red-500 hover:text-white" onclick="app.showDeleteConfirmModal('${word.id}', '${word.english}', '${word.arabic}')">
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
    
    showDeleteConfirmModal(wordId, english, arabic) {
        this.wordToDelete = wordId;
        document.getElementById('deleteWordEnglish').textContent = english;
        document.getElementById('deleteWordArabic').textContent = arabic;
        const modal = document.getElementById('deleteConfirmModal');
        modal.classList.remove('opacity-0', 'invisible');
        modal.classList.add('opacity-100', 'visible');
    }
    
    hideDeleteConfirmModal() {
        const modal = document.getElementById('deleteConfirmModal');
        modal.classList.remove('opacity-100', 'visible');
        modal.classList.add('opacity-0', 'invisible');
        this.wordToDelete = null;
    }
    
    confirmDeleteWord() {
        if (this.wordToDelete) {
            this.deleteWord(this.wordToDelete);
            this.hideDeleteConfirmModal();
        }
    }

    renderTest() {
        if (this.words.length === 0) {
            return `<div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm text-center"><p class="text-slate-500">${this.t('addWordsFirst')}</p></div>`;
        }
        
        if (!this.currentTest) {
            const wordCount = this.words.length;
            const wordText = wordCount === 1 ? this.t('word') : this.t('words');
            return `
                <div class="max-w-2xl mx-auto">
                    <div class="bg-white rounded-lg p-8 border border-slate-200 shadow-sm text-center">
                        <h2 class="text-2xl font-semibold text-slate-800 mb-4">${this.t('assessmentReady')}</h2>
                        <p class="text-slate-600 mb-6">${this.t('evaluateMastery')} ${wordCount} ${wordText}</p>
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
                    <p class="text-center text-slate-600">${this.t('question')} ${this.currentTest.currentIndex + 1} ${this.t('of')} ${this.currentTest.questions.length}</p>
                </div>
                
                <div class="bg-white rounded-lg p-8 border border-slate-200 shadow-sm text-center mb-8">
                    <div class="text-3xl font-semibold text-slate-800 mb-8">${question.question}</div>
                    <input type="text" class="w-full px-4 py-4 text-lg border-2 border-slate-300 rounded-lg text-center mb-4 transition-all duration-200 focus:outline-none focus:border-blue-500" id="answerInput" placeholder="${this.t('enterTranslation')}">
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
                    <input type="text" id="searchInput" placeholder="${this.t('searchPlaceholder')}" class="w-full pl-12 pr-4 py-4 text-lg border border-slate-300 rounded-lg bg-white transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-100">
                </div>
                <div class="flex flex-col gap-4" id="searchResults">
                    ${this.words.length === 0 ? `<div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm text-center"><p class="text-slate-500">${this.t('noWordsForSearch')}</p></div>` : `<div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm text-center"><p class="text-slate-500">${this.t('startTyping')}</p></div>`}
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
            results.innerHTML = `<div class="bg-white rounded-lg p-6 border border-slate-200 shadow-sm text-center"><p class="text-slate-500">${this.t('noMatches')}</p></div>`;
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
        const questions = shuffled.map(word => {
            const isEnglishToArabic = Math.random() > 0.5;
            return {
                question: isEnglishToArabic ? word.english : word.arabic,
                answer: isEnglishToArabic ? word.arabic : word.english,
                word
            };
        });
        
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
        const correctAnswer = question.answer.trim();
        
        // Normalize both answers for comparison
        const normalizedUser = userAnswer.toLowerCase().replace(/[^a-zA-Z0-9\u0600-\u06FF\s]/g, '').trim();
        const normalizedCorrect = correctAnswer.toLowerCase().replace(/[^a-zA-Z0-9\u0600-\u06FF\s]/g, '').trim();
        
        const isCorrect = normalizedUser === normalizedCorrect;
        
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

    async finishTest() {
        const correct = this.currentTest.answers.filter(a => a.correct).length;
        const total = this.currentTest.answers.length;
        const percentage = Math.round((correct / total) * 100);
        
        // Update lastStudied for all tested words
        const today = new Date().toISOString();
        for (let i = 0; i < this.currentTest.questions.length; i++) {
            const question = this.currentTest.questions[i];
            const answer = this.currentTest.answers[i];
            const word = question.word;
            
            try {
                // Update in Firebase
                await firebase.updateDoc(firebase.doc(firebase.db, 'words', word.id), {
                    lastStudied: today,
                    quizResults: [...(word.quizResults || []), { correct: answer.correct, date: today }]
                });
                
                // Update local data
                const wordIndex = this.words.findIndex(w => w.id === word.id);
                if (wordIndex !== -1) {
                    this.words[wordIndex].lastStudied = today;
                    this.words[wordIndex].quizResults = [...(this.words[wordIndex].quizResults || []), { correct: answer.correct, date: today }];
                }
            } catch (error) {
                console.error('Error updating word stats:', error);
            }
        }
        
        // Recalculate stats with new data
        this.calculateStats();
        
        this.showTestResults(correct, total, percentage);
        this.currentTest = null;
    }

    showTestResults(correct, total, percentage) {
        const timeSpent = Math.round((new Date() - this.currentTest.startTime) / 1000);
        const minutes = Math.floor(timeSpent / 60);
        const seconds = timeSpent % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        let performanceKey, performanceColor, performanceIcon;
        if (percentage >= 90) {
            performanceKey = 'excellent';
            performanceColor = 'text-green-600 bg-green-50';
            performanceIcon = 'fa-trophy';
        } else if (percentage >= 70) {
            performanceKey = 'good';
            performanceColor = 'text-blue-600 bg-blue-50';
            performanceIcon = 'fa-thumbs-up';
        } else if (percentage >= 50) {
            performanceKey = 'fair';
            performanceColor = 'text-yellow-600 bg-yellow-50';
            performanceIcon = 'fa-star-half-alt';
        } else {
            performanceKey = 'needsImprovement';
            performanceColor = 'text-red-600 bg-red-50';
            performanceIcon = 'fa-chart-line';
        }
        
        const pageContent = document.getElementById('pageContent');
        pageContent.innerHTML = `
            <div class="max-w-2xl mx-auto">
                <div class="bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center">
                    <div class="w-20 h-20 mx-auto mb-6 ${performanceColor} rounded-full flex items-center justify-center">
                        <i class="fas ${performanceIcon} text-3xl"></i>
                    </div>
                    
                    <h2 class="text-3xl font-bold text-slate-800 mb-2">${this.t('testComplete')}</h2>
                    <p class="text-lg ${performanceColor.split(' ')[0]} font-semibold mb-8">${this.t(performanceKey)}</p>
                    
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        <div class="text-center">
                            <div class="text-3xl font-bold text-slate-800 mb-1">${percentage}%</div>
                            <div class="text-sm text-slate-600">${this.t('yourScore')}</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-green-600 mb-1">${correct}</div>
                            <div class="text-sm text-slate-600">${this.t('correctAnswers')}</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-slate-800 mb-1">${total}</div>
                            <div class="text-sm text-slate-600">${this.t('totalQuestions')}</div>
                        </div>
                        <div class="text-center">
                            <div class="text-3xl font-bold text-blue-600 mb-1">${timeString}</div>
                            <div class="text-sm text-slate-600">${this.t('timeSpent')}</div>
                        </div>
                    </div>
                    
                    <div class="flex gap-4 justify-center">
                        <button onclick="app.startTest()" class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            <i class="fas fa-redo mr-2"></i>
                            ${this.t('retakeTest')}
                        </button>
                        <button onclick="app.navigateTo('dashboard')" class="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium">
                            <i class="fas fa-home mr-2"></i>
                            ${this.t('backToDashboard')}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new VocabMasterApp();
});