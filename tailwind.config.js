/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'outfit-thin': ['Outfit_100Thin'],
        'outfit-extralight': ['Outfit_200ExtraLight'],
        'outfit-light': ['Outfit_300Light'],
        'outfit-regular': ['Outfit_400Regular'],
        'outfit-medium': ['Outfit_500Medium'],
        'outfit-semibold': ['Outfit_600SemiBold'],
        'outfit-bold': ['Outfit_700Bold'],
        'outfit-extrabold': ['Outfit_800ExtraBold'],
        'outfit-black': ['Outfit_900Black'],
      },
    },
  },
  plugins: [],
}