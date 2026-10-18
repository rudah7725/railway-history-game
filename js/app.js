/*
 * 화면 코드. 문구와 선택지는 data/ 폴더의 데이터에서 읽는다.
 * 화면 흐름: 시작 → 역할 선택 → 장면(여러 개) → 결과
 */
(function () {
  'use strict';

  var DATA = window.RAILWAY_DATA;
  var app = document.getElementById('app');

  var state = {
    roleId: null,
    sceneIndex: 0,
    flags: {},     // 선택으로 저장된 상태 (예: job, stance)
    history: [],   // [{ scene, choice }]
    chosen: null   // 현재 장면에서 고른 선택지
  };

  /* ---------- 작은 도구 ---------- */

  // el('div', { class: 'x', onclick: fn }, [자식...])
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        var value = attrs[key];
        if (value === null || value === undefined || value === false) return;
        if (key.indexOf('on') === 0) node.addEventListener(key.slice(2), value);
        else if (key === 'text') node.textContent = value;
        else node.setAttribute(key, value === true ? '' : value);
      });
    }
    [].concat(children || []).forEach(function (child) {
      if (child === null || child === undefined || child === false) return;
      node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    });
    return node;
  }

  function matches(cond) {
    if (!cond) return true;
    var value = state.flags[cond.flag];
    if (cond.in) return cond.in.indexOf(value) !== -1;
    if (cond.notIn) return cond.notIn.indexOf(value) === -1;
    return true;
  }

  function paragraphs(list) {
    return list
      .filter(function (item) { return typeof item === 'string' || matches(item.when); })
      .map(function (item) { return el('p', { text: typeof item === 'string' ? item : item.text }); });
  }

  function show(screenName, content) {
    app.setAttribute('data-screen', screenName);
    app.replaceChildren(content);
    window.scrollTo(0, 0);
    var heading = app.querySelector('h1, h2');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }

  function draftBadge() {
    return el('p', { class: 'draft-badge' }, [
      el('strong', { text: DATA.meta.draftNotice }),
      el('span', { text: DATA.meta.draftDetail })
    ]);
  }

  function railDivider() {
    return el('div', { class: 'rail', 'aria-hidden': 'true' });
  }

  function currentScenario() {
    return DATA.scenarios[state.roleId];
  }

  function roleById(id) {
    return DATA.roles.filter(function (r) { return r.id === id; })[0];
  }

  /* ---------- 1. 시작 화면 ---------- */

  function showStart() {
    var meta = DATA.meta;
    show('start', el('section', { class: 'screen start' }, [
      el('p', { class: 'eyebrow', text: '역할 선택형 역사 체험' }),
      el('h1', { class: 'title', text: meta.title }),
      el('p', { class: 'subtitle', text: meta.subtitle }),
      railDivider(),
      el('div', { class: 'intro' }, meta.intro.map(function (line) { return el('p', { text: line }); })),
      draftBadge(),
      el('button', { class: 'btn btn-primary btn-large', 'data-action': 'start', onclick: showRoles, text: '시작하기' })
    ]));
  }

  /* ---------- 2. 역할 선택 화면 ---------- */

  function showRoles() {
    var cards = DATA.roles.map(function (role) {
      var ready = role.playable && DATA.scenarios[role.id];
      return el('li', { class: 'role-card' + (ready ? '' : ' is-locked') }, [
        el('div', { class: 'role-head' }, [
          el('h3', { text: role.name }),
          el('span', { class: 'tag ' + (ready ? 'tag-ready' : 'tag-wait'), text: ready ? '플레이 가능' : '준비 중' })
        ]),
        el('dl', { class: 'role-info' }, [
          el('dt', { text: '처한 상황' }), el('dd', { text: role.situation }),
          el('dt', { text: '주요 고민' }), el('dd', { text: role.concern })
        ]),
        el('button', {
          class: 'btn ' + (ready ? 'btn-primary' : 'btn-disabled'),
          'data-action': 'role',
          'data-role': role.id,
          disabled: !ready,
          'aria-label': role.name + (ready ? ' 역할로 시작하기' : ' (준비 중)'),
          onclick: ready ? function () { startRole(role.id); } : null,
          text: ready ? '이 사람으로 시작' : '준비 중'
        })
      ]);
    });

    show('roles', el('section', { class: 'screen roles' }, [
      el('h2', { text: '누구의 자리에 서 볼까요?' }),
      el('p', { class: 'lead', text: '같은 철도를 일곱 사람의 자리에서 바라봅니다. 이번 초안에서는 철도 건설 노동자와 기관차 기관사를 플레이할 수 있습니다.' }),
      el('ul', { class: 'role-grid' }, cards),
      el('div', { class: 'actions' }, [
        el('button', { class: 'btn btn-ghost', 'data-action': 'home', onclick: showStart, text: '처음 화면으로' })
      ])
    ]));
  }

  /* ---------- 3. 장면 ---------- */

  function startRole(roleId) {
    state.roleId = roleId;
    state.sceneIndex = 0;
    state.flags = {};
    state.history = [];
    state.chosen = null;
    if (roleId === 'worker') { window.WorkerGame.start(app, DATA.scenarios.worker, showRoles); return; }
    if (roleId === 'driver') { window.DriverGame.start(app, DATA.scenarios.driver, showRoles); return; }
    showScene();
  }

  function progress(scenario, activeIndex) {
    var steps = scenario.scenes.map(function (scene) { return scene.title; }).concat(['결과']);
    return el('ol', { class: 'progress', 'aria-label': '진행 상황' }, steps.map(function (label, i) {
      var status = i < activeIndex ? 'done' : (i === activeIndex ? 'current' : 'todo');
      return el('li', { class: 'station ' + status, 'aria-current': i === activeIndex ? 'step' : null }, [
        el('span', { class: 'dot', 'aria-hidden': 'true' }),
        el('span', { class: 'station-label', text: label })
      ]);
    }));
  }

  function showScene() {
    var scenario = currentScenario();
    var scene = scenario.scenes[state.sceneIndex];
    state.chosen = null;

    var visible = scene.choices.filter(function (c) { return matches(c.showIf); });
    var resultSlot = el('div', { class: 'result-slot' });

    var buttons = visible.map(function (choice) {
      var enabled = matches(choice.enableIf);
      return el('li', null, [
        el('button', {
          class: 'choice' + (enabled ? '' : ' is-locked'),
          'data-action': 'choose',
          'data-choice': choice.id,
          disabled: !enabled,
          onclick: enabled ? function (event) { choose(choice, event.currentTarget, resultSlot); } : null
        }, [
          el('span', { class: 'choice-label', text: choice.label }),
          el('span', { class: 'choice-detail', text: choice.detail }),
          enabled ? null : el('span', { class: 'choice-locked', text: '선택할 수 없음 · ' + choice.lockedReason })
        ])
      ]);
    });

    show('scene', el('section', { class: 'screen scene' }, [
      progress(scenario, state.sceneIndex),
      el('p', { class: 'eyebrow' }, [
        roleById(state.roleId).name + ' · ' + scenario.character
      ]),
      el('h2', null, [
        el('span', { class: 'step', text: scene.step }),
        scene.title
      ]),
      el('p', { class: 'setting', text: '가상 설정 · ' + scenario.setting }),
      el('div', { class: 'situation' }, paragraphs(scene.intro)),
      el('p', { class: 'question', text: scene.question }),
      el('ul', { class: 'choices' }, buttons),
      resultSlot
    ]));
  }

  function choose(choice, button, resultSlot) {
    if (state.chosen) return;
    state.chosen = choice;

    var scenario = currentScenario();
    var scene = scenario.scenes[state.sceneIndex];
    if (choice.set) Object.keys(choice.set).forEach(function (k) { state.flags[k] = choice.set[k]; });
    state.history.push({ scene: scene, choice: choice });

    app.querySelectorAll('.choice').forEach(function (b) {
      b.disabled = true;
      if (b !== button) b.classList.add('is-faded');
    });
    button.classList.add('is-chosen');

    var isLast = state.sceneIndex === scenario.scenes.length - 1;
    var card = el('div', { class: 'outcome', 'data-outcome': choice.id }, [
      el('h3', { text: '선택의 결과' }),
      el('p', { class: 'outcome-text', text: choice.result }),
      el('div', { class: 'ledger' }, [
        el('div', { class: 'ledger-col gains' }, [
          el('h4', { text: '얻은 것' }),
          el('ul', null, choice.gains.map(function (g) { return el('li', { text: g }); }))
        ]),
        el('div', { class: 'ledger-col burdens' }, [
          el('h4', { text: '감수한 것' }),
          el('ul', null, choice.burdens.map(function (b) { return el('li', { text: b }); }))
        ])
      ]),
      el('button', {
        class: 'btn btn-primary',
        'data-action': 'next',
        onclick: isLast ? showResult : nextScene,
        text: isLast ? '결과 보기' : '다음 장면으로'
      })
    ]);
    resultSlot.replaceChildren(card);
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function nextScene() {
    state.sceneIndex += 1;
    showScene();
  }

  /* ---------- 4. 결과 화면 ---------- */

  function showResult() {
    var scenario = currentScenario();

    var valueCounts = {};
    var valueOrder = [];
    var burdens = [];
    state.history.forEach(function (h) {
      (h.choice.values || []).forEach(function (v) {
        if (!valueCounts[v]) { valueCounts[v] = 0; valueOrder.push(v); }
        valueCounts[v] += 1;
      });
      h.choice.burdens.forEach(function (b) { burdens.push(b); });
    });
    valueOrder.sort(function (a, b) { return valueCounts[b] - valueCounts[a]; });

    var path = el('ol', { class: 'path' }, state.history.map(function (h) {
      return el('li', null, [
        el('span', { class: 'path-step', text: h.scene.step + ' · ' + h.scene.title }),
        el('strong', { class: 'path-choice', text: h.choice.label }),
        el('span', { class: 'path-result', text: h.choice.result })
      ]);
    }));

    show('result', el('section', { class: 'screen result' }, [
      progress(scenario, scenario.scenes.length),
      el('p', { class: 'eyebrow', text: roleById(state.roleId).name + ' · ' + scenario.character }),
      el('h2', { text: '당신이 걸어온 길' }),
      path,
      railDivider(),
      el('div', { class: 'summary-grid' }, [
        el('div', { class: 'summary-box' }, [
          el('h3', { text: '우선한 가치' }),
          el('ul', { class: 'chips' }, valueOrder.map(function (v) {
            return el('li', { class: 'chip' }, [v, valueCounts[v] > 1 ? el('span', { class: 'chip-count', text: ' ×' + valueCounts[v] }) : null]);
          }))
        ]),
        el('div', { class: 'summary-box' }, [
          el('h3', { text: '감수한 부담' }),
          el('ul', { class: 'burden-list' }, burdens.map(function (b) { return el('li', { text: b }); }))
        ])
      ]),
      el('div', { class: 'no-answer' }, [
        el('h3', { text: '정답은 하나가 아닙니다' }),
        el('div', null, scenario.ending.noSingleAnswer.map(function (t) { return el('p', { text: t }); }))
      ]),
      el('div', { class: 'reflect' }, [
        el('h3', { text: '생각해 볼 질문' }),
        el('ul', null, scenario.ending.questions.map(function (q) { return el('li', { text: q }); }))
      ]),
      el('div', { class: 'actions' }, [
        el('button', { class: 'btn btn-primary', 'data-action': 'restart', onclick: function () { startRole(state.roleId); }, text: '다시 시작하기' }),
        el('button', { class: 'btn btn-ghost', 'data-action': 'roles', onclick: showRoles, text: '역할 선택으로 돌아가기' })
      ])
    ]));
  }

  showStart();
})();


