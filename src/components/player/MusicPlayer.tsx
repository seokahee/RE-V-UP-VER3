"use client";
import { supabase } from "@/shared/supabase/supabase";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const MusicPlayer = () => {
  const [musicState, setMusicState] = useState<any>("");
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  useEffect(() => {
    const getMusicData = async () => {
      const { data } = await supabase
        .from("musicInfo")
        .select("*")
        .order("musicTitle", { ascending: false });

      setMusicState(data);
    };
    getMusicData();
  }, []);
  // console.log("musicState", musicState[0].musicSource);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % musicState.length);
  };

  return (
    <div suppressHydrationWarning>
      <ReactPlayer
        url={
          musicState.length > 0 ? musicState[currentTrackIndex].musicSource : ""
        }
        controls={true}
        playing={true}
        loop={false}
        light={true}
        volume={0.5}
        onEnded={nextTrack}
      />
    </div>
  );
};

export default MusicPlayer;
