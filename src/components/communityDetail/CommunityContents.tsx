"use client";

import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { readCommunityDetail } from "@/shared/communitydetail/detailApi";
import { QUERY_KEY } from "@/query/communityDetail/communityQueryKey";
import { useParams } from "next/navigation";

const CommunityContents = () => {
  //   const router = useRouter();
  const url = useParams;
  console.log(url);
  const {
    data: readDetailData,
    isPending,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY.READ_COMMU_DETAIL],
    queryFn: readCommunityDetail,
  });

  console.log(readDetailData);
  if (isPending) {
    <div>정보를 가져오고 있습니다..로딩바자리임</div>;
  }
  return (
    <div>
      <div></div>
    </div>
  );
};

export default CommunityContents;
