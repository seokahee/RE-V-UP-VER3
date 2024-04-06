"use client";
import { useStore } from "@/shared/store";
import { supabase } from "@/shared/supabase/supabase";
import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const CurrentMusicPlayer = () => {
  const [currentMusic, setCurrentMusic] = useState<any>();
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [checkedList, setCheckedList] = useState<any>([]);
  const { userInfo } = useStore();
  const { uid } = userInfo;

  console.log("uid", uid);

  useEffect(() => {
    const getCurrentMusicList = async () => {
      const { data: currentMusic } = await supabase
        .from("playlistCurrent")
        .select("currentId,currentMusicIds,userInfo(userId)")
        .eq("userId", uid);

      if (currentMusic) {
        const musicIds = currentMusic.map((item) => {
          return item.currentMusicIds;
        });

        if (musicIds.length > 0) {
          const { data: musicInfo } = await supabase
            .from("musicInfo")
            .select("*")
            .in("musicId", musicIds)
            .order("musicTitle", { ascending: false });
          setCurrentMusic(musicInfo);
        }
      }
    };
    getCurrentMusicList();
  }, [uid]);

  const onPreviousHandler = () => {
    setCurrentTrackIndex(
      (prev) =>
        (prev - 1 + currentMusic.currentMusicIds.length) %
        currentMusic.currentMusicIds.length
    );
  };

  const onNextTrackHandler = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % currentMusic.length);
  };

  const onMusicCheckedHandler = (musicId: string) => {
    setCheckedList((prev: any) => {
      const isChecked = prev.includes(musicId);
      if (isChecked) {
        return prev.filter((item: any) => {
          item !== musicId;
        });
      } else {
        return [...prev, musicId];
      }
    });
  };

  const onDeleteCurrentMusicHandler = async () => {
    if (window.confirm("현재 재생 목록에서 선택 항목을 삭제하시겠습니까?")) {
      const currentMusicData = currentMusic
        .filter((music: any) => !checkedList.includes(music.musicId))
        .map((music: any) => music.musicId);

      const { error } = await supabase
        .from("playlistCurrent")
        .update({ currentMusicIds: currentMusicData })
        .eq("userId", uid);
      if (!error) {
        alert("재생 목록이 삭제되었습니다.");
        setCheckedList([]);
      }
    }
  };

  const onInsertMyPlayListHandler = async () => {
    if (window.confirm("선택한 곡을 마이플레이 리스트에 추가하시겠습니까?")) {
      const { data: playlistMy } = await supabase
        .from("playlistMy")
        .select("myMusicIds")
        .eq("userId", uid);

      console.log("playlistMy", playlistMy);

      if (playlistMy && playlistMy.length > 0) {
        const myMusicData = playlistMy.flatMap((item: any) => item.myMusicIds);

        const checkedMyMusicData = checkedList.some((musicId: string) =>
          myMusicData.includes(musicId)
        );

        if (checkedMyMusicData) {
          alert("마이플레이리스트에 이미 존재하는 노래입니다.");
        } else {
          const { data: myPlayList } = await supabase
            .from("playlistMy")
            .insert([{ userId: uid, myMusicIds: checkedList }])
            .select();
          if (myPlayList) {
            alert("마이플레이리스트에 추가되었습니다");
            setCheckedList([]);
          }
        }
      } else {
        const { data: myPlayList } = await supabase
          .from("playlistMy")
          .insert([{ userId: uid, myMusicIds: checkedList }])
          .select();
        if (myPlayList) {
          alert("마이플레이리스트에 추가되었습니다");
          setCheckedList([]);
        }
      }
    }
  };

  return (
    <div>
      {currentMusic && (
        <div>
          <div>
            <div>{currentMusic[currentTrackIndex].musicTitle}</div>
            <div>{currentMusic[currentTrackIndex].artist}</div>
            <img
              src={currentMusic[currentTrackIndex].thumbnail}
              alt="Album Thumbnail"
            />
            <div>{currentMusic[currentTrackIndex].lyrics}</div>
          </div>

          <AudioPlayer
            autoPlay
            loop={false}
            // 볼륨 나중에 0.5로 변경할것!
            volume={0.1}
            showSkipControls={true}
            onClickPrevious={onPreviousHandler}
            onClickNext={onNextTrackHandler}
            src={currentMusic[currentTrackIndex].musicSource}
            onEnded={onNextTrackHandler}
          />
          <div>
            {currentMusic?.map((item: any, index: number) => {
              return (
                <div key={item.musicId} className="flex gap-5">
                  <input
                    type="checkbox"
                    onChange={() => {
                      onMusicCheckedHandler(item.musicId);
                    }}
                    className="m-3"
                  />

                  <div
                    onClick={() => {
                      setCurrentTrackIndex(index);
                    }}
                  >
                    {item.musicTitle}
                  </div>
                </div>
              );
            })}
            <button className="m-3" onClick={onDeleteCurrentMusicHandler}>
              선택 삭제
            </button>
            <button onClick={onInsertMyPlayListHandler}>마플리 추가</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentMusicPlayer;

// [
//   "3bb9e4dd-1f54-402d-bf3e-ab5113073b76",
//   "34a0a9de-872a-43bf-ae89-6fd3972bd708",
//   "228f1039-81d1-4fbe-8e8a-06678c7af1ec",
//   "6796be10-36fc-428e-bdeb-603c3c813f91",
//   "60b6a116-6192-42ff-bcc4-6427b474d223",
//   "6f238369-472f-4c09-9105-3dcc21b1e099",
//   "b5e50b6b-36cd-4809-b881-0c3a781a3347"
// ]
