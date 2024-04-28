import { PersonalModal } from '@/types/personal/type'
import { OPEN_ANOTHER_SHADOW } from '../login/loginCss'
import ButtonPrimary from '@/util/ButtonPrimary'

const ServiceModal = ({ isOpen, onClose }: PersonalModal) => {
  if (!isOpen) return null

  const onCloseHandler = () => {
    onClose()
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center '>
      <div className='fixed inset-0 bg-primary-black opacity-70'></div>
      <div
        className={`fixed z-10 w-[500px] space-y-10 rounded-[33px]  rounded-xl border-opacity-10 bg-modal-black ${OPEN_ANOTHER_SHADOW} p-8 text-center `}
      >
        <div>
          <p>V-UP 이용가이드</p>
        </div>
        <div
          className='
          h-[400px] overflow-y-scroll'
        >
          <p>플레이어</p>
          <ul>
            <li>LP판 아래 좌측 버튼을 누르면 가사를 볼 수 있습니다</li>
            <li>LP판 우측 버튼은 마이플레이리스트 추가 버튼입니다</li>
            <li>반복과 셔플 기능을 이용할 수 있습니다.</li>
            <li>현재 재생목록 중 제목 클릭 시 해당 노래가 재생됩니다.</li>
            <li>음악 추가는 제목순으로 정렬됩니다.</li>
            <li>
              현재 재생목록 체크는 선택 삭제 및 마이플레이리스트 추가에만
              사용됩니다
            </li>
          </ul>
          <br />
          <p>커뮤니티</p>
          <ul>
            <li>
              작성자 또는 댓글 목록에 유저 이미지 클릭 시 해당 유저의
              마이페이지로 이동가능 합니다.
            </li>
            <li>
              게시글 내 음악 정보에 음표 버튼 클릭 시 현재 재생 목록에 추가,
              +버튼 시 마이 플레이 리스트에 추가 됩니다.
            </li>
            <li>
              게시글 등록 시 음악 검색은 영어 대문자 또는 소문자 하나를 넣고
              검색해주세요. ex. 검색창 → 검색어 : V(또는 v), 작성 후 검색 버튼
              클릭
            </li>
          </ul>
          <br />
          <p>마이페이지</p>
          <ul>
            <li>
              유저 썸네일 클릭 또는 마이페이지 팔로잉/팔로워 리스트에서 유저를
              선택하면 프로필로 이동할 수 있습니다.
            </li>
          </ul>
        </div>
        <div>
          <ButtonPrimary onClick={onCloseHandler}>
            <p>이용하러 가기</p>
          </ButtonPrimary>
        </div>
      </div>
    </div>
  )
}

export default ServiceModal
