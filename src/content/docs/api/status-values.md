---
title: Status Values
description: Detailed explanation of the different status values returned by the useReactAudioRecorder hook.
---

The `useReactAudioRecorder` hook returns a `status` property that indicates the current state of the audio recorder. Understanding these status values is important for building a responsive UI that adapts to the current recording state.

## Available Status Values

The `status` property can have the following values:

| Value | Description |
|-------|-------------|
| `'idle'` | Initial state, ready to start recording |
| `'recording'` | Currently recording audio |
| `'stopped'` | Recording has finished and audio is available |
| `'error'` | An error occurred during recording |

## Status Meanings

### `idle`

This is the initial state of the hook when your component first mounts. It indicates that the recorder is ready to start recording but is not actively recording.

**UI Considerations:**
- Show a "Start Recording" button
- Hide audio playback controls as no audio is available yet
- Hide any UI related to ongoing recordings

### `recording`

This state indicates that a recording is currently in progress. The hook is actively capturing audio from the user's microphone.

**UI Considerations:**
- Show a "Stop Recording" button
- Consider showing a recording indicator (e.g., a red dot or animated icon)
- Possibly show a timer to indicate how long the recording has been going
- Hide audio playback controls as the recording is not complete

### `stopped`

This state indicates that a recording has been completed and stopped. The `audioResult` property will now contain the recorded audio data.

**UI Considerations:**
- Show a "Start Recording" or "Record Again" button
- Display audio playback controls for the recorded audio
- Provide options to save, download, or use the recorded audio
- Possibly show the duration of the recorded audio

### `error`

This state indicates that an error occurred during the recording process. The `errorMessage` property will contain details about what went wrong.

**UI Considerations:**
- Show a "Try Again" button
- Display the error message to the user
- Consider providing guidance on how to resolve common issues (e.g., allowing microphone permissions)

## Example: UI Based on Status

Here's an example of how to adapt your UI based on the current `status` value:

```jsx
import React from 'react';
import { useReactAudioRecorder } from 'react-audio-recorder-hook';

function StatusBasedUI() {
  const {
    startRecording,
    stopRecording,
    audioResult,
    status,
    errorMessage
  } = useReactAudioRecorder();

  const renderControls = () => {
    switch (status) {
      case 'idle':
        return (
          <div>
            <p>Ready to record</p>
            <button onClick={startRecording}>Start Recording</button>
          </div>
        );
      
      case 'recording':
        return (
          <div>
            <p className="recording-indicator">Recording in progress...</p>
            <button onClick={stopRecording}>Stop Recording</button>
          </div>
        );
      
      case 'stopped':
        return (
          <div>
            <p>Recording complete!</p>
            <button onClick={startRecording}>Record Again</button>
            <div className="audio-player">
              <audio src={URL.createObjectURL(audioResult)} controls />
            </div>
          </div>
        );
      
      case 'error':
        return (
          <div>
            <p className="error-message">Error: {errorMessage}</p>
            <button onClick={startRecording}>Try Again</button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="audio-recorder">
      <h2>Audio Recorder</h2>
      {renderControls()}
    </div>
  );
}
```

## Status Transitions

The hook handles status transitions automatically:

1. Initial state is `'idle'`
2. After calling `startRecording()`, status changes to `'recording'`
3. After calling `stopRecording()`, status changes to `'stopped'`
4. If an error occurs at any point, status changes to `'error'`
5. Calling `startRecording()` again resets the status to `'recording'`

These transitions allow you to build intuitive UIs that respond appropriately to the current state of the audio recorder. 