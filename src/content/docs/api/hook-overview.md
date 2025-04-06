---
title: Hook Overview
description: Overview of the useReactAudioRecorder hook and its functionality.
---

## Hook Signature

The `useReactAudioRecorder` hook provides a simple interface for recording audio in React applications. Here's how you import and use the hook:

```jsx
import { useReactAudioRecorder } from 'react-audio-recorder-hook';

// Inside your component
const {
  startRecording,
  stopRecording,
  audioResult,
  status,
  errorMessage
} = useReactAudioRecorder();
```

## Hook Description

The `useReactAudioRecorder` hook offers a straightforward way to add audio recording capabilities to your React application. It handles all the complexity of browser audio APIs, providing you with a simple interface to start and stop recording, track recording status, and access the recorded audio.

Currently, the hook doesn't accept any configuration options or props. It works with the default browser settings for audio recording.

## Features

- Start and stop audio recording with simple function calls
- Automatically manages recording state internally
- Provides status updates about the current recording process
- Handles error cases and provides descriptive error messages
- Returns the recorded audio as a Blob object for easy playback or processing

## Compatibility

The hook relies on the browser's [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder), which is supported in all modern browsers. For optimal user experience, make sure to provide appropriate fallbacks or error messages in case the user's browser doesn't support audio recording.

## Basic Implementation

```jsx
function AudioRecorder() {
  const { startRecording, stopRecording, audioResult } = useReactAudioRecorder();

  return (
    <div>
      <button onClick={startRecording}>Record</button>
      <button onClick={stopRecording}>Stop</button>
      {audioResult && (
        <audio src={URL.createObjectURL(audioResult)} controls />
      )}
    </div>
  );
}
```

For detailed information about all the values returned by the hook, check the [Return Values](/api/return-values/) section. 