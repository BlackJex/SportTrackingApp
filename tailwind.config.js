module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:
      {
        'light-green':
        {
          300: '#44ba9f',
          500: '#286d5d'
        },
        'light-gray':
        {
          500: '#f1f1f1'
        }
      },
      fontFamily: 
      {
        'poppins' : ['Poppins', 'sans-serif']
      },
      maxHeight:
      {
        32: '8rem'
      }
    },
  },
  plugins: [],
}
