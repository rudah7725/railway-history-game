'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const M=require('../js/worker-model.js');
function complete(s,id){assert.equal(M.choose(s,id),true);assert.equal(M.finish(s),true);assert.equal(M.next(s),true);}
test('관찰을 반복하거나 순서를 바꾸어도 피로와 일자리는 변하지 않는다',()=>{
 const s=M.create();for(let i=0;i<20;i++){M.observe(s,'lodging');M.observe(s,'tunnel');M.talk(s,'peer');}
 assert.equal(s.fatigue,'아직 일하기 전');assert.equal(s.job,null);assert.equal(s.history.length,0);assert.deepEqual(s.seen[0],['lodging','tunnel']);assert.equal(s.support,true);
});
test('행동 중 중복 선택, 건너뛰기 중복, 다음 장면 중복 방지',()=>{
 const s=M.create();assert.equal(M.choose(s,'tunnel'),true);for(let i=0;i<10;i++){assert.equal(M.choose(s,'mason'),false);assert.equal(M.next(s),false);assert.equal(M.observe(s,'lodging'),false);}
 assert.equal(s.history.length,1);assert.equal(s.job,'tunnel');assert.equal(M.finish(s),true);assert.equal(M.finish(s),false);assert.equal(M.next(s),true);assert.equal(M.next(s),false);assert.equal(s.scene,1);
});
test('요구 자체를 채용 배제와 연결하지 않고, 소개 대화를 조건으로 둔다',()=>{
 const s=M.create();complete(s,'tunnel');complete(s,'collective');assert.equal(M.allowed(s,'settle'),false);M.talk(s,'foreman');assert.equal(M.allowed(s,'settle'),true);assert.equal(M.allowed(s,'mutual_aid'),false);M.talk(s,'peer');assert.equal(M.allowed(s,'mutual_aid'),true);
});
test('이탈 경로는 소개가 막혀도 다른 엔딩으로 완주할 수 있다',()=>{
 const s=M.create();complete(s,'embankment');complete(s,'leave');M.talk(s,'foreman');assert.equal(M.allowed(s,'settle'),false);complete(s,'home');assert.equal(s.phase,'ending');assert.equal(s.history.length,3);
});
test('세 작업장과 가능한 모든 대응·마지막 행동 조합이 완주된다',()=>{
 let total=0;for(const job of ['tunnel','embankment','mason'])for(const stance of ['collective','endure','leave','ground'])for(const future of ['follow','settle','mutual_aid','home']){
  let s=M.create();complete(s,job);if(!M.allowed(s,stance))continue;complete(s,stance);M.talk(s,'foreman');M.talk(s,'peer');if(!M.allowed(s,future))continue;complete(s,future);assert.equal(s.phase,'ending');assert.equal(s.history.length,3);assert.equal(M.choose(s,'home'),false);total++;
 }assert.equal(total,37);
});
test('새 게임은 기록·관계·관찰·피로를 공유하지 않는다',()=>{
 const old=M.create();M.talk(old,'peer');M.observe(old,'lodging');complete(old,'mason');const fresh=M.create();assert.equal(fresh.support,false);assert.equal(fresh.job,null);assert.deepEqual(fresh.history,[]);assert.deepEqual(fresh.seen,[[],[],[]]);assert.equal(fresh.phase,'explore');assert.equal(fresh.fatigue,'아직 일하기 전');
});
