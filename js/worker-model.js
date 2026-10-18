/* DOM과 분리된 결정적 상태 모델. 관찰에는 시간 경과나 피로 증가가 없다. */
(function(root){
  'use strict';
  function create(){return {scene:0,phase:'explore',job:null,stance:null,future:null,fatigue:'아직 일하기 전',support:false,seen:[[],[],[]],talked:[[],[],[]],history:[]};}
  function observe(s,id){if(s.phase!=='explore')return false;if(!s.seen[s.scene].includes(id))s.seen[s.scene].push(id);return true;}
  function talk(s,id){if(s.phase!=='explore')return false;if(!s.talked[s.scene].includes(id))s.talked[s.scene].push(id);if(id==='peer')s.support=true;return true;}
  function allowed(s,id){
    if(s.phase!=='explore')return false;
    if(s.scene===0)return ['tunnel','embankment','mason'].includes(id);
    if(s.scene===1)return ['collective','endure','leave'].includes(id)||(id==='ground'&&s.job==='mason');
    if(s.scene===2){if(id==='settle')return s.talked[2].includes('foreman')&&s.stance!=='leave';if(id==='mutual_aid')return s.support&&s.talked[2].includes('peer');return ['follow','home'].includes(id);}
    return false;
  }
  function choose(s,id){
    if(!allowed(s,id))return false;
    s.phase='animating';s.history.push({scene:s.scene,id:id});
    if(s.scene===0){s.job=id;s.fatigue='한 차례 일해 피곤함';}
    if(s.scene===1){s.stance=id;if(id==='endure')s.fatigue='많이 지침';else if(id==='leave')s.fatigue='일을 멈추고 쉬는 중';else s.fatigue='작업을 멈추고 숨을 돌림';}
    if(s.scene===2)s.future=id;
    return true;
  }
  function finish(s){if(s.phase!=='animating')return false;s.phase='aftermath';return true;}
  function next(s){if(s.phase!=='aftermath')return false;if(s.scene===2){s.phase='ending';return true;}s.scene++;s.phase='explore';return true;}
  var api={create,observe,talk,allowed,choose,finish,next};
  if(typeof module!=='undefined')module.exports=api;else root.WorkerModel=api;
})(typeof window==='undefined'?globalThis:window);

