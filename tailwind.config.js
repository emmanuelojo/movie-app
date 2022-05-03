module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "n-bg-pry": "#10141F",
        "n-bg-sec": "#161D2F",
        "n-bg-gray": "#555D71",
        "n-text-pry": "#A0A5AB",
        "n-text-sec": "#2A2E39",
        "n-text-black": "#1c1c1c",
        "n-purple": "#5B698F",
        "n-white": "#ffff",
        "n-modal": "rgba(0, 0, 0, 0.3)",
        "n-modal-shadow":
          "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.16)",
      },
      width: {
        75: "300px",
        97: "400px",
      },
      height: {
        90: "90vh",
        97: "400px",
      },
      gridTemplateColumns: {
        "auto-1fr": "auto 1fr",
        "three-1fr": "1fr 1fr 1fr",
        "1-10": "1fr 9fr",
      },
      padding: {
        1.5: "5px",
      },
    },
  },
  plugins: [],
};
