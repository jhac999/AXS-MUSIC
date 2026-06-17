import os
import sys

def main():
    try:
        import librosa
        import librosa.display
        import matplotlib.pyplot as plt
        import numpy as np
    except ImportError:
        print("Required libraries are not installed. Run 'pip install librosa matplotlib numpy' first.")
        sys.exit(1)

    audio_path = r"F:\吉胡阿川\01lhjk\事业\AXS MUSIC STUDIO\AXS_Demand_WebForm\assets\audio\BGM.mp3"
    output_path = r"F:\吉胡阿川\01lhjk\事业\AXS MUSIC STUDIO\AXS_Demand_WebForm\assets\audio\BGM_Spectrogram.png"

    if not os.path.exists(audio_path):
        print(f"Error: Could not find audio file at {audio_path}")
        sys.exit(1)

    print("Loading audio file (this might take a few seconds)...")
    # Load the audio file
    y, sr = librosa.load(audio_path, sr=None)

    print("Calculating and plotting Mel-spectrogram...")
    plt.figure(figsize=(12, 6))

    # Calculate Mel-spectrogram
    S = librosa.feature.melspectrogram(y=y, sr=sr, n_mels=128)
    S_dB = librosa.power_to_db(S, ref=np.max)

    # Display the spectrogram
    librosa.display.specshow(S_dB, sr=sr, x_axis='time', y_axis='mel')
    plt.colorbar(format='%+2.0f dB')
    plt.title('Mel-frequency spectrogram of BGM.mp3')
    plt.tight_layout()

    # Save the figure
    plt.savefig(output_path, dpi=300)
    print(f"Success! Spectrogram saved to: {output_path}")

if __name__ == "__main__":
    main()
