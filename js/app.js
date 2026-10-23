(function () {
  'use strict';

  var ANIMALS = window.ANIMALS;
  var I = window.ICONS;
  var byId = {};
  ANIMALS.forEach(function (a) { byId[a.id] = a; });
  var byName = function (x, y) { return x.name.localeCompare(y.name); };

  /* ---------------- storage (optional; app works without it) ---------------- */
  function load(key, fallback) {
    try { var v = localStorage.getItem('aimm.' + key); return v == null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
  }
  function save(key, val) {
    try { localStorage.setItem('aimm.' + key, JSON.stringify(val)); } catch (e) { /* ignore */ }
  }

  /* ---------------- read aloud ---------------- */
  var NOVELTY = /albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|junior|organ|superstar|trinoids|whisper|wobble|zarvox|ralph|fred|kathy|grandma|grandpa|eddy|flo|reed|rocko|sandy|shelley/i;
  var Speech = {
    on: load('sound', true),
    voice: null,
    init: function () {
      if (!('speechSynthesis' in window)) return;
      var self = this;
      function pick() {
        var vs = window.speechSynthesis.getVoices() || [];
        var en = vs.filter(function (v) { return /^en[-_]/i.test(v.lang) && !NOVELTY.test(v.name); });
        var norm = function (v) { return v.lang.replace('_', '-').toLowerCase(); };
        self.voice =
          en.find(function (v) { return norm(v) === 'en-ca'; }) ||
          en.find(function (v) { return norm(v) === 'en-us' && /samantha|ava|allison|susan|zoe|nicky|google us/i.test(v.name); }) ||
          en.find(function (v) { return norm(v) === 'en-us'; }) ||
          en[0] || null;
      }
      pick();
      if (window.speechSynthesis.addEventListener) window.speechSynthesis.addEventListener('voiceschanged', pick);
    },
    say: function (text) {
      if (!this.on || !text || !('speechSynthesis' in window)) return;
      var synth = window.speechSynthesis;
      var u = new SpeechSynthesisUtterance(text);
      if (this.voice) { u.voice = this.voice; u.lang = this.voice.lang; } else { u.lang = 'en-US'; }
      u.rate = 0.88;
      u.pitch = 1.05;
      if (synth.speaking || synth.pending) {
        synth.cancel();
        setTimeout(function () { synth.speak(u); }, 60);
      } else {
        synth.speak(u);
      }
    }
  };
  Speech.init();

  /* ---------------- words ---------------- */
  var GROUPS = [
    { key: 'all', label: 'All' },
    { key: 'zoo', label: 'Zoo', img: 'lion' },
    { key: 'australia', label: 'Australia', img: 'kangaroo' },
    { key: 'canada', label: 'Canada', img: 'moose' }
  ];
  var TOPIC_WORD = { kind: 'Kind', body: 'Body', legs: 'Legs', fly: 'Fly?', swim: 'Swim?', home: 'Home', where: 'Where', eats: 'Eats', size: 'Size', colour: 'Colour', special: 'Special', fact: 'Fun fact' };
  var TOPIC_PROMPT = {
    kind: 'Think about what kind of animal it is.', body: 'Think about what covers its body.', legs: 'Think about its legs.',
    fly: 'Think about flying.', swim: 'Think about swimming.', home: 'Think about where it lives.',
    where: 'Think about where in the world it lives.', eats: 'Think about what it eats.', size: 'Think about how big it is.',
    colour: 'Think about its colour.', special: 'Think about something special it has.'
  };
  var KINDS = ['mammal', 'bird', 'reptile', 'amphibian', 'fish'];
  var BODY_WORD = { fur: 'Fur', feathers: 'Feathers', scales: 'Scales', skin: 'Skin', spines: 'Spines' };
  var BODY_SAY = { fur: 'fur', feathers: 'feathers', scales: 'scales', skin: 'bare skin', spines: 'spines' };
  var BODY_Q = { fur: 'Does it have fur?', feathers: 'Does it have feathers?', scales: 'Does it have scales?', skin: 'Does it have bare skin?', spines: 'Does it have spines?' };
  var NUM_WORD = ['None', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];
  var HABITATS = ['ocean', 'rainforest', 'forest', 'grassland', 'desert', 'mountains', 'snow', 'river', 'wetland'];
  var HAB_WORD = { ocean: 'Ocean', rainforest: 'Rainforest', forest: 'Forest', grassland: 'Grassland', desert: 'Desert', mountains: 'Mountains', snow: 'Snowy', river: 'River', wetland: 'Wetland' };
  var HAB_SAY = { ocean: 'in the ocean', rainforest: 'in the rainforest', forest: 'in forests', grassland: 'in grassland', desert: 'in the desert', mountains: 'in the mountains', snow: 'in cold, snowy places', river: 'in or near rivers and lakes', wetland: 'in wetlands' };
  var HAB_Q = { ocean: 'Does it live in the ocean?', rainforest: 'Does it live in the rainforest?', forest: 'Does it live in a forest?', grassland: 'Does it live in grassland?', desert: 'Does it live in the desert?', mountains: 'Does it live in the mountains?', snow: 'Does it live where it is cold and snowy?', river: 'Does it live near a river or lake?', wetland: 'Does it live in a wetland?' };
  var REGIONS = ['africa', 'asia', 'europe', 'northAmerica', 'southAmerica', 'australia', 'antarctica', 'arctic', 'ocean'];
  var REGION_WORD = { africa: 'Africa', asia: 'Asia', europe: 'Europe', northAmerica: 'North America', southAmerica: 'South America', australia: 'Australia', antarctica: 'Antarctica', arctic: 'Arctic', ocean: 'Oceans' };
  var REGION_SAY = { arctic: 'the Arctic', ocean: 'the oceans' };
  var DIET_WORD = { plants: 'Plants', meat: 'Meat', both: 'Both' };
  var DIET_SAY = { plants: 'It eats plants', meat: 'It eats meat', both: 'It eats plants and meat' };
  var STEP_WORD = { 1: 'Cat', 2: 'Dog', 3: 'You', 4: 'Grown-up', 5: 'Car' };
  var SIZE_SAY = { 1: 'It is about as big as a cat, or smaller.', 2: 'It is about as big as a dog.', 3: 'It is about as big as you.', 4: 'It is as big as a grown-up, or bigger.', 5: 'It is as big as a car, or bigger!' };
  var COLOURS = ['brown', 'grey', 'black', 'white', 'yellow', 'orange', 'pink', 'green', 'red', 'blue'];
  var COLOUR_HEX = { brown: '#A06B40', grey: '#A3A9B4', black: '#3C3A44', white: '#FFFFFF', yellow: '#F6CF4E', orange: '#F39A3D', pink: '#F59BB8', green: '#6CC06A', red: '#E5534B', blue: '#3A7BD5' };
  var FEATURES = ['stripes', 'spots', 'mane', 'horns', 'antlers', 'tusk', 'trunk', 'pouch', 'longNeck', 'frill', 'beak', 'eggs'];
  var FEAT_WORD = { stripes: 'Stripes', spots: 'Spots', mane: 'Mane', horns: 'Horns', antlers: 'Antlers', tusk: 'Tusk', trunk: 'Trunk', pouch: 'Pouch', longNeck: 'Long neck', frill: 'Frill', beak: 'Beak', eggs: 'Lays eggs' };
  var FEAT_SAY = { stripes: 'stripes', spots: 'spots', mane: 'a mane', horns: 'horns', antlers: 'antlers', tusk: 'tusks', trunk: 'a trunk', pouch: 'a pouch', longNeck: 'a long neck', frill: 'a frill', beak: 'a beak' };
  var FEAT_Q = { stripes: 'Does it have stripes?', spots: 'Does it have spots?', mane: 'Does it have a mane?', horns: 'Does it have horns?', antlers: 'Does it have antlers?', tusk: 'Does it have a tusk?', trunk: 'Does it have a trunk?', pouch: 'Does it have a pouch?', longNeck: 'Does it have a long neck?', frill: 'Does it have a frill?', beak: 'Does it have a beak or bill?', eggs: 'Does it lay eggs?' };

  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function listSay(items) {
    if (items.length < 2) return items.join('');
    return items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1];
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function numSay(n) { return NUM_WORD[n] ? NUM_WORD[n].toLowerCase() : String(n); }
  function metresSay(m) {
    return m.replace(/(\d+(?:\.\d+)?)\s*cm\b/g, '$1 centimetres').replace(/\b1\s*m\b/g, '1 metre').replace(/(\d+(?:\.\d+)?)\s*m\b/g, '$1 metres');
  }
  // '2 wings' -> { n: 2, word: 'wings' }; 'fins' -> { n: null, word: 'fins' }
  function parseOther(other) {
    if (!other) return null;
    var m = /^(\d+)\s+(.+)$/.exec(other);
    return m ? { n: +m[1], word: m[2] } : { n: null, word: other };
  }

  /* ---------------- card tiles ---------------- */
  function tile(t, art, word, say, opts) {
    opts = opts || {};
    var long = word.length > 11 ? ' long' : '';
    return '<button class="tile sticker' + (opts.cls ? ' ' + opts.cls : '') + '" type="button" data-say="' + esc(say) + '">' +
      '<span class="tile-topic">' + I.topic(t) + '<span>' + TOPIC_WORD[t] + '</span></span>' +
      '<span class="tile-art">' + art + '</span>' +
      '<span class="tile-word' + long + (opts.wordCls ? ' ' + opts.wordCls : '') + '">' + esc(word) + '</span>' +
      (opts.sub ? '<span class="tile-sub">' + esc(opts.sub) + '</span>' : '') +
      '</button>';
  }

  function legsArt(n, other) {
    var o = parseOther(other);
    var extra = o ? '<span class="legs-arms">+ ' + (o.n ? o.n + ' ' : '') + esc(o.word) + '</span>' : '';
    return '<span class="legs"><span class="legs-num">' + n + '</span>' + extra + '</span>';
  }

  function mysteryArt(size) {
    var mystery = '<span class="cmp-item cmp-mystery" style="height:%H%">' + I.svg('<rect x="4" y="4" width="92" height="92" rx="30" fill="#FFE07A" stroke="#3B2A26" stroke-width="5"/><text x="50" y="68" text-anchor="middle" font-family="Andika, sans-serif" font-weight="700" font-size="52" fill="#3B2A26">?</text>') + '</span>';
    if (size === 'huge') return '<span class="cmp"><span class="cmp-item cmp-car" style="height:30%">' + I.car + '</span>' + mystery.replace('%H%', '100%') + '</span>';
    return '<span class="cmp"><span class="cmp-item cmp-kid" style="height:' + (size === 'big' ? 60 : 100) + '%">' + I.kid + '</span>' +
      mystery.replace('%H%', (size === 'big' ? 100 : 46) + '%') + '</span>';
  }

  function swatches(colours) {
    return '<span class="swatches">' + colours.map(function (c) {
      return '<span class="swatch" style="background:' + (COLOUR_HEX[c] || '#ccc') + '"></span>';
    }).join('') + '</span>';
  }

  function featureWord(a, f) { return f === 'beak' && a.kind === 'mammal' ? 'Bill' : FEAT_WORD[f]; }
  function featureSay(a, f) {
    if (f === 'beak' && a.kind === 'mammal') return 'a bill';
    if (f === 'tusk' && a.id === 'narwhal') return 'a long tusk';
    return FEAT_SAY[f];
  }

  function tilesFor(a) {
    var t = [];
    t.push(tile('kind', I.kind(a.kind), cap(a.kind), a.kind === 'amphibian' ? 'It is an amphibian.' : 'It is a ' + a.kind + '.'));

    var bodyArt = a.body.length > 1 ? '<span class="pair">' + a.body.map(I.body).join('') + '</span>' : I.body(a.body[0]);
    t.push(tile('body', bodyArt, a.body.map(function (b) { return BODY_WORD[b]; }).join(' & '),
      'It is covered in ' + listSay(a.body.map(function (b) { return BODY_SAY[b]; })) + '.'));

    var o = parseOther(a.other);
    var legsSay = a.legs === 0 ? 'It has no legs.' : 'It has ' + numSay(a.legs) + ' legs';
    if (o) legsSay = a.legs === 0 ? legsSay + ' It has ' + (o.n ? numSay(o.n) + ' ' : '') + o.word + '.' : legsSay + ' and ' + (o.n ? numSay(o.n) + ' ' : '') + o.word + '.';
    else if (a.legs > 0) legsSay += '.';
    t.push(tile('legs', legsArt(a.legs, a.other), NUM_WORD[a.legs] || String(a.legs), legsSay));

    t.push(tile('fly', I.yesNo('fly', a.flies), a.flies ? 'Yes' : 'No', a.flies ? 'Yes, it can fly.' : "No, it can't fly.", { wordCls: a.flies ? 'yes' : 'no' }));
    t.push(tile('swim', I.yesNo('swim', a.swims), a.swims ? 'Yes' : 'No', a.swims ? 'Yes, it can swim.' : "No, it doesn't swim.", { wordCls: a.swims ? 'yes' : 'no' }));

    var hab = a.habitats.slice(0, 3);
    var habArt = hab.length > 1 ? '<span class="pair n' + hab.length + '">' + hab.map(I.habitat).join('') + '</span>' : I.habitat(hab[0]);
    t.push(tile('home', habArt, hab.map(function (h) { return HAB_WORD[h]; }).join(hab.length > 2 ? ', ' : ' & '),
      'It lives ' + listSay(hab.map(function (h) { return HAB_SAY[h]; })) + '.'));

    var regs = a.regions;
    var names = regs.map(function (r) { return REGION_WORD[r]; });
    var where = regs.length === 1 ? names[0] : regs.length === 2 ? names.join(' & ') : 'Many places';
    var whereSay = regs.length === 1 && regs[0] === 'ocean' ? 'It lives in oceans all around the world.' :
      'It lives in ' + listSay(regs.map(function (r) { return REGION_SAY[r] || REGION_WORD[r]; })) + '.';
    t.push(tile('where', I.map(regs), where, whereSay));

    t.push(tile('eats', I.diet(a.diet), DIET_WORD[a.diet], DIET_SAY[a.diet] + ', like ' + listSay(a.food) + '.', { sub: a.food.join(', ') }));

    t.push(tile('size', I.sizeRow(a.size), STEP_WORD[a.size], SIZE_SAY[a.size] + ' It is about ' + metresSay(a.metres) + '.', { sub: a.metres, cls: 'size-tile' }));

    t.push(tile('colour', swatches(a.colours), a.colours.map(cap).join(' & '), 'It is ' + listSay(a.colours) + '.'));

    var feats = a.features;
    var featArt = feats.length ? '<span class="pair n' + Math.min(feats.length, 3) + '">' + feats.slice(0, 3).map(I.feature).join('') + '</span>' :
      I.svg('<circle cx="50" cy="50" r="30" fill="#F1F2F5" stroke="#C9CBD1" stroke-width="5"/><path d="M36 50 L64 50" stroke="#A3A9B4" stroke-width="7" stroke-linecap="round"/>');
    var has = feats.filter(function (f) { return f !== 'eggs'; }).map(function (f) { return featureSay(a, f); });
    var featSay = (has.length ? 'It has ' + listSay(has) + '.' : '') + (feats.indexOf('eggs') !== -1 ? (has.length ? ' ' : '') + 'It lays eggs.' : '');
    t.push(tile('special', featArt, feats.length ? feats.map(function (f) { return featureWord(a, f); }).join(', ') : 'None',
      featSay || 'Nothing special from our list.'));

    t.push('<button class="tile sticker fact-tile" type="button" data-say="' + esc(a.fact) + '">' +
      '<span class="tile-topic">' + I.topic('fact') + '<span>' + TOPIC_WORD.fact + '</span></span>' +
      '<span class="fact-text">' + esc(a.fact) + '</span></button>');
    return t.join('');
  }

  /* ---------------- question bank (used by hints and Play with the app) ---------------- */
  var BANK = (function () {
    var B = [];
    function add(cat, text, art, test) {
      B.push({ id: B.length, cat: cat, text: text, art: art, answer: function (a) { var r = test(a); return r === true ? 'yes' : r === false ? 'no' : r; } });
    }
    KINDS.forEach(function (k) { add('kind', k === 'amphibian' ? 'Is it an amphibian?' : 'Is it a ' + k + '?', I.kind(k), function (a) { return a.kind === k; }); });
    Object.keys(BODY_Q).forEach(function (b) { add('body', BODY_Q[b], I.body(b), function (a) { return a.body.indexOf(b) !== -1; }); });
    add('legs', 'Does it have four legs?', legsArt(4), function (a) { return a.legs === 4; });
    add('legs', 'Does it have two legs?', legsArt(2), function (a) { return a.legs === 2; });
    add('legs', 'Does it have any legs?', I.topic('legs'), function (a) { return a.legs > 0; });
    add('legs', 'Does it have wings?', I.topic('fly'), function (a) { return /wing/.test(a.other); });
    add('legs', 'Does it have arms?', legsArt(2, '2 arms'), function (a) { return /arm/.test(a.other); });
    add('legs', 'Does it have flippers?', I.topic('swim'), function (a) { return /flipper/.test(a.other); });
    add('fly', 'Can it fly?', I.topic('fly'), function (a) { return a.flies; });
    add('swim', 'Can it swim?', I.topic('swim'), function (a) { return a.swims; });
    HABITATS.forEach(function (h) { add('home', HAB_Q[h], I.habitat(h), function (a) { return a.habitats.indexOf(h) !== -1; }); });
    REGIONS.forEach(function (r) {
      if (r === 'ocean') return;
      add('where', 'Does it live in ' + (REGION_SAY[r] || REGION_WORD[r]) + '?', I.map([r]), function (a) { return a.regions.indexOf(r) !== -1; });
    });
    add('eats', 'Does it eat meat?', I.diet('meat'), function (a) { return a.diet !== 'plants'; });
    add('eats', 'Does it eat plants?', I.diet('plants'), function (a) { return a.diet !== 'meat'; });
    add('size', 'Is it bigger than me?', mysteryArt('big'), function (a) { return a.size > 3 ? 'yes' : a.size === 3 ? 'same' : 'no'; });
    add('size', 'Is it smaller than me?', mysteryArt('small'), function (a) { return a.size < 3 ? 'yes' : a.size === 3 ? 'same' : 'no'; });
    add('size', 'Is it as big as a car?', mysteryArt('huge'), function (a) { return a.size === 5; });
    COLOURS.forEach(function (c) { add('colour', 'Is it ' + c + '?', swatches([c]), function (a) { return a.colours.indexOf(c) !== -1; }); });
    add('colour', 'Is it black and white?', swatches(['black', 'white']), function (a) { return a.colours.indexOf('black') !== -1 && a.colours.indexOf('white') !== -1; });
    FEATURES.forEach(function (f) { add('special', FEAT_Q[f], I.feature(f), function (a) { return a.features.indexOf(f) !== -1; }); });
    B.forEach(function (q) { q.yes = ANIMALS.filter(function (a) { return q.answer(a) === 'yes'; }).length; });
    return B;
  })();
  var CATS = ['kind', 'body', 'legs', 'fly', 'swim', 'home', 'where', 'eats', 'size', 'colour', 'special'];
  // Play: any question that is true for at least one animal. Hints: questions that split the animals usefully.
  var PLAY_Q = BANK.filter(function (q) { return q.yes >= 1; });
  var HINT_Q = BANK.filter(function (q) { return q.yes >= 2 && ANIMALS.length - q.yes >= 2; });
  var HINT_ORDER = ['kind', 'body', 'where', 'eats', 'size', 'home', 'legs', 'special', 'fly', 'swim', 'colour'].filter(function (c) {
    return HINT_Q.some(function (q) { return q.cat === c; });
  });

  var hintMemory = load('hint2', { cat: 0, last: {} });
  var hint = { step: 0, cat: null, q: null };
  function nextHint() {
    var cat = HINT_ORDER[hintMemory.cat % HINT_ORDER.length];
    hintMemory.cat = (hintMemory.cat + 1) % HINT_ORDER.length;
    var list = HINT_Q.filter(function (q) { return q.cat === cat; });
    var last = hintMemory.last[cat];
    var idx = Math.floor(Math.random() * list.length);
    if (list.length > 1 && idx === last) idx = (idx + 1) % list.length;
    hintMemory.last[cat] = idx;
    save('hint2', hintMemory);
    hint.cat = cat;
    hint.q = list[idx];
  }

  /* ---------------- photos (Wikimedia Commons) ---------------- */
  var COMMONS = 'https://commons.wikimedia.org';
  function photoUrl(file, width) {
    return COMMONS + '/wiki/Special:FilePath/' + encodeURIComponent(file.replace(/ /g, '_')) + '?width=' + (width || 500);
  }
  var failedPhotos = {};
  var credits = load('credits2', null);
  var creditsStatus = credits ? 'done' : 'idle';

  function htmlToText(html) {
    try { return (new DOMParser().parseFromString(String(html), 'text/html').body.textContent || '').replace(/\s+/g, ' ').trim(); }
    catch (e) { return ''; }
  }

  function loadCredits() {
    if (creditsStatus === 'loading') return;
    creditsStatus = 'loading';
    var files = ANIMALS.map(function (a) { return a.photo; }).filter(Boolean);
    var batches = [];
    for (var i = 0; i < files.length; i += 20) batches.push(files.slice(i, i + 20));
    var found = {};
    Promise.all(batches.map(function (batch) {
      var titles = batch.map(function (f) { return 'File:' + f; });
      var url = COMMONS + '/w/api.php?action=query&format=json&formatversion=2&origin=*&prop=imageinfo&iiprop=extmetadata' +
        '&iiextmetadatafilter=Artist%7CLicenseShortName&titles=' + encodeURIComponent(titles.join('|'));
      return fetch(url).then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); }).then(function (data) {
        var q = data.query || {};
        var norm = {};
        (q.normalized || []).forEach(function (n) { norm[n.to] = n.from; });
        (q.pages || []).forEach(function (pg) {
          var asked = (norm[pg.title] || pg.title).replace(/^File:/, '');
          var file = batch.find(function (f) { return f === asked || f.replace(/_/g, ' ') === asked.replace(/_/g, ' '); }) || asked;
          if (pg.missing || !pg.imageinfo) { found[file] = { missing: true }; return; }
          var md = (pg.imageinfo[0] || {}).extmetadata || {};
          found[file] = {
            artist: htmlToText(md.Artist ? md.Artist.value : '') || 'Unknown photographer',
            licence: htmlToText(md.LicenseShortName ? md.LicenseShortName.value : '') || 'See Wikimedia Commons'
          };
        });
      });
    })).then(function () {
      credits = found;
      creditsStatus = 'done';
      save('credits2', credits);
      if (state.screen === 'credits') render();
    }).catch(function () {
      creditsStatus = credits ? 'done' : 'failed';
      if (state.screen === 'credits') render();
    });
  }

  /* ---------------- random animals (each one once before any repeats) ---------------- */
  var bag = load('bag', []).filter(function (id) { return byId[id]; });
  function shuffled() {
    var ids = ANIMALS.map(function (a) { return a.id; });
    for (var i = ids.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = ids[i]; ids[i] = ids[j]; ids[j] = t; }
    return ids;
  }
  function randomAnimal(exclude) {
    if (!bag.length) bag = shuffled();
    var id = bag.pop();
    if (id === exclude && ANIMALS.length > 1) {
      if (!bag.length) bag = shuffled().filter(function (x) { return x !== exclude; });
      var other = bag.pop();
      bag.unshift(id);
      id = other;
    }
    save('bag', bag);
    return id;
  }

  /* ---------------- state ---------------- */
  var app = document.getElementById('app');
  var state = {
    screen: 'title',
    filter: load('filter', 'all'),
    animal: null,
    cardMode: 'think',   // 'think' = reference page for the animal in his mind; 'explore' = looking at ideas while guessing
    count: 0,            // questions the other player has asked (thinking mode)
    overlay: null        // { type: 'win' | 'play-win' | 'giveup' | 'guess', ... }
  };
  var play = null;       // { secret, asked: [], count, cat, last, wrong: {} }
  var gridScroll = {};

  /* ---------------- shared pieces ---------------- */
  function bar(target, title, right) {
    return '<header class="bar">' +
      '<button class="btn-back sticker" type="button" data-go="' + target + '" aria-label="Back">' + I.back + '<span>Back</span></button>' +
      (title ? '<h1 class="bar-title"><button type="button" class="say-btn" data-say="' + esc(title) + '">' + esc(title) + '</button></h1>' : '<span></span>') +
      (right || '<span class="bar-spacer" aria-hidden="true"></span>') + '</header>';
  }

  function currentList() {
    return ANIMALS.filter(function (a) { return state.filter === 'all' || a.group === state.filter; }).slice().sort(byName);
  }

  function chips() {
    return '<nav class="filters" aria-label="Animal groups">' + GROUPS.map(function (g) {
      var icon = g.img ? '<img src="' + byId[g.img].image + '" alt="">' : I.paw;
      return '<button class="chip sticker" type="button" data-filter="' + g.key + '" aria-pressed="' + (state.filter === g.key) + '">' + icon + '<span>' + g.label + '</span></button>';
    }).join('') + '</nav>';
  }

  function animalGrid(list, opts) {
    opts = opts || {};
    return '<div class="grid' + (opts.cls ? ' ' + opts.cls : '') + '" id="' + (opts.id || 'grid') + '">' + list.map(function (a) {
      var photo = a.photo && !failedPhotos[a.photo]
        ? '<img class="photo" src="' + esc(photoUrl(a.photo)) + '" alt="" loading="lazy" decoding="async" draggable="false" data-file="' + esc(a.photo) + '">'
        : '';
      var dim = opts.wrong && opts.wrong[a.id] ? ' wrong' : '';
      return '<button class="animal-btn sticker' + dim + '" type="button" ' + (opts.attr || 'data-animal') + '="' + a.id + '">' +
        '<span class="pic g-' + a.group + '"><img class="drawing" src="' + esc(a.image) + '" alt="" draggable="false">' + photo + '</span>' +
        '<span class="label">' + esc(a.name) + '</span></button>';
    }).join('') + '</div>';
  }

  function hintPanel() {
    var stage, label, say = '';
    if (hint.step === 0) {
      stage = '<span class="stage-big">' + I.think + '</span>';
      label = 'Hint';
    } else if (hint.step === 1) {
      stage = '<span class="stage-big">' + I.topic(hint.cat) + '</span>';
      label = 'More';
      say = TOPIC_PROMPT[hint.cat];
    } else {
      stage = '<span class="stage-corner">' + I.topic(hint.cat) + '</span>' +
        '<span class="stage-art">' + hint.q.art + '</span>' +
        '<span class="stage-q">' + esc(hint.q.text) + '</span>';
      label = 'Next';
      say = hint.q.text;
    }
    return '<button class="hint-stage sticker step-' + hint.step + '" type="button" data-say="' + esc(say) + '" aria-live="polite">' + stage + '</button>' +
      '<button class="hint-btn sticker" type="button" data-act="hint-step" data-say="' + label + '">' + I.bulb + '<span>' + label + '</span></button>';
  }

  /* ---------------- screens ---------------- */
  function renderTitle() {
    return '<div class="screen title-screen">' +
      '<img class="title-backdrop" src="images/title.jpg" alt="" aria-hidden="true" draggable="false">' +
      '<img class="title-art" src="images/title.jpg" alt="Animal in My Mind. The guessing game." draggable="false">' +
      '<button class="start-btn sticker" type="button" data-go="home">' + I.play + '<span>Start</span></button>' +
      '</div>';
  }

  function renderHome() {
    return '<div class="screen home">' +
      '<button class="sound-toggle sticker" type="button" data-act="sound" aria-label="' + (Speech.on ? 'Sound is on' : 'Sound is off') + '">' + (Speech.on ? I.speaker : I.speakerOff) + '</button>' +
      '<h1 class="home-title"><button type="button" class="say-btn" data-say="Animal in my mind">Animal in My Mind</button></h1>' +
      '<div class="mode-buttons">' +
        '<button class="mode-btn think sticker" type="button" data-go="pick" data-say="I\'m thinking of an animal">' +
          '<span class="mode-art"><span class="cloud">' +
            I.svg('<circle cx="40" cy="168" r="9" fill="#FFFFFF" stroke="#3B2A26" stroke-width="5"/><circle cx="66" cy="146" r="14" fill="#FFFFFF" stroke="#3B2A26" stroke-width="5"/>' +
              '<path d="M70 124 Q34 124 36 92 Q38 62 72 64 Q76 22 122 24 Q150 4 182 22 Q214 8 238 34 Q284 34 282 76 Q296 112 262 124 Z" fill="#FFFFFF" stroke="#3B2A26" stroke-width="6" stroke-linejoin="round"/>', '0 0 300 180') +
            '<span class="cloud-animals"><img src="' + byId.koala.image + '" alt=""><img src="' + byId.lion.image + '" alt=""><img src="' + byId.moose.image + '" alt=""></span></span></span>' +
          '<span class="mode-label">I\'m thinking of an animal</span></button>' +
        '<button class="mode-btn guess sticker" type="button" data-go="guess" data-say="I\'m guessing">' +
          '<span class="mode-art">' + I.guess + '</span>' +
          '<span class="mode-label">I\'m guessing</span></button>' +
      '</div>' +
      '<button class="credits-link" type="button" data-go="credits">Photo credits</button>' +
      '</div>';
  }

  function renderPick() {
    var dice = '<button class="new-btn sticker" type="button" data-act="random" data-say="Pick for me">' + I.dice + '<span>Pick for me</span></button>';
    return '<div class="screen find">' + bar('home', 'Pick your animal', dice) + chips() + animalGrid(currentList()) + '</div>';
  }

  function renderCard() {
    var a = byId[state.animal];
    var think = state.cardMode === 'think';
    var right = think ? '<button class="new-btn sticker" type="button" data-act="random" data-say="New animal">' + I.dice + '<span>New Animal</span></button>' : '';
    var extras = think ?
      '<div class="counter sticker" role="group" aria-label="Questions asked">' +
        '<button class="count-btn" type="button" data-act="count-down" aria-label="One less">−</button>' +
        '<span class="count-text"><span class="count-num">' + state.count + '</span><span class="count-label">' + (state.count === 1 ? 'question' : 'questions') + '</span></span>' +
        '<button class="count-btn plus" type="button" data-act="count-up" aria-label="One more question">+</button>' +
      '</div>' +
      '<button class="win-btn sticker" type="button" data-act="win">' + I.star + '<span>They guessed it!</span></button>' : '';
    return '<div class="screen animal">' + bar(think ? 'pick' : 'guess', '', right) +
      '<div class="card">' +
        '<section class="hero">' +
          '<div class="hero-pic sticker g-' + a.group + '"><img src="' + esc(a.image) + '" alt="' + esc(a.name) + '" draggable="false"></div>' +
          '<div class="hero-text"><h1 class="name">' + esc(a.name) + '</h1>' + extras + '</div>' +
        '</section>' +
        '<section class="tiles" aria-label="Clues">' + tilesFor(a) + '</section>' +
      '</div></div>';
  }

  function renderGuess() {
    var playBtn = '<button class="play-btn sticker" type="button" data-act="play-start" data-say="Play with the app">' + I.dice + '<span>Play with the app</span></button>';
    return '<div class="screen guess">' + bar('home', "I'm guessing") +
      '<div class="guess-layout">' +
        '<section class="guess-hint">' + hintPanel() + playBtn + '</section>' +
        '<section class="guess-ideas">' +
          '<h2 class="ideas-title">Animal ideas</h2>' + chips() +
          animalGrid(currentList(), { attr: 'data-explore', id: 'grid', cls: 'ideas-grid' }) +
        '</section>' +
      '</div></div>';
  }

  function renderPlay() {
    var p = play;
    var countBox = '<span class="play-count sticker"><span class="count-num">' + p.count + '</span><span class="count-label">' + (p.count === 1 ? 'question' : 'questions') + '</span></span>';
    var cats = CATS.map(function (c) {
      return '<button class="cat-btn sticker" type="button" data-cat="' + c + '" aria-pressed="' + (p.cat === c) + '">' + I.topic(c) + '<span>' + TOPIC_WORD[c] + '</span></button>';
    }).join('');
    var asked = {};
    p.asked.forEach(function (x) { asked[x.id] = x.ans; });
    var qs = p.cat ? PLAY_Q.filter(function (q) { return q.cat === p.cat; }).map(function (q) {
      var done = asked[q.id];
      return '<button class="q-btn sticker' + (done ? ' asked ' + done : '') + '" type="button" data-q="' + q.id + '">' +
        '<span class="q-art">' + q.art + '</span><span class="q-text">' + esc(q.text) + '</span>' +
        (done ? '<span class="q-badge">' + (done === 'yes' ? 'Yes' : done === 'no' ? 'No' : 'Same') + '</span>' : '') + '</button>';
    }).join('') : '<p class="q-empty">Pick a question picture.</p>';
    var last = p.last;
    var answer = last ?
      '<div class="answer sticker ' + last.ans + '" aria-live="polite"><span class="answer-word">' + (last.ans === 'yes' ? 'Yes!' : last.ans === 'no' ? 'No!' : 'About the same!') + '</span><span class="answer-q">' + esc(last.text) + '</span></div>' :
      '<div class="answer sticker idle"><span class="answer-q">I\'m thinking of an animal. Ask me questions!</span></div>';
    var log = p.asked.slice().reverse().map(function (x) {
      return '<li class="' + x.ans + '"><span class="log-badge">' + (x.ans === 'yes' ? 'Yes' : x.ans === 'no' ? 'No' : 'Same') + '</span>' + esc(x.text) + '</li>';
    }).join('');
    return '<div class="screen play">' + bar('guess', 'Guess my animal', countBox) +
      '<div class="play-layout">' +
        '<section class="play-left">' +
          '<div class="mystery sticker">' + I.think + '</div>' + answer +
          '<div class="play-actions">' +
            '<button class="guess-btn sticker" type="button" data-act="guess-open" data-say="My guess">' + I.search + '<span>My guess</span></button>' +
            '<button class="giveup-btn" type="button" data-act="give-up">Give up</button>' +
          '</div>' +
        '</section>' +
        '<section class="play-right">' +
          '<div class="cat-grid">' + cats + '</div>' +
          '<div class="q-list">' + qs + '</div>' +
          (log ? '<div class="log"><h2>Asked so far</h2><ul>' + log + '</ul></div>' : '') +
        '</section>' +
      '</div></div>';
  }

  function renderCredits() {
    if (creditsStatus === 'idle' || creditsStatus === 'failed') loadCredits();
    var note = creditsStatus === 'loading' ? 'Loading photographer names from Wikimedia Commons…' :
      creditsStatus === 'failed' ? "Couldn't reach Wikimedia Commons. Connect to the internet and open this page again to see photographer names." : '';
    var rows = ANIMALS.slice().sort(byName).map(function (a) {
      if (!a.photo) return '';
      var c = credits && credits[a.photo];
      var who = c ? (c.missing ? 'Photo not found on Commons. Check the file name in js/animals.js.' : esc(c.artist) + ' · ' + esc(c.licence)) : '';
      return '<li><span class="cr-name">' + esc(a.name) + '</span>' +
        '<span class="cr-who' + (c && c.missing ? ' cr-missing' : '') + '">' + who + '</span>' +
        '<span class="cr-file">Wikimedia Commons: ' + esc(a.photo) + '</span></li>';
    }).join('');
    return '<div class="screen credits">' + bar('home', 'Photo credits') +
      '<div class="credits-body">' +
        '<p class="credits-intro">The photos come from Wikimedia Commons. Each one is used under the licence shown, with thanks to the photographers. The title art was supplied by the family; drawings, icons and the app itself are original.</p>' +
        (note ? '<p class="credits-note">' + note + '</p>' : '') +
        '<ul class="credits-list">' + rows + '</ul>' +
      '</div></div>';
  }

  function renderOverlay() {
    var o = state.overlay;
    if (!o) return '';
    if (o.type === 'guess') {
      return '<div class="overlay" role="dialog" aria-label="Which animal is it?"><div class="sheet sticker">' +
        '<div class="sheet-head"><h2>Which animal is it?</h2><button class="sheet-close sticker" type="button" data-act="overlay-close" aria-label="Close">' + I.back + '</button></div>' +
        (o.msg ? '<p class="sheet-msg">' + esc(o.msg) + '</p>' : '') +
        animalGrid(ANIMALS.slice().sort(byName), { attr: 'data-guess', id: 'guess-grid', cls: 'sheet-grid', wrong: play.wrong }) +
        '</div></div>';
    }
    var a = byId[o.animal];
    var confetti = '';
    var colours = ['#FFC93C', '#E5534B', '#2F8FD6', '#3E9A4E', '#F59BB8', '#F39A3D'];
    for (var i = 0; i < 36; i++) {
      confetti += '<i style="left:' + Math.round(Math.random() * 100) + '%;background:' + colours[i % colours.length] +
        ';animation-delay:' + (Math.random() * 0.8).toFixed(2) + 's;animation-duration:' + (1.8 + Math.random() * 1.4).toFixed(2) + 's"></i>';
    }
    var head = o.type === 'win' ? 'They guessed it!' : o.type === 'play-win' ? 'You got it!' : 'It was…';
    var buttons = o.from === 'play' ?
      '<button class="big-btn find sticker" type="button" data-act="play-start" data-say="Play again">' + I.dice + '<span>Play again</span></button>' +
      '<button class="big-btn hint sticker" type="button" data-act="overlay-go" data-target="guess">' + I.back + '<span>Back</span></button>' :
      '<button class="big-btn random sticker" type="button" data-act="random" data-say="New animal">' + I.dice + '<span>New Animal</span></button>' +
      '<button class="big-btn find sticker" type="button" data-act="overlay-go" data-target="pick">' + I.grid + '<span>Choose again</span></button>';
    return '<div class="overlay win" role="dialog" aria-label="' + esc(head) + '"><div class="confetti" aria-hidden="true">' + confetti + '</div>' +
      '<div class="win-card sticker">' +
        '<p class="win-head">' + esc(head) + '</p>' +
        '<div class="win-pic g-' + a.group + '"><img src="' + esc(a.image) + '" alt=""></div>' +
        '<p class="win-name">' + (o.type === 'giveup' ? '' : 'It was the ') + esc(a.name) + '</p>' +
        '<p class="win-count">' + o.count + ' ' + (o.count === 1 ? 'question' : 'questions') + '</p>' +
        '<div class="win-buttons">' + buttons + '</div>' +
      '</div></div>';
  }

  var RENDER = { title: renderTitle, home: renderHome, pick: renderPick, card: renderCard, guess: renderGuess, play: renderPlay, credits: renderCredits };

  function render() {
    app.innerHTML = (RENDER[state.screen] || renderHome)() + renderOverlay();
    var g = document.getElementById('grid');
    if (g && gridScroll[state.screen] != null) g.scrollTop = gridScroll[state.screen];
    Array.prototype.forEach.call(app.querySelectorAll('img.photo'), function (img) {
      if (img.complete && img.naturalWidth > 0) img.classList.add('loaded');
    });
  }

  // photo loading: fade in when ready; fall back to the drawing if it can't load
  app.addEventListener('load', function (ev) {
    var t = ev.target;
    if (t && t.classList && t.classList.contains('photo')) t.classList.add('loaded');
  }, true);
  app.addEventListener('error', function (ev) {
    var t = ev.target;
    if (t && t.classList && t.classList.contains('photo')) {
      failedPhotos[t.getAttribute('data-file')] = true;
      t.remove();
    }
  }, true);

  /* ---------------- navigation ---------------- */
  var useHistory = (function () { try { return window.self === window.top && !!history.pushState; } catch (e) { return false; } })();

  function rememberScroll() {
    var g = document.getElementById('grid');
    if (g) gridScroll[state.screen] = g.scrollTop;
  }

  function go(screen, opts) {
    opts = opts || {};
    rememberScroll();
    if (screen === 'guess' && state.screen === 'home') hint.step = 0;
    if (screen === 'home') gridScroll = {};
    state.screen = screen;
    state.overlay = null;
    if (opts.animal) state.animal = opts.animal;
    if (opts.cardMode) state.cardMode = opts.cardMode;
    render();
    if (useHistory && !opts.fromHistory) {
      try { history.pushState({ screen: state.screen, animal: state.animal, cardMode: state.cardMode }, ''); } catch (e) { /* ignore */ }
    }
  }

  if (useHistory) {
    try { history.replaceState({ screen: 'title' }, ''); } catch (e) { /* ignore */ }
    window.addEventListener('popstate', function (ev) {
      var s = ev.state || { screen: 'title' };
      if (s.screen === 'play' && !play) s.screen = 'guess';
      go(s.screen || 'title', { animal: s.animal, cardMode: s.cardMode, fromHistory: true });
    });
  }

  function openThinkCard(id) {
    state.count = 0;
    go('card', { animal: id, cardMode: 'think' });
  }

  function startPlay() {
    play = { secret: randomAnimal(null), asked: [], count: 0, cat: null, last: null, wrong: {} };
    go('play');
  }

  function ask(q) {
    var ans = q.answer(byId[play.secret]);
    var already = play.asked.some(function (x) { return x.id === q.id; });
    if (!already) { play.asked.push({ id: q.id, text: q.text, ans: ans }); play.count++; }
    play.last = { text: q.text, ans: ans };
    render();
    Speech.say(q.text + ' ' + (ans === 'yes' ? 'Yes!' : ans === 'no' ? 'No!' : 'About the same!'));
  }

  app.addEventListener('click', function (ev) {
    if (state.screen === 'title') {
      Speech.say("Let's play!");
      go('home');
      return;
    }
    // tapping the dark area around the guess sheet closes it
    if (ev.target.classList && ev.target.classList.contains('overlay') && state.overlay && state.overlay.type === 'guess') {
      state.overlay = null; render(); return;
    }

    var el = ev.target.closest('button');
    if (!el || !app.contains(el)) return;
    var act = el.getAttribute('data-act');
    var say = el.getAttribute('data-say');

    switch (act) {
      case 'sound':
        Speech.on = !Speech.on;
        save('sound', Speech.on);
        if (!Speech.on && 'speechSynthesis' in window) window.speechSynthesis.cancel();
        render();
        Speech.say('Sound on');
        return;
      case 'random':
        // never says the animal's name, so the guesser can't hear it
        if (say) Speech.say(say);
        openThinkCard(randomAnimal(state.screen === 'card' ? state.animal : null));
        return;
      case 'count-up':
        state.count++;
        render();
        Speech.say(String(state.count));
        return;
      case 'count-down':
        if (state.count > 0) state.count--;
        render();
        return;
      case 'win':
        state.overlay = { type: 'win', animal: state.animal, count: state.count, from: 'think' };
        render();
        Speech.say('They guessed it! It was the ' + byId[state.animal].name + '!');
        return;
      case 'overlay-go':
        go(el.getAttribute('data-target'));
        return;
      case 'overlay-close':
        state.overlay = null;
        render();
        return;
      case 'hint-step':
        if (hint.step === 0 || hint.step === 2) { nextHint(); hint.step = 1; }
        else hint.step = 2;
        render();
        if (hint.step === 2) Speech.say(hint.q.text);
        return;
      case 'play-start':
        if (say) Speech.say(say);
        startPlay();
        return;
      case 'guess-open':
        if (say) Speech.say(say);
        state.overlay = { type: 'guess' };
        render();
        return;
      case 'give-up':
        state.overlay = { type: 'giveup', animal: play.secret, count: play.count, from: 'play' };
        render();
        Speech.say('It was the ' + byId[play.secret].name + '!');
        return;
    }

    var f = el.getAttribute('data-filter');
    if (f) {
      state.filter = f;
      save('filter', f);
      gridScroll[state.screen] = 0;
      render();
      return;
    }
    var id = el.getAttribute('data-animal');
    if (id) { openThinkCard(id); return; }
    id = el.getAttribute('data-explore');
    if (id) { go('card', { animal: id, cardMode: 'explore' }); return; }

    id = el.getAttribute('data-guess');
    if (id) {
      play.count++;
      if (id === play.secret) {
        state.overlay = { type: 'play-win', animal: id, count: play.count, from: 'play' };
        render();
        Speech.say('Yes! You got it! It was the ' + byId[id].name + '!');
      } else {
        play.wrong[id] = true;
        state.overlay = { type: 'guess', msg: "It's not the " + byId[id].name + '. Keep asking!' };
        render();
        Speech.say("No, it's not the " + byId[id].name + '. Keep asking!');
      }
      return;
    }

    var cat = el.getAttribute('data-cat');
    if (cat) {
      play.cat = cat;
      render();
      Speech.say(TOPIC_PROMPT[cat]);
      return;
    }
    var qid = el.getAttribute('data-q');
    if (qid !== null && qid !== '') { ask(BANK[+qid]); return; }

    var target = el.getAttribute('data-go');
    if (say) Speech.say(say);
    if (target) go(target);
  });

  render();

  /* ---------------- offline support (GitHub Pages only; skipped inside previews) ---------------- */
  if ('serviceWorker' in navigator && useHistory && location.protocol === 'https:') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* offline mode is optional */ });
    });
  }
})();
