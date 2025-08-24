// EduBot Premium ULTRA - JavaScript COMPLET avec TOUS LES COURS
// Ajout de tous les contenus éducatifs + tracking + espace parent

console.log('🤖 EduBot SIL & CP - Démarrage COMPLET avec tous les cours...');

// === CONFIGURATION ADAPTÉE AUX 4-8 ANS ===
const APP_CONFIG = {
    GEMINI_API_KEY: 'AIzaSyD3HEQq3uZM_EyL16plXIASWwq_cAuj9ps', // ✅ VOTRE VRAIE CLÉ !
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    PARENT_PIN: '1234', 
    MUSIC_FILE: 'kids_melody.mp3', // 🎵 VOTRE FICHIER MUSICAL !
    MUSIC_ENABLED: true,
    TTS_ENABLED: true,
    AUTO_TYPING_SPEED: 50, // Ajusté - moins lent
    CHILD_MUSIC_VOLUME: 0.4,
    TARGET_AGE: '4-8 ans',
    LANGUAGE: 'français simple'
};

// === ÉTAT GLOBAL AVEC TRACKING ===
let appState = {
    currentUser: null,
    currentSection: 'dashboard',
    musicPlaying: false,
    ttsEnabled: true,
    volume: 40,
    profiles: {},
    isLoading: false,
    sessionStartTime: null,
    dailyStudyTime: 0,
    currentActivity: null
};

// === PROFILS ADAPTÉS SIL & CP AVEC TRACKING ===
const defaultProfiles = {
    'mika': {
        id: 'mika',
        name: 'Mika le Curieux',
        avatar: '👶',
        age: 4,
        class: 'SIL',
        level: 'débutant',
        points: 120,
        welcome: 'Salut Mika ! On va apprendre plein de choses amusantes ensemble ! 🌟',
        studyStats: {
            totalTimeMinutes: 0,
            sessionsToday: 0,
            lastActivity: null,
            completedLessons: [],
            favoriteSubject: 'Mathématiques',
            currentStreak: 0,
            weeklyTime: [0, 0, 0, 0, 0, 0, 0], // Lun-Dim
            subjects: {
                maths: { time: 0, lessons: 0, lastScore: 0 },
                francais: { time: 0, lessons: 0, lastScore: 0 },
                histoires: { time: 0, lessons: 0, lastScore: 0 },
                geographie: { time: 0, lessons: 0, lastScore: 0 },
                langues: { time: 0, lessons: 0, lastScore: 0 }
            }
        }
    },
    'zara': {
        id: 'zara',
        name: 'Zara la Maligne',
        avatar: '👧',
        age: 6,
        class: 'CP',
        level: 'facile',
        points: 280,
        welcome: 'Coucou Zara ! Prête pour de nouvelles aventures magiques ? ✨',
        studyStats: {
            totalTimeMinutes: 45,
            sessionsToday: 2,
            lastActivity: 'Mathématiques',
            completedLessons: ['maths-1', 'francais-1'],
            favoriteSubject: 'Histoires',
            currentStreak: 3,
            weeklyTime: [15, 20, 10, 0, 0, 0, 0],
            subjects: {
                maths: { time: 20, lessons: 2, lastScore: 85 },
                francais: { time: 15, lessons: 1, lastScore: 90 },
                histoires: { time: 10, lessons: 1, lastScore: 100 },
                geographie: { time: 0, lessons: 0, lastScore: 0 },
                langues: { time: 0, lessons: 0, lastScore: 0 }
            }
        }
    },
    'kemi': {
        id: 'kemi',
        name: 'Kemi l\'Étoile',
        avatar: '🧒',
        age: 8,
        class: 'CP+',
        level: 'moyen',
        points: 420,
        welcome: 'Hello Kemi ! Tu es une vraie petite étoile ! Brillons ensemble ! ⭐',
        studyStats: {
            totalTimeMinutes: 120,
            sessionsToday: 1,
            lastActivity: 'Géographie',
            completedLessons: ['maths-1', 'maths-2', 'francais-1', 'histoire-1'],
            favoriteSubject: 'Géographie',
            currentStreak: 5,
            weeklyTime: [25, 30, 20, 15, 30, 0, 0],
            subjects: {
                maths: { time: 45, lessons: 3, lastScore: 95 },
                francais: { time: 30, lessons: 2, lastScore: 88 },
                histoires: { time: 20, lessons: 2, lastScore: 92 },
                geographie: { time: 15, lessons: 1, lastScore: 100 },
                langues: { time: 10, lessons: 1, lastScore: 75 }
            }
        }
    }
};

// === TOUS LES COURS COMPLETS ===
const allCoursesData = {
    maths: [
        {
            id: 'maths-chiffres-1-5',
            title: 'Les Chiffres 1 à 5',
            icon: '🔢',
            level: 'débutant',
            duration: 15,
            content: `
                <div class="lesson-content">
                    <h2>🔢 Apprendre les Chiffres avec les Fruits ! 🥭</h2>
                    
                    <div class="interactive-section">
                        <div class="number-display">
                            <div class="number-card" onclick="playNumberSound(1)">
                                <div class="big-number">1</div>
                                <div class="fruit-visual">🥭</div>
                                <p><strong>UN</strong> - Une mangue</p>
                            </div>
                            
                            <div class="number-card" onclick="playNumberSound(2)">
                                <div class="big-number">2</div>
                                <div class="fruit-visual">🍌🍌</div>
                                <p><strong>DEUX</strong> - Deux bananes</p>
                            </div>
                            
                            <div class="number-card" onclick="playNumberSound(3)">
                                <div class="big-number">3</div>
                                <div class="fruit-visual">🥑🥑🥑</div>
                                <p><strong>TROIS</strong> - Trois avocats</p>
                            </div>
                            
                            <div class="number-card" onclick="playNumberSound(4)">
                                <div class="big-number">4</div>
                                <div class="fruit-visual">🍊🍊🍊🍊</div>
                                <p><strong>QUATRE</strong> - Quatre oranges</p>
                            </div>
                            
                            <div class="number-card" onclick="playNumberSound(5)">
                                <div class="big-number">5</div>
                                <div class="fruit-visual">🍍🍍🍍🍍🍍</div>
                                <p><strong>CINQ</strong> - Cinq ananas</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="exercise-section">
                        <h3>🎯 Exercice : Compte les fruits !</h3>
                        <div class="question">
                            <p>Combien vois-tu de mangues ? 🥭</p>
                            <div class="fruits-to-count">🥭🥭🥭</div>
                        </div>
                        <div class="answer-buttons">
                            <button class="answer-btn" onclick="checkMathAnswer(this, false, 1)">2</button>
                            <button class="answer-btn" onclick="checkMathAnswer(this, true, 3)">3</button>
                            <button class="answer-btn" onclick="checkMathAnswer(this, false, 4)">4</button>
                        </div>
                        <div id="math-result-1"></div>
                    </div>
                </div>
            `
        },
        {
            id: 'maths-addition-simple',
            title: 'Addition avec les Animaux',
            icon: '➕',
            level: 'facile',
            duration: 20,
            content: `
                <div class="lesson-content">
                    <h2>➕ Addition Magique avec les Animaux ! 🐘</h2>
                    
                    <div class="interactive-section">
                        <div class="addition-story">
                            <p class="story-text">Dans la savane camerounaise...</p>
                            
                            <div class="math-operation">
                                <div class="math-part">
                                    <p>Il y avait <strong>2 éléphants</strong></p>
                                    <div class="animals">🐘🐘</div>
                                    <div class="number">2</div>
                                </div>
                                
                                <div class="math-symbol">➕</div>
                                
                                <div class="math-part">
                                    <p><strong>1 éléphant</strong> les a rejoints</p>
                                    <div class="animals">🐘</div>
                                    <div class="number">1</div>
                                </div>
                                
                                <div class="math-symbol">=</div>
                                
                                <div class="math-part">
                                    <p>En tout : <strong>3 éléphants</strong></p>
                                    <div class="animals">🐘🐘🐘</div>
                                    <div class="number result">3</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="exercise-section">
                        <h3>🦁 À ton tour ! Calcule :</h3>
                        <div class="question">
                            <p>1 lion + 2 lions = ?</p>
                            <div class="math-visual">🦁 + 🦁🦁 = ?</div>
                        </div>
                        <div class="answer-buttons">
                            <button class="answer-btn" onclick="checkMathAnswer(this, false, 2)">2</button>
                            <button class="answer-btn" onclick="checkMathAnswer(this, true, 3)">3</button>
                            <button class="answer-btn" onclick="checkMathAnswer(this, false, 4)">4</button>
                        </div>
                        <div id="math-result-2"></div>
                    </div>
                </div>
            `
        }
    ],
    
    francais: [
        {
            id: 'francais-alphabet-a-e',
            title: 'Alphabet A à E',
            icon: '🔤',
            level: 'débutant',
            duration: 15,
            content: `
                <div class="lesson-content">
                    <h2>🔤 L'Alphabet Camerounais ! 🇨🇲</h2>
                    
                    <div class="interactive-section">
                        <div class="alphabet-display">
                            <div class="letter-card" onclick="playLetterSound('A')">
                                <div class="big-letter">A</div>
                                <div class="letter-image">🦌</div>
                                <p><strong>A</strong> comme <strong>ANTILOPE</strong></p>
                            </div>
                            
                            <div class="letter-card" onclick="playLetterSound('B')">
                                <div class="big-letter">B</div>
                                <div class="letter-image">🌳</div>
                                <p><strong>B</strong> comme <strong>BAOBAB</strong></p>
                            </div>
                            
                            <div class="letter-card" onclick="playLetterSound('C')">
                                <div class="big-letter">C</div>
                                <div class="letter-image">🇨🇲</div>
                                <p><strong>C</strong> comme <strong>CAMEROUN</strong></p>
                            </div>
                            
                            <div class="letter-card" onclick="playLetterSound('D')">
                                <div class="big-letter">D</div>
                                <div class="letter-image">🏙️</div>
                                <p><strong>D</strong> comme <strong>DOUALA</strong></p>
                            </div>
                            
                            <div class="letter-card" onclick="playLetterSound('E')">
                                <div class="big-letter">E</div>
                                <div class="letter-image">🐘</div>
                                <p><strong>E</strong> comme <strong>ÉLÉPHANT</strong></p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="exercise-section">
                        <h3>🎯 Quiz Alphabet !</h3>
                        <div class="question">
                            <p>Quelle lettre commence le mot "BAOBAB" ? 🌳</p>
                        </div>
                        <div class="answer-buttons">
                            <button class="answer-btn" onclick="checkMathAnswer(this, false, 'A')">A</button>
                            <button class="answer-btn" onclick="checkMathAnswer(this, true, 'B')">B</button>
                            <button class="answer-btn" onclick="checkMathAnswer(this, false, 'C')">C</button>
                        </div>
                        <div id="math-result-3"></div>
                    </div>
                </div>
            `
        }
    ],

    histoires: [
        {
            id: 'histoire-tortue-elephant',
            title: 'La Tortue et l\'Éléphant',
            icon: '🐢',
            level: 'tous',
            duration: 10,
            content: `
                <div class="lesson-content">
                    <h2>🐢 La Tortue Sage et l'Éléphant 🐘</h2>
                    
                    <div class="story-content">
                        <div class="story-image-header">🌳🐢🐘🌳</div>
                        
                        <div class="story-text">
                            <p>Il était une fois, dans la grande forêt du Cameroun, un éléphant très fier. Il se moquait toujours des petits animaux.</p>
                            
                            <p>"Je suis le plus grand ! Le plus fort !" disait-il à la petite tortue.</p>
                            
                            <p>La tortue lui proposa : "Faisons la course jusqu'au grand baobab !"</p>
                            
                            <p>L'éléphant partit très vite, mais se fatigua. Il décida de dormir.</p>
                            
                            <p>La tortue avança lentement mais sans s'arrêter. Quand l'éléphant se réveilla, la tortue avait gagné !</p>
                            
                            <p>"Lentement mais sûrement, on arrive toujours au but !" dit la sage tortue.</p>
                        </div>
                        
                        <div class="moral-box">
                            <h3>🌟 Morale 🌟</h3>
                            <p>La persévérance et la patience valent mieux que la vitesse et l'orgueil.</p>
                        </div>
                    </div>
                    
                    <div class="exercise-section">
                        <h3>🎯 Comprendre l'histoire !</h3>
                        <div class="question">
                            <p>Qui a gagné la course ?</p>
                        </div>
                        <div class="answer-buttons">
                            <button class="answer-btn" onclick="checkMathAnswer(this, false, 'elephant')">L'éléphant 🐘</button>
                            <button class="answer-btn" onclick="checkMathAnswer(this, true, 'tortue')">La tortue 🐢</button>
                        </div>
                        <div id="math-result-4"></div>
                    </div>
                </div>
            `
        },
        {
            id: 'histoire-kirikou',
            title: 'Kirikou et les Animaux',
            icon: '👦',
            level: 'tous',
            duration: 12,
            content: `
                <div class="lesson-content">
                    <h2>👦 Kirikou et les Animaux du Cameroun 🦁</h2>
                    
                    <div class="story-content">
                        <div class="story-image-header">🏞️👦🦁🐘🐵</div>
                        
                        <div class="story-text">
                            <p>Dans un village près de Maroua, vivait un petit garçon courageux : Kirikou.</p>
                            
                            <p>Un jour, les animaux vinrent le voir : "Kirikou ! Nous n'avons plus d'eau !"</p>
                            
                            <p>"Je vais vous aider !" dit le petit garçon. Il connaissait la légende de la Source Magique.</p>
                            
                            <p>Tous ensemble - l'éléphant, le lion, le singe et la gazelle - ils partirent à l'aventure.</p>
                            
                            <p>Grâce à leur amitié et leur travail d'équipe, ils trouvèrent la source ! Tous les animaux furent sauvés.</p>
                            
                            <p>"Ensemble, nous sommes plus forts !" déclara Kirikou.</p>
                        </div>
                        
                        <div class="moral-box">
                            <h3>🌟 Morale 🌟</h3>
                            <p>L'union fait la force. Ensemble, on peut tout réussir !</p>
                        </div>
                    </div>
                </div>
            `
        }
    ],

    geographie: [
        {
            id: 'geo-cameroun-regions',
            title: 'Les Régions du Cameroun',
            icon: '🗺️',
            level: 'facile',
            duration: 15,
            content: `
                <div class="lesson-content">
                    <h2>🗺️ Découvre le Cameroun ! 🇨🇲</h2>
                    
                    <div class="interactive-section">
                        <div class="cameroon-map">
                            <h3>🏛️ Les Capitales Importantes</h3>
                            
                            <div class="cities-grid">
                                <div class="city-card" onclick="playCitySound('yaounde')">
                                    <div class="city-icon">🏛️</div>
                                    <h4>Yaoundé</h4>
                                    <p>Capitale politique</p>
                                    <p>Où habitent les dirigeants</p>
                                </div>
                                
                                <div class="city-card" onclick="playCitySound('douala')">
                                    <div class="city-icon">🚢</div>
                                    <h4>Douala</h4>
                                    <p>Capitale économique</p>
                                    <p>Le grand port du pays</p>
                                </div>
                                
                                <div class="city-card" onclick="playCitySound('bamenda')">
                                    <div class="city-icon">⛰️</div>
                                    <h4>Bamenda</h4>
                                    <p>Ville des montagnes</p>
                                    <p>Région de l'Ouest</p>
                                </div>
                                
                                <div class="city-card" onclick="playCitySound('garoua')">
                                    <div class="city-icon">🌾</div>
                                    <h4>Garoua</h4>
                                    <p>Ville du Nord</p>
                                    <p>Région des savanes</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="geography-facts">
                            <h3>🌟 Le Cameroun c'est :</h3>
                            <div class="facts-list">
                                <div class="fact-item">🏔️ Des montagnes (Mont Cameroun)</div>
                                <div class="fact-item">🌊 L'océan Atlantique</div>
                                <div class="fact-item">🌳 Des forêts tropicales</div>
                                <div class="fact-item">🦁 Des savanes avec des animaux</div>
                                <div class="fact-item">🏜️ Un peu de désert au nord</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="exercise-section">
                        <h3>🎯 Connais-tu ton pays ?</h3>
                        <div class="question">
                            <p>Quelle est la capitale politique du Cameroun ?</p>
                        </div>
                        <div class="answer-buttons">
                            <button class="answer-btn" onclick="checkMathAnswer(this, false, 'douala')">Douala</button>
                            <button class="answer-btn" onclick="checkMathAnswer(this, true, 'yaounde')">Yaoundé</button>
                            <button class="answer-btn" onclick="checkMathAnswer(this, false, 'bamenda')">Bamenda</button>
                        </div>
                        <div id="math-result-5"></div>
                    </div>
                </div>
            `
        }
    ],

    langues: [
        {
            id: 'langues-salutations',
            title: 'Salutations en Langues Locales',
            icon: '🗣️',
            level: 'tous',
            duration: 10,
            content: `
                <div class="lesson-content">
                    <h2>🗣️ Saluer dans nos Langues ! 🇨🇲</h2>
                    
                    <div class="interactive-section">
                        <div class="languages-grid">
                            <div class="language-card" onclick="playLanguageSound('french')">
                                <div class="language-flag">🇫🇷</div>
                                <h4>Français</h4>
                                <div class="greeting">Bonjour !</div>
                                <p>Langue officielle</p>
                            </div>
                            
                            <div class="language-card" onclick="playLanguageSound('english')">
                                <div class="language-flag">🇬🇧</div>
                                <h4>Anglais</h4>
                                <div class="greeting">Hello !</div>
                                <p>Langue officielle</p>
                            </div>
                            
                            <div class="language-card" onclick="playLanguageSound('ewondo')">
                                <div class="language-flag">🌍</div>
                                <h4>Ewondo</h4>
                                <div class="greeting">Mbolo !</div>
                                <p>Langue du Centre</p>
                            </div>
                            
                            <div class="language-card" onclick="playLanguageSound('duala')">
                                <div class="language-flag">🌊</div>
                                <h4>Duala</h4>
                                <div class="greeting">Mboté !</div>
                                <p>Langue du Littoral</p>
                            </div>
                            
                            <div class="language-card" onclick="playLanguageSound('bamileke')">
                                <div class="language-flag">⛰️</div>
                                <h4>Bamiléké</h4>
                                <div class="greeting">Kié !</div>
                                <p>Langue de l'Ouest</p>
                            </div>
                            
                            <div class="language-card" onclick="playLanguageSound('fulfulde')">
                                <div class="language-flag">🐄</div>
                                <h4>Fulfuldé</h4>
                                <div class="greeting">Jam !</div>
                                <p>Langue du Nord</p>
                            </div>
                        </div>
                        
                        <div class="cultural-note">
                            <h3>🌟 Le sais-tu ?</h3>
                            <p>Le Cameroun a plus de 250 langues locales ! Chaque région a sa propre façon de dire bonjour. C'est la richesse de notre pays ! 🇨🇲</p>
                        </div>
                    </div>
                    
                    <div class="exercise-section">
                        <h3>🎯 Quiz des Langues !</h3>
                        <div class="question">
                            <p>Comment dit-on "bonjour" en Ewondo ?</p>
                        </div>
                        <div class="answer-buttons">
                            <button class="answer-btn" onclick="checkMathAnswer(this, true, 'mbolo')">Mbolo</button>
                            <button class="answer-btn" onclick="checkMathAnswer(this, false, 'mbote')">Mboté</button>
                            <button class="answer-btn" onclick="checkMathAnswer(this, false, 'kie')">Kié</button>
                        </div>
                        <div id="math-result-6"></div>
                    </div>
                </div>
            `
        }
    ]
};

// === SYSTÈME MUSICAL AVEC VOTRE FICHIER MP3 ===
class KidsMusic {
    constructor() {
        this.audioElement = null;
        this.isPlaying = false;
        this.volume = APP_CONFIG.CHILD_MUSIC_VOLUME;
        this.visualizer = null;
    }

    async init() {
        try {
            this.audioElement = document.getElementById('backgroundMusic');
            this.visualizer = document.getElementById('musicVisualizer');
            
            if (this.audioElement) {
                this.audioElement.volume = this.volume;
                this.audioElement.loop = true;
                
                this.audioElement.addEventListener('play', () => {
                    console.log('🎵 kids_melody.mp3 en cours...');
                    this.showVisualizer();
                });
                
                this.audioElement.addEventListener('pause', () => {
                    console.log('⏸️ Musique en pause');
                    this.hideVisualizer();
                });
                
                console.log('🎵 Système musical kids_melody.mp3 initialisé');
            }
        } catch (error) {
            console.warn('⚠️ Système musical non disponible:', error);
        }
    }

    async play() {
        if (!this.audioElement) return;
        
        try {
            await this.audioElement.play();
            this.isPlaying = true;
            appState.musicPlaying = true;
            
            document.getElementById('musicStatus').textContent = 'Pause';
            this.updateDisplay();
            
            console.log('🎵 kids_melody.mp3 démarre !');
        } catch (error) {
            console.warn('⚠️ Lecture auto bloquée:', error);
            this.showPlayButton();
        }
    }

    pause() {
        if (!this.audioElement) return;
        
        this.audioElement.pause();
        this.isPlaying = false;
        appState.musicPlaying = false;
        
        document.getElementById('musicStatus').textContent = 'Musique';
        console.log('⏸️ kids_melody.mp3 en pause');
    }

    setVolume(volume) {
        if (!this.audioElement) return;
        
        const safeVolume = Math.min(volume / 100, 0.5);
        this.audioElement.volume = safeVolume;
        this.volume = safeVolume;
        appState.volume = volume;
        
        const display = document.getElementById('volumeDisplay');
        if (display) display.textContent = volume;
    }

    showVisualizer() {
        if (this.visualizer) {
            this.visualizer.classList.add('active');
        }
    }

    hideVisualizer() {
        if (this.visualizer) {
            this.visualizer.classList.remove('active');
        }
    }

    updateDisplay() {
        const display = document.getElementById('currentTrackName');
        if (display) {
            display.textContent = '🎵 Mélodie Magique';
        }
    }

    showPlayButton() {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(45deg, #FF6B9D, #4ECDC4);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 1rem;
            font-weight: 600;
            z-index: 10000;
            cursor: pointer;
            animation: bounceIn 0.5s ease-out;
        `;
        
        notification.innerHTML = '🎵 Clique pour la musique !';
        notification.onclick = () => {
            this.play();
            notification.remove();
        };
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 8000);
    }

    playKidsSound(type) {
        if (!window.AudioContext) return;
        
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            const kidsSounds = {
                'click': { freq: 800, type: 'sine', duration: 0.1 },
                'success': { freq: 600, type: 'sine', duration: 0.3 },
                'error': { freq: 300, type: 'sine', duration: 0.2 },
                'magic': { freq: 1200, type: 'sine', duration: 0.4 },
                'applause': { freq: 900, type: 'triangle', duration: 0.5 }
            };
            
            const sound = kidsSounds[type] || kidsSounds.click;
            
            oscillator.frequency.value = sound.freq;
            oscillator.type = sound.type;
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + sound.duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + sound.duration);
            
            this.createKidsEffect(type);
        } catch (error) {
            console.warn('Son non disponible:', error);
        }
    }

    createKidsEffect(type) {
        const effects = {
            'click': '⭐',
            'success': '🎉',
            'error': '🤗',
            'magic': '✨',
            'applause': '👏'
        };
        
        const effect = document.createElement('div');
        effect.textContent = effects[type] || '✨';
        effect.style.cssText = `
            position: fixed;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            font-size: 2.5rem;
            pointer-events: none;
            z-index: 10000;
            animation: kidsEffectFloat 2s ease-out forwards;
        `;
        
        document.body.appendChild(effect);
        setTimeout(() => effect.remove(), 2000);
    }
}

// === SYSTÈME TTS ADAPTÉ VITESSE AJUSTÉE ===
class KidsTTS {
    constructor() {
        this.synth = window.speechSynthesis;
        this.enabled = true;
        this.rate = 0.85; // AJUSTÉ - Plus rapide qu'avant (était 0.6)
        this.pitch = 1.2;
        this.volume = 0.8;
    }

    init() {
        if (!this.synth) {
            console.warn('⚠️ Lecture vocale non disponible');
            return;
        }
        console.log('🔊 Assistant vocal pour enfants initialisé (vitesse ajustée)');
    }

    speak(text, options = {}) {
        if (!this.enabled || !this.synth) return;
        
        const kidsText = this.makeKidsFriendly(text);
        
        this.synth.cancel();
        const utterance = new SpeechSynthesisUtterance(kidsText);
        
        const voices = this.synth.getVoices();
        const kidsVoice = voices.find(voice => 
            voice.lang.startsWith('fr') && 
            (voice.name.includes('Female') || voice.name.includes('Julie'))
        ) || voices.find(voice => voice.lang.startsWith('fr')) || voices[0];
        
        if (kidsVoice) utterance.voice = kidsVoice;
        
        utterance.rate = options.rate || this.rate; // Vitesse ajustée
        utterance.pitch = options.pitch || this.pitch;
        utterance.volume = options.volume || this.volume;
        
        utterance.onstart = () => console.log('🔊 Je parle aux enfants...');
        utterance.onend = () => console.log('🔊 Fini de parler');
        
        this.synth.speak(utterance);
    }

    makeKidsFriendly(text) {
        return text
            .replace(/!/g, ' ! ')
            .replace(/\?/g, ' ? ')
            .replace(/\./g, '. ')
            .replace(/,/g, ', ');
    }

    toggle() {
        this.enabled = !this.enabled;
        const status = document.getElementById('ttsStatus');
        if (status) status.textContent = this.enabled ? 'Stop' : 'Écouter';
        
        if (!this.enabled) this.synth.cancel();
        console.log('🔊 Voix', this.enabled ? 'activée' : 'désactivée');
    }
}

// === SYSTÈME DE TRACKING D'ÉTUDE ===
class StudyTracker {
    constructor() {
        this.sessionStart = null;
        this.currentActivity = null;
        this.activityStart = null;
    }

    startSession(user) {
        this.sessionStart = new Date();
        appState.sessionStartTime = this.sessionStart;
        
        // Incrémenter les sessions du jour
        if (user.studyStats) {
            user.studyStats.sessionsToday++;
            console.log(`📊 Session démarrée pour ${user.name}`);
        }
    }

    startActivity(activityName) {
        this.currentActivity = activityName;
        this.activityStart = new Date();
        appState.currentActivity = activityName;
        
        console.log(`📚 Activité démarrée: ${activityName}`);
    }

    endActivity(user, subject, score = null) {
        if (!this.activityStart || !user.studyStats) return;
        
        const duration = Math.round((new Date() - this.activityStart) / 60000); // minutes
        
        // Mettre à jour les statistiques
        user.studyStats.totalTimeMinutes += duration;
        user.studyStats.lastActivity = subject;
        
        if (user.studyStats.subjects[subject]) {
            user.studyStats.subjects[subject].time += duration;
            user.studyStats.subjects[subject].lessons++;
            if (score !== null) {
                user.studyStats.subjects[subject].lastScore = score;
            }
        }
        
        // Mettre à jour le temps hebdomadaire (jour actuel)
        const today = new Date().getDay(); // 0 = Dimanche
        const dayIndex = today === 0 ? 6 : today - 1; // Convertir pour Lun=0, Dim=6
        user.studyStats.weeklyTime[dayIndex] += duration;
        
        // Sauvegarder
        this.saveUserStats(user);
        
        console.log(`✅ Activité terminée: ${subject}, durée: ${duration}min, score: ${score}`);
        
        this.currentActivity = null;
        this.activityStart = null;
    }

    endSession(user) {
        if (!this.sessionStart || !user.studyStats) return;
        
        const sessionDuration = Math.round((new Date() - this.sessionStart) / 60000);
        
        // Si une activité est en cours, la terminer
        if (this.currentActivity) {
            this.endActivity(user, this.currentActivity);
        }
        
        console.log(`🏁 Session terminée: ${sessionDuration}min total`);
        
        this.sessionStart = null;
        appState.sessionStartTime = null;
    }

    saveUserStats(user) {
        try {
            // Sauvegarder dans le profil par défaut s'il existe
            if (defaultProfiles[user.id]) {
                defaultProfiles[user.id].studyStats = user.studyStats;
            }
            
            // Sauvegarder dans localStorage
            const savedProfiles = JSON.parse(localStorage.getItem('edubot-kids-profiles') || '{}');
            if (savedProfiles[user.id]) {
                savedProfiles[user.id].studyStats = user.studyStats;
                localStorage.setItem('edubot-kids-profiles', JSON.stringify(savedProfiles));
            }
            
            console.log('💾 Statistiques sauvegardées');
        } catch (error) {
            console.warn('⚠️ Erreur sauvegarde stats:', error);
        }
    }

    getUserStats(user) {
        return user.studyStats || {
            totalTimeMinutes: 0,
            sessionsToday: 0,
            lastActivity: null,
            completedLessons: [],
            favoriteSubject: 'Mathématiques',
            currentStreak: 0,
            weeklyTime: [0, 0, 0, 0, 0, 0, 0],
            subjects: {
                maths: { time: 0, lessons: 0, lastScore: 0 },
                francais: { time: 0, lessons: 0, lastScore: 0 },
                histoires: { time: 0, lessons: 0, lastScore: 0 },
                geographie: { time: 0, lessons: 0, lastScore: 0 },
                langues: { time: 0, lessons: 0, lastScore: 0 }
            }
        };
    }
}

// === SYSTÈME GEMINI ADAPTÉ AUX ENFANTS ===
class KidsGemini {
    constructor() {
        this.isConnected = false;
    }

    async init() {
        console.log('🤖 Assistant IA pour enfants...');
        
        if (APP_CONFIG.GEMINI_API_KEY && !APP_CONFIG.GEMINI_API_KEY.includes('Demo')) {
            try {
                await this.testConnection();
                this.isConnected = true;
                console.log('✅ Assistant IA connecté !');
            } catch (error) {
                console.warn('⚠️ Assistant en mode local');
            }
        }
    }

    async testConnection() {
        const response = await fetch(`${APP_CONFIG.GEMINI_API_URL}?key=${APP_CONFIG.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Dis bonjour aux petits enfants" }] }]
            })
        });
        return response.ok;
    }

    async respond(message) {
        if (this.isConnected) {
            return await this.callGeminiAPI(message);
        } else {
            return this.getKidsResponse(message);
        }
    }

    async callGeminiAPI(message) {
        try {
            const prompt = this.buildKidsPrompt(message);
            const response = await fetch(`${APP_CONFIG.GEMINI_API_URL}?key=${APP_CONFIG.GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.8,
                        maxOutputTokens: 300
                    }
                })
            });

            const data = await response.json();
            if (data.candidates && data.candidates[0]) {
                return data.candidates[0].content.parts[0].text;
            }
        } catch (error) {
            console.error('❌ Erreur Assistant IA:', error);
        }
        return this.getKidsResponse(message);
    }

    buildKidsPrompt(userMessage) {
        const user = appState.currentUser || defaultProfiles.mika;
        return `Tu es un assistant très gentil pour les petits enfants camerounais.

ENFANT:
- Nom: ${user.name}
- Âge: ${user.age} ans
- Classe: ${user.class}
- Pays: Cameroun 🇨🇲

RÈGLES:
1. Parle comme à un enfant de ${user.age} ans
2. Mots TRÈS simples
3. Très encourageant et gentil
4. Emojis amusants
5. Parle du Cameroun
6. Maximum 50 mots
7. Finis par une question

QUESTION: ${userMessage}`;
    }

    getKidsResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        const kidsResponses = {
            'bonjour': '👋 Coucou mon petit champion ! Je suis content de te parler ! Tu vas bien ? 😊',
            'salut': '🤚 Salut petit génie ! Tu veux apprendre des choses amusantes ? 🌟',
            'mathématiques': '🔢 Les maths c\'est magique ! Comptons avec les mangues ! Tu sais compter jusqu\'où ? 🥭',
            'français': '🔤 Les lettres sont tes amies ! A comme Antilope ! Tu connais d\'autres ? 📝',
            'histoire': '📖 J\'adore les histoires ! Veux-tu entendre celle de la tortue et l\'éléphant ? 🐢',
            'géographie': '🗺️ Le Cameroun est beau ! Il y a des montagnes et l\'océan ! Tu habites où ? 🏔️',
            'langues': '🗣️ On parle plein de langues au Cameroun ! Tu dis bonjour comment chez toi ? 👋',
            'aide': '🤝 Je suis là pour t\'aider ! Dis-moi ce qui t\'intéresse ! 💝',
            'merci': '💖 De rien mon petit cœur ! Tu es très poli ! 😊'
        };
        
        for (const [keyword, response] of Object.entries(kidsResponses)) {
            if (lowerMessage.includes(keyword)) {
                return response;
            }
        }
        
        const genericResponses = [
            '🤔 C\'est intéressant ! Tu peux me dire plus ? 👂',
            '🌟 Tu es intelligent ! Qu\'est-ce qui t\'amuse ? 🎯',
            '😊 J\'aime parler avec toi ! Qu\'est-ce qui te rend curieux ? 🔍'
        ];
        
        return genericResponses[Math.floor(Math.random() * genericResponses.length)];
    }
}

// === INITIALISATION DES SYSTÈMES ===
const kidsMusic = new KidsMusic();
const kidsTTS = new KidsTTS();
const kidsGemini = new KidsGemini();
const studyTracker = new StudyTracker();

// === FONCTIONS PRINCIPALES ===

function startSplashscreen() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    let progress = 0;
    
    const kidsMessages = [
        'Préparation de tes leçons magiques... ✨',
        'Les animaux se réveillent... 🦁',
        'Préparation de la musique douce... 🎵',
        'Ton assistant se prépare... 🤖',
        'Tout est prêt ! 🎉'
    ];
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 3 + 2;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = progress + '%';
        
        const messageIndex = Math.floor(progress / 20);
        if (kidsMessages[messageIndex]) {
            progressText.textContent = kidsMessages[messageIndex];
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                hideSplashscreen();
            }, 1000);
        }
    }, 100);
}

function hideSplashscreen() {
    const splashscreen = document.getElementById('splashscreen');
    const profileSelection = document.getElementById('profileSelection');
    
    splashscreen.style.opacity = '0';
    splashscreen.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
        splashscreen.classList.add('hidden');
        profileSelection.classList.remove('hidden');
        
        setTimeout(() => {
            kidsMusic.play();
        }, 1000);
        
        console.log('✅ Sélection de profil affichée');
        
        setTimeout(() => {
            kidsTTS.speak('Coucou ! Choisis ton profil pour commencer à apprendre !');
        }, 1500);
    }, 800);
}

function selectProfile(profileId) {
    const profile = defaultProfiles[profileId];
    if (!profile) return;
    
    appState.currentUser = profile;
    kidsMusic.playKidsSound('success');
    
    // Démarrer le tracking de session
    studyTracker.startSession(profile);
    
    console.log(`🌟 Profil sélectionné: ${profile.name}`);
    
    const card = event.target.closest('.profile-card');
    if (card) {
        card.style.animation = 'none';
        card.style.transform = 'scale(1.1) rotateY(180deg)';
        card.style.transition = 'all 1s ease';
    }
    
    setTimeout(() => {
        document.getElementById('profileSelection').classList.add('hidden');
        
        const mainApp = document.getElementById('mainApp');
        mainApp.style.display = 'block';
        mainApp.classList.add('active');
        
        document.getElementById('currentAvatar').textContent = profile.avatar;
        document.getElementById('currentProfileName').textContent = profile.name;
        document.getElementById('welcomeMessage').textContent = `🌟 ${profile.welcome} ✨`;
        
        console.log('✅ Application chargée pour', profile.name);
        
        setTimeout(() => {
            kidsTTS.speak(profile.welcome + ' Tu es prêt pour l\'aventure ?');
        }, 1000);
    }, 1000);
}

// === FONCTIONS DE CRÉATION DE PROFIL (existantes, pas de changement) ===

function createNewProfile() {
    kidsMusic.playKidsSound('magic');
    
    const modal = document.getElementById('newProfileModal');
    modal.classList.remove('hidden');
    
    console.log('✨ Modal création de profil ouverte');
    
    setTimeout(() => {
        document.getElementById('childName').focus();
    }, 300);
    
    kidsTTS.speak('Super ! On va créer ton profil magique !');
}

function closeNewProfileModal() {
    kidsMusic.playKidsSound('click');
    
    const modal = document.getElementById('newProfileModal');
    modal.classList.add('hidden');
    
    document.getElementById('newProfileForm').reset();
}

function openParentSpace() {
    kidsMusic.playKidsSound('click');
    kidsTTS.speak('Espace pour Papa et Maman !');
    
    const pin = prompt('🔐 Code Papa & Maman (1234):');
    if (pin === APP_CONFIG.PARENT_PIN) {
        kidsMusic.playKidsSound('success');
        kidsTTS.speak('Bienvenue Papa et Maman !');
        showParentDashboard();
    } else if (pin !== null) {
        kidsMusic.playKidsSound('error');
        kidsTTS.speak('Le code n\'est pas bon !');
        showKidsNotification('❌ Code pas bon ! Essaie 1234 !', 'error');
    }
}

// === ESPACE PARENT AVEC DONNÉES ENFANTS ===
function showParentDashboard() {
    // Créer la modal parent avec toutes les données
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.zIndex = '10002';
    
    // Calculer les statistiques globales
    const allProfiles = Object.values(defaultProfiles);
    const globalStats = {
        totalChildren: allProfiles.length,
        totalTime: allProfiles.reduce((sum, p) => sum + p.studyStats.totalTimeMinutes, 0),
        averageScore: Math.round(
            allProfiles.reduce((sum, p) => {
                const subjects = Object.values(p.studyStats.subjects);
                const avgScore = subjects.reduce((s, subj) => s + subj.lastScore, 0) / subjects.length;
                return sum + avgScore;
            }, 0) / allProfiles.length
        ),
        activeSessions: allProfiles.filter(p => p.studyStats.sessionsToday > 0).length
    };
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(248, 249, 250, 0.95));
            border-radius: 2rem;
            padding: 2rem;
            max-width: 800px;
            width: 95%;
            max-height: 90vh;
            overflow-y: auto;
            animation: modalSlideIn 0.5s ease-out;
        ">
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2 style="color: #2C3E50; font-size: 2rem; margin-bottom: 1rem;">
                    👨‍👩‍👧‍👦 Espace Parent - Suivi des Apprentissages
                </h2>
                <button onclick="this.closest('.modal').remove()" style="
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: #7F8C8D;
                ">×</button>
            </div>

            <!-- Statistiques Globales -->
            <div style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 1rem;
                margin-bottom: 2rem;
            ">
                <div style="
                    background: linear-gradient(145deg, #E8F5E8, #F0FFF0);
                    padding: 1.5rem;
                    border-radius: 1rem;
                    text-align: center;
                    border: 2px solid rgba(76, 175, 80, 0.3);
                ">
                    <div style="font-size: 2rem; color: #4CAF50; font-weight: bold;">${globalStats.totalChildren}</div>
                    <div style="color: #2C3E50; font-weight: 600;">👶 Enfants</div>
                </div>
                
                <div style="
                    background: linear-gradient(145deg, #E3F2FD, #F0F8FF);
                    padding: 1.5rem;
                    border-radius: 1rem;
                    text-align: center;
                    border: 2px solid rgba(33, 150, 243, 0.3);
                ">
                    <div style="font-size: 2rem; color: #2196F3; font-weight: bold;">${globalStats.totalTime}min</div>
                    <div style="color: #2C3E50; font-weight: 600;">⏱️ Temps Total</div>
                </div>
                
                <div style="
                    background: linear-gradient(145deg, #FFF3E0, #FFF8E1);
                    padding: 1.5rem;
                    border-radius: 1rem;
                    text-align: center;
                    border: 2px solid rgba(255, 193, 7, 0.3);
                ">
                    <div style="font-size: 2rem; color: #FF9800; font-weight: bold;">${globalStats.averageScore}%</div>
                    <div style="color: #2C3E50; font-weight: 600;">📊 Score Moyen</div>
                </div>
                
                <div style="
                    background: linear-gradient(145deg, #FCE4EC, #F8BBD9);
                    padding: 1.5rem;
                    border-radius: 1rem;
                    text-align: center;
                    border: 2px solid rgba(233, 30, 99, 0.3);
                ">
                    <div style="font-size: 2rem; color: #E91E63; font-weight: bold;">${globalStats.activeSessions}</div>
                    <div style="color: #2C3E50; font-weight: 600;">🎯 Actifs Aujourd'hui</div>
                </div>
            </div>

            <!-- Détails par Enfant -->
            <h3 style="color: #2C3E50; margin-bottom: 1rem;">📚 Détails par Enfant</h3>
            
            ${allProfiles.map(profile => {
                const stats = profile.studyStats;
                const totalWeeklyTime = stats.weeklyTime.reduce((a, b) => a + b, 0);
                const bestSubject = Object.entries(stats.subjects).reduce((best, [name, data]) => 
                    data.lastScore > best.score ? {name, score: data.lastScore} : best, 
                    {name: 'Aucun', score: 0}
                );
                
                return `
                    <div style="
                        background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(248, 249, 250, 0.8));
                        border-radius: 1.5rem;
                        padding: 1.5rem;
                        margin-bottom: 1rem;
                        border: 2px solid rgba(78, 205, 196, 0.3);
                        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    ">
                        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                            <div style="font-size: 3rem;">${profile.avatar}</div>
                            <div>
                                <h4 style="color: #2C3E50; margin: 0; font-size: 1.3rem;">${profile.name}</h4>
                                <p style="color: #7F8C8D; margin: 0;">${profile.age} ans • ${profile.class} • ${stats.totalTimeMinutes}min total</p>
                            </div>
                        </div>
                        
                        <div style="
                            display: grid;
                            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                            gap: 0.8rem;
                            font-size: 0.9rem;
                        ">
                            <div style="text-align: center; background: rgba(76, 175, 80, 0.1); padding: 0.8rem; border-radius: 0.8rem;">
                                <strong style="color: #4CAF50;">${stats.sessionsToday}</strong><br>
                                📅 Sessions Aujourd'hui
                            </div>
                            <div style="text-align: center; background: rgba(33, 150, 243, 0.1); padding: 0.8rem; border-radius: 0.8rem;">
                                <strong style="color: #2196F3;">${totalWeeklyTime}min</strong><br>
                                📈 Cette Semaine
                            </div>
                            <div style="text-align: center; background: rgba(255, 193, 7, 0.1); padding: 0.8rem; border-radius: 0.8rem;">
                                <strong style="color: #FF9800;">${bestSubject.name}</strong><br>
                                🏆 Matière Forte
                            </div>
                            <div style="text-align: center; background: rgba(156, 39, 176, 0.1); padding: 0.8rem; border-radius: 0.8rem;">
                                <strong style="color: #9C27B0;">${stats.currentStreak} jours</strong><br>
                                🔥 Streak Actuel
                            </div>
                        </div>
                        
                        <div style="margin-top: 1rem;">
                            <h5 style="color: #34495E; margin-bottom: 0.5rem;">📊 Progression par Matière:</h5>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 0.5rem; font-size: 0.8rem;">
                                ${Object.entries(stats.subjects).map(([subject, data]) => `
                                    <div style="text-align: center; padding: 0.5rem; background: rgba(78, 205, 196, 0.1); border-radius: 0.5rem;">
                                        <strong>${data.lessons}</strong> cours<br>
                                        <span style="color: #34495E;">${subject}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        ${stats.lastActivity ? `
                            <p style="color: #7F8C8D; font-size: 0.9rem; margin-top: 1rem; font-style: italic;">
                                📚 Dernière activité: ${stats.lastActivity}
                            </p>
                        ` : ''}
                    </div>
                `;
            }).join('')}

            <!-- Actions Parent -->
            <div style="
                display: flex;
                gap: 1rem;
                justify-content: center;
                margin-top: 2rem;
                flex-wrap: wrap;
            ">
                <button onclick="exportChildrenData()" style="
                    background: linear-gradient(45deg, #4ECDC4, #44A08D);
                    color: white;
                    border: none;
                    padding: 1rem 1.5rem;
                    border-radius: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 1rem;
                ">
                    💾 Exporter Données
                </button>
                
                <button onclick="resetDailyStats()" style="
                    background: linear-gradient(45deg, #FF6B9D, #FF8A80);
                    color: white;
                    border: none;
                    padding: 1rem 1.5rem;
                    border-radius: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 1rem;
                ">
                    🔄 Reset Jour
                </button>
                
                <button onclick="this.closest('.modal').remove()" style="
                    background: linear-gradient(45deg, #BDC3C7, #95A5A6);
                    color: white;
                    border: none;
                    padding: 1rem 1.5rem;
                    border-radius: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 1rem;
                ">
                    ← Fermer
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    console.log('👨‍👩‍👧‍👦 Espace parent ouvert avec données complètes');
}

// === FONCTIONS D'EXPORT ET RESET PARENT ===
window.exportChildrenData = function() {
    const data = {
        exportDate: new Date().toISOString(),
        globalStats: {
            totalChildren: Object.keys(defaultProfiles).length,
            totalTime: Object.values(defaultProfiles).reduce((sum, p) => sum + p.studyStats.totalTimeMinutes, 0)
        },
        children: Object.values(defaultProfiles).map(profile => ({
            name: profile.name,
            age: profile.age,
            class: profile.class,
            stats: profile.studyStats
        }))
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `edubot-enfants-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    kidsTTS.speak('Données exportées !');
    showKidsNotification('💾 Données exportées avec succès ! 📄', 'success');
};

window.resetDailyStats = function() {
    if (confirm('Voulez-vous vraiment remettre à zéro les statistiques du jour ?')) {
        Object.values(defaultProfiles).forEach(profile => {
            profile.studyStats.sessionsToday = 0;
        });
        
        kidsTTS.speak('Statistiques du jour remises à zéro !');
        showKidsNotification('🔄 Statistiques du jour remises à zéro !', 'success');
        
        // Recharger l'espace parent
        document.querySelector('.modal').remove();
        setTimeout(() => showParentDashboard(), 500);
    }
};

function goBack() {
    kidsMusic.playKidsSound('click');
    
    // Terminer la session de tracking
    if (appState.currentUser) {
        studyTracker.endSession(appState.currentUser);
    }
    
    document.getElementById('mainApp').classList.remove('active');
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('profileSelection').classList.remove('hidden');
    
    appState.currentUser = null;
    
    kidsTTS.speak('À bientôt !');
    console.log('🔙 Retour sélection de profil');
}

// === CONTRÔLES AUDIO ===
function toggleMusic() {
    if (appState.musicPlaying) {
        kidsMusic.pause();
        kidsTTS.speak('Musique arrêtée !');
    } else {
        kidsMusic.play();
        kidsTTS.speak('Musique lancée !');
    }
}

function toggleTTS() {
    kidsTTS.toggle();
    kidsMusic.playKidsSound('click');
}

// === SECTIONS AVEC CONTENU COMPLET ===
function showCourses() {
    kidsMusic.playKidsSound('magic');
    studyTracker.startActivity('Cours');
    
    showCoursesModal();
    kidsTTS.speak('Voici tes cours ! Choisis ce que tu veux apprendre !');
}

function showStories() {
    kidsMusic.playKidsSound('magic');
    studyTracker.startActivity('Histoires');
    
    showStoriesModal();
    kidsTTS.speak('C\'est l\'heure des belles histoires !');
}

function showQuiz() {
    kidsMusic.playKidsSound('magic');
    studyTracker.startActivity('Quiz');
    
    showKidsNotification('🧩 Quiz interactifs en cours de développement ! Bientôt prêts ! 🌟', 'info');
    kidsTTS.speak('Les quiz arrivent bientôt !');
}

function showGames() {
    kidsMusic.playKidsSound('magic');
    studyTracker.startActivity('Jeux');
    
    showKidsNotification('🎮 Jeux magiques en cours de développement ! Bientôt prêts ! 🎪', 'info');
    kidsTTS.speak('Les jeux magiques arrivent bientôt !');
}

function showGeminiChat() {
    kidsMusic.playKidsSound('magic');
    studyTracker.startActivity('Assistant IA');
    
    showKidsNotification('🤖 Chat avec l\'assistant en cours de développement ! Bientôt prêt ! ✨', 'info');
    kidsTTS.speak('Ton assistant magique arrive bientôt !');
}

// === MODAL DES COURS ===
function showCoursesModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div style="
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(248, 249, 250, 0.95));
            border-radius: 2rem;
            padding: 2rem;
            max-width: 900px;
            width: 95%;
            max-height: 90vh;
            overflow-y: auto;
            animation: modalSlideIn 0.5s ease-out;
        ">
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2 style="color: #2C3E50; font-size: 2rem;">📚 Mes Cours Magiques</h2>
                <button onclick="this.closest('.modal').remove()" style="
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                ">×</button>
            </div>

            <div style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
            ">
                <!-- Mathématiques -->
                <div onclick="showSubject('maths')" style="
                    background: linear-gradient(145deg, #E8F5E8, #F0FFF0);
                    border-radius: 1.5rem;
                    padding: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                    border: 2px solid rgba(76, 175, 80, 0.3);
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🔢</div>
                    <h3 style="color: #2C3E50; margin-bottom: 0.5rem;">Mathématiques</h3>
                    <p style="color: #7F8C8D;">Chiffres et calculs avec les fruits !</p>
                    <div style="margin-top: 1rem; font-size: 0.9rem; color: #4CAF50;">
                        ${allCoursesData.maths.length} leçons disponibles
                    </div>
                </div>

                <!-- Français -->
                <div onclick="showSubject('francais')" style="
                    background: linear-gradient(145deg, #E3F2FD, #F0F8FF);
                    border-radius: 1.5rem;
                    padding: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                    border: 2px solid rgba(33, 150, 243, 0.3);
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🔤</div>
                    <h3 style="color: #2C3E50; margin-bottom: 0.5rem;">Français</h3>
                    <p style="color: #7F8C8D;">Alphabet et mots camerounais !</p>
                    <div style="margin-top: 1rem; font-size: 0.9rem; color: #2196F3;">
                        ${allCoursesData.francais.length} leçons disponibles
                    </div>
                </div>

                <!-- Histoires -->
                <div onclick="showSubject('histoires')" style="
                    background: linear-gradient(145deg, #FFF3E0, #FFF8E1);
                    border-radius: 1.5rem;
                    padding: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                    border: 2px solid rgba(255, 193, 7, 0.3);
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">📖</div>
                    <h3 style="color: #2C3E50; margin-bottom: 0.5rem;">Histoires</h3>
                    <p style="color: #7F8C8D;">Contes traditionnels du Cameroun !</p>
                    <div style="margin-top: 1rem; font-size: 0.9rem; color: #FF9800;">
                        ${allCoursesData.histoires.length} histoires disponibles
                    </div>
                </div>

                <!-- Géographie -->
                <div onclick="showSubject('geographie')" style="
                    background: linear-gradient(145deg, #FCE4EC, #F8BBD9);
                    border-radius: 1.5rem;
                    padding: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                    border: 2px solid rgba(233, 30, 99, 0.3);
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🗺️</div>
                    <h3 style="color: #2C3E50; margin-bottom: 0.5rem;">Géographie</h3>
                    <p style="color: #7F8C8D;">Découvre le Cameroun !</p>
                    <div style="margin-top: 1rem; font-size: 0.9rem; color: #E91E63;">
                        ${allCoursesData.geographie.length} leçons disponibles
                    </div>
                </div>

                <!-- Langues Locales -->
                <div onclick="showSubject('langues')" style="
                    background: linear-gradient(145deg, #F3E5F5, #E8EAF6);
                    border-radius: 1.5rem;
                    padding: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-align: center;
                    border: 2px solid rgba(156, 39, 176, 0.3);
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🗣️</div>
                    <h3 style="color: #2C3E50; margin-bottom: 0.5rem;">Langues Locales</h3>
                    <p style="color: #7F8C8D;">Saluer dans nos langues !</p>
                    <div style="margin-top: 1rem; font-size: 0.9rem; color: #9C27B0;">
                        ${allCoursesData.langues.length} leçons disponibles
                    </div>
                </div>

                <!-- Histoire du Cameroun (à venir) -->
                <div style="
                    background: linear-gradient(145deg, #EFEBE9, #D7CCC8);
                    border-radius: 1.5rem;
                    padding: 1.5rem;
                    text-align: center;
                    border: 2px solid rgba(121, 85, 72, 0.3);
                    opacity: 0.7;
                ">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🏛️</div>
                    <h3 style="color: #2C3E50; margin-bottom: 0.5rem;">Histoire du Cameroun</h3>
                    <p style="color: #7F8C8D;">Bientôt disponible !</p>
                    <div style="margin-top: 1rem; font-size: 0.9rem; color: #795548;">
                        🚧 En préparation...
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// === MODAL DES HISTOIRES ===
function showStoriesModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div style="
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(248, 249, 250, 0.95));
            border-radius: 2rem;
            padding: 2rem;
            max-width: 800px;
            width: 95%;
            max-height: 90vh;
            overflow-y: auto;
            animation: modalSlideIn 0.5s ease-out;
        ">
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2 style="color: #2C3E50; font-size: 2rem;">📖 Belles Histoires du Cameroun</h2>
                <button onclick="this.closest('.modal').remove()" style="
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                ">×</button>
            </div>

            <div style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 1.5rem;
            ">
                ${allCoursesData.histoires.map(story => `
                    <div onclick="openLesson('${story.id}', 'histoires')" style="
                        background: linear-gradient(145deg, #FFF3E0, #FFF8E1);
                        border-radius: 1.5rem;
                        padding: 1.5rem;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        text-align: center;
                        border: 2px solid rgba(255, 193, 7, 0.3);
                    " onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">${story.icon}</div>
                        <h3 style="color: #2C3E50; margin-bottom: 0.5rem;">${story.title}</h3>
                        <p style="color: #7F8C8D; margin-bottom: 1rem;">Une belle histoire traditionnelle</p>
                        <div style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 0.9rem;
                        ">
                            <span style="color: #FF9800;">📚 ${story.level}</span>
                            <span style="color: #4CAF50;">⏱️ ${story.duration}min</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// === FONCTION POUR AFFICHER UNE MATIÈRE ===
window.showSubject = function(subject) {
    const lessons = allCoursesData[subject];
    if (!lessons || lessons.length === 0) {
        showKidsNotification(`📚 Leçons de ${subject} bientôt disponibles ! 🌟`, 'info');
        return;
    }
    
    // Fermer la modal des cours
    document.querySelector('.modal').remove();
    
    // Afficher la modal de la matière
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div style="
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(248, 249, 250, 0.95));
            border-radius: 2rem;
            padding: 2rem;
            max-width: 800px;
            width: 95%;
            max-height: 90vh;
            overflow-y: auto;
            animation: modalSlideIn 0.5s ease-out;
        ">
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2 style="color: #2C3E50; font-size: 2rem;">📚 ${subject.charAt(0).toUpperCase() + subject.slice(1)}</h2>
                <button onclick="this.closest('.modal').remove()" style="
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                ">×</button>
            </div>

            <div style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 1.5rem;
            ">
                ${lessons.map(lesson => `
                    <div onclick="openLesson('${lesson.id}', '${subject}')" style="
                        background: linear-gradient(145deg, #E8F5E8, #F0FFF0);
                        border-radius: 1.5rem;
                        padding: 1.5rem;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        text-align: center;
                        border: 2px solid rgba(76, 175, 80, 0.3);
                    " onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">${lesson.icon}</div>
                        <h3 style="color: #2C3E50; margin-bottom: 0.5rem;">${lesson.title}</h3>
                        <div style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 0.9rem;
                            margin-top: 1rem;
                        ">
                            <span style="color: #FF9800;">📚 ${lesson.level}</span>
                            <span style="color: #4CAF50;">⏱️ ${lesson.duration}min</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
};

// === FONCTION POUR OUVRIR UNE LEÇON ===
window.openLesson = function(lessonId, subject) {
    // Trouver la leçon
    const lessons = allCoursesData[subject];
    const lesson = lessons.find(l => l.id === lessonId);
    
    if (!lesson) {
        showKidsNotification('❌ Leçon non trouvée !', 'error');
        return;
    }
    
    // Démarrer le tracking de l'activité
    studyTracker.startActivity(subject);
    
    // Fermer la modal précédente
    document.querySelector('.modal').remove();
    
    // Créer la modal de leçon
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div style="
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(248, 249, 250, 0.95));
            border-radius: 2rem;
            padding: 2rem;
            max-width: 900px;
            width: 95%;
            max-height: 90vh;
            overflow-y: auto;
            animation: modalSlideIn 0.5s ease-out;
        ">
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2 style="color: #2C3E50; font-size: 2rem;">${lesson.icon} ${lesson.title}</h2>
                <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1rem;">
                    <button onclick="speakLesson('${lessonId}', '${subject}')" style="
                        background: linear-gradient(45deg, #4ECDC4, #44A08D);
                        color: white;
                        border: none;
                        padding: 0.8rem 1.5rem;
                        border-radius: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                    ">🔊 Écouter</button>
                    <button onclick="finishLesson('${lessonId}', '${subject}')" style="
                        background: linear-gradient(45d, #FF6B9D, #FF8A80);
                        color: white;
                        border: none;
                        padding: 0.8rem 1.5rem;
                        border-radius: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                    ">✅ Terminer</button>
                    <button onclick="this.closest('.modal').remove()" style="
                        background: linear-gradient(45deg, #BDC3C7, #95A5A6);
                        color: white;
                        border: none;
                        padding: 0.8rem 1.5rem;
                        border-radius: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                    ">← Fermer</button>
                </div>
            </div>

            <div style="color: #2C3E50;">
                ${lesson.content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Ajouter les styles CSS pour la leçon
    const lessonStyle = document.createElement('style');
    lessonStyle.innerHTML = `
        .lesson-content {
            line-height: 1.6;
        }
        .number-display, .alphabet-display, .cities-grid, .languages-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin: 2rem 0;
        }
        .number-card, .letter-card, .city-card, .language-card {
            background: rgba(255, 255, 255, 0.8);
            border-radius: 1rem;
            padding: 1rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid rgba(78, 205, 196, 0.3);
        }
        .number-card:hover, .letter-card:hover, .city-card:hover, .language-card:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .big-number, .big-letter {
            font-size: 3rem;
            font-weight: bold;
            color: #FF6B9D;
            display: block;
            margin-bottom: 0.5rem;
        }
        .fruit-visual, .letter-image, .city-icon {
            font-size: 2rem;
            margin: 0.5rem 0;
        }
        .exercise-section {
            background: linear-gradient(145deg, rgba(78, 205, 196, 0.1), rgba(255, 107, 157, 0.1));
            border-radius: 1rem;
            padding: 1.5rem;
            margin: 2rem 0;
            text-align: center;
        }
        .question {
            font-size: 1.3rem;
            color: #2C3E50;
            margin-bottom: 1rem;
            font-weight: 600;
        }
        .answer-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin: 1rem 0;
            flex-wrap: wrap;
        }
        .answer-btn {
            padding: 1rem 1.5rem;
            border: 2px solid #4ECDC4;
            border-radius: 1rem;
            background: white;
            color: #2C3E50;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1.1rem;
        }
        .answer-btn:hover {
            background: #4ECDC4;
            color: white;
            transform: scale(1.05);
        }
        .answer-btn.correct {
            background: #4CAF50 !important;
            color: white !important;
            border-color: #4CAF50 !important;
        }
        .answer-btn.incorrect {
            background: #FF6B9D !important;
            color: white !important;
            border-color: #FF6B9D !important;
        }
        .math-operation {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin: 2rem 0;
            flex-wrap: wrap;
        }
        .math-part {
            text-align: center;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 1rem;
            min-width: 120px;
        }
        .math-symbol {
            font-size: 3rem;
            color: #FF6B9D;
            font-weight: bold;
        }
        .animals, .number {
            font-size: 2rem;
            margin: 0.5rem 0;
        }
        .story-content {
            background: rgba(255, 255, 255, 0.8);
            border-radius: 1rem;
            padding: 1.5rem;
            margin: 1rem 0;
        }
        .story-text p {
            margin-bottom: 1rem;
            font-size: 1.2rem;
            line-height: 1.7;
        }
        .moral-box {
            background: linear-gradient(145deg, rgba(255, 215, 0, 0.2), rgba(255, 193, 7, 0.1));
            border-radius: 1rem;
            padding: 1rem;
            margin-top: 2rem;
            text-align: center;
            border: 2px solid rgba(255, 193, 7, 0.5);
        }
        .geography-facts, .cultural-note {
            background: rgba(255, 255, 255, 0.8);
            border-radius: 1rem;
            padding: 1rem;
            margin: 1rem 0;
        }
        .facts-list {
            display: grid;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        .fact-item {
            background: rgba(78, 205, 196, 0.1);
            padding: 0.8rem;
            border-radius: 0.5rem;
            border-left: 4px solid #4ECDC4;
        }
        .greeting {
            font-size: 1.5rem;
            font-weight: bold;
            color: #FF6B9D;
            margin: 0.5rem 0;
        }
    `;
    
    document.head.appendChild(lessonStyle);
    
    console.log(`📖 Leçon ouverte: ${lesson.title}`);
    kidsTTS.speak(`Voici la leçon : ${lesson.title}. Tu peux cliquer sur Écouter pour que je te lise la leçon !`);
};

// === FONCTIONS POUR LES LEÇONS ===
window.speakLesson = function(lessonId, subject) {
    const lessons = allCoursesData[subject];
    const lesson = lessons.find(l => l.id === lessonId);
    
    if (lesson) {
        // Extraire le texte de la leçon (enlever le HTML)
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = lesson.content;
        const textContent = tempDiv.textContent || tempDiv.innerText || '';
        
        // Prendre les 500 premiers caractères pour éviter une lecture trop longue
        const shortText = textContent.substring(0, 500) + '...';
        
        kidsTTS.speak(shortText);
        kidsMusic.playKidsSound('magic');
    }
};

window.finishLesson = function(lessonId, subject) {
    if (appState.currentUser) {
        // Terminer l'activité avec un score de 100% (leçon complétée)
        studyTracker.endActivity(appState.currentUser, subject, 100);
        
        // Ajouter la leçon aux leçons complétées
        if (!appState.currentUser.studyStats.completedLessons.includes(lessonId)) {
            appState.currentUser.studyStats.completedLessons.push(lessonId);
        }
        
        // Ajouter des points
        appState.currentUser.points += 50;
        
        kidsMusic.playKidsSound('applause');
        kidsTTS.speak('Bravo ! Tu as terminé la leçon ! Tu gagnes 50 points !');
        showKidsNotification('🎉 Leçon terminée ! +50 points ! 🏆', 'success');
        
        // Fermer la modal
        document.querySelector('.modal').remove();
    }
};

// === FONCTIONS POUR LES EXERCICES ===
window.checkMathAnswer = function(button, isCorrect, correctValue) {
    const buttons = button.parentElement.querySelectorAll('.answer-btn');
    const resultDiv = button.parentElement.nextElementSibling;
    
    // Désactiver tous les boutons
    buttons.forEach(btn => {
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.7';
    });
    
    if (isCorrect) {
        button.classList.add('correct');
        kidsMusic.playKidsSound('success');
        resultDiv.innerHTML = '<div style="color: #4CAF50; font-size: 1.5rem; font-weight: bold; margin-top: 1rem;">🎉 Bravo ! Excellent ! Tu es un champion ! 🏆</div>';
        
        // Marquer comme réussi dans le tracking
        if (appState.currentUser) {
            studyTracker.endActivity(appState.currentUser, 'exercice', 100);
        }
        
        setTimeout(() => {
            kidsTTS.speak('Super ! Tu as trouvé la bonne réponse ! Tu es très intelligent !');
        }, 500);
    } else {
        button.classList.add('incorrect');
        kidsMusic.playKidsSound('error');
        resultDiv.innerHTML = '<div style="color: #FF6B9D; font-size: 1.5rem; font-weight: bold; margin-top: 1rem;">😊 Presque ! Essaie encore, tu vas y arriver ! 💪</div>';
        
        setTimeout(() => {
            // Réactiver les boutons pour essayer encore
            buttons.forEach(btn => {
                btn.style.pointerEvents = 'auto';
                btn.style.opacity = '1';
                btn.classList.remove('incorrect');
            });
            resultDiv.innerHTML = '';
        }, 3000);
        
        setTimeout(() => {
            kidsTTS.speak('Ce n\'est pas grave ! Essaie encore, je sais que tu peux réussir !');
        }, 500);
    }
};

// === FONCTIONS POUR LES SONS INTERACTIFS ===
window.playNumberSound = function(number) {
    kidsMusic.playKidsSound('click');
    kidsTTS.speak(`Le chiffre ${number}`);
};

window.playLetterSound = function(letter) {
    kidsMusic.playKidsSound('click');
    kidsTTS.speak(`La lettre ${letter}`);
};

window.playCitySound = function(city) {
    kidsMusic.playKidsSound('click');
    const cityNames = {
        'yaounde': 'Yaoundé, la capitale politique',
        'douala': 'Douala, le grand port',
        'bamenda': 'Bamenda, ville des montagnes',
        'garoua': 'Garoua, ville du Nord'
    };
    kidsTTS.speak(cityNames[city] || city);
};

window.playLanguageSound = function(language) {
    kidsMusic.playKidsSound('click');
    const greetings = {
        'french': 'Bonjour en français',
        'english': 'Hello in English',
        'ewondo': 'Mbolo en Ewondo',
        'duala': 'Mboté en Duala',
        'bamileke': 'Kié en Bamiléké',
        'fulfulde': 'Jam en Fulfuldé'
    };
    kidsTTS.speak(greetings[language] || language);
};

// === NOTIFICATIONS POUR ENFANTS ===
function showKidsNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const kidsColors = {
        'success': 'linear-gradient(45deg, #96CEB4, #FFEAA7)',
        'error': 'linear-gradient(45deg, #FF7675, #FDCB6E)', 
        'info': 'linear-gradient(45deg, #74B9FF, #A29BFE)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: ${kidsColors[type]};
        color: #2C3E50;
        padding: 1.2rem 1.8rem;
        border-radius: 1.5rem;
        font-weight: 600;
        font-size: 1.1rem;
        max-width: 350px;
        z-index: 10000;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        animation: kidsNotificationBounce 0.6s ease-out;
        cursor: pointer;
        border: 3px solid rgba(255, 255, 255, 0.6);
        font-family: 'Comic Sans MS', cursive;
    `;
    
    notification.innerHTML = message;
    
    notification.onclick = () => {
        notification.style.animation = 'kidsNotificationOut 0.4s ease-in forwards';
        setTimeout(() => notification.remove(), 400);
    };
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'kidsNotificationOut 0.4s ease-in forwards';
            setTimeout(() => notification.remove(), 400);
        }
    }, 6000);
}

// === GESTION DU FORMULAIRE DE PROFIL (existant) ===
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newProfileForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('childName').value.trim();
            const age = document.getElementById('childAge').value;
            const childClass = document.getElementById('childClass').value;
            const avatar = document.getElementById('childAvatar').value;
            
            if (!name || !age || !childClass || !avatar) {
                kidsMusic.playKidsSound('error');
                kidsTTS.speak('Il faut remplir toutes les cases !');
                return;
            }
            
            const newProfile = {
                id: 'custom_' + Date.now(),
                name: name,
                avatar: avatar,
                age: parseInt(age),
                class: childClass,
                level: age <= 5 ? 'débutant' : age <= 7 ? 'facile' : 'moyen',
                points: 0,
                welcome: `Salut ${name} ! Bienvenue dans ton école magique ! 🌟`,
                studyStats: {
                    totalTimeMinutes: 0,
                    sessionsToday: 0,
                    lastActivity: null,
                    completedLessons: [],
                    favoriteSubject: 'Mathématiques',
                    currentStreak: 0,
                    weeklyTime: [0, 0, 0, 0, 0, 0, 0],
                    subjects: {
                        maths: { time: 0, lessons: 0, lastScore: 0 },
                        francais: { time: 0, lessons: 0, lastScore: 0 },
                        histoires: { time: 0, lessons: 0, lastScore: 0 },
                        geographie: { time: 0, lessons: 0, lastScore: 0 },
                        langues: { time: 0, lessons: 0, lastScore: 0 }
                    }
                }
            };
            
            appState.profiles[newProfile.id] = newProfile;
            localStorage.setItem('edubot-kids-profiles', JSON.stringify(appState.profiles));
            
            kidsMusic.playKidsSound('applause');
            kidsTTS.speak(`Super ${name} ! Ton profil est créé !`);
            
            closeNewProfileModal();
            
            setTimeout(() => {
                appState.currentUser = newProfile;
                studyTracker.startSession(newProfile);
                
                document.getElementById('profileSelection').classList.add('hidden');
                
                const mainApp = document.getElementById('mainApp');
                mainApp.style.display = 'block';
                mainApp.classList.add('active');
                
                document.getElementById('currentAvatar').textContent = newProfile.avatar;
                document.getElementById('currentProfileName').textContent = newProfile.name;
                document.getElementById('welcomeMessage').textContent = `🌟 ${newProfile.welcome} ✨`;
                
                setTimeout(() => {
                    kidsTTS.speak(newProfile.welcome);
                }, 1000);
            }, 2000);
        });
    }
});

// === INITIALISATION COMPLÈTE ===
document.addEventListener('DOMContentLoaded', async function() {
    console.log('👶 DOM chargé, initialisation COMPLÈTE...');
    
    // Charger les profils sauvegardés
    const savedProfiles = localStorage.getItem('edubot-kids-profiles');
    if (savedProfiles) {
        try {
            appState.profiles = JSON.parse(savedProfiles);
            console.log('📂 Profils enfants chargés');
        } catch (error) {
            console.warn('⚠️ Erreur chargement profils:', error);
        }
    }
    
    // Initialiser tous les systèmes
    await Promise.all([
        kidsMusic.init(),
        kidsTTS.init(),
        kidsGemini.init()
    ]);
    
    // Démarrer le splashscreen
    startSplashscreen();
    
    console.log('✅ EduBot SIL & CP COMPLET initialisé !');
});

// Animations CSS
const kidsStyle = document.createElement('style');
kidsStyle.textContent = `
    @keyframes kidsEffectFloat {
        0% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
        50% { opacity: 0.8; transform: translateY(-30px) scale(1.3) rotate(180deg); }
        100% { opacity: 0; transform: translateY(-60px) scale(0.8) rotate(360deg); }
    }
    
    @keyframes kidsNotificationBounce {
        0% { transform: translateX(100%) scale(0.8); opacity: 0; }
        60% { transform: translateX(-10px) scale(1.05); opacity: 1; }
        100% { transform: translateX(0) scale(1); opacity: 1; }
    }
    
    @keyframes kidsNotificationOut {
        0% { transform: translateX(0) scale(1); opacity: 1; }
        100% { transform: translateX(100%) scale(0.8); opacity: 0; }
    }
    
    @keyframes bounceIn {
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.1); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes modalSlideIn {
        from { transform: translateY(-30px) scale(0.95); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
    }
`;
document.head.appendChild(kidsStyle);

console.log('✅ EduBot SIL & CP COMPLET - Tous les cours, tracking et espace parent intégrés ! 👶🎵🤖📚🏆');