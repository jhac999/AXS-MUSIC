import os
import sys

def main():
    try:
        import librosa
        import numpy as np
    except ImportError:
        print("Missing libraries")
        sys.exit(1)

    audio_path = r"F:\吉胡阿川\01lhjk\事业\AXS MUSIC STUDIO\AXS_Demand_WebForm\assets\audio\BGM.mp3"
    
    if not os.path.exists(audio_path):
        print("Error: File not found")
        sys.exit(1)

    print("Analyzing audio features...")
    y, sr = librosa.load(audio_path, sr=22050)
    
    # Calculate BPM
    onset_env = librosa.onset.onset_strength(y=y, sr=sr)
    tempo, _ = librosa.beat.beat_track(onset_envelope=onset_env, sr=sr)
    
    # Calculate spectral centroid (brightness of sound)
    cent = librosa.feature.spectral_centroid(y=y, sr=sr)
    avg_cent = np.mean(cent)
    
    # Calculate zero crossing rate (noisiness/percussion)
    zcr = librosa.feature.zero_crossing_rate(y)
    avg_zcr = np.mean(zcr)

    # Estimate duration
    duration = librosa.get_duration(y=y, sr=sr)

    print("--- REAL ANALYSIS RESULTS ---")
    # Handle single element array for tempo safely
    bpm_val = float(tempo[0]) if isinstance(tempo, (np.ndarray, list)) else float(tempo)
    print(f"Estimated Tempo (BPM): {bpm_val:.2f}")
    print(f"Duration: {duration:.2f} seconds")
    print(f"Spectral Centroid (Brightness, higher = brighter/harsher): {avg_cent:.2f} Hz")
    print(f"Zero Crossing Rate (Percussiveness/Noise): {avg_zcr:.4f}")
    
    # If Centroid > 2500 -> Lots of high frequencies/EDM/Rock
    # If ZCR > 0.1 -> Very percussive or noisy

if __name__ == "__main__":
    main()
