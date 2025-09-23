# Welcome to the Translation Project

## Project Overview

This project is designed to demonstrate internationalization (i18n) in a TypeScript application. It allows users to switch between Portuguese (Brazil) and English languages seamlessly.

## Project Structure

```
translation-project
├── src
│   ├── app.ts
│   ├── locales
│   │   ├── en
│   │   │   └── translations.json
│   │   └── pt-BR
│   │       └── translations.json
│   ├── config
│   │   └── i18n.ts
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone <YOUR_GIT_URL>
   ```

2. Navigate to the project directory:
   ```sh
   cd translation-project
   ```

3. Install the necessary dependencies:
   ```sh
   npm install
   ```

4. Start the application:
   ```sh
   npm run dev
   ```

## Usage

Once the application is running, you can switch between languages by selecting your preferred language option in the user interface. The translations will be loaded dynamically based on the selected language.

## Technologies Used

- TypeScript
- Express (or any other server framework)
- i18n library for internationalization

## Contributing

Feel free to submit issues or pull requests if you have suggestions for improvements or new features!