# AskPro - Question & Answer Platform

A simple, beginner-friendly Q&A platform built with vanilla HTML, CSS, and JavaScript. Perfect for students learning web development!

## 📁 Project Structure

This project now contains **9 essential files** with authentication and user profiles:

```
askpro/
├── index.html           # Homepage - displays all questions
├── question.html        # Question detail page - shows answers
├── ask.html            # Ask a question page - submit new questions (requires login)
├── login.html          # Login/Signup page - user authentication
├── profile.html        # User profile page - shows user's questions & answers
├── 404.html            # Error page - friendly "page not found" message
├── style.css           # All CSS styling for the entire site
├── script.js           # All JavaScript logic with authentication system
├── database-schema.sql # SQL schema with authentication fields
└── README.md           # This file!
```

## 🚀 How to Run Locally

**No server required!** Just open the HTML files directly in your browser.

### Option 1: Double-Click Method
1. Download all files to a folder on your computer
2. Double-click `index.html` to open it in your default browser
3. Navigate through the site using the links

### Option 2: Drag-and-Drop Method
1. Open your web browser (Chrome, Firefox, Safari, Edge)
2. Drag `index.html` into the browser window
3. The site will load and work completely!

### Option 3: Using VS Code Live Server (Recommended)
1. Install [Visual Studio Code](https://code.visualstudio.com/)
2. Install the "Live Server" extension
3. Right-click `index.html` and select "Open with Live Server"
4. The site will open with auto-refresh when you edit files!

## ✨ Features

### Current MVP Features
- ✅ **View Questions**: Browse all questions on the homepage with author names
- ✅ **Search**: Find questions by keywords in title or description
- ✅ **Filter by Category**: Show only questions from specific categories (Math, Science, Tech, etc.)
- ✅ **Question Details**: View full question with all answers and author attribution
- ✅ **Like Answers**: Click the heart button to like helpful answers
- ✅ **User Authentication**: Login and signup with session management (localStorage-based)
- ✅ **Post Questions**: Submit new questions (requires login) with title, description, and category
- ✅ **Post Answers**: Respond to any question (requires login) with your knowledge
- ✅ **User Profiles**: View any user's profile with their questions and answers
- ✅ **Session Tracking**: Login state persists across page refreshes
- ✅ **Data Persistence**: Uses browser's localStorage to save all data between sessions
- ✅ **404 Error Page**: Friendly error page with helpful navigation
- ✅ **Ad Placeholders**: Visual markers showing where ads would go in a production app

### New Authentication Features
- 🔐 **Login System**: Users can login with username/email and password
- 📝 **Signup System**: New users can create accounts with validation
- 👤 **User Profiles**: Each user has a profile showing their activity
- 🔄 **Session Management**: Login state tracked with localStorage
- 🚪 **Logout**: Users can logout to clear their session
- 🔒 **Protected Routes**: Ask question and post answer require login
- 📊 **User Statistics**: Profile shows question count, answer count, and likes

### What's Included (Learning Features)
- 📝 **Extensive Comments**: Every code block is explained in plain English
- 🎨 **Clean CSS**: Simple, modern styling with Flexbox layout
- 💾 **localStorage Demo**: Learn how to persist data without a database
- 🔍 **DOM Manipulation**: See how JavaScript updates the page dynamically
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile

## 🎓 Learning Concepts

This project teaches you:

1. **HTML Structure**: Semantic HTML5 elements, forms, links
2. **CSS Styling**: Flexbox layout, responsive design, hover effects, transitions
3. **Vanilla JavaScript**: 
   - DOM manipulation
   - Event listeners
   - Array methods (filter, map, forEach)
   - localStorage API
   - URL parameters
4. **Data Flow**: How data moves from user input → array → localStorage → display
5. **User Experience**: Loading states, empty states, form validation

## 🔧 How It Works

### The MOCK_USERS Array
User accounts are stored in a JavaScript array:

```javascript
MOCK_USERS = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    password: "password123", // WARNING: Never store plain text in production!
    full_name: "John Doe",
    bio: "Web developer and tech enthusiast...",
    profile_image: "default-avatar.png",
    joined: "2024-01-01"
  }
]
```

### The MOCK_QUESTIONS Array (Updated with User Tracking)
All questions now track who asked them:

```javascript
MOCK_QUESTIONS = [
  {
    id: 1,
    title: "Question title",
    description: "Question details",
    category: "Math",
    user_id: 1,              // NEW: Who asked this question
    username: "john_doe",    // NEW: Username for easy display
    timestamp: "2024-01-15",
    answers: [
      {
        id: 101,
        text: "Answer text",
        user_id: 2,          // NEW: Who posted this answer
        username: "jane_smith", // NEW: Username for easy display
        likes: 5,
        timestamp: "2024-01-15"
      }
    ]
  }
]
```

### localStorage Integration
The app uses localStorage for three purposes:

1. **Questions Data** (`askpro_questions`):
   - Stores all questions and answers
   - Automatically saves when new content is posted
   - Includes user_id tracking for each item

2. **Current User Session** (`askpro_current_user`):
   - Stores logged-in user information
   - Cleared on logout
   - Checked on page load to maintain session

3. **Mock Users** (in-memory only):
   - MOCK_USERS array exists in code only
   - In a real app, this would be in a database

To see your localStorage data:
1. Open browser DevTools (F12 or right-click → Inspect)
2. Go to "Application" tab → "Local Storage"
3. Find keys: `askpro_questions` and `askpro_current_user`
4. See your data as JSON strings!

### Page Navigation
- **index.html**: Lists all questions with author names, implements search/filter
- **login.html**: Login/Signup forms with demo credentials
- **ask.html**: Form to create new questions (redirects to login if not authenticated)
- **question.html**: Displays one question and its answers with author names
  - Uses URL parameters: `question.html?id=1`
  - JavaScript reads the `id` from URL to show correct question
- **profile.html**: Shows user profile and their content
  - Uses URL parameters: `profile.html?user=username`
  - Filters questions/answers to show only that user's content
- **404.html**: Error page for broken links or missing pages

## 📝 Customization Ideas

### Easy Customizations
1. **Change Colors**: Edit the color values in `style.css`
   - Find `background-color: #2563eb;` (blue) and change the hex code
2. **Add More Categories**: Edit the `<option>` values in dropdown menus
3. **Change Mock Users**: Edit the `MOCK_USERS` array in `script.js`
4. **Add Your Own Account**: Add yourself to the `MOCK_USERS` array
5. **Customize Profile**: Edit bio, add profile pictures (URLs)

### Intermediate Challenges
1. **Vote System**: Add upvote/downvote buttons (not just likes)
2. **Edit Profile**: Allow users to edit their bio and profile info
3. **Delete Feature**: Add delete buttons for user's own questions/answers
4. **Sort Answers**: Sort by most likes, newest first, oldest first
5. **Character Counter**: Show remaining characters as user types
6. **Tags System**: Add tags/keywords to questions
7. **Password Strength Meter**: Visual indicator for password strength
8. **Email Validation**: Check email format before signup
9. **Remember Me**: Checkbox to keep user logged in longer
10. **Profile Pictures**: Upload and display actual profile images

### Advanced Projects
1. **User Authentication**: 
   - Implement real login/signup using the forms
   - Store user sessions
   - Track who posted what
2. **Database Integration**:
   - Use the provided `database-schema.sql` file
   - Set up PostgreSQL/MySQL database
   - Replace localStorage with real database calls
3. **Backend API**:
   - Build a Node.js/Express server
   - Create REST API endpoints
   - Connect frontend to backend
4. **Rich Text Editor**: Add formatting (bold, italic, code blocks) to answers
5. **File Uploads**: Allow users to attach images to questions

## 🐛 Troubleshooting

### My changes aren't showing up
- **Hard refresh**: Press `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
- **Clear localStorage**: Open DevTools → Application → Local Storage → Right-click → Clear

### Can't login / "Invalid username or password"
- Use the demo accounts shown on the login page
- Check that you're using the exact username (case-sensitive)
- Try: `username: john_doe` and `password: password123`
- Check browser console for errors

### Redirected to login page unexpectedly
- The app requires login to post questions or answers
- This is normal behavior - login with a demo account to continue
- Your session may have expired (cleared localStorage)

### Profile page shows "User not found"
- Make sure the username in the URL is correct
- Check that the user exists in MOCK_USERS array
- Example working URL: `profile.html?user=john_doe`

### Questions/answers disappeared
- Check if you cleared localStorage
- Check browser console for errors (F12 → Console tab)
- Make sure you're logged in (some features require authentication)

### Like button not working
- Make sure you're on `question.html`, not `index.html`
- Check console for JavaScript errors
- Verify `script.js` is loaded (check Network tab in DevTools)

### Search not filtering
- Ensure `searchInput` ID matches in HTML and JavaScript
- Check that `filterQuestions()` function is being called
- Look for console errors

## 📚 Next Steps for Learning

1. **Understand the Code**:
   - Read through `script.js` comments carefully
   - Try modifying small parts and see what changes
   
2. **Experiment**:
   - Change colors, fonts, spacing in `style.css`
   - Add your own mock questions to the array
   - Try breaking things (then fix them!)

3. **Build Features**:
   - Add a "trending questions" section
   - Create a user profile page
   - Add a comment system under answers

4. **Learn More**:
   - Study CSS Grid for layouts
   - Learn about JavaScript modules
   - Explore modern frameworks (React, Vue)

5. **Go Full-Stack**:
   - Learn Node.js and Express
   - Set up a real database
   - Deploy to the web (Netlify, Vercel, Heroku)

## 📄 SQL Database Schema

When you're ready to move beyond localStorage, use the provided `database-schema.sql` file to create real database tables:

- **users** - Store user accounts
- **questions** - Store all questions
- **answers** - Store all answers

The SQL file includes:
- Complete CREATE TABLE statements
- Foreign key relationships
- Indexes for performance
- Sample INSERT statements
- Detailed comments explaining everything

## 🎯 Project Goals

This project prioritizes:
- **Simplicity**: No build tools, no frameworks, just vanilla code
- **Clarity**: Every line is commented and explained
- **Learnability**: Perfect for beginners to understand and modify
- **Completeness**: A working MVP with real features

## 🤝 Contributing (For Students)

Try these exercises:
1. Fork/copy this project
2. Add your own feature
3. Share with classmates
4. Compare different approaches!

## 📝 License

This is a learning project. Feel free to use it however you want!

---

**Happy Coding! 🚀**

Built with ❤️ for students learning web development.

Questions? Comments in the code have your answers!
