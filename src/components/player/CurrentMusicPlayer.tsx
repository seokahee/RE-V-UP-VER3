"use client";
import { getCurrentMusicList } from "@/shared/musicPlayer/api";
import { useStore } from "@/shared/store";
import { supabase } from "@/shared/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const CurrentMusicPlayer = () => {
  const [currentMusic, setCurrentMusic] = useState<any>();
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const { userInfo } = useStore();
  const { uid } = userInfo;

  console.log("uid", uid);
  const { data } = useQuery({
    queryFn: () => getCurrentMusicList(uid),
    queryKey: ["getCurrentMusicList"],
  });

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
        } else {
          setCurrentMusic([]);
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

        // 마이플레이 리스트 아이디 인덱스 가져오기
        .from("playlistMy")
        .select("myMusicIds")
        .eq("userId", uid);

      // 마플리가 있으면 마플리 인덱스에 체크된아이디와 같은게 있는지 확인
      if (playlistMy && playlistMy.length > 0) {
        const myMusicData = playlistMy.flatMap((item: any) => item.myMusicIds);
        const checkedMyMusicData = checkedList.some((musicId: string) =>
          myMusicData.includes(musicId)
        );

        if (checkedMyMusicData) {
          alert("마이플레이리스트에 이미 존재하는 노래입니다.");
          setCheckedList([]);
        } else {
          // 마플리에 아이디가 없으면 기존 마플리 배열에 새 배열의 인덱스를 넣어줌
          const updatedMyMusicIds = [...myMusicData, ...checkedList];
          const { data: myPlayList } = await supabase
            .from("playlistMy")
            .update({ myMusicIds: updatedMyMusicIds })
            .eq("userId", uid)
            .select();
          if (myPlayList) {
            alert("마이플레이리스트에 추가되었습니다");
            setCheckedList([]);
            console.log("AddmyPlayList", myPlayList);
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

  if (!currentMusic) {
    return;
  }
  return (
    <div>
      {currentMusic.length === 0 ? (
        <div>현재 재생 목록이 없습니다</div>
      ) : (
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
            // 볼륨 나중에 0.5로 변경할것!, 테스트중으로 자동 재생설정함
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
