const http = require('http');
const url = require('url');
const querystring = require('querystring');

// Configuration
const PORT = 3000;
const PARENT_PIN = '1234';

// Headers CORS
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json; charset=utf-8'
};

// Données utilisateurs (simulation de base de données)
const usersData = {
    'alex': {
        id: 'alex',
        name: 'Alex l\'Explorateur',
        avatar: '👦',
        age: 7,
        points: 450,
        level: 3,
        progress: {
            courses_completed: ['chiffres_1_5', 'alphabet_a_c'],
            current_streak: 5,
            total_time: 1500,
            last_activity: new Date().toISOString(),
            favorite_subject: 'Mathématiques'
        },
        stats: {
            today_time: 25,
            completed_today: 3,
            weekly_activity: [10, 15, 20, 25, 30, 0, 0],
            monthly_progress: 85
        }
    },
    'sarah': {
        id: 'sarah',
        name: 'Sarah la Brillante',
        avatar: '👧',
        age: 8,
        points: 680,
        level: 4,
        progress: {
            courses_completed: ['chiffres_1_10', 'addition_base', 'alphabet_complet'],
            current_streak: 7,
            total_time: 2100,
            last_activity: new Date().toISOString(),
            favorite_subject: 'Français'
        },
        stats: {
            today_time: 35,
            completed_today: 4,
            weekly_activity: [15, 20, 25, 30, 35, 0, 0],
            monthly_progress: 92
        }
    },
    'jordan': {
        id: 'jordan',
        name: 'Jordan le Champion',
        avatar: '🧒',
        age: 9,
        points: 920,
        level: 5,
        progress: {
            courses_completed: ['chiffres_1_10', 'addition_base', 'soustraction', 'alphabet_complet', 'english_colors'],
            current_streak: 12,
            total_time: 3200,
            last_activity: new Date().toISOString(),
            favorite_subject: 'Sciences'
        },
        stats: {
            today_time: 40,
            completed_today: 5,
            weekly_activity: [20, 25, 30, 35, 40, 0, 0],
            monthly_progress: 96
        }
    }
};

// Fonction pour lire le body des requêtes POST
function getRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                resolve({});
            }
        });
        req.on('error', reject);
    });
}

// Fonction pour envoyer une réponse JSON
function sendJSON(res, data, statusCode = 200) {
    res.writeHead(statusCode, corsHeaders);
    res.end(JSON.stringify(data, null, 2));
}

// Fonction pour obtenir une réponse IA éducative
function getEducationalAIResponse(prompt) {
    const lowerPrompt = prompt.toLowerCase();
    
    const responses = {
        'mathématiques': '🧮 Les mathématiques sont magiques ! ✨ Veux-tu apprendre à compter avec des mangues du Cameroun, faire des additions avec des bananes, ou découvrir les formes géométriques ? Je peux t\'expliquer avec des exemples amusants ! 🥭🍌',
        'math': '🧮 Les mathématiques sont magiques ! ✨ Veux-tu apprendre à compter avec des mangues du Cameroun, faire des additions avec des bananes, ou découvrir les formes géométriques ? Je peux t\'expliquer avec des exemples amusants ! 🥭🍌',
        'addition': '➕ L\'addition, c\'est fantastique ! Imagine que tu as 3 éléphants 🐘🐘🐘 dans la réserve de Waza, et que 2 autres éléphants 🐘🐘 arrivent ! En tout, ça fait 3 + 2 = 5 éléphants ! 🎉',
        'soustraction': '➖ La soustraction, c\'est comme partager ! Si tu as 7 mangues 🥭🥭🥭🥭🥭🥭🥭 et que tu en donnes 3 à tes amis, il t\'en reste 7 - 3 = 4 mangues ! 😊',
        'français': '🇫🇷 Le français est une langue magnifique ! Veux-tu apprendre l\'alphabet avec des mots camerounais, découvrir de nouveaux mots, ou lire des histoires de notre pays ? 📚',
        'francais': '🇫🇷 Le français est une langue magnifique ! Veux-tu apprendre l\'alphabet avec des mots camerounais, découvrir de nouveaux mots, ou lire des histoires de notre pays ? 📚',
        'anglais': '🇬🇧 English is wonderful! Let\'s learn together! We can discover colors, count animals from Cameroon, or learn about our beautiful country! 🦁',
        'english': '✨ Great choice! English opens many doors! We can learn colors, animals, and so much more about Cameroon! 🌟',
        'sciences': '🔬 La science, c\'est extraordinaire ! Veux-tu découvrir les animaux du Cameroun 🦁, comprendre comment poussent nos plantes 🌱, ou explorer les étoiles ? 🌟',
        'science': '🔬 La science, c\'est extraordinaire ! Veux-tu découvrir les animaux du Cameroun 🦁, comprendre comment poussent nos plantes 🌱, ou explorer les étoiles ? 🌟',
        'bonjour': '👋🌟 Bonjour mon petit génie ! Je suis ravi de te parler aujourd\'hui ! Es-tu prêt pour une aventure d\'apprentissage ? 😊✨',
        'salut': '🤚 Salut ! Quel plaisir de te retrouver ! Qu\'est-ce qui t\'intéresse aujourd\'hui ? Des maths, du français, de l\'anglais ou des sciences ? 🎯',
        'aide': '🤖💪 Je suis ton assistant ! Tu peux me poser des questions sur tes cours, je suis là pour t\'aider à devenir un petit génie ! ✨',
        'help': '🤖💪 I\'m your assistant! You can ask me about your lessons, I\'m here to help you become a little genius! ✨'
    };
    
    // Recherche de mots-clés
    for (const [keyword, response] of Object.entries(responses)) {
        if (lowerPrompt.includes(keyword)) {
            return response;
        }
    }
    
    // Réponses génériques
    const genericResponses = [
        '🤔✨ Excellente question ! Dans quelle matière veux-tu de l\'aide ? Maths, français, anglais ou sciences ? 😊',
        '🌟 Tu es très curieux, c\'est formidable ! Dis-moi ce qui t\'intéresse le plus ! 🎯',
        '😊 Peux-tu être plus précis ? Je veux t\'aider au mieux ! 💪'
    ];
    
    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
}

// Serveur HTTP
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    console.log(`${method} ${path}`);

    // Gestion CORS preflight
    if (method === 'OPTIONS') {
        res.writeHead(200, corsHeaders);
        res.end();
        return;
    }

    try {
        // Route principale
        if (path === '/' && method === 'GET') {
            sendJSON(res, {
                message: 'EduBot Premium Backend - Serveur opérationnel ✅',
                version: '1.0.0',
                status: 'running',
                timestamp: new Date().toISOString(),
                endpoints: [
                    'GET  / - Info du serveur',
                    'GET  /api/app-info - Info application',
                    'POST /api/parent-login - Connexion parent',
                    'POST /api/ask-gemini - Assistant IA',
                    'POST /api/save-progress - Sauvegarder progrès',
                    'GET  /api/user-progress - Progrès utilisateur',
                    'GET  /api/global-stats - Statistiques'
                ]
            });
            return;
        }

        // Info de l'application
        if (path === '/api/app-info' && method === 'GET') {
            sendJSON(res, {
                title: 'EduBot Premium (Serveur Connecté!)',
                version: '2.0.0',
                status: 'connected',
                features: ['IA Gemini', 'Sauvegarde Cloud', 'Multi-profils', 'TTS', 'Multi-langues'],
                timestamp: new Date().toISOString()
            });
            return;
        }

        // Connexion parentale
        if (path === '/api/parent-login' && method === 'POST') {
            const body = await getRequestBody(req);
            const { pin } = body;
            
            console.log(`🔐 Tentative connexion parent: ${pin}`);
            
            if (!pin) {
                sendJSON(res, {
                    success: false,
                    message: 'Code PIN requis'
                }, 400);
                return;
            }
            
            if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
                sendJSON(res, {
                    success: false,
                    message: 'Le code PIN doit contenir 4 chiffres'
                }, 400);
                return;
            }
            
            if (pin === PARENT_PIN) {
                console.log('✅ Connexion parent autorisée');
                sendJSON(res, {
                    success: true,
                    message: 'Accès parental autorisé',
                    user: {
                        type: 'parent',
                        name: 'Espace Parent',
                        permissions: ['view_stats', 'manage_profiles']
                    }
                });
            } else {
                console.log('❌ Code PIN incorrect');
                sendJSON(res, {
                    success: false,
                    message: 'Code PIN incorrect'
                }, 401);
            }
            return;
        }

        // Assistant IA
        if (path === '/api/ask-gemini' && method === 'POST') {
            const body = await getRequestBody(req);
            const { prompt } = body;
            
            console.log(`🤖 Question IA: ${prompt?.substring(0, 50)}...`);
            
            if (!prompt) {
                sendJSON(res, {
                    success: false,
                    error: 'Question requise'
                }, 400);
                return;
            }
            
            try {
                const response = getEducationalAIResponse(prompt);
                console.log('✅ Réponse IA générée');
                sendJSON(res, {
                    success: true,
                    response: response,
                    timestamp: new Date().toISOString(),
                    source: 'local'
                });
            } catch (error) {
                console.error('❌ Erreur IA:', error.message);
                sendJSON(res, {
                    success: false,
                    error: 'Erreur assistant IA',
                    fallback: 'Désolé, je rencontre des difficultés. Peux-tu reformuler ?'
                }, 500);
            }
            return;
        }

        // Sauvegarder progrès
        if (path === '/api/save-progress' && method === 'POST') {
            const body = await getRequestBody(req);
            const { userId, progressData } = body;
            
            console.log(`💾 Sauvegarde progrès: ${userId}`);
            
            if (!userId || !progressData) {
                sendJSON(res, {
                    success: false,
                    message: 'userId et progressData requis'
                }, 400);
                return;
            }
            
            if (usersData[userId]) {
                usersData[userId] = {
                    ...usersData[userId],
                    ...progressData,
                    progress: {
                        ...usersData[userId].progress,
                        ...progressData.progress,
                        last_activity: new Date().toISOString()
                    }
                };
                
                console.log('✅ Progrès sauvegardés');
                sendJSON(res, {
                    success: true,
                    message: 'Progrès sauvegardés',
                    data: usersData[userId]
                });
            } else {
                sendJSON(res, {
                    success: false,
                    message: 'Utilisateur non trouvé'
                }, 404);
            }
            return;
        }

        // Récupérer progrès utilisateur
        if (path.startsWith('/api/user-progress/') && method === 'GET') {
            const userId = path.split('/')[3]; // /api/user-progress/userId
            
            console.log(`📊 Récupération progrès: ${userId}`);
            
            if (usersData[userId]) {
                console.log('✅ Données trouvées');
                sendJSON(res, {
                    success: true,
                    data: usersData[userId]
                });
            } else {
                console.log('❌ Utilisateur non trouvé');
                sendJSON(res, {
                    success: false,
                    message: 'Utilisateur non trouvé',
                    availableUsers: Object.keys(usersData)
                }, 404);
            }
            return;
        }

        // Récupérer progrès (alternative)
        if (path === '/api/user-progress' && method === 'GET') {
            const userId = parsedUrl.query.userId;
            
            if (!userId) {
                sendJSON(res, {
                    success: false,
                    message: 'userId requis en paramètre'
                }, 400);
                return;
            }
            
            console.log(`📊 Récupération progrès: ${userId}`);
            
            if (usersData[userId]) {
                sendJSON(res, {
                    success: true,
                    data: usersData[userId]
                });
            } else {
                sendJSON(res, {
                    success: false,
                    message: 'Utilisateur non trouvé'
                }, 404);
            }
            return;
        }

        // Statistiques globales
        if (path === '/api/global-stats' && method === 'GET') {
            console.log('📈 Génération statistiques globales');
            
            const allUsers = Object.values(usersData);
            const totalUsers = allUsers.length;
            const totalTime = allUsers.reduce((sum, user) => sum + user.progress.total_time, 0);
            const averageStreak = Math.round(allUsers.reduce((sum, user) => sum + user.progress.current_streak, 0) / totalUsers);
            
            const stats = {
                total_users: totalUsers,
                total_time_minutes: totalTime,
                average_streak_days: averageStreak,
                most_active_user: allUsers.reduce((prev, current) => 
                    prev.progress.total_time > current.progress.total_time ? prev : current
                ),
                weekly_activity: {
                    monday: allUsers.reduce((sum, user) => sum + user.stats.weekly_activity[0], 0),
                    tuesday: allUsers.reduce((sum, user) => sum + user.stats.weekly_activity[1], 0),
                    wednesday: allUsers.reduce((sum, user) => sum + user.stats.weekly_activity[2], 0),
                    thursday: allUsers.reduce((sum, user) => sum + user.stats.weekly_activity[3], 0),
                    friday: allUsers.reduce((sum, user) => sum + user.stats.weekly_activity[4], 0),
                    saturday: allUsers.reduce((sum, user) => sum + user.stats.weekly_activity[5], 0),
                    sunday: allUsers.reduce((sum, user) => sum + user.stats.weekly_activity[6], 0)
                }
            };
            
            console.log('✅ Statistiques générées');
            sendJSON(res, {
                success: true,
                stats: stats,
                timestamp: new Date().toISOString()
            });
            return;
        }

        // Route 404
        console.log(`❌ Route non trouvée: ${method} ${path}`);
        sendJSON(res, {
            success: false,
            message: 'Endpoint non trouvé',
            requested: `${method} ${path}`,
            available: [
                'GET /', 'GET /api/app-info', 'POST /api/parent-login',
                'POST /api/ask-gemini', 'POST /api/save-progress',
                'GET /api/user-progress/:userId', 'GET /api/global-stats'
            ]
        }, 404);

    } catch (error) {
        console.error('❌ Erreur serveur:', error.message);
        sendJSON(res, {
            success: false,
            message: 'Erreur interne serveur',
            error: error.message
        }, 500);
    }
});

// Démarrage du serveur
server.listen(PORT, () => {
    console.log('🚀========================================🚀');
    console.log(`📱 EduBot Premium Backend (HTTP Natif)`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log(`📅 Démarré: ${new Date().toLocaleString('fr-FR')}`);
    console.log('🚀========================================🚀');
    console.log('');
    console.log('📡 Endpoints disponibles:');
    console.log('   GET  /                      - Info serveur');
    console.log('   GET  /api/app-info          - Info application');
    console.log('   POST /api/parent-login      - Connexion parent');
    console.log('   POST /api/ask-gemini        - Assistant IA');
    console.log('   POST /api/save-progress     - Sauvegarder');
    console.log('   GET  /api/user-progress/:id - Progrès user');
    console.log('   GET  /api/global-stats      - Statistiques');
    console.log('');
    console.log('✅ Serveur HTTP natif prêt !');
    console.log(`🔐 Code PIN parent: ${PARENT_PIN}`);
    console.log('');
    console.log('🧪 Test: curl http://localhost:3000/api/app-info');
});

// Gestion propre de l'arrêt
process.on('SIGTERM', () => {
    console.log('📴 Arrêt serveur...');
    server.close();
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n📴 Arrêt serveur...');
    server.close();
    process.exit(0);
});

console.log('🎯 Serveur HTTP natif - Aucune dépendance Express requise !');