# Muscat Bay Utilities Dashboard

A comprehensive facility management dashboard for monitoring and managing utilities, systems, and contractors at Muscat Bay. Built with React, TypeScript, and Tailwind CSS.

## 🏢 Application Overview

The Muscat Bay Utilities Dashboard provides a centralized platform for facility managers to monitor and control various building systems including water, electricity, HVAC, firefighting, and contractor services. The dashboard features real-time data visualization, system status monitoring, and comprehensive reporting capabilities.

## ✨ Features

### 🎛️ **System Management**
- **Water System** - Monitor consumption, analyze zones, track meter readings
- **Electricity System** - Track consumption trends, detailed meter logs, cost analysis
- **HVAC System** - Equipment maintenance tracking, finding management, priority-based alerts
- **Firefighting & Alarm** - Equipment status monitoring, maintenance schedules, signal strength tracking
- **Contractor Tracker** - Service provider management, contract status, maintenance scheduling
- **STP Plant** - Sewage treatment monitoring and operational metrics

### 🎨 **User Interface**
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Collapsible Sidebar** - Space-efficient navigation with expand/collapse functionality
- **Dark/Light Theme** - Toggle between visual themes
- **Consistent Design System** - Unified styling across all components
- **Professional Charts** - Interactive data visualization with Recharts
- **Real-time Updates** - Dynamic data refresh and status monitoring

### 📊 **Data Visualization**
- **KPI Cards** - Key performance indicators with trend analysis
- **Interactive Charts** - Line, bar, and doughnut charts for data analysis
- **Detailed Tables** - Comprehensive data tables with search and pagination
- **Status Indicators** - Color-coded status badges and progress bars
- **Range Sliders** - Time period selection for data filtering

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd mbr-muscat-bay-utilities-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file and add:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Architecture

### **Technology Stack**
- **Frontend:** React 18 with TypeScript
- **Styling:** Tailwind CSS with custom design system
- **Charts:** Recharts for data visualization
- **Animations:** Framer Motion for smooth transitions
- **Build Tool:** Vite for fast development and building
- **State Management:** React Context API
- **Icons:** Custom SVG icon system

### **Project Structure**
```
src/
├── components/           # Reusable UI components
│   ├── charts/          # Chart components (Line, Bar, Doughnut)
│   ├── Button.tsx       # Button component
│   ├── Header.tsx       # Application header
│   ├── MainLayout.tsx   # Layout components
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── StatCard.tsx     # KPI card component
│   └── ...
├── views/               # Page components
│   ├── dashboard/       # Main dashboard view
│   ├── water/           # Water system views
│   ├── electricity/     # Electricity system views
│   ├── hvac/           # HVAC system views
│   ├── firefighting/   # Firefighting system views
│   ├── contractor/     # Contractor tracking views
│   └── stp/            # STP plant views
├── contexts/           # React context providers
│   ├── AppContext.tsx  # Application state
│   └── ThemeContext.tsx # Theme management
├── services/           # API and external services
├── types.ts           # TypeScript type definitions
├── constants.tsx      # Application constants and mock data
└── index.css         # Global styles and design system
```

## 🎨 Design System

### **Color Palette**
- **Primary:** Teal (`#14b8a6` / `teal-500`)
- **Text:** Slate variations (`slate-700`, `slate-600`, `slate-500`)
- **Background:** Light gray (`slate-50`)
- **Cards:** White with subtle shadows
- **Borders:** Light slate (`slate-200`)

### **Typography**
- **Font Family:** Inter (system fallbacks)
- **Headings:** `text-lg font-semibold text-slate-700`
- **Body:** `text-slate-600`
- **Captions:** `text-slate-500`

### **Components**
- **Cards:** `rounded-2xl shadow-sm border border-slate-200/80`
- **Buttons:** Consistent teal theme with hover states
- **Forms:** Unified focus states with teal accents
- **Charts:** 320px height standard for optimal fit

## 📱 Responsive Design

### **Breakpoints**
- **Mobile:** < 640px
- **Tablet:** 641px - 1023px
- **Desktop:** ≥ 1024px

### **Layout Behavior**
- **Mobile:** Overlay sidebar with bottom navigation
- **Tablet:** Fixed sidebar with reduced width
- **Desktop:** Collapsible sidebar with full functionality

## 🔧 Key Components

### **Sidebar Navigation**
- **Collapsible Design:** Toggle between expanded (240px) and collapsed (80px) states
- **Icon-Only Mode:** Shows tooltips when collapsed
- **Mobile Overlay:** Full-screen overlay on mobile devices
- **Active States:** Visual indicators for current page

### **StatCard Component**
- **Three Layouts:** Vertical, horizontal, and compact
- **Interactive:** Hover effects and animations
- **Flexible:** Supports icons, trends, and subtitles
- **Responsive:** Adapts to container size

### **Chart Components**
- **LineChartCard:** Time series data visualization
- **BarChartCard:** Comparative data display
- **DoughnutChartCard:** Proportional data representation
- **Consistent Styling:** Unified colors and interactions

## 🛠️ Recent Enhancements

### **Layout System**
- ✅ Fixed sidebar positioning and content area resizing
- ✅ Implemented smooth collapse/expand animations
- ✅ Resolved mobile overlay conflicts
- ✅ Added dynamic width calculations

### **Design Consistency**
- ✅ Unified all components to match electricity system styling
- ✅ Standardized KPI card layouts (horizontal for all sections)
- ✅ Reduced chart heights from 384px to 320px
- ✅ Centered navigation bars across all views

### **Component Improvements**
- ✅ Enhanced focus states with consistent teal theming
- ✅ Improved button styling and interactions
- ✅ Standardized form element appearances
- ✅ Optimized component spacing and proportions

## 📊 Data Management

### **Mock Data System**
The application uses a comprehensive mock data system defined in `constants.tsx`:
- **Realistic Data:** Based on actual facility management scenarios
- **Time Series:** Monthly data for trend analysis
- **Hierarchical:** Organized by zones, types, and categories
- **Comprehensive:** Covers all system types and metrics

### **Type Safety**
- **Full TypeScript:** Complete type coverage for all data structures
- **Interface Definitions:** Clear contracts for all components
- **Type Guards:** Runtime type checking for data integrity

## 🔐 Security & Performance

### **Security Features**
- **Environment Variables:** Secure API key management
- **Type Safety:** Prevents runtime errors and data corruption
- **Input Validation:** Form validation and sanitization

### **Performance Optimizations**
- **Code Splitting:** Dynamic imports for optimal loading
- **Memoization:** React.memo for expensive components
- **Efficient Re-renders:** Optimized state management
- **Asset Optimization:** Compressed images and icons

## 🎯 Browser Support

- **Chrome:** Latest 2 versions
- **Firefox:** Latest 2 versions
- **Safari:** Latest 2 versions
- **Edge:** Latest 2 versions

## 📝 Development Guidelines

### **Code Style**
- **ESLint:** Enforced code quality rules
- **Prettier:** Consistent code formatting
- **TypeScript:** Strict type checking enabled
- **Component Structure:** Functional components with hooks

### **Naming Conventions**
- **Components:** PascalCase (`StatCard.tsx`)
- **Functions:** camelCase (`handleClick`)
- **Constants:** UPPER_SNAKE_CASE (`NAV_ITEMS`)
- **Types:** PascalCase with descriptive names

### **Git Workflow**
- **Feature Branches:** Separate branches for new features
- **Commit Messages:** Conventional commit format
- **Code Review:** Required for all changes
- **Testing:** Build verification before merging

## 🚀 Deployment

The application is configured for deployment on:
- **Vercel** (recommended)
- **Netlify**
- **Static hosting services**

Build command: `npm run build`
Output directory: `dist/`

## 📞 Support & Contact

For technical support or feature requests:
- **GitHub Issues:** [Create an issue](repository-url/issues)
- **Documentation:** See inline code comments
- **Development Server:** Run on `http://localhost:5173`

---

**Built with ❤️ for Muscat Bay Facility Management**