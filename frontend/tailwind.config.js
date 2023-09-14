/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        offwhite:"#C0C0C0",
        primary:"#6f4685",
        ofWhite:"#F5F5F5",
        secondary:"#282C35",
        heading:"#6f4685",
        active:"#b284be",
        button:"#7851A9",
        lightBlack:"#282C35",
      },
      fontSize:{
        'sml': '20px',
      },
      margin: {
        '90':'364px',
        '97':'564px',
        '99' : '600px',
        '100' : '800px',
        '79' : '280px',
        '5':"5px",
        '101':'670px',
      },
      height:{
        '100':'1000px',
        "99":"500px",
      },
      width:{
        '100':'550px',
        "99":"500px",
        '101':'620px',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwindcss-animated'),
    require("daisyui")
  ]
  
}