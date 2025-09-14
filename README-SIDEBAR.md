# 🏦 Bank Administrative Dashboard

A modern, responsive administrative dashboard built with React, TypeScript, and shadcn/ui for managing bank administrative documents and processes.

## ✨ Features

### 🎨 Modern UI Components
- **shadcn/ui Integration**: Professional, accessible UI components
- **Collapsible Sidebar**: Responsive navigation with modern design
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **Dark/Light Theme Support**: Built-in theme switching capabilities

### 📋 Document Management
- **Work Certificate Generator**: Create and manage employee work certificates
- **Daira Investigation Forms**: Administrative investigation forms with RTL Arabic support
- **Wilaya Investigation System**: Advanced investigation management with validation
- **Print-Ready Documents**: Optimized layouts for professional document printing

### 🌐 Multilingual Support
- **Arabic RTL Support**: Proper right-to-left text rendering
- **Custom Arabic Typography**: Professional Arabic fonts (Amiri, Cairo)
- **Bilingual Interface**: English interface with Arabic content support

### 🔧 Technical Features
- **TypeScript**: Full type safety and better developer experience
- **React Router**: Client-side routing with nested layouts
- **Form Validation**: Comprehensive form validation with error handling
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Accessibility**: WCAG compliant with keyboard navigation support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with JavaScript enabled

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd bank-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # shadcn/ui components
├── layouts/            # Layout components
│   ├── SidebarLayout.tsx  # Main sidebar layout
│   └── MainLayout.tsx     # Legacy layout (deprecated)
├── pages/              # Page components
│   ├── WorkCertificate.tsx
│   ├── DairaInvestigation.tsx
│   ├── WilayaInvestigation.tsx
│   └── Settings.tsx
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── styles/             # Global styles
└── lib/                # Utility functions
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones for professional banking appearance
- **Secondary**: Neutral grays for supporting elements
- **Success**: Green for positive actions and confirmations
- **Warning**: Orange for alerts and important information
- **Danger**: Red for errors and destructive actions

### Typography
- **English**: Inter font family for modern, readable interface
- **Arabic**: Amiri and Cairo fonts for authentic Arabic typography
- **Monospace**: For technical data and document numbers

### Components
All UI components are built using shadcn/ui and customized for the banking domain:
- Buttons with multiple variants
- Form inputs with validation states
- Navigation with active states
- Cards and containers with shadows
- Responsive tables and data grids

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints optimized for:
- **Mobile**: 320px - 768px (Collapsible sidebar, touch-optimized)
- **Tablet**: 768px - 1024px (Condensed sidebar, hybrid navigation)
- **Desktop**: 1024px+ (Full sidebar, multi-column layouts)

## 🔧 Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

### Adding New Components

1. Use shadcn/ui CLI to add new components:
```bash
npx shadcn@latest add <component-name>
```

2. Create page components in `src/pages/`
3. Add routes in `src/App.tsx`
4. Update navigation in `src/layouts/SidebarLayout.tsx`

### Customizing Styles

- Global styles: `src/index.css`
- Component-specific styles: `src/pages/ComponentName.css`
- Tailwind customization: `tailwind.config.js`
- CSS variables: Defined in `:root` for consistent theming

## 📋 Features in Detail

### Work Certificate System
- Dynamic form generation for employee certificates
- Position history tracking with date ranges
- Automatic experience calculation
- Print-optimized document layout
- Form validation and error handling

### Investigation Management
- **Daira Level**: Local administrative investigations
- **Wilaya Level**: Regional administrative investigations
- Employee data management with validation
- Arabic document generation with proper RTL layout
- Export capabilities for official documentation

### Administrative Features
- User profile management
- System settings and preferences
- Print optimization for official documents
- Form data persistence and validation
- Multi-step form workflows

## 🌍 Internationalization

The system supports:
- **Arabic (RTL)**: Primary language for official documents
- **English (LTR)**: Interface and technical elements
- **Mixed Content**: Seamless bilingual document generation

### Arabic Typography Features
- Proper Arabic letter connections
- Diacritics support for formal documents
- Professional fonts optimized for printing
- RTL table layouts and form structures

## 🔒 Accessibility

- **WCAG 2.1 AA Compliance**: Full accessibility support
- **Keyboard Navigation**: Complete keyboard-only operation
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **High Contrast Mode**: Support for high contrast displays
- **Focus Management**: Visible focus indicators and logical tab order

## 🖨️ Print Optimization

All documents are optimized for printing with:
- A4 page sizing and margins
- Print-specific CSS media queries
- Hidden navigation and interface elements
- Optimized fonts and spacing for clarity
- Professional document formatting

## 🚀 Performance

- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image and resource optimization
- **Lazy Loading**: Components loaded on demand
- **Caching**: Aggressive caching for static assets

## 🔧 Configuration

### Environment Variables
Create a `.env` file for environment-specific configuration:

```env
# API Configuration
VITE_API_BASE_URL=https://api.example.com

# Feature Flags
VITE_ENABLE_PRINT_MODE=true
VITE_ENABLE_EXPORT_PDF=true

# Theme Configuration
VITE_DEFAULT_THEME=light
```

### Tailwind Configuration
Customize the design system in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Custom color palette
      },
      fontFamily: {
        // Custom fonts
      }
    }
  }
}
```

## 📦 Dependencies

### Core Dependencies
- **React 18**: Modern React with concurrent features
- **TypeScript**: Type safety and developer experience
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first styling

### UI Components
- **shadcn/ui**: High-quality React components
- **Lucide React**: Beautiful, customizable icons
- **Radix UI**: Accessible, unstyled UI primitives

### Development Tools
- **Vite**: Fast build tool and development server
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing and optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes with proper TypeScript types
4. Test your changes thoroughly
5. Submit a pull request with detailed description

### Code Style Guidelines
- Use TypeScript for all new components
- Follow React hooks best practices
- Implement proper error boundaries
- Add proper ARIA labels for accessibility
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Review existing documentation
- Check the troubleshooting guide

---

**Built with ❤️ for modern banking administration**