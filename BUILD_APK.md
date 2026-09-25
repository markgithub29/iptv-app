# Building APK for Android

## Prerequisites

1. **Node.js** (v16+) and npm
2. **Java Development Kit (JDK)** 11 or 17
3. **Android SDK** (API level 31+)
4. **Android Studio** (for easier configuration)

## Steps to Build APK

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Web App
```bash
npm run build
```

### 3. Add Capacitor
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

### 4. Initialize Android Project
```bash
npx cap add android
npx cap sync android
```

### 5. Open Android Studio
```bash
npx cap open android
```

### 6. Build APK in Android Studio

1. In Android Studio, go to **Build** menu
2. Select **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. Wait for the build to complete
4. The APK will be generated at: `android/app/build/outputs/apk/debug/app-debug.apk`

### 7. For Release APK
```bash
cd android
./gradlew assembleRelease
```

The release APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

## Debugging

- Connect an Android device via USB (with Developer Mode enabled)
- Or use Android Studio's emulator
- Run: `npx cap run android`

## App Details

- **App ID**: com.streambox.iptv
- **App Name**: StreamBox IPTV
- **Minimum API Level**: 23 (Android 6.0)
- **Target API Level**: 34 (Android 14)

## Notes

- Ensure your Android device has minimum API level 23 (Android 6.0)
- For production, sign the APK with your keystore
- Only use authorized IPTV streams and content
