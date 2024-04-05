import { USER_ID, getCurrentMusicData, insertCurrentMusic, updateCurrentMusic } from "@/shared/main/api";
import { GenreMusicInfo } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const GenreMusicItem = ({ item }: { item: GenreMusicInfo }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: playListCurrent } = useQuery({
    queryFn: () => getCurrentMusicData(USER_ID),
    queryKey: ["playListCurrent"],
    enabled: !!USER_ID
  });

  const insertMutation = useMutation({
    mutationFn: insertCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playListCurrent"] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateCurrentMusic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playListCurrent"] });
    }
  });

  const onClickAddCurrentMusicHandler = (userId: string, musicId: string) => {
    if (userId === "") {
      alert("로그인 후 사용할 수 있는 서비스입니다. 로그인 페이지로 이동합니다.");
      router.replace("/login");
      return;
    }

    if (playListCurrent && playListCurrent.length > 0) {
      const currentList = playListCurrent[0].currentMusicIds;
      if (currentList.find((el) => el === musicId)) {
        alert("이미 추가된 노래입니다."); //이후에 삭제 예정
        return;
      }
      currentList.push(musicId);
      updateMutation.mutate({ userId, currentList });
    } else {
      insertMutation.mutate({ userId, musicId });
    }
    alert("현재 재생목록에 추가 되었습니다."); //이후에 삭제 예정
  };

  return (
    <li key={item.musicId} className="w-[136px] p-2 mr-6 list-none">
      <div className="relative w-[120px] h-[120px]">
        <figure>
          <Image src={item.thumbnail} width={120} height={120} alt={`${item.musicTitle} 앨범 썸네일`} />
        </figure>
        <button type="button" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" onClick={() => onClickAddCurrentMusicHandler(USER_ID, item.musicId)}>
          +
        </button>
      </div>
      <strong>{item.musicTitle}</strong>
      <span>{item.artist}</span>
      장르 : {item.genre}
    </li>
  );
};

export default GenreMusicItem;
