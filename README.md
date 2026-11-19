# Palmabeach app

Expo (React Native + Expo Router) app built from your template. Runs on iOS, Android and web.

## Run it
```bash
npm install --legacy-peer-deps
npx expo start          # press i / a / w, or scan the QR code with Expo Go
```

## Fill these in (the website doesn't publish them)
- `src/constants/competition.ts`: date, venue, entry fee, deadline (shown as "To be announced" until set) and the age bands per category.
- `src/constants/brand.ts`: real contact email, phone and address.
- `src/components/brand.tsx`: swap the icon tile for your real logo image.
- `src/data/content.ts`: services, About copy and announcements.

## Where registrations go
Entries are always saved on the device (My registrations). To also collect them centrally:
1. Create a Firebase project with Firestore, copy `.env.example` to `.env`, fill in the values.
2. Restart with `npx expo start --clear`.
3. Firestore rules, so the app can submit but nobody can read the data from the client:
```
match /registrations/{id} { allow create: if true; allow read, update, delete: if false; }
match /messages/{id}      { allow create: if true; allow read, update, delete: if false; }
```
Read entries from the Firebase console, or add an admin screen behind sign-in later.
Without Firebase, the Contact form opens the user's email app instead.

## Structure
`src/app` screens (tabs: Home, Compete, Services, More; Register button in the centre) ·
`src/components` shared UI · `src/constants` theme, brand, competition · `src/context` theme and registrations ·
`src/services` storage and Firestore · `src/lib` validation and helpers.
