# AskPro - Design Guidelines

## Design Approach

**Selected Approach**: Design System (Utility-Focused)  
**Primary Reference**: Stack Overflow + GitHub Primer aesthetic  
**Rationale**: Q&A platforms prioritize information clarity, readability, and efficient content discovery. The design should fade into the background, letting questions and answers take center stage.

**Core Design Principles**:
- Content-first hierarchy: Questions and answers are the heroes
- Scannable layouts: Users should quickly identify relevant content
- Trust through simplicity: Clean, professional appearance builds credibility
- Beginner-friendly: Intuitive navigation patterns

---

## Color Palette

### Light Mode (Default)
- **Background**: 0 0% 100% (pure white)
- **Surface/Cards**: 210 20% 98% (subtle off-white)
- **Text Primary**: 220 13% 18% (near black, high readability)
- **Text Secondary**: 215 14% 54% (muted slate)
- **Primary Brand**: 217 91% 60% (Stack Overflow inspired blue)
- **Primary Hover**: 217 91% 50%
- **Success/Accepted**: 142 76% 36% (green for accepted answers)
- **Border**: 214 32% 91% (light gray borders)

### Dark Mode
- **Background**: 222 47% 11% (deep navy-gray)
- **Surface/Cards**: 217 33% 17% (elevated dark surface)
- **Text Primary**: 210 20% 98% (off-white)
- **Text Secondary**: 215 20% 65% (light gray)
- **Primary Brand**: 217 91% 65% (adjusted blue)
- **Border**: 217 33% 24% (subtle dark borders)

### Accent Colors (Minimal Use)
- **Warning**: 38 92% 50% (orange for notifications)
- **Like/Vote**: 217 91% 60% (use primary for upvotes)

---

## Typography

**Font Stack**: 
- **Primary**: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif
- **Code/Monospace**: 'SF Mono', 'Monaco', 'Consolas', monospace (for code snippets if needed)

**Type Scale**:
- **Page Titles (H1)**: text-3xl font-bold (30px) - Homepage title, "Ask a Question"
- **Question Titles (H2)**: text-xl font-semibold (20px) - Question cards, detail page
- **Section Headers (H3)**: text-lg font-semibold (18px) - "Answers", "Related Questions"
- **Body Text**: text-base (16px) font-normal - Question descriptions, answers
- **Meta Text**: text-sm (14px) - Author names, timestamps, categories
- **Small Labels**: text-xs (12px) - Tags, badges

**Line Heights**:
- Headings: leading-tight (1.25)
- Body text: leading-relaxed (1.6) - optimal for reading long answers
- Meta text: leading-normal (1.5)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **4, 6, 8, 12, 16** for consistent rhythm
- Component padding: p-4 to p-6
- Section spacing: mb-8, gap-6
- Card gaps: space-y-4
- Form fields: gap-4

**Container System**:
- **Max Width**: max-w-6xl mx-auto (1152px) - optimal reading width for content
- **Question Cards**: Full container width with internal padding
- **Question Detail**: max-w-4xl for answer readability
- **Sidebar** (if added): w-64 to w-80 for categories/tags

**Grid Patterns**:
- **Homepage**: Single column stack (questions list)
- **Question Cards**: Flex layout with vote count on left (if voting added)
- **Category Pills**: Flex wrap with gap-2

---

## Component Library

### Navigation Header
- **Style**: Sticky top bar with subtle border-bottom
- **Height**: h-16 with horizontal padding px-6
- **Layout**: Flex justify-between with logo left, search center, actions right
- **Elements**: Logo/wordmark, search bar (w-96), "Ask Question" button (primary), Login link
- **Background**: bg-white dark:bg-surface with shadow-sm

### Question Cards (Homepage)
- **Container**: Rounded border (rounded-lg border border-border) with p-6
- **Layout**: 
  - Question title (text-xl font-semibold text-primary clickable)
  - Description preview (text-base text-secondary, truncate after 2 lines)
  - Meta row (flex justify-between): Category badge, answer count, timestamp
- **Hover State**: Subtle shadow-md and border-primary/20
- **Spacing**: space-y-6 between cards

### Category Badges
- **Style**: Pill-shaped (rounded-full px-3 py-1)
- **Colors**: bg-primary/10 text-primary border border-primary/20
- **Text**: text-xs font-medium uppercase tracking-wide

### Search Bar
- **Style**: Input with search icon prefix
- **Dimensions**: h-10 px-4 rounded-lg
- **Border**: border border-border focus:border-primary focus:ring-2 focus:ring-primary/20
- **Placeholder**: "Search questions..." in text-secondary

### Category Filter Dropdown
- **Style**: Select element styled to match search bar
- **Position**: Adjacent to search (flex gap-3)
- **Options**: "All Categories", "Math", "Science", "Tech"

### Ask Question Page
- **Form Layout**: Single column, max-w-2xl centered
- **Fields**:
  - Title input: h-12 text-lg
  - Description textarea: min-h-40 resize-y
  - Category select: h-12
  - All with consistent border, focus states
- **Submit Button**: Primary button (w-full sm:w-auto), "Post Question"

### Question Detail Page
- **Question Header**: 
  - Title (text-3xl font-bold mb-4)
  - Meta info row (author, timestamp, category badge)
  - Description (text-lg leading-relaxed text-secondary)
- **Answers Section**:
  - Header "X Answers" (text-xl font-semibold mb-6)
  - Each answer card: border-l-4 border-transparent hover:border-primary pl-6
  - Like button (outline button with heart icon, counter badge)
- **Answer Form**: 
  - Textarea (min-h-32) with "Your Answer" label
  - Submit button below

### Buttons
- **Primary**: bg-primary text-white hover:bg-primary-hover px-6 py-2.5 rounded-lg font-medium
- **Secondary/Outline**: border-2 border-primary text-primary hover:bg-primary/5
- **Like Button**: Flex items-center gap-2, icon + count, transition transform active:scale-95

### Ad Placeholders
- **Style**: Dashed border (border-2 border-dashed border-border) rounded-lg
- **Content**: Centered text "Ad Placement" in text-secondary
- **Dimensions**: 
  - Sidebar ad: h-64 (square-ish)
  - Banner ad: h-24 w-full (horizontal)
- **Position**: 
  - Homepage: Between question cards (every 5th position)
  - Question page: Right sidebar or bottom

### Login/Signup Forms
- **Container**: Centered card max-w-md with shadow-lg
- **Fields**: Email, password inputs (h-12 each)
- **Layout**: space-y-4 with submit at bottom
- **Link**: "Don't have an account? Sign up" below form

---

## Interaction & States

### Hover Effects
- **Cards**: Translate-y slightly (hover:-translate-y-0.5) with shadow increase
- **Buttons**: Darken background color, cursor-pointer
- **Links**: Underline decoration with color shift

### Active States
- **Inputs**: Ring-2 with primary color ring
- **Buttons**: Slight scale down (active:scale-95)

### Loading States
- **Questions loading**: Skeleton cards with animate-pulse
- **Form submission**: Button shows "Posting..." with disabled state

### Animations
**Use sparingly - only for:**
- Page transitions: Fade in (opacity 0 to 1, duration 200ms)
- Card hover: Transform transition (150ms ease-out)
- Like button: Scale pulse on click

---

## Images

**Usage**: Minimal - this is a text-first platform

**Avatar Images**:
- User avatars: 40px circular (w-10 h-10 rounded-full) next to author names
- Default: Colored initials in circle (use bg-primary/10)

**No Hero Image**: This is a utility app, not a marketing page. The homepage immediately shows the question list after a minimal header.

**Placeholder Strategy**: Use initials or simple iconography instead of photos to maintain the clean, professional aesthetic.

---

## Dark Mode Implementation

- **Toggle**: Icon button in header (sun/moon icon)
- **Persistence**: Save preference to localStorage
- **Class Strategy**: Use Tailwind's `dark:` prefix throughout
- **Consistency**: All form inputs, cards, and surfaces must respect dark mode
- **Contrast**: Ensure WCAG AA compliance in both modes (4.5:1 for body text)

---

## Accessibility

- **Focus Indicators**: Visible ring-2 ring-primary/50 on all interactive elements
- **ARIA Labels**: Proper labels for search, filter, and form inputs
- **Keyboard Navigation**: Tab order follows visual hierarchy
- **Color Contrast**: Text meets WCAG AA standards in both light/dark modes
- **Semantic HTML**: Use proper heading hierarchy (h1 > h2 > h3)

---

This design creates a professional, highly functional Q&A platform that prioritizes content readability and user efficiency while remaining approachable for beginner developers to implement and customize.