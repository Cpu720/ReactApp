### Demo Actions

- Join Room A
- Switch to Room B (normal switch)
- Start/Stop Media Relay from Room A to Room B


### Setup

All action perform in "videosdk-room-switch" directory

1. Install dependencies:

```bash
npm install
```

2. Provide your VideoSDK token either via environment or UI:

- Preferred: create a `.env` file at repo root and set:

```bash
VITE_VIDEOSDK_TOKEN=YOUR_TOKEN
```

3. Run the app:

```bash
npm run dev
```

Open the URL shown in the terminal.

### How it works

- in Videosdk when you create room you got room id, so crete Room_id_A & Room_id_B and paste both room id in input field.
- The app joins Room A using `MeetingProvider` from `@videosdk.live/react-sdk` with mic/webcam enabled.
- Normal switch: If `switchTo` is available from `useMeeting`, it is used to move to Room B while preserving the underlying connection. If not available, the app falls back to `leave()` then updates `MeetingProvider` to the new `meetingId` and continues.
- Media Relay: `requestMediaRelay({ destinationMeetingId, kinds: ["audio","video"] })` forwards your audio/video from Room A to Room B without leaving Room A. Use “Stop Relay” to end it.

### Limitations and Notes

- `switchTo` availability can vary by plan and SDK version; the sample includes a fallback to leave/join.
- Media Relay sends media to the other room but does not move your session; you will still be in Room A.
- Ensure the destination room exists/active before switching or starting relay.
- Network and device permissions can cause brief hiccups in A/V continuity.


