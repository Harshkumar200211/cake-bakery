Here's the updated README file for your Cake Bakery project, including the admin panel credentials:

---

# Cake Bakery Project

This is a React Vite project for a cake bakery application. The project's data is stored on a JSON server.

## Table of Contents

- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Libraries Used](#libraries-used)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/Harshkumar200211/cake-bakery.git
cd cake-bakery
```

2. **Install dependencies:**

```bash
npm install
```

## Running the Project

The project needs to be run on two different URLs:

1. **Running the React application:**

```bash
npm run dev
```

2. **Running the JSON server:**

```bash
json-server --watch db.json --port 5000
```

Make sure both commands are running in separate terminal windows or tabs.

## Libraries Used

This project uses several libraries to enhance its functionality. Here is a list of some of the main libraries:

- **React Router DOM**: For handling routing in the application.
- **React Icons**: For including icons in the project.
- **Axios**: For making API requests to the JSON server.
- **Vite**: For fast development build.

To install these libraries, run:

```bash
npm install react-router-dom react-icons axios
```

## Project Structure

Here's an overview of the project's structure:

```
cake-bakery/
├── .github/
│   └── workflows/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .eslintrc.cjs
├── .gitignore
├── README.md
├── db.json
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Admin Panel Credentials

- **Username**: harsh@gmail.com
- **Password**: 1234

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

---

This README file should help users understand how to set up and run your project. Feel free to customize it further based on your project's specific needs.
