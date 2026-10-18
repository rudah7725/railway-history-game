/* 가상 체험용 시나리오. 인과관계는 게임 설정이며 사료로 검증되지 않았습니다. */
window.RAILWAY_DATA.scenarios.worker = {
  roleId: 'worker', character: '톰 · 가상 인물',
  setting: '1840년대 무렵, 잉글랜드 북부의 가상 철도 공사장',
  scenes: [
    {id:'arrival', title:'일자리를 찾다', time:'첫날 · 낮', goal:'주변을 살펴보고, 작업 장소 한 곳에서 일을 시작하세요.', researchNotes:['작업조 모집과 숙련의 진입 조건은 어떠했는가?','굴착·제방·석공 보조의 작업 조건은 지역과 시기별로 어떻게 달랐는가?'], sources:[]},
    {id:'trouble', title:'멈춰 선 작업', time:'몇 주 뒤 · 저녁 무렵', goal:'문제가 생긴 작업장과 사람들을 살펴보고, 대응을 결정하세요.', researchNotes:['작업 중 위험을 알리거나 작업을 멈춘 실제 사례는?','하청과 감독 체계에서 노동자의 협상 여지는?'], sources:[]},
    {id:'opening', title:'철길은 남고, 일은 끝난다', time:'공사 막바지 · 다시 아침', goal:'사람들에게 다음 일자리 이야기를 듣고, 앞으로 갈 길을 고르세요.', researchNotes:['건설 노동자가 완공 후 이동한 일자리의 실제 사례는?','보수 인력 채용과 노동자 상호부조 관계를 보여 주는 자료는?'], sources:[]}
  ],
  jobs: {
    tunnel:{name:'터널 굴착조', inspect:'굴 안은 축축하고 어둡다. 천장을 받치는 나무 사이로 흙가루가 떨어진다.', offer:'감독은 당장 굴착조에 사람이 필요하다고 한다.', gain:'바로 작업조에 합류한다.', burden:'어둡고 좁은 곳에서 몸을 많이 쓴다.', problem:'버팀목이 흔들린다. 동료가 손을 들어 작업을 멈춘다.', evidence:'흙가루가 떨어지는 버팀목', repair:'새 버팀목을 세우는 동안 굴착을 멈췄다.', result:'등불을 들고 굴로 들어갔다. 첫날 일이 끝나자 어깨가 무겁다.'},
    embankment:{name:'제방 운반조', inspect:'수레가 다니는 비탈에 바퀴 자국이 깊다. 비가 오면 발을 디디기 어렵겠다.', offer:'흙을 나를 사람이 필요하다. 수레는 동료와 번갈아 민다.', gain:'동료들과 일을 나누어 배운다.', burden:'날씨에 따라 작업이 끊길 수 있다.', problem:'젖은 길에서 수레가 기울었다. 동료가 길을 가리킨다.', evidence:'비탈의 깊은 바퀴 자국', repair:'수레를 세우고 길에 판자를 덧댔다.', result:'수레를 밀고 흙을 부었다. 동료가 좁은 길을 비켜 준다.'},
    mason:{name:'석공 보조', inspect:'낮은 작업대와 높은 발판이 있다. 돌 다듬기를 배우지만 처음에는 나르는 일이 많다.', offer:'석공이 보조를 구한다. 기술을 익히는 데에는 시간이 든다.', gain:'돌을 다루는 일을 가까이에서 배운다.', burden:'바로 숙련공이 되거나 다음 일이 보장되지는 않는다.', problem:'돌을 올리려는데 발판이 흔들린다. 석공이 손을 내젓는다.', evidence:'헐거운 발판 연결부', repair:'발판을 비우고 연결부를 보강했다.', result:'돌을 나르고 정을 건네며 하루를 보냈다. 석공이 손의 각도를 보여 준다.'}
  },
  responses: {
    collective:{label:'감독에게 작업 중단과 보강을 요구한다',gain:'문제를 알리고 작업 조건을 바꿀 기회.',burden:'기다리는 동안 일이 늦어진다. 요구가 받아들여질지는 알 수 없다.', result:'감독은 일정을 걱정하지만 해당 작업을 잠시 멈추기로 한다. 완전한 해결은 아직 아니다.'},
    endure:{label:'도구를 들고 일을 계속한다',gain:'오늘 맡은 일을 이어 간다.',burden:'위험은 남고 피로가 쌓인다.',result:'감독은 작업을 재개한다. 동료는 여전히 조심하라는 손짓을 보낸다.'},
    leave:{label:'짐을 챙겨 현장을 떠난다',gain:'이 현장의 위험에서 벗어난다.',burden:'일이 끊기며 다음 일자리는 아직 없다.',result:'도구를 내려놓고 출입길로 향한다. 동료가 배웅하고, 감독은 다른 일꾼에게 돌아선다.'},
    ground:{label:'석공에게 지상 작업을 부탁한다',gain:'발판을 피하면서 돌 다듬기를 이어 간다.',burden:'발판 문제는 남는다. 다른 동료의 조건까지 바뀌지는 않는다.',result:'석공은 낮은 작업대로 자리를 내준다. 감독은 발판 작업을 다른 조와 조정한다.'}
  },
  futures: {
    follow:{label:'다음 공사 모집을 알아본다',gain:'익숙한 일을 다시 찾을 수 있다.',burden:'고용은 미정이며 숙소와 이동을 다시 마련해야 한다.',result:'다음 공사 소식을 따라 길을 나선다. 손에는 익숙한 도구가 있지만, 새 계약은 아직 없다.',job:'다음 공사 구직 중'},
    settle:{label:'선로 보수 일에 지원한다',gain:'한곳에 머무를 가능성이 생긴다.',burden:'소개는 채용 보장이 아니다. 새 업무를 배워야 한다.',result:'소개를 받아 보수 일에 지원했다. 완성된 철길 옆에서 면담 날짜를 기다린다.',job:'선로 보수 지원 중'},
    mutual_aid:{label:'동료와 일감을 나누어 찾는다',gain:'일이 끊길 때 정보를 주고받을 사람이 있다.',burden:'서로 돕는 데에도 시간과 여력이 든다. 수입은 보장되지 않는다.',result:'동료와 연락할 곳을 정했다. 서로 일감 소식을 전하기로 하고 각자의 짐을 챙긴다.',job:'동료와 함께 구직 중'},
    home:{label:'고향 쪽에서 다른 일을 찾는다',gain:'익숙한 사람들 곁에서 다시 시작한다.',burden:'그곳에도 일자리가 있다는 보장은 없다.',result:'고향으로 갈 길을 알아본다. 열차가 지나가지만, 탈 수 있는지는 여비와 노선을 따져야 한다.',job:'고향에서 구직 예정'}
  },
  sources:[],
  researchNotes:['대사는 창작이며 실제 인용문이 아니다.','특정 선택이 승진·불이익으로 자동 연결된다는 역사적 주장을 하지 않는다.','동료의 소개, 보강 수용, 지상 작업 허용은 비교 체험을 위한 가상 분기이다.'],
  ending:{question:'철길이 완성된 뒤, 톰에게 남은 기회와 부담은 무엇일까요?'}
};

// 관찰과 대사도 데이터 쪽에서 관리합니다. 함수는 상태를 읽기만 합니다.
window.RAILWAY_DATA.scenarios.worker.dialogue = function(s,id){
 const D = window.RAILWAY_DATA.scenarios.worker;
 if(id==='foreman'){
  if(s.scene===0){let known=['tunnel','embankment','mason'].filter(k=>s.seen[0].includes(k));return known.length?`${D.jobs[known[0]].name} 쪽을 봤군. 조건을 보고 결정하게. 오늘 바로 합류할 수 있네.`:'굴착, 흙 운반, 석공 보조에서 사람을 구하네. 작업장에 가서 보고 정하게.';}
  if(s.scene===1)return s.seen[1].includes(s.job)?`${D.jobs[s.job].evidence} 말인가? 어디가 문제인지 함께 보지.`:'무슨 일이 있나? 작업을 늦추려면 이유를 알아야 하네.';
  if(s.stance==='leave')return '자네는 중간에 떠나서 최근 작업을 내가 확인하지 못했네. 보수 일 소개는 어렵지만, 다른 공사 모집 소식은 알아볼 수 있지.';
  return s.stance==='collective'?'보강을 이야기했던 사람이군. 작업 경험은 확인해 줄 수 있네. 보수 일에 지원할 생각인가?':'함께 일한 경험은 확인해 주겠네. 보수 일에 지원해 보게. 채용은 담당자가 결정할 거야.';
 }
 if(s.scene===0)return s.seen[0].includes('lodging')?'숙소를 봤나? 잠자리가 편치 않아. 일만큼 쉬는 곳도 중요하지. 곤란하면 말을 걸게.':'일이 있다는 건 반갑지. 그래도 몸이 버텨야 하잖나. 작업장도, 잠잘 곳도 살펴보게.';
 if(s.scene===1)return s.seen[1].includes(s.job)?`${D.jobs[s.job].evidence}을 봤지? 감독에게 어디가 문제인지 같이 말할 수 있네.`:'잠깐 멈추세. 혼자 결정하기 어려우면 같이 현장을 보자고.';
 return s.talked[0].includes('peer')||s.talked[1].includes('peer')?'다시 보니 반갑네. 다음 일감 소식이 오면 서로 알려 주세.':'인사를 늦게 했군. 다음 일감 소식부터 서로 나눠 볼까?';
};
window.RAILWAY_DATA.scenarios.worker.observation = function(s,id){const D = window.RAILWAY_DATA.scenarios.worker;if(D.jobs[id]){if(s.scene===1&&id===s.job)return D.jobs[id].problem+' '+(s.stance==='collective'?D.jobs[id].repair:'');if(s.scene===2)return '공사 흔적은 남았지만 이 작업조의 일은 끝나간다. 완성된 선로 위로 열차가 지나간다.';return D.jobs[id].inspect;}if(id==='lodging')return s.scene===2?'짐 꾸러미가 문 앞에 놓여 있다. 이 숙소에 계속 머물 수 있을지는 아직 정해지지 않았다.':'좁은 방에 짐과 젖은 옷이 놓여 있다. 일을 마친 뒤 몸을 쉴 곳도 필요하다.';if(id==='tools')return s.scene===1?'손때 묻은 도구가 멈춰 있다. 다시 집어 들면 일을 계속하겠다는 뜻이 된다.':'삽과 곡괭이, 돌을 다듬는 정이 놓여 있다. 도구를 쓰는 일도 동료에게 배워야 한다.';return s.scene===0?'다른 현장으로 이어지는 길이다. 우선 여기에서 맡을 일을 골라보자.':'현장 밖으로 이어지는 길이다. 떠나면 다음 일자리와 이동할 곳을 새로 알아봐야 한다.';};
