---
title: Basic Usage
description: Learn how to use the react-audio-recorder-hook in your React components.
---

## Getting Started

The `react-audio-recorder-hook` provides a simple interface for recording audio in your React applications. Here's a basic example showing how to use the hook:

```jsx
import React from 'react';
import { useReactAudioRecorder } from 'react-audio-recorder-hook';

function AudioRecorder() {
  const {
    startRecording,
    stopRecording,
    audioResult,
    status,
    errorMessage
  } = useReactAudioRecorder();

  return (
    <div>
      <button 
        onClick={startRecording}
        disabled={status === 'recording'}
      >
        Start Recording
      </button>
      
      <button 
        onClick={stopRecording}
        disabled={status !== 'recording'}
      >
        Stop Recording
      </button>
      
      {status === 'recording' && <p>Recording in progress...</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
      
      {audioResult && (
        <div>
          <p>Recording Result:</p>
          <audio src={URL.createObjectURL(audioResult)} controls />
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
```

## Understanding the Example

In the example above:

1. We import the `useReactAudioRecorder` hook from the package.
2. We destructure the hook's return values: `startRecording`, `stopRecording`, `audioResult`, `status`, and `errorMessage`.
3. We create two buttons to start and stop recording, with appropriate disabled states.
4. We display the recording status when active.
5. We show any error messages that might occur.
6. When an audio recording is available (`audioResult`), we display an audio player element with the recorded audio.

## Managing Recording State

The hook automatically manages the recording state for you through the `status` value. This allows you to adapt your UI based on the current recording state:

- When `status` is `'idle'`, the recorder is ready to start
- When `status` is `'recording'`, a recording is in progress
- When `status` is `'stopped'`, a recording has finished and `audioResult` is available
- When `status` is `'error'`, an error occurred and `errorMessage` will contain details

## Next Steps

For more detailed information about all the values returned by the hook, check out the [API Reference](/api/hook-overview/) section. 