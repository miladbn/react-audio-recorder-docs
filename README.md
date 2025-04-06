# react-audio-recorder-hook

[![npm version](https://img.shields.io/npm/v/react-audio-recorder-hook.svg)](https://www.npmjs.com/package/react-audio-recorder-hook)
[![npm downloads](https://img.shields.io/npm/dm/react-audio-recorder-hook.svg)](https://www.npmjs.com/package/react-audio-recorder-hook)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/github/workflow/status/miladbn/react-audio-recorder-hook/CI)](https://github.com/miladbn/react-audio-recorder-hook/actions)

A simple and lightweight React hook for recording audio in web applications. This hook provides an easy-to-use interface for capturing audio from the user's microphone, with built-in status tracking and error handling.

## Features

- 🎤 Simple and intuitive API
- 🔄 Real-time recording status tracking
- 🚫 Built-in error handling
- 📦 Zero dependencies
- 🔌 TypeScript support
- 🎯 Works with all modern browsers

## Installation

```bash
# Using npm
npm install react-audio-recorder-hook

# Using yarn
yarn add react-audio-recorder-hook
```

## Basic Usage

Here's a simple example of how to use the hook in your React component:

```jsx
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
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      
      {status === 'recording' && <p>Recording in progress...</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
      
      {audioResult && (
        <audio src={URL.createObjectURL(audioResult)} controls />
      )}
    </div>
  );
}
```

## API Reference

### Hook Signature

```typescript
const {
  startRecording,
  stopRecording,
  audioResult,
  status,
  errorMessage
} = useReactAudioRecorder();
```

### Return Values

| Property | Type | Description |
|----------|------|-------------|
| `startRecording` | `() => void` | Function to start the audio recording |
| `stopRecording` | `() => void` | Function to stop the audio recording |
| `audioResult` | `Blob \| null` | The recorded audio as a Blob object, or null if no recording is available |
| `status` | `'idle' \| 'recording' \| 'stopped' \| 'error'` | Current status of the recording |
| `errorMessage` | `string \| null` | Error message if something went wrong, null otherwise |

### Props/Options

The hook currently doesn't accept any configuration options.

## Status Meanings

The `status` property can have the following values:

- `'idle'`: Initial state, ready to start recording
- `'recording'`: Currently recording audio
- `'stopped'`: Recording has been stopped and audio is available
- `'error'`: An error occurred during recording

## Example (Handling Status)

Here's a more comprehensive example showing how to handle different recording states:

```jsx
import { useReactAudioRecorder } from 'react-audio-recorder-hook';

function AudioRecorder() {
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
        return <button onClick={startRecording}>Start Recording</button>;
      case 'recording':
        return <button onClick={stopRecording}>Stop Recording</button>;
      case 'stopped':
        return (
          <div>
            <button onClick={startRecording}>Record Again</button>
            <audio src={URL.createObjectURL(audioResult)} controls />
          </div>
        );
      case 'error':
        return (
          <div>
            <p>Error: {errorMessage}</p>
            <button onClick={startRecording}>Try Again</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderControls()}
    </div>
  );
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/miladbn/react-audio-recorder-hook/blob/main/LICENSE) file for details.
