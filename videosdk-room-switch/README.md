



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

- Two rooms (A and B) are created via `POST https://api.videosdk.live/v2/rooms` when you click “Create Room A & B”.
- The app joins Room A using `MeetingProvider` from `@videosdk.live/react-sdk` with mic/webcam enabled.
- Normal switch: If `switchTo` is available from `useMeeting`, it is used to move to Room B while preserving the underlying connection. If not available, the app falls back to `leave()` then updates `MeetingProvider` to the new `meetingId` and continues.
- Media Relay: `requestMediaRelay({ destinationMeetingId, kinds: ["audio","video"] })` forwards your audio/video from Room A to Room B without leaving Room A. Use “Stop Relay” to end it.

### Limitations and Notes

- `switchTo` availability can vary by plan and SDK version; the sample includes a fallback to leave/join.
- Media Relay sends media to the other room but does not move your session; you will still be in Room A.
- Ensure the destination room exists/active before switching or starting relay.
- Network and device permissions can cause brief hiccups in A/V continuity.

### Files of Interest

- `src/App.jsx`: UI and logic to create rooms, join, switch, and start/stop media relay.














### Setuppppppppppppppppppppppppppppppppp

  take to local system by cloning or download the repo to your local system.
  cd to videosdk-room-switch> 
  then install package (npm install)
  create .env file and declare (VITE_VIDEOSDK_TOKEN='YOUR TOKEN')

  npm run dev

### How it works

give room_A and room_B id and click on "use this rooms" btn  then click on "join" btn --> you defalt connect to room_A 
now you can able to switch (for smoth switch),leave and relay

