/* 수업용 기록: 화면에서 실제 읽은 문장만 저장하며 외부로 전송하지 않는다. */
(function(root){
'use strict';
function add(entries,scene,kind,id,text){
 if(entries.some(n=>n.scene===scene&&n.kind===kind&&n.id===id&&n.text===text))return;
 entries.push({scene,kind,id,text});
}
function report(s,D,entries,reflection){
 const lines=['철도는 누구에게 진보였을까? · 나의 체험 기록',
 '가상 시나리오를 포함한 초안. 인물·대사·선택 결과는 검증된 역사적 사실이 아닙니다.',
 '', '선택한 길'];
 s.history.forEach(h=>{const d=h.scene===0?D.jobs[h.id]:h.scene===1?D.responses[h.id]:D.futures[h.id];lines.push(`${h.scene+1}. ${d.name||d.label}`,`기회: ${d.gain}`,`부담: ${d.burden}`);});
 lines.push('', '현장에서 남긴 기록');
 entries.forEach(n=>lines.push(`${n.scene+1}장 · ${n.kind==='talk'?'대화':'관찰'}: ${n.text}`));
 lines.push('', '내 생각',reflection.trim()||'(작성하지 않음)', '', '더 확인할 역사 자료');
 D.scenes.forEach(sc=>lines.push(...sc.researchNotes.map(t=>'· '+t)));
 return lines.join('\n');
}
const api={add,report};if(typeof module!=='undefined')module.exports=api;else root.WorkerRecord=api;
})(typeof window==='undefined'?globalThis:window);
