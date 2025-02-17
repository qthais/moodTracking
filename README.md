# MoodTracking

MoodTracking is a web application designed to help users track their daily moods using an interactive calendar and emoji-based mood selection. Built with Next.js, Tailwind CSS, and Firebase, it provides a seamless experience for mood logging and visualization.

## 🌟 Features
- 📅 **Mood Tracking Calendar** - Log and view your mood history on a monthly calendar.
- 😊 **Emoji-Based Mood Selection** - Choose from various moods to express your feelings.
- 📊 **Mood Analytics** - View average mood statistics over time.
- 🔐 **Firebase Authentication** - Sign in securely using email/password or Google authentication.
- 🎨 **Tailwind CSS Styling** - Aesthetic and responsive design.

## 🚀 Tech Stack
- [Next.js](https://nextjs.org/) - React framework for server-side rendering and static site generation.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
- [Firebase](https://firebase.google.com/) - Authentication, Firestore database, and hosting.

## 🔧 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/moodtracking.git
   cd moodtracking
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Firebase:**
   - Create a Firebase project on [Firebase Console](https://console.firebase.google.com/).
   - Enable Authentication (Email/Password & Google Sign-In).
   - Create a Firestore database.
   - Get your Firebase config keys and add them to a `.env.local` file:
   
   ```ini
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📸 Screenshots
**Login Page**
    <div style="width: 100%; height: 0; padding-bottom: 56.25%; position: relative;">
    <img src="https://drive.google.com/uc?export=view&id=1iTa0w_Vm_XxPzNAaTOKQEfYFca01TnV6" alt="Image" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
    </div>
**DashBoard**
    <div style="width: 100%; height: 0; padding-bottom: 56.25%; position: relative;">
    <img src="https://drive.google.com/uc?export=view&id=1t45jT7XO--8CxrQq8mXtVLqEtBUpU7tf" alt="Image" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
    </div>

## 📌 Deployment
The application is deployed on [Netlify](https://moodtracking.netlify.app/). For manual deployment:

```bash
npm run build
netlify deploy
```

## 🤝 Contributing
We welcome contributions! Follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit changes (`git commit -m 'Add new feature'`).
4. Push the branch (`git push origin feature-branch`).
5. Open a pull request.

## 📜 License
This project is licensed under the MIT License.

## 📬 Contact
For any queries, reach out via [thaiallb63@gmail.com](thaiallb63@gmail.com).

