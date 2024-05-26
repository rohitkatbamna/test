# Movie List App Setup

This guide will help you set up and run the Movie List App, a React Native application that displays top-rated movies and allows users to filter by genre and search for movies.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (>= 12.x)
- npm (>= 6.x)
- Expo CLI (>= 4.x)

You can install Expo CLI globally using npm:

```bash
npm install -g expo-cli
``` 

## Installation

Clone the repository:
```bash
git clone [<repository-url>](https://github.com/rohitkatbamna/test.git)
cd MovieListApp
```

## Install dependencies

```bash
npm install
```

## Running the App
Start the Expo development server:

```bash
npx expo start
```
## Run the app

-Scan the QR code displayed in your terminal or browser using the Expo Go app on your Android or iOS device.
-Alternatively, you can run the app on an emulator or simulator by selecting the appropriate option in the Expo CLI.

## Project Structure

```bash
/src
  /components
    GenreFilter.tsx
    MovieCard.tsx
    MovieList.tsx
  /screens
    HomeScreen.tsx
  /util
    fetchCall.ts
  /types
    index.ts
```
