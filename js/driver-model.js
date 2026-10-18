/* 관찰과 대화는 시간을 소비하지 않는 결정적 상태 모델. */
(function(root){
'use strict';
function create(){return {scene:0,phase:'explore',prep:null,response:null,future:null,fatigue:'근무를 시작하는 중',seen:[[],[],[]],talked:[[],[],[]],history:[]};}
function observe(s,id){if(s.phase!=='explore')return false;if(!s.seen[s.scene].includes(id))s.seen[s.scene].push(id);return true;}
function talk(s,id){if(s.phase!=='explore'||(s.scene===1&&id==='chief'))return false;if(!s.talked[s.scene].includes(id))s.talked[s.scene].push(id);return true;}
function reason(s,id){
 if(s.phase!=='explore')return '현재 행동이 끝나기를 기다려 주세요.';
 if(s.scene===0)return ['inspect','team','routine'].includes(id)?'':'지금 할 수 없는 행동입니다.';
 if(s.scene===1)return ['slow','stop','keep'].includes(id)?'':'지금 할 수 없는 행동입니다.';
 if(!['report','rest','extra'].includes(id))return '지금 할 수 없는 행동입니다.';
 if(id==='report'&&!s.talked[2].includes('fireman'))return '먼저 화부에게 말을 걸어 함께 기록할 내용을 나누세요.';
 if(id==='extra'&&s.response==='keep')return '많이 지친 상태입니다. 이번 체험에서는 보고 또는 휴식을 선택해 하루를 마칩니다.';
 if(id==='extra'&&!s.talked[2].includes('chief'))return '먼저 역무 책임자에게 다음 배치 이야기를 들어 보세요.';
 return '';
}
function choose(s,id){if(reason(s,id))return false;s.history.push({scene:s.scene,id});s.phase='animating';if(s.scene===0){s.prep=id;s.fatigue='운행으로 피로가 쌓임';}else if(s.scene===1){s.response=id;s.fatigue=id==='keep'?'많이 지침':'긴장 끝에 지침';}else{s.future=id;if(id==='rest')s.fatigue='운행을 마치고 쉬는 중';if(id==='extra')s.fatigue='휴식을 미루어 더 지침';}return true;}
function finish(s){if(s.phase!=='animating')return false;s.phase='aftermath';return true;}
function next(s){if(s.phase!=='aftermath')return false;if(s.scene===2)s.phase='ending';else{s.scene++;s.phase='explore';}return true;}
const api={create,observe,talk,reason,choose,finish,next};if(typeof module!=='undefined')module.exports=api;else root.DriverModel=api;
})(typeof window==='undefined'?globalThis:window);
