'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const R=require('../js/worker-record.js');
const M=require('../js/worker-model.js');
global.window={RAILWAY_DATA:{scenarios:{}}};
require('../data/scenarios/worker.js');
const D=window.RAILWAY_DATA.scenarios.worker;
test('수첩은 같은 문장을 중복하지 않고 달라진 대화와 장면을 보존한다',()=>{
 const notes=[];R.add(notes,0,'talk','peer','처음 이야기');R.add(notes,0,'talk','peer','처음 이야기');
 R.add(notes,0,'talk','peer','숙소를 본 뒤 이야기');R.add(notes,1,'talk','peer','처음 이야기');
 assert.equal(notes.length,3);assert.equal(notes[0].text,'처음 이야기');
});
test('기록 내보내기는 실제 경로와 생각을 담고 게임 상태를 바꾸지 않는다',()=>{
 for(const path of [['tunnel','collective','settle'],['mason','ground','home']]){
 const s=M.create();for(const id of path){if(s.scene===2)M.talk(s,'foreman');assert.ok(M.choose(s,id));M.finish(s);M.next(s);}
 const snapshot=JSON.stringify(s),notes=[];R.add(notes,0,'look','lodging','좁은 숙소를 보았다.');
 const text=R.report(s,D,notes,'  내 선택에는 부담도 있다.  ');
 assert.ok(text.includes(D.futures[path[2]].label));assert.ok(text.includes('좁은 숙소를 보았다.'));
 assert.ok(text.includes('\n내 선택에는 부담도 있다.\n'));assert.ok(text.includes('검증된 역사적 사실이 아닙니다'));
 assert.equal(JSON.stringify(s),snapshot);assert.ok(!R.report(s,D,[],'').includes('좁은 숙소를 보았다.'));
 }
});
