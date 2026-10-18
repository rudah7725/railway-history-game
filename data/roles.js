/*
 * 게임 공통 정보와 역할 목록.
 * 화면 코드(js/app.js)는 이 데이터를 읽기만 한다. 문구를 고칠 때는 이 파일만 수정하면 된다.
 *
 * 주의: 아래 역할 설명은 역사 자료 조사 전에 쓴 초안용 가상 설정이다.
 * 논문·사료를 반영할 때 각 역할의 sources 배열에 실제 확인한 자료만 적는다.
 */
window.RAILWAY_DATA = {
  meta: {
    title: '철도는 누구에게 진보였을까?',
    subtitle: '19세기 영국, 철도가 놓이던 시절을 서로 다른 사람의 자리에서',
    intro: [
      '철도는 더 빠른 이동과 새로운 산업을 가져왔습니다.',
      '그런데 같은 철도가 모든 사람에게 같은 의미였을까요?',
      '한 사람의 자리에 서서 선택을 이어 가며 이 질문을 따라가 봅니다.'
    ],
    draftNotice: '역사 자료 조사 전의 가상 시나리오를 포함한 시연용 초안',
    draftDetail: '등장인물·장소·사건은 초안용 가상 설정이며, 아직 사료로 확인하지 않았습니다.'
  },

  roles: [
    {
      id: 'worker',
      name: '철도 건설 노동자',
      situation: '고향을 떠나 철도 공사 현장을 따라 옮겨 다니며 흙을 파고 나른다.',
      concern: '몸이 버틸 때 얼마나 벌 수 있을까? 공사가 끝나면 어디로 가야 할까?',
      playable: true,
      sources: []
    },
    {
      id: 'driver',
      name: '기관차 기관사',
      situation: '새 기술인 증기기관차를 모는 숙련 노동자. 승객과 화물을 책임진다.',
      concern: '긴 근무와 피로, 사고의 책임. 숙련에 걸맞은 대우를 받고 있을까?',
      playable: true,
      sources: []
    },
    {
      id: 'manager',
      name: '철도 회사 사업 책임자',
      situation: '투자자의 돈을 모아 노선을 계획하고 공사를 이끈다.',
      concern: '비용과 이윤, 땅 확보, 경쟁 노선. 투자자와 지역의 요구 사이에서 무엇을 택할까?',
      playable: false,
      sources: []
    },
    {
      id: 'factory',
      name: '지역 공장주',
      situation: '원료와 제품을 실어 나를 더 빠른 길을 찾고 있다.',
      concern: '철도가 우리 마을을 지나갈까? 새 시장이 열릴까, 더 큰 경쟁자가 들어올까?',
      playable: false,
      sources: []
    },
    {
      id: 'farmer',
      name: '노선 예정지의 농민',
      situation: '일구던 땅 한가운데로 노선이 지나갈 예정이라는 소식을 들었다.',
      concern: '땅과 생활은 어떻게 바뀔까? 농산물을 도시에 팔 기회가 될까?',
      playable: false,
      sources: []
    },
    {
      id: 'coach',
      name: '기존 마차 운송업자',
      situation: '역마차와 짐마차로 도시 사이를 오가며 생계를 꾸려 왔다.',
      concern: '철도와 맞설까, 역까지 잇는 짧은 운송으로 바꿀까?',
      playable: false,
      sources: []
    },
    {
      id: 'shop',
      name: '역 주변 상점 주인',
      situation: '새 역이 들어선다는 마을에서 작은 상점을 운영한다.',
      concern: '오가는 손님이 늘어날까, 바깥의 싼 물건과 큰 상점이 들어올까?',
      playable: false,
      sources: []
    }
  ],

  /* 역할별 시나리오는 data/scenarios/<역할 id>.js 파일이 여기에 등록한다. */
  scenarios: {}
};
