---
title: Basic Example
description: A simple example of how to use the useReactAudioRecorder hook.
---

## Basic Audio Recorder Example

Here's a basic example of how to implement an audio recorder using the `useReactAudioRecorder` hook:

```jsx
import React from 'react';
import { useReactAudioRecorder } from 'react-audio-recorder-hook';

function BasicAudioRecorder() {
  const {
    startRecording,
    stopRecording,
    audioResult,
    status,
    errorMessage
  } = useReactAudioRecorder();

  return (
    <div className="audio-recorder">
      <h2>Simple Audio Recorder</h2>
      
      <div className="controls">
        <button 
          onClick={startRecording}
          disabled={status === 'recording'}
          className="record-button"
        >
          Start Recording
        </button>
        
        <button 
          onClick={stopRecording}
          disabled={status !== 'recording'}
          className="stop-button"
        >
          Stop Recording
        </button>
      </div>
      
      <div className="status">
        {status === 'recording' && (
          <p className="recording-status">Recording in progress...</p>
        )}
        
        {errorMessage && (
          <p className="error-message">Error: {errorMessage}</p>
        )}
      </div>
      
      {audioResult && (
        <div className="audio-player">
          <h3>Recording Result</h3>
          <audio src={URL.createObjectURL(audioResult)} controls />
        </div>
      )}
    </div>
  );
}

export default BasicAudioRecorder;
```

## How It Works

1. **Import the Hook**: First, we import the `useReactAudioRecorder` hook from the package.

2. **Initialize the Hook**: We call the hook at the top level of our component to get access to its functionality.

3. **Control Buttons**: We create buttons for starting and stopping the recording, with disabled states based on the current `status`.

4. **Status Display**: We show the current recording status when active and display any error messages.

5. **Audio Playback**: When a recording is available (`audioResult` is not null), we create an audio player using the HTML `<audio>` element and the `URL.createObjectURL()` function.

## Styling the Recorder (Optional CSS)

You can add styling to your audio recorder for a better user experience. Here's some example CSS you might use:

```css
.audio-recorder {
  font-family: Arial, sans-serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.record-button {
  background-color: #f44336;
  color: white;
}

.stop-button {
  background-color: #333;
  color: white;
}

.recording-status {
  color: #f44336;
  font-weight: bold;
  animation: blink 1s infinite;
}

.error-message {
  color: #f44336;
  background-color: #ffebee;
  padding: 10px;
  border-radius: 4px;
}

.audio-player {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
```

## Next Steps

This is a basic implementation that demonstrates the core functionality of the hook. For a more advanced example that handles different recording states, check out the [Status Handling](/examples/status-handling/) example. 