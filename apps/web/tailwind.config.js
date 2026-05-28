/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f0f23',
        surface: '#1a1a3e',
        primary: '#00d4ff',
        secondary: '#ff6b35',
        success: '#00ff88',
        error: '#ff3366',
        'canvas-bg': '#0a0a1a',
        'text-primary': '#ffffff',
        'text-secondary': '#8888aa',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 212, 255, 0.5)',
        'glow-strong': '0 0 30px rgba(0, 212, 255, 0.7)',
      },
    },
  },
  plugins: [],
};
