---
title: Return Values
description: Detailed information about all values returned by the useReactAudioRecorder hook.
---

The `useReactAudioRecorder` hook returns an object with several properties and methods. This page details each of these return values and how to use them effectively.

## Return Object

```typescript
const {
  startRecording,
  stopRecording,
  audioResult,
  status,
  errorMessage
} = useReactAudioRecorder();
```

## Methods

### `startRecording()`

Function to initiate audio recording.

**Type:** `() => void`

**Usage:**
```jsx
<button onClick={startRecording}>Start Recording</button>
```

**Behavior:**
- Requests microphone access from the user if not already granted
- Updates `status` to `'recording'` when recording starts
- Sets `errorMessage` if there's an issue starting the recording

### `stopRecording()`

Function to stop the current audio recording.

**Type:** `() => void`

**Usage:**
```jsx
<button onClick={stopRecording}>Stop Recording</button>
```

**Behavior:**
- Stops the current recording session
- Updates `status` to `'stopped'`
- Populates `audioResult` with the recorded audio data as a Blob
- Has no effect if called when not recording

## Properties

### `audioResult`

The recorded audio data, available after stopping a recording.

**Type:** `Blob | null`

**Default:** `null`

**Usage:**
```jsx
{audioResult && (
  <audio src={URL.createObjectURL(audioResult)} controls />
)}
```

**Notes:**
- Is `null` initially and until a recording is completed
- After `stopRecording()` is called, contains the recorded audio as a Blob object
- Can be used with `URL.createObjectURL()` to create a playable audio source
- The Blob's MIME type is typically `'audio/webm'` but may vary depending on browser support

### `status`

Indicates the current state of the audio recorder.

**Type:** `'idle' | 'recording' | 'stopped' | 'error'`

**Default:** `'idle'`

**Usage:**
```jsx
{status === 'recording' && <p>Recording in progress...</p>}
```

For detailed information about each status value, see the [Status Values](/api/status-values/) section.

### `errorMessage`

Contains error information if something goes wrong during recording.

**Type:** `string | null`

**Default:** `null`

**Usage:**
```jsx
{errorMessage && <p>Error: {errorMessage}</p>}
```

**Possible Errors:**
- Permission denied for microphone access
- MediaRecorder API not supported by the browser
- Unexpected errors during recording or stopping

## Example

Here's an example showing how to use all the return values:

```jsx
import React from 'react';
import { useReactAudioRecorder } from 'react-audio-recorder-hook';

function CompleteExample() {
  const {
    startRecording,
    stopRecording,
    audioResult,
    status,
    errorMessage
  } = useReactAudioRecorder();

  return (
    <div>
      <h2>Audio Recorder</h2>
      
      <div>
        <button 
          onClick={startRecording}
          disabled={status === 'recording'}
        >
          Start
        </button>
        
        <button 
          onClick={stopRecording}
          disabled={status !== 'recording'}
        >
          Stop
        </button>
      </div>
      
      <div>
        <p>Status: {status}</p>
        {errorMessage && <p className="error">Error: {errorMessage}</p>}
      </div>
      
      {audioResult && (
        <div>
          <h3>Recording Preview</h3>
          <audio src={URL.createObjectURL(audioResult)} controls />
          <button onClick={() => {
            // Example of downloading the recorded audio
            const url = URL.createObjectURL(audioResult);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'recording.webm';
            a.click();
          }}>
            Download Recording
          </button>
        </div>
      )}
    </div>
  );
} 