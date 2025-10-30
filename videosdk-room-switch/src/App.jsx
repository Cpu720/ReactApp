import { useCallback, useState } from 'react'
import { MeetingProvider, useMeeting } from '@videosdk.live/react-sdk'
import './App.css'

const DEFAULT_KINDS = ['audio', 'video']

function Controls({ roomBId, token, onSwitched }) {
  const { join, leave, switchTo, requestMediaRelay, stopMediaRelay, meetingId, changeWebcam, changeMic } = useMeeting()

  const handleJoin = useCallback(() => {
    join()
  }, [join])

  const handleLeave = useCallback(() => {
    leave()
  }, [leave])

  const handleSwitch = useCallback(async () => {
    if (typeof switchTo === 'function') {
      await switchTo({ meetingId: roomBId, token })
      onSwitched?.(roomBId)
    } else {
      await leave()
      onSwitched?.(roomBId)
    }
  }, [switchTo, roomBId, token, leave, onSwitched])

  const handleStartRelay = useCallback(() => {
    if (typeof requestMediaRelay === 'function') {
      requestMediaRelay({ destinationMeetingId: roomBId, token, kinds: DEFAULT_KINDS })
    }
  }, [requestMediaRelay, roomBId, token])

  const handleStopRelay = useCallback(() => {
    if (typeof stopMediaRelay === 'function') {
      stopMediaRelay()
    }
  }, [stopMediaRelay])

  return (
    <div className="card" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <button onClick={handleJoin}>Join</button>
      <button onClick={handleLeave}>Leave</button>
      <button onClick={handleSwitch} disabled={!roomBId || !token}>Switch to Room B</button>
      <button onClick={() => changeWebcam()}>
        Toggle Cam
      </button>
      <button onClick={() => changeMic()}>
        Toggle Mic
      </button>
      <button onClick={handleStartRelay} disabled={!roomBId || !token}>Start Media Relay → B</button>
      <button onClick={handleStopRelay}>Stop Relay</button>
      <div style={{ fontSize: 12, opacity: 0.7 }}>Current Room: {meetingId}</div>
    </div>
  )
}

function MeetingShell({ meetingId, token, roomBId, onSwitched }) {
  return (
    <MeetingProvider
      config={{ meetingId, micEnabled: true, webcamEnabled: true, name: 'Participant', mode: 'CONFERENCE', multiStream: true, token }}
      token={token}
    >
      <Controls roomBId={roomBId} token={token} onSwitched={onSwitched} />
    </MeetingProvider>
  )
}

function App() {
  const [token, setToken] = useState(import.meta.env.VITE_VIDEOSDK_TOKEN || '')
  const [roomAId, setRoomAId] = useState('')
  const [roomBId, setRoomBId] = useState('')
  const [activeMeetingId, setActiveMeetingId] = useState('')
  const [manualA, setManualA] = useState('')
  const [manualB, setManualB] = useState('')
  const [errorMsg, setErrorMsg] = useState('')


  const handleUseManualRooms = useCallback(() => {
    if (!manualA || !manualB) {
      setErrorMsg('Please provide both Room A and Room B IDs.')
      return
    }
    setRoomAId(manualA.trim())
    setRoomBId(manualB.trim())
    setActiveMeetingId(manualA.trim())
    setErrorMsg('')
  }, [manualA, manualB])

  return (
    <div style={{ padding: 24 }}>
      <h2>VideoSDK Room Switch + Media Relay (React)</h2>
      {/* Create Room A & B button hidden as requested */}
      <div style={{ marginTop: 12, fontSize: 14 }}>
        Room A: <b>{roomAId || '-'}</b> &nbsp; | &nbsp; Room B: <b>{roomBId || '-'}</b>
      </div>
      {errorMsg ? (
        <div style={{ marginTop: 8, color: '#c00', fontSize: 13 }}>{errorMsg}</div>
      ) : null}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8, flexWrap: 'wrap' }}>
        <input
          style={{ padding: 8, minWidth: 240 }}
          placeholder="Enter existing Room A ID"
          value={manualA}
          onChange={(e) => setManualA(e.target.value)}
        />
        <input
          style={{ padding: 8, minWidth: 240 }}
          placeholder="Enter existing Room B ID"
          value={manualB}
          onChange={(e) => setManualB(e.target.value)}
        />
        <button onClick={handleUseManualRooms} disabled={!token}>Use These Rooms</button>
      </div>
      {activeMeetingId && token ? (
        <div style={{ marginTop: 16 }}>
          <MeetingShell meetingId={activeMeetingId} token={token} roomBId={roomBId} onSwitched={setActiveMeetingId} />
        </div>
      ) : (
        <div style={{ marginTop: 16, fontSize: 14, opacity: 0.8 }}>Provide token, create rooms (if permitted) or enter existing Room IDs, then Join.</div>
      )}
      <div style={{ marginTop: 24, fontSize: 12, opacity: 0.7 }}>
        Tip: Use Switch to Room B for normal switch. Use Start Media Relay to relay your A/V from Room A to Room B without switching.
      </div>
    </div>
  )
}

export default App
