// ============================================
// ASKPRO JAVASCRIPT FILE (UPDATED WITH AUTHENTICATION)
// Contains all logic for the Q&A platform with user system
// ============================================

// ------------------------------------
// MOCK DATABASE (USERS ARRAY)
// ------------------------------------
// This array simulates a database of users
// In a real app, this would be in a database with hashed passwords

function getMockUsers() {
    return [
        {
            id: 1,
            username: "john_doe",
            email: "john@example.com",
            password: "password123", // WARNING: In a real app, this would be HASHED!
            full_name: "John Doe",
            bio: "Web developer and tech enthusiast. Love helping others learn!",
            profile_image: "default-avatar.png",
            joined: "2024-01-01"
        },
        {
            id: 2,
            username: "jane_smith",
            email: "jane@example.com",
            password: "mypass456", // WARNING: Never store plain text passwords in production!
            full_name: "Jane Smith",
            bio: "Math teacher with a passion for making learning fun!",
            profile_image: "default-avatar.png",
            joined: "2024-01-05"
        },
        {
            id: 3,
            username: "code_wizard",
            email: "wizard@example.com",
            password: "wizard789",
            full_name: "Code Wizard",
            bio: "Senior developer, always happy to help debug your code!",
            profile_image: "default-avatar.png",
            joined: "2024-01-10"
        }
    ];
}

// Load mock users (in a real app, these would come from a database)
const MOCK_USERS = getMockUsers();

// ------------------------------------
// MOCK DATABASE (QUESTIONS ARRAY WITH USER TRACKING)
// ------------------------------------
// Updated to include user_id for tracking who asked each question

function getQuestionsFromStorage() {
    const stored = localStorage.getItem('askpro_questions');
    
    if (stored) {
        return JSON.parse(stored);
    }
    
    // Default mock questions with user_id tracking
    return [
        {
            id: 1,
            title: "How do I calculate the area of a circle?",
            description: "I'm struggling with the formula for finding the area of a circle. Can someone explain it step by step?",
            category: "Math",
            user_id: 1, // Asked by john_doe
            username: "john_doe", // Denormalized for easy display
            timestamp: "2024-01-15",
            answers: [
                {
                    id: 101,
                    text: "The formula is A = πr². Where π (pi) is approximately 3.14159, and r is the radius of the circle. For example, if the radius is 5, the area would be 3.14159 × 5² = 78.54 square units.",
                    user_id: 2, // Answered by jane_smith
                    username: "jane_smith",
                    likes: 12,
                    timestamp: "2024-01-15"
                },
                {
                    id: 102,
                    text: "Remember that the radius is half of the diameter. So if you only know the diameter, divide it by 2 first to get the radius, then use the formula A = πr².",
                    user_id: 3, // Answered by code_wizard
                    username: "code_wizard",
                    likes: 5,
                    timestamp: "2024-01-15"
                }
            ]
        },
        {
            id: 2,
            title: "What is photosynthesis?",
            description: "I need a clear explanation of how photosynthesis works in plants. What are the inputs and outputs?",
            category: "Science",
            user_id: 2, // Asked by jane_smith
            username: "jane_smith",
            timestamp: "2024-01-14",
            answers: [
                {
                    id: 201,
                    text: "Photosynthesis is the process plants use to convert light energy into chemical energy (glucose). The inputs are carbon dioxide (CO₂), water (H₂O), and light. The outputs are glucose (C₆H₁₂O₆) and oxygen (O₂). The simplified equation is: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂",
                    user_id: 3, // Answered by code_wizard
                    username: "code_wizard",
                    likes: 23,
                    timestamp: "2024-01-14"
                }
            ]
        },
        {
            id: 3,
            title: "How do I center a div in CSS?",
            description: "I've tried multiple methods but can't seem to center a div both horizontally and vertically. What's the best modern approach?",
            category: "Programming",
            user_id: 3, // Asked by code_wizard
            username: "code_wizard",
            timestamp: "2024-01-13",
            answers: [
                {
                    id: 301,
                    text: "The easiest modern way is using Flexbox. On the parent container, use: display: flex; justify-content: center; align-items: center; This centers the child div both horizontally and vertically.",
                    user_id: 1, // Answered by john_doe
                    username: "john_doe",
                    likes: 34,
                    timestamp: "2024-01-13"
                },
                {
                    id: 302,
                    text: "CSS Grid is another great option: display: grid; place-items: center; This is even shorter and does the same thing!",
                    user_id: 2, // Answered by jane_smith
                    username: "jane_smith",
                    likes: 18,
                    timestamp: "2024-01-13"
                }
            ]
        },
        {
            id: 4,
            title: "What's the difference between RAM and ROM?",
            description: "I'm confused about the difference between RAM and ROM in computers. Can someone explain in simple terms?",
            category: "Tech",
            user_id: 1, // Asked by john_doe
            username: "john_doe",
            timestamp: "2024-01-12",
            answers: [
                {
                    id: 401,
                    text: "RAM (Random Access Memory) is temporary storage that your computer uses while running programs. It's fast but loses data when you turn off the computer. ROM (Read-Only Memory) is permanent storage that contains firmware and can't be easily changed. It keeps data even when powered off.",
                    user_id: 3, // Answered by code_wizard
                    username: "code_wizard",
                    likes: 15,
                    timestamp: "2024-01-12"
                }
            ]
        },
        {
            id: 5,
            title: "Why is the sky blue?",
            description: "I've always wondered - what makes the sky appear blue during the day?",
            category: "Science",
            user_id: 2, // Asked by jane_smith
            username: "jane_smith",
            timestamp: "2024-01-11",
            answers: []
        }
    ];
}

function saveQuestionsToStorage(questions) {
    localStorage.setItem('askpro_questions', JSON.stringify(questions));
}

let MOCK_QUESTIONS = getQuestionsFromStorage();

// ------------------------------------
// SESSION MANAGEMENT (AUTHENTICATION SIMULATION)
// ------------------------------------
// In a real app, this would be handled by the server with secure sessions/tokens
// Here we simulate it with localStorage for learning purposes

// Get currently logged-in user from localStorage
function getCurrentUser() {
    const userJson = localStorage.getItem('askpro_current_user');
    if (userJson) {
        return JSON.parse(userJson);
    }
    return null;
}

// Save current user to localStorage (simulate login session)
function setCurrentUser(user) {
    localStorage.setItem('askpro_current_user', JSON.stringify(user));
}

// Clear current user (simulate logout)
function clearCurrentUser() {
    localStorage.removeItem('askpro_current_user');
}

// AUTHENTICATION PROCESS (COMMENTED FOR STUDENT LEARNING)
// ========================================================
// In a real application with a server, the authentication flow would be:
//
// LOGIN PROCESS:
// 1. User enters username/email and password on login form
// 2. JavaScript sends POST request to server: {username, password}
// 3. Server looks up user in database by username/email
// 4. Server retrieves stored password_hash and salt from database
// 5. Server hashes the submitted password with the stored salt
// 6. Server compares: submitted_hash === stored_hash
// 7. If match: Server creates a session token (JWT or session ID)
// 8. Server sends token back to browser
// 9. Browser stores token in localStorage or cookie
// 10. Browser includes token in all future requests to prove identity
//
// SIGNUP PROCESS:
// 1. User fills out signup form with username, email, password
// 2. JavaScript sends POST request to server: {username, email, password}
// 3. Server validates: username/email not already taken
// 4. Server generates a random salt
// 5. Server hashes: password_hash = bcrypt.hash(password + salt)
// 6. Server stores in database: {username, email, password_hash, salt}
// 7. Server creates session token for new user
// 8. Server sends token back to browser
// 9. User is now logged in!
//
// LOGOUT PROCESS:
// 1. User clicks logout button
// 2. JavaScript sends request to server to invalidate session
// 3. Server deletes/expires the session token
// 4. JavaScript removes token from localStorage/cookie
// 5. User is now logged out!

// Simplified login function (NO REAL SECURITY - FOR LEARNING ONLY!)
function attemptLogin(username, password) {
    // Find user in MOCK_USERS array
    const user = MOCK_USERS.find(u => 
        (u.username === username || u.email === username) && u.password === password
    );
    
    if (user) {
        // Login successful! 
        // In real app, server would return a secure token
        // We just store the user object (NEVER do this in production!)
        const userSession = {
            id: user.id,
            username: user.username,
            email: user.email,
            full_name: user.full_name,
            bio: user.bio,
            profile_image: user.profile_image
        };
        setCurrentUser(userSession);
        return { success: true, user: userSession };
    } else {
        // Login failed
        return { success: false, error: "Invalid username or password" };
    }
}

// Simplified signup function (NO REAL SECURITY - FOR LEARNING ONLY!)
function attemptSignup(username, email, password, full_name) {
    // Check if username already exists
    const existingUser = MOCK_USERS.find(u => u.username === username || u.email === email);
    
    if (existingUser) {
        return { success: false, error: "Username or email already exists" };
    }
    
    // In a real app, you would:
    // 1. Validate password strength
    // 2. Generate salt: const salt = bcrypt.genSaltSync(10)
    // 3. Hash password: const hash = bcrypt.hashSync(password, salt)
    // 4. Store in database: {username, email, password_hash: hash, salt}
    
    // For our simulation, we just add to the array
    const newUser = {
        id: MOCK_USERS.length + 1,
        username,
        email,
        password, // WARNING: Never store plain text in production!
        full_name,
        bio: "New member of AskPro community!",
        profile_image: "default-avatar.png",
        joined: getCurrentDate()
    };
    
    MOCK_USERS.push(newUser);
    
    // Auto-login the new user
    const userSession = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        full_name: newUser.full_name,
        bio: newUser.bio,
        profile_image: newUser.profile_image
    };
    setCurrentUser(userSession);
    
    return { success: true, user: userSession };
}

// ------------------------------------
// UTILITY FUNCTIONS
// ------------------------------------

function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function generateUniqueId(type) {
    if (type === 'question') {
        const maxId = Math.max(...MOCK_QUESTIONS.map(q => q.id), 0);
        return maxId + 1;
    } else {
        return Date.now() + Math.floor(Math.random() * 1000);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ------------------------------------
// HEADER USER INFO (ALL PAGES)
// ------------------------------------
// Display logged-in user info in header on every page

document.addEventListener('DOMContentLoaded', function() {
    updateHeaderUserInfo();
});

function updateHeaderUserInfo() {
    const userInfoContainer = document.getElementById('userInfo');
    if (!userInfoContainer) return; // Not all pages have this element
    
    const currentUser = getCurrentUser();
    
    if (currentUser) {
        // User is logged in - show username and logout button
        userInfoContainer.innerHTML = `
            <span class="user-greeting">Hello, <strong>${escapeHtml(currentUser.username)}</strong>!</span>
            <a href="profile.html?user=${encodeURIComponent(currentUser.username)}" class="nav-link" data-testid="link-profile">
                My Profile
            </a>
            <button id="logoutBtn" class="btn btn-secondary btn-small" data-testid="button-logout">
                Logout
            </button>
        `;

        // Set up logout button
        document.getElementById('logoutBtn').addEventListener('click', function() {
            const navLinks = document.getElementById('navLinks');
            if (navLinks) {
                navLinks.classList.remove('active');
            }
            clearCurrentUser();
            alert('You have been logged out!');
            window.location.href = 'index.html';
        });
    } else {
        // User is NOT logged in - show login link
        userInfoContainer.innerHTML = `
            <a href="login.html" class="nav-link" data-testid="link-login">Login / Sign Up</a>
        `;
    }
}

// ------------------------------------
// HOMEPAGE LOGIC (index.html)
// ------------------------------------

if (window.location.pathname.endsWith('home.html') || 
    window.location.pathname.endsWith('/') ||
    window.location.pathname === '/') {
    
    document.addEventListener('DOMContentLoaded', function() {
        displayQuestions(MOCK_QUESTIONS);
        
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', filterQuestions);
        }
        
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', filterQuestions);
        }
    });
    
    function displayQuestions(questions) {
        const questionsList = document.getElementById('questionsList');
        const noResults = document.getElementById('noResults');
        
        if (!questionsList) return;
        
        questionsList.innerHTML = '';
        
        if (questions.length === 0) {
            questionsList.style.display = 'none';
            if (noResults) noResults.style.display = 'block';
            return;
        }
        
        questionsList.style.display = 'flex';
        if (noResults) noResults.style.display = 'none';
        
        questions.forEach(function(question) {
            const answerCount = question.answers.length;
            
            const questionCard = document.createElement('div');
            questionCard.className = 'question-card';
            questionCard.setAttribute('data-testid', 'card-question-' + question.id);
            
            questionCard.innerHTML = `
                <h3>${escapeHtml(question.title)}</h3>
                <p>${escapeHtml(question.description)}</p>
                <div class="question-meta">
                    <span class="category-badge">${escapeHtml(question.category)}</span>
                    <span class="answer-count" data-testid="text-answer-count-${question.id}">
                        ${answerCount} ${answerCount === 1 ? 'Answer' : 'Answers'}
                    </span>
                    <span class="author-info">by ${escapeHtml(question.username)}</span>
                    <span class="timestamp">Asked on ${question.timestamp}</span>
                </div>
            `;
            
            questionCard.addEventListener('click', function() {
                window.location.href = 'question.html?id=' + question.id;
            });
            
            questionsList.appendChild(questionCard);
        });
    }
    
    function filterQuestions() {
        const searchText = document.getElementById('searchInput').value.toLowerCase();
        const selectedCategory = document.getElementById('categoryFilter').value;
        
        const filtered = MOCK_QUESTIONS.filter(function(question) {
            const matchesSearch = 
                question.title.toLowerCase().includes(searchText) ||
                question.description.toLowerCase().includes(searchText);
            
            const matchesCategory = 
                selectedCategory === 'all' || 
                question.category === selectedCategory;
            
            return matchesSearch && matchesCategory;
        });
        
        displayQuestions(filtered);
    }
}

// ------------------------------------
// QUESTION DETAIL PAGE LOGIC (question.html)
// ------------------------------------

if (window.location.pathname.endsWith('question.html')) {
    
    document.addEventListener('DOMContentLoaded', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const questionId = parseInt(urlParams.get('id'));
        
        const question = MOCK_QUESTIONS.find(q => q.id === questionId);
        
        if (!question) {
            document.getElementById('questionDetail').innerHTML = 
                '<p>Question not found. <a href="index.html">Back to home</a></p>';
            return;
        }
        
        displayQuestionDetail(question);
        displayAnswers(question);
        setupAnswerForm(question);
    });
    
    function displayQuestionDetail(question) {
        const detailContainer = document.getElementById('questionDetail');
        
        detailContainer.innerHTML = `
            <div class="question-meta" style="margin-bottom: 15px;">
                <span class="category-badge">${escapeHtml(question.category)}</span>
                <span class="author-info">Asked by ${escapeHtml(question.username)}</span>
                <span class="timestamp">on ${question.timestamp}</span>
            </div>
            <h2 data-testid="text-question-title">${escapeHtml(question.title)}</h2>
            <p class="question-description" data-testid="text-question-description">
                ${escapeHtml(question.description)}
            </p>
        `;
    }
    
    function displayAnswers(question) {
        const answersList = document.getElementById('answersList');
        const noAnswers = document.getElementById('noAnswers');
        const answersHeader = document.getElementById('answersHeader');
        
        const count = question.answers.length;
        answersHeader.textContent = `${count} ${count === 1 ? 'Answer' : 'Answers'}`;
        
        answersList.innerHTML = '';
        
        if (question.answers.length === 0) {
            answersList.style.display = 'none';
            noAnswers.style.display = 'block';
            return;
        }
        
        answersList.style.display = 'flex';
        noAnswers.style.display = 'none';
        
        question.answers.forEach(function(answer) {
            const answerCard = document.createElement('div');
            answerCard.className = 'answer-card';
            answerCard.setAttribute('data-testid', 'card-answer-' + answer.id);
            
            answerCard.innerHTML = `
                <p data-testid="text-answer-${answer.id}">${escapeHtml(answer.text)}</p>
                <div class="answer-meta">
                    <span class="answer-author">
                        Answered by <strong>${escapeHtml(answer.username)}</strong> on ${answer.timestamp}
                    </span>
                    <button 
                        class="like-button" 
                        data-answer-id="${answer.id}"
                        data-testid="button-like-${answer.id}"
                    >
                        <span class="like-icon">♥</span>
                        <span class="like-count" data-testid="text-like-count-${answer.id}">${answer.likes}</span>
                    </button>
                </div>
            `;
            
            answersList.appendChild(answerCard);
        });
        
        setupLikeButtons(question);
    }
    
    function setupLikeButtons(question) {
        const likeButtons = document.querySelectorAll('.like-button');
        
        likeButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const answerId = parseInt(this.getAttribute('data-answer-id'));
                const answer = question.answers.find(a => a.id === answerId);
                
                if (answer) {
                    answer.likes++;
                    const likeCountSpan = this.querySelector('.like-count');
                    likeCountSpan.textContent = answer.likes;
                    this.classList.add('liked');
                    saveQuestionsToStorage(MOCK_QUESTIONS);
                    this.disabled = true;
                    this.style.opacity = '0.6';
                }
            });
        });
    }
    
    function setupAnswerForm(question) {
        const answerForm = document.getElementById('answerForm');
        
        answerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Check if user is logged in
            const currentUser = getCurrentUser();
            if (!currentUser) {
                alert('Please login to post an answer!');
                window.location.href = 'login.html';
                return;
            }
            
            const answerText = document.getElementById('answerText').value.trim();
            
            if (answerText === '') {
                alert('Please write an answer before submitting.');
                return;
            }
            
            const newAnswer = {
                id: generateUniqueId('answer'),
                text: answerText,
                user_id: currentUser.id,
                username: currentUser.username,
                likes: 0,
                timestamp: getCurrentDate()
            };
            
            question.answers.push(newAnswer);
            saveQuestionsToStorage(MOCK_QUESTIONS);
            document.getElementById('answerText').value = '';
            displayAnswers(question);
            alert('Your answer has been posted!');
        });
    }
}

// ------------------------------------
// ASK QUESTION PAGE LOGIC (ask.html)
// ------------------------------------

if (window.location.pathname.endsWith('ask.html')) {
    
    document.addEventListener('DOMContentLoaded', function() {
        // Check if user is logged in
        const currentUser = getCurrentUser();
        if (!currentUser) {
            alert('Please login to ask a question!');
            window.location.href = 'login.html';
            return;
        }
        
        const questionForm = document.getElementById('questionForm');
        
        questionForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const title = document.getElementById('questionTitle').value.trim();
            const description = document.getElementById('questionDescription').value.trim();
            const category = document.getElementById('questionCategory').value;
            
            if (title === '' || description === '' || category === '') {
                alert('Please fill in all fields.');
                return;
            }
            
            const newQuestion = {
                id: generateUniqueId('question'),
                title: title,
                description: description,
                category: category,
                user_id: currentUser.id,
                username: currentUser.username,
                timestamp: getCurrentDate(),
                answers: []
            };
            
            MOCK_QUESTIONS.unshift(newQuestion);
            saveQuestionsToStorage(MOCK_QUESTIONS);
            alert('Your question has been posted!');
            window.location.href = 'index.html';
        });
    });
}

// ------------------------------------
// LOGIN PAGE LOGIC (login.html)
// ------------------------------------

if (window.location.pathname.endsWith('login.html')) {
    
    document.addEventListener('DOMContentLoaded', function() {
        // Check if already logged in
        const currentUser = getCurrentUser();
        if (currentUser) {
            // Already logged in, redirect to homepage
            window.location.href = 'index.html';
            return;
        }
        
        // Setup login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                const username = document.getElementById('loginUsername').value.trim();
                const password = document.getElementById('loginPassword').value;
                
                const result = attemptLogin(username, password);
                
                if (result.success) {
                    alert('Login successful! Welcome back, ' + result.user.username + '!');
                    window.location.href = 'index.html';
                } else {
                    alert(result.error);
                }
            });
        }
        
        // Setup signup form
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                const username = document.getElementById('signupUsername').value.trim();
                const email = document.getElementById('signupEmail').value.trim();
                const password = document.getElementById('signupPassword').value;
                const fullName = document.getElementById('signupFullName').value.trim();
                
                if (password.length < 6) {
                    alert('Password must be at least 6 characters long.');
                    return;
                }
                
                const result = attemptSignup(username, email, password, fullName);
                
                if (result.success) {
                    alert('Signup successful! Welcome to AskPro, ' + result.user.username + '!');
                    window.location.href = 'index.html';
                } else {
                    alert(result.error);
                }
            });
        }
        
        // Toggle between login and signup forms
        const showSignupLink = document.getElementById('showSignup');
        const showLoginLink = document.getElementById('showLogin');
        const loginContainer = document.getElementById('loginContainer');
        const signupContainer = document.getElementById('signupContainer');
        
        if (showSignupLink) {
            showSignupLink.addEventListener('click', function(event) {
                event.preventDefault();
                loginContainer.style.display = 'none';
                signupContainer.style.display = 'block';
            });
        }
        
        if (showLoginLink) {
            showLoginLink.addEventListener('click', function(event) {
                event.preventDefault();
                signupContainer.style.display = 'none';
                loginContainer.style.display = 'block';
            });
        }
    });
}

// ------------------------------------
// PROFILE PAGE LOGIC (profile.html)
// ------------------------------------

if (window.location.pathname.endsWith('profile.html')) {
    
    document.addEventListener('DOMContentLoaded', function() {
        // Get username from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const profileUsername = urlParams.get('user');
        
        if (!profileUsername) {
            document.getElementById('profileContent').innerHTML = 
                '<p>No user specified. <a href="index.html">Back to home</a></p>';
            return;
        }
        
        // Find user in MOCK_USERS
        const user = MOCK_USERS.find(u => u.username === profileUsername);
        
        if (!user) {
            document.getElementById('profileContent').innerHTML = 
                '<p>User not found. <a href="index.html">Back to home</a></p>';
            return;
        }
        
        // Display user profile info
        displayUserProfile(user);
        
        // Calculate and display statistics
        displayUserStats(user);
        
        // Display user's questions
        displayUserQuestions(user);
        
        // Display user's answers
        displayUserAnswers(user);
    });
    
    function displayUserProfile(user) {
        const profileHeader = document.getElementById('profileHeader');
        
        profileHeader.innerHTML = `
            <div class="profile-avatar">
                <div class="avatar-placeholder" data-testid="img-avatar">
                    ${user.username.charAt(0).toUpperCase()}
                </div>
            </div>
            <div class="profile-info">
                <h2 data-testid="text-username">${escapeHtml(user.username)}</h2>
                <p class="profile-fullname" data-testid="text-fullname">${escapeHtml(user.full_name)}</p>
                <p class="profile-email" data-testid="text-email">${escapeHtml(user.email)}</p>
                <p class="profile-bio" data-testid="text-bio">${escapeHtml(user.bio || 'No bio yet.')}</p>
                <p class="profile-joined">Member since ${user.joined}</p>
            </div>
        `;
    }
    
    function displayUserStats(user) {
        // Count user's questions
        const userQuestions = MOCK_QUESTIONS.filter(q => q.user_id === user.id);
        const questionsCount = userQuestions.length;
        
        // Count user's answers and total likes
        let answersCount = 0;
        let totalLikes = 0;
        
        MOCK_QUESTIONS.forEach(function(question) {
            question.answers.forEach(function(answer) {
                if (answer.user_id === user.id) {
                    answersCount++;
                    totalLikes += answer.likes;
                }
            });
        });
        
        // Update the stat displays
        document.getElementById('questionsCount').textContent = questionsCount;
        document.getElementById('answersCount').textContent = answersCount;
        document.getElementById('totalLikes').textContent = totalLikes;
    }
    
    function displayUserQuestions(user) {
        const questionsContainer = document.getElementById('userQuestions');
        
        // Filter questions asked by this user
        const userQuestions = MOCK_QUESTIONS.filter(q => q.user_id === user.id);
        
        if (userQuestions.length === 0) {
            questionsContainer.innerHTML = '<p class="empty-state">No questions asked yet.</p>';
            return;
        }
        
        let html = '<div class="profile-questions-list">';
        
        userQuestions.forEach(function(question) {
            const answerCount = question.answers.length;
            html += `
                <div class="profile-question-item" data-testid="item-question-${question.id}">
                    <a href="question.html?id=${question.id}" class="profile-question-link">
                        <h4>${escapeHtml(question.title)}</h4>
                    </a>
                    <div class="profile-question-meta">
                        <span class="category-badge">${escapeHtml(question.category)}</span>
                        <span>${answerCount} ${answerCount === 1 ? 'answer' : 'answers'}</span>
                        <span class="timestamp">Asked on ${question.timestamp}</span>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        questionsContainer.innerHTML = html;
    }
    
    function displayUserAnswers(user) {
        const answersContainer = document.getElementById('userAnswers');
        
        // Find all answers by this user (search through all questions)
        const userAnswers = [];
        
        MOCK_QUESTIONS.forEach(function(question) {
            question.answers.forEach(function(answer) {
                if (answer.user_id === user.id) {
                    userAnswers.push({
                        answer: answer,
                        questionId: question.id,
                        questionTitle: question.title
                    });
                }
            });
        });
        
        if (userAnswers.length === 0) {
            answersContainer.innerHTML = '<p class="empty-state">No answers posted yet.</p>';
            return;
        }
        
        let html = '<div class="profile-answers-list">';
        
        userAnswers.forEach(function(item) {
            html += `
                <div class="profile-answer-item" data-testid="item-answer-${item.answer.id}">
                    <p class="answer-text">${escapeHtml(item.answer.text)}</p>
                    <div class="profile-answer-meta">
                        <span>On question: <a href="question.html?id=${item.questionId}">${escapeHtml(item.questionTitle)}</a></span>
                        <span>${item.answer.likes} likes</span>
                        <span class="timestamp">Answered on ${item.answer.timestamp}</span>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        answersContainer.innerHTML = html;
    }
}

// ------------------------------------
// CONSOLE LOG FOR DEBUGGING
// ------------------------------------

console.log('AskPro Script Loaded (with Authentication)!');
console.log('Current User:', getCurrentUser());
console.log('Mock Users:', MOCK_USERS);
console.log('Current Questions:', MOCK_QUESTIONS);


// ------------------------------------
// NAV BAR ACTIVE STATE LOGIC
// ------------------------------------

function setActiveNavLink() {
    // 1. Get the current page's file name (e.g., "home.html" from "http://.../home.html")
    const path = window.location.pathname;
    // Get everything after the last '/' or default to 'index.html' if on root
    let currentPage = path.substring(path.lastIndexOf('/') + 1);
    
    // Handle root path case (where path might be "/" or empty)
    if (currentPage === '' || currentPage === '/') {
        currentPage = 'index.html'; 
    }

    // 2. Select all navigation links that use the 'nav-link' class
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        // Remove the active class from all links first to ensure only one is active
        link.classList.remove('active');

        // Get the link's href file name (e.g., "home.html" from "home.html?param=x")
        const linkHref = link.getAttribute('href').split('?')[0];

        // 3. Check for a match
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
        
        // Special Case: Handle 'Home' link if currentPage is 'index.html'
        // This assumes your 'Home' link href is 'home.html' or 'index.html'
        if ((linkHref === 'home.html' || linkHref === 'index.html') && 
            (currentPage === 'home.html' || currentPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Ensure this function is called when the page content has finished loading
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink(); // <--- This runs the highlighting logic
    updateHeaderUserInfo(); 
    // ... any other DOMContentLoaded logic
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburgerToggle');
    const navLinks = document.getElementById('navLinks');
    const closeBtn = document.getElementById('closeBtn');

    if (!hamburger || !navLinks) return; // nothing to do if elements missing

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        const opened = navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', String(opened));
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    }

    // Close when clicking any nav link (so it closes after navigation)
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
        if (!navLinks.classList.contains('active')) return;
        if (navLinks.contains(e.target) || hamburger.contains(e.target)) return;
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });

    // Prevent bubbling from inside nav
    navLinks.addEventListener('click', (e) => e.stopPropagation());
});
