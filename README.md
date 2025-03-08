# Task Management Application 📝 (Tasker)

A modern task management application built with React Native (Expo) and Node.js.

## 🌟 Features

- **Cross-platform Support**: Run on Android, iOS, and Web platforms
- **File-based Routing**: Easy navigation with Expo Router
- **Task Management**: Create, update, and delete tasks
- **Audio Support**: Built-in sound playback functionality
- **Modern UI Components**: Using React Native Paper and custom themed components

## Preview

[Tasker in action.webm](https://github.com/user-attachments/assets/cedcdc76-e257-420d-b4eb-530415ff649a)

## 🛠️ Technology Stack

### Frontend
- React Native with Expo
- Expo Router for navigation
- React Native Paper for UI components
- Axios for API calls
- Expo AV for audio handling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- CORS enabled

## 🚀 Getting Started

### Prerequisites
- Node.js
- npm or yarn
- MongoDB (for backend)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
```

2. **Backend Setup**
```bash
cd Backend
npm install
npm run dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npx expo start
```

## 📱 Running the App

- Press `a` to run on Android emulator
- Press `i` to run on iOS simulator
- Press `w` to run in web browser

or

You can directly paste blow link in your Expo Go application

```
 exp://u.expo.dev/81e8e14f-8ee6-463c-85b6-87bddefcb03a/group/ec09c218-6c77-4f13-a509-21d11a11f1a8
```

## 🔑 Environment Variables

Create a `.env` file in the Backend directory:

```plaintext
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

and change your api url to localhost accordingly in the frontend I've kept it on the deployed URL for now

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) for details.

## 👨‍💻 Author

Abhay Pratap Singh

---

*Built using Expo and Node.js*
