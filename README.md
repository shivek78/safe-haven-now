# 🚀 WomenSafe

<div align="center">



[![GitHub stars](https://img.shields.io/github/stars/shivek78/women_safe?style=for-the-badge)](https://github.com/shivek78/women_safe/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/shivek78/women_safe?style=for-the-badge)](https://github.com/shivek78/women_safe/network)
[![GitHub issues](https://img.shields.io/github/issues/shivek78/women_safe?style=for-the-badge)](https://github.com/shivek78/women_safe/issues)
[![GitHub license](https://img.shields.io/github/license/shivek78/women_safe?style=for-the-badge)](LICENSE) 

**Empowering safety and security for women through a modern, reliable web application.**


</div>

## 📖 Overview

WomenSafe is a web application designed to enhance the safety and security of women. Leveraging a robust modern tech stack, it provides features aimed at creating a supportive digital environment. The application integrates seamlessly with Supabase for backend services, offering secure authentication and a reliable database infrastructure. Built with React and Vite, it delivers a fast, responsive, and intuitive user experience.

## ✨ Features

-   🎯 **Secure User Authentication**: Robust user registration, login, and session management powered by Supabase Auth.
-   🔒 **Personalized User Profiles**: Manage and update user-specific information.
-   ⚡ **Real-time Backend Integration**: Utilizes Supabase for efficient data handling and real-time capabilities.
-   📱 **Responsive and Modern UI**: Developed with React, Tailwind CSS, and Shadcn UI for a consistent and accessible experience across devices.
-   ⚙️ **Configurable Environment**: Easy management of API keys and other critical settings via environment variables.
-   🚀 **Fast Development Workflow**: Built with Vite for quick development server startups and optimized builds.

## 🖥️ Screenshots
<img width="876" height="753" alt="Screenshot 2025-12-26 224321" src="https://github.com/user-attachments/assets/ea85f89b-8d75-4821-a951-edfc55a029eb" />
<img width="905" height="588" alt="Screenshot 2025-12-26 224355" src="https://github.com/user-attachments/assets/da87a233-a8d7-41e4-b07e-833503cdbf23" />
<img width="936" height="758" alt="Screenshot 2025-12-26 224416" src="https://github.com/user-attachments/assets/546b38fb-d052-46a5-98df-19bf5ed15f5f" />
<img width="938" height="621" alt="Screenshot 2025-12-26 224432" src="https://github.com/user-attachments/assets/76b59ed9-b72a-4529-a142-08b37c179cf5" />

<img width="1218" height="923" alt="Screenshot 2025-12-26 224501" src="https://github.com/user-attachments/assets/443d07b5-bd60-451b-9730-517f94607068" />



## 🛠️ Tech Stack

**Frontend:**
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white)

**Backend & Database:**
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

**Tools:**
![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

## 🚀 Quick Start

Follow these steps to get a development environment up and running.

### Prerequisites

-   **Node.js**: `^18.x` or `^20.x` (LTS recommended)
-   **Bun**: `^1.x` (or npm `^8.x` / `^9.x`)
-   **Supabase Project**: You'll need a Supabase project with a configured database and authentication.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/shivek78/women_safe.git
    cd women_safe
    ```

2.  **Install dependencies**
    The project uses `bun` as the preferred package manager.
    ```bash
    bun install
    # If you prefer npm:
    # npm install
    ```

3.  **Environment setup**
    Create a `.env` file in the root directory and configure your Supabase credentials.
    ```bash
    cp .env .env.example # Use the existing .env if it's meant as an example
    # Then manually fill in your details:
    # VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    # VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```
    Configure your environment variables with values from your Supabase project settings:
    -   `VITE_SUPABASE_URL`: Your Supabase Project URL (e.g., `https://abcdefg1234.supabase.co`)
    -   `VITE_SUPABASE_ANON_KEY`: Your Supabase Public Anon Key

4.  **Start development server**
    ```bash
    bun run dev
    # If you used npm:
    # npm run dev
    ```

5.  **Open your browser**
    Visit `http://localhost:5173` (or the port indicated in your terminal).

## 📁 Project Structure

```
women_safe/
├── .env                  # Environment variables for configuration
├── .github/              # GitHub Actions workflows (if configured)
├── .gitignore            # Files/directories to ignore in Git
├── bun.lockb             # Bun dependency lockfile
├── components.json       # Shadcn UI components configuration
├── eslint.config.js      # ESLint configuration for code quality
├── index.html            # Main HTML entry point for the application
├── package-lock.json     # npm dependency lockfile (alternative to bun.lockb)
├── package.json          # Project metadata, scripts, and dependencies
├── postcss.config.js     # PostCSS configuration for styling
├── public/               # Static assets (images, fonts, etc.)
├── src/                  # Application source code
│   ├── assets/           # Static assets used within the app (e.g., images, icons)
│   ├── components/       # Reusable React components (often Shadcn UI based)
│   ├── lib/              # Utility functions, Supabase client setup, helpers
│   ├── pages/            # Main application pages/views
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Entry point for React application
│   └── index.css         # Global styles, Tailwind CSS imports
├── supabase/             # Supabase related configuration or schema (e.g., migrations)
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.app.json     # TypeScript configuration for the application
├── tsconfig.json         # Base TypeScript configuration
├── tsconfig.node.json    # TypeScript configuration for Node.js environment (e.g., Vite config)
└── vite.config.ts        # Vite build tool configuration
```

## ⚙️ Configuration

### Environment Variables

The application relies on environment variables for sensitive data and configuration. Create a `.env` file in the project root based on the `.env.example` (if present, otherwise create one) and populate it.

| Variable              | Description                             | Required |
| :-------------------- | :-------------------------------------- | :------- |
| `VITE_SUPABASE_URL`   | The URL of your Supabase project.       | Yes      |
| `VITE_SUPABASE_ANON_KEY` | The public "anon" key for your Supabase project. | Yes      |

### Configuration Files
-   `tailwind.config.ts`: Customize your Tailwind CSS theme, plugins, and utility classes.
-   `components.json`: Configure paths and other settings for Shadcn UI components.
-   `vite.config.ts`: Adjust build settings, proxies, and plugins for Vite.
-   `eslint.config.js`: Define linting rules and best practices for your codebase.

## 🔧 Development

### Available Scripts

In the `package.json` file, you'll find several scripts to streamline your development workflow:

| Command           | Description                                    |
| :---------------- | :--------------------------------------------- |
| `bun run dev`     | Starts the development server with hot-reloading. |
| `bun run build`   | Compiles the project for production deployment. |
| `bun run lint`    | Runs ESLint to check for code quality and style issues. |
| `bun run preview` | Serves the production build locally for testing. |

### Development Workflow

1.  Run `bun run dev` to start the development server.
2.  Make changes to your `src` files. Vite will automatically update the browser.
3.  Ensure your `.env` file is correctly configured for Supabase integration.
4.  Use `bun run lint` regularly to maintain code quality.

## 🧪 Testing

There are no explicit testing frameworks detected (e.g., Jest, Vitest, React Testing Library). Consider adding one for robust unit and integration testing.

```bash
# Example: If Vitest were installed
# bun run test
```

## 🚀 Deployment

### Production Build

To create a production-ready build of the application:

```bash
bun run build
# The optimized build output will be located in the 'dist' directory.
```

### Deployment Options

-   **Vercel / Netlify**: The `dist` folder can be directly deployed to static hosting services like Vercel or Netlify.
-   **Docker**: A `Dockerfile` could be added for containerized deployments.
-   **Traditional Hosting**: Upload the contents of the `dist` directory to any web server.

## 🤝 Contributing

We welcome contributions to WomenSafe! Please consider the following guidelines:

1.  **Fork the repository** and clone it to your local machine.
2.  **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name`.
3.  **Make your changes**, ensuring they adhere to the existing code style.
4.  **Test your changes** thoroughly.
5.  **Commit your changes** with a clear and descriptive message.
6.  **Push your branch** to your forked repository.
7.  **Open a Pull Request** to the `main` branch of the original repository.

## 📄 License

This project is currently without an explicit license file. <!-- TODO: Add actual license file (e.g., MIT, Apache 2.0) -->

## 🙏 Acknowledgments

-   **React** for the powerful frontend framework.
-   **Vite** for the blazing-fast development experience.
-   **Supabase** for providing a fantastic open-source backend solution.
-   **Tailwind CSS** and **Shadcn UI** for elegant and efficient styling.
-   **Bun** for being a fast all-in-one JavaScript runtime.

## 📞 Support & Contact

-   🐛 Issues: [GitHub Issues](https://github.com/shivek78/women_safe/issues)
-   📧 Contact: shivekyadav0786@gmail.com

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [shivek78](https://github.com/shivek78)

</div>
