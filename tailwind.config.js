/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './component/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    
  ],
  theme: {
    extend: {
      shadow :{
        'custom' : '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        'custom2':'0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)',
        'custom3':'0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)',
      },
    },
  plugins: [],
  },
  
}
