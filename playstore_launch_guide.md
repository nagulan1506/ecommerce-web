# 🚀 Google Play Store Launch Guide: "பொம்மைக் கடை" (Bommai Kadai)

This guide outlines the step-by-step technical process of wrapping your MERN stack (Vite + React) web application into a premium Android App and launching it on the **Google Play Store**.

---

## 🛠️ Step 1: Wrap Vite + React Web App using Capacitor

Capacitor by Ionic is the modern, official way to wrap web apps into fully native mobile containers.

### 1. Install Capacitor dependencies
In your frontend directory (`c:\guvi\ecommerce web`), run the following commands:
```powershell
# Install Capacitor core & CLI
npm install @capacitor/core @capacitor/cli

# Initialize Capacitor project
npx cap init "பொம்மைக் கடை" "com.bommaikadai.app" --web-dir=dist
```
*Note: Set your bundle identifier to something unique like `com.bommaikadai.app`.*

### 2. Add Android Platform
Install the Android package and add it to your project:
```powershell
npm install @capacitor/android
npx cap add android
```

### 3. Build & Sync Frontend
Whenever you update your frontend code, run:
```powershell
# Build your React web application
npm run build

# Copy build assets into the Android native platform
npx cap sync
```

---

## 📱 Step 2: Open and Configure in Android Studio

1. Open the Android project in Android Studio:
   ```powershell
   npx cap open android
   ```
2. Android Studio will automatically perform a Gradle sync.
3. **Configure App Icons & Splash Screens:**
   - Use Android Studio's **Asset Studio** (Right-click `app` folder → `New` → `Image Asset`) to upload your logo `/public/bommai-kadai-logo.jpg` and generate responsive launcher icons.
4. **Setup Permissions:**
   Open `android/app/src/main/AndroidManifest.xml` and ensure Internet permission is enabled:
   ```xml
   <uses-permission android:name="android.permission.INTERNET" />
   ```

---

## 🔐 Step 3: Generate a Signed Release App Bundle (AAB)

Google Play Store requires a signed **Android App Bundle (.aab)** for publication.

1. In Android Studio, go to **Build** → **Generate Signed Bundle / APK...**
2. Select **Android App Bundle** and click Next.
3. Click **Create new...** under Key store path to generate a secure keystore file:
   - Save it as `bommai-kadai-keystore.jks`.
   - Set a strong password and fill in your details (Organization, Location, etc.).
   - *CRITICAL: Keep this file and password safe! You will need them for all future updates.*
4. Set Build Variant to **release** and signature type to **V1 & V2** (or default bundle signing).
5. Click **Finish**. Android Studio will generate the signed `.aab` file in `android/app/release/`.

---

## 🌐 Step 4: Create Google Play Console Developer Account

1. Go to the [Google Play Console](https://play.google.com/console/signup).
2. Sign in with your Google account.
3. Pay the **one-time developer registration fee of $25 USD**.
4. Complete your developer profile (public contact details, location, phone verification).

---

## 📤 Step 5: Create App and Upload Release

1. Click **Create App** in the Play Console dashboard.
2. Fill in the basic info:
   - **App Name:** பொம்மைக் கடை (Bommai Kadai)
   - **Default Language:** Tamil (or English)
   - **App or Game:** App
   - **Free or Paid:** Free
3. Navigate to **Testing** → **Closed Testing** (or **Production** if ready).
4. Create a new release and upload the signed `.aab` file from Step 3.
5. Set up the Store Presence details:
   - **Short Description:** Premium kids' toy shop in Chennai.
   - **Full Description:** Highlighting categories like Baby Toys, Cars, Bikes, Soft Toys, Brain Games, and Fancy Purses with secure UPI payment options.
   - **App Icon:** 512x512 PNG.
   - **Feature Graphic:** 1024x500 PNG.
   - **Screenshots:** Upload at least 2-4 screenshots of the home, category, and checkout pages.

---

## 🏁 Step 6: App Review & Approval

1. Review and complete the mandatory **App Content Questionnaire** (Target age range, Content rating, Privacy Policy URL).
2. Submit your release for review.
3. Google usually reviews new apps within **3-7 days**. Once approved, your app will be officially downloadable on the Google Play Store!
