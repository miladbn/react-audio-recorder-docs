---
title: Status Handling Example
description: A more comprehensive example showing how to handle different recording states.
---

## Advanced Audio Recorder with Status Handling

This example demonstrates a more comprehensive implementation of the audio recorder that adapts its UI based on the current recording status. It includes:

- Different UI states for each recording status
- A recording timer
- Download functionality for recorded audio
- Better error handling

```jsx
import React, { useState, useEffect } from 'react';
import { useReactAudioRecorder } from 'react-audio-recorder-hook';

function AdvancedAudioRecorder() {
  const {
    startRecording,
    stopRecording,
    audioResult,
    status,
    errorMessage
  } = useReactAudioRecorder();
  
  const [recordingTime, setRecordingTime] = useState(0);
  const [timerId, setTimerId] = useState(null);

  // Start/stop the timer based on recording status
  useEffect(() => {
    if (status === 'recording') {
      // Start the timer
      setRecordingTime(0);
      const id = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);
      setTimerId(id);
    } else {
      // Stop the timer
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }
    }
    
    // Clean up on unmount
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [status]);

  // Format seconds as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Handle downloading the recorded audio
  const handleDownload = () => {
    if (!audioResult) return;
    
    const url = URL.createObjectURL(audioResult);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recording-${new Date().toISOString()}.webm`;
    a.click();
  };

  // Render different UI based on status
  const renderContent = () => {
    switch (status) {
      case 'idle':
        return (
          <div className="recorder-idle">
            <p>Ready to record audio</p>
            <button 
              onClick={startRecording}
              className="start-button"
            >
              Start Recording
            </button>
          </div>
        );
      
      case 'recording':
        return (
          <div className="recorder-active">
            <div className="recording-indicator">
              <div className="recording-dot"></div>
              <span>Recording...</span>
            </div>
            
            <div className="timer">{formatTime(recordingTime)}</div>
            
            <button 
              onClick={stopRecording}
              className="stop-button"
            >
              Stop Recording
            </button>
          </div>
        );
      
      case 'stopped':
        return (
          <div className="recorder-complete">
            <div className="recording-result">
              <h3>Recording Complete</h3>
              <p>Your audio is ready to play or download</p>
              
              <div className="audio-player">
                <audio src={URL.createObjectURL(audioResult)} controls />
              </div>
              
              <div className="action-buttons">
                <button onClick={handleDownload} className="download-button">
                  Download Recording
                </button>
                <button onClick={startRecording} className="reset-button">
                  Record Again
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'error':
        return (
          <div className="recorder-error">
            <div className="error-container">
              <h3>Recording Error</h3>
              <p className="error-message">{errorMessage}</p>
              <div className="help-text">
                <p>Common solutions:</p>
                <ul>
                  <li>Allow microphone access in your browser</li>
                  <li>Make sure another application isn't using your microphone</li>
                  <li>Try using a different browser</li>
                </ul>
              </div>
              <button onClick={startRecording} className="retry-button">
                Try Again
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="advanced-audio-recorder">
      <h2>Advanced Audio Recorder</h2>
      <div className="recorder-container">
        {renderContent()}
      </div>
    </div>
  );
}

export default AdvancedAudioRecorder;
```

## CSS for the Advanced Recorder

Here's some CSS to style the advanced recorder:

```css
.advanced-audio-recorder {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.recorder-container {
  min-height: 200px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Idle State */
.start-button {
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
}

/* Recording State */
.recorder-active {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.recording-indicator {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.recording-dot {
  width: 12px;
  height: 12px;
  background-color: #f44336;
  border-radius: 50%;
  margin-right: 10px;
  animation: blink 1s infinite;
}

.timer {
  font-size: 32px;
  font-weight: bold;
  margin: 15px 0;
  font-family: monospace;
}

.stop-button {
  background-color: #f44336;
  color: white;
}

/* Completed State */
.recorder-complete {
  text-align: center;
}

.audio-player {
  margin: 20px 0;
}

.audio-player audio {
  width: 100%;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.download-button {
  background-color: #2196F3;
  color: white;
}

.reset-button {
  background-color: #9E9E9E;
  color: white;
}

/* Error State */
.recorder-error {
  color: #d32f2f;
  text-align: center;
}

.error-container {
  background-color: #ffebee;
  border-radius: 5px;
  padding: 20px;
}

.error-message {
  font-weight: bold;
  margin-bottom: 15px;
}

.help-text {
  text-align: left;
  color: #555;
  margin: 15px 0;
}

.retry-button {
  background-color: #ff9800;
  color: white;
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
}
```

## Key Features

1. **Status-Based UI**: The component renders completely different UIs based on the current status (idle, recording, stopped, error).

2. **Recording Timer**: Uses `useState` and `useEffect` to implement a timer that tracks the recording duration.

3. **Download Functionality**: Provides a way for users to download their recordings.

4. **Enhanced Error Handling**: When an error occurs, the component displays helpful troubleshooting suggestions.

5. **Better Visual Feedback**: Uses animations and color coding to make the recording state clear to the user.

## Integration

This example can be integrated into a larger application or used as a standalone component. The component is self-contained and manages all its internal state, making it easy to drop into any React application.

:::tip
For production use, consider adding additional features such as:
- Ability to pause/resume recording
- Audio format selection
- Audio visualization (waveform)
- Audio trimming or basic editing
:::

For more information on the hook's API, check the [API Reference](/api/hook-overview/) section. 