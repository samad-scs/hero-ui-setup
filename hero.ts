import { heroui } from '@heroui/theme'

export default heroui({
  themes: {
    light: {
      colors: {
        background: {
          DEFAULT: '#e8ebed', // --background
          foreground: '#333333' // --foreground
        },
        foreground: {
          DEFAULT: '#333333' // --foreground
        },
        primary: {
          DEFAULT: '#e05d38', // --primary
          foreground: '#ffffff' // --primary-foreground
        },
        secondary: {
          DEFAULT: '#f3f4f6', // --secondary
          foreground: '#4b5563' // --secondary-foreground
        },
        content1: {
          DEFAULT: '#ffffff', // --card
          foreground: '#333333' // --card-foreground
        },
        content2: {
          DEFAULT: '#ffffff', // --popover
          foreground: '#333333' // --popover-foreground
        },
        content3: {
          DEFAULT: '#f9fafb', // --muted
          foreground: '#6b7280' // --muted-foreground
        },
        content4: {
          DEFAULT: '#f4f5f7', // --input
          foreground: '#333333'
        },
        danger: {
          DEFAULT: '#ef4444', // --destructive
          foreground: '#ffffff' // --destructive-foreground
        },
        divider: {
          DEFAULT: '#dcdfe2' // --border
        },
        focus: {
          DEFAULT: '#e05d38' // --ring
        }
      }
    },
    dark: {
      colors: {
        background: {
          DEFAULT: '#1c2433', // --background
          foreground: '#e5e5e5' // --foreground
        },
        foreground: {
          DEFAULT: '#e5e5e5' // --foreground
        },
        primary: {
          DEFAULT: '#e05d38', // --primary
          foreground: '#ffffff' // --primary-foreground
        },
        secondary: {
          DEFAULT: '#2a303e', // --secondary
          foreground: '#e5e5e5' // --secondary-foreground
        },
        content1: {
          DEFAULT: '#2a3040', // --card
          foreground: '#e5e5e5' // --card-foreground
        },
        content2: {
          DEFAULT: '#262b38', // --popover
          foreground: '#e5e5e5' // --popover-foreground
        },
        content3: {
          DEFAULT: '#2a303e', // --muted
          foreground: '#a3a3a3' // --muted-foreground
        },
        content4: {
          DEFAULT: '#3d4354', // --input
          foreground: '#e5e5e5'
        },
        danger: {
          DEFAULT: '#ef4444', // --destructive
          foreground: '#ffffff' // --destructive-foreground
        },
        divider: {
          DEFAULT: '#3d4354' // --border
        },
        focus: {
          DEFAULT: '#e05d38' // --ring
        }
      }
    }
  }
})
