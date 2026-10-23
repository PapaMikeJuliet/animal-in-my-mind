/* Icons for questions, answers and the world map. Same outline style as the animal pictures. */
(function () {
  var INK = '#3B2A26';
  function st(w) { return 'stroke="' + INK + '" stroke-width="' + (w == null ? 4 : w) + '" stroke-linejoin="round" stroke-linecap="round"'; }
  function P(d, f, w) { return '<path d="' + d + '" fill="' + f + '" ' + st(w) + '/>'; }
  function PN(d, f) { return '<path d="' + d + '" fill="' + f + '"/>'; }
  function C(x, y, r, f, w) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + f + '" ' + st(w) + '/>'; }
  function CN(x, y, r, f) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + f + '"/>'; }
  function E(x, y, rx, ry, f, w, rot) {
    return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '" fill="' + f + '" ' + st(w) +
      (rot ? ' transform="rotate(' + rot + ' ' + x + ' ' + y + ')"' : '') + '/>';
  }
  function R(x, y, w, h, rx, f, sw) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + rx + '" fill="' + f + '" ' + st(sw) + '/>'; }
  function L(d, w, c) { return '<path d="' + d + '" fill="none" stroke="' + (c || INK) + '" stroke-width="' + (w || 4) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }
  function tube(d, w, f) { return L(d, w + 8, INK) + L(d, w, f); }
  function svg(inner, vb) {
    return '<svg viewBox="' + (vb || '0 0 100 100') + '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' + inner + '</svg>';
  }
  // rounded "scene" frame with clipped contents
  function scene(id, bg, inner) {
    return '<defs><clipPath id="clip-' + id + '"><rect x="6" y="6" width="88" height="88" rx="18"/></clipPath></defs>' +
      '<g clip-path="url(#clip-' + id + ')"><rect x="0" y="0" width="100" height="100" fill="' + bg + '"/>' + inner + '</g>' +
      R(6, 6, 88, 88, 18, 'none', 4);
  }

  /* ---------- question topic pictures (also used as hint category pictures) ---------- */
  var topic = {
    body: P('M30 82 Q16 64 30 52 Q50 38 70 52 Q84 64 70 82 Q50 92 30 82Z', '#C48C5A') +
      E(22, 38, 9, 11, '#C48C5A', 4, -20) + E(39, 22, 9, 11, '#C48C5A', 4, -8) + E(61, 22, 9, 11, '#C48C5A', 4, 8) + E(78, 38, 9, 11, '#C48C5A', 4, 20),
    legs: E(34, 62, 13, 24, '#9BC8EE', 4, -10) + C(26, 33, 4.5, '#9BC8EE', 3) + C(35, 31, 4.5, '#9BC8EE', 3) + C(44, 34, 4, '#9BC8EE', 3) +
      E(68, 50, 13, 24, '#9BC8EE', 4, 10) + C(58, 22, 4, '#9BC8EE', 3) + C(67, 19, 4.5, '#9BC8EE', 3) + C(76, 22, 4.5, '#9BC8EE', 3),
    fly: P('M10 64 Q12 30 46 22 Q72 16 94 18 Q92 30 78 34 Q90 40 74 47 Q84 55 66 58 Q72 67 52 68 Q54 77 36 76 Q16 76 10 64Z', '#BFE3F8') +
      L('M26 52 Q48 38 76 34', 3) + L('M30 62 Q48 54 70 50', 3),
    swim: P('M8 46 Q20 36 32 46 Q44 56 56 46 Q68 36 80 46 Q88 52 92 46 L92 84 Q92 92 84 92 L16 92 Q8 92 8 84Z', '#7CC2EE') +
      L('M14 66 Q24 58 34 66 Q44 74 54 66 Q64 58 74 66 Q80 70 86 66', 4, '#FFFFFF') +
      L('M10 24 Q20 16 30 24 Q40 32 50 24', 5, '#7CC2EE'),
    home: C(76, 24, 10, '#FFD34E') + P('M4 90 Q30 54 60 70 Q80 58 96 72 L96 96 L4 96Z', '#8FD18A') +
      R(30, 44, 8, 30, 3, '#9A6A45') + C(34, 36, 18, '#4DAA57'),
    where: C(50, 50, 40, '#7CC2EE') +
      P('M24 30 Q34 20 46 26 Q50 36 40 40 Q36 50 28 48 Q18 42 24 30Z', '#8FD18A', 3) +
      P('M56 40 Q70 34 80 44 Q82 60 70 70 Q60 72 58 60 Q52 50 56 40Z', '#8FD18A', 3) +
      P('M34 64 Q42 62 46 70 Q44 80 36 80 Q30 74 34 64Z', '#8FD18A', 3),
    eats: C(54, 52, 34, '#FFFFFF') + C(54, 52, 22, '#F4F0EA', 3) +
      L('M12 18 L12 34 M18 18 L18 34 M24 18 L24 34', 3) + tube('M18 34 L18 86', 4, '#B8C2CE') +
      E(88, 26, 7, 11, '#B8C2CE', 4) + tube('M88 38 L88 86', 4, '#B8C2CE'),
    size: R(36, 8, 28, 84, 6, '#FFD66B') +
      L('M36 22 L48 22 M36 36 L44 36 M36 50 L48 50 M36 64 L44 64 M36 78 L48 78', 3) +
      L('M80 16 L80 84 M72 26 L80 14 L88 26 M72 74 L80 86 L88 74', 5),
    colour: P('M50 12 Q90 12 92 48 Q92 70 72 70 Q60 70 62 80 Q64 92 48 90 Q10 86 10 50 Q12 12 50 12Z', '#F3E2C2') +
      C(30, 40, 7, '#E5534B', 3) + C(48, 28, 7, '#FFC93C', 3) + C(68, 32, 7, '#4DAA57', 3) + C(76, 50, 7, '#2F8FD6', 3) + C(34, 62, 6, '#F5F0E8', 3),
    special: P('M50 10 L59 36 L86 38 L65 55 L72 82 L50 66 L28 82 L35 55 L14 38 L41 36Z', '#FFD34E', 4) +
      P('M84 66 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3Z', '#9BC8EE', 3) + P('M16 12 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3Z', '#F59BB8', 3),
    fact: P('M50 8 L61 36 L91 38 L68 57 L76 87 L50 70 L24 87 L32 57 L9 38 L39 36Z', '#FFC93C', 5)
  };
  // "what kind?" = a paw and a feather together
  topic.kind = '<g transform="translate(2 22) scale(0.55)">' + topic.body + '</g>' +
    '<g transform="translate(44 6) scale(0.56)"><path d="M28 82 Q16 50 42 26 Q60 10 82 12 Q86 34 72 54 Q56 76 28 82Z" fill="#8EC6EE" ' + st(5) + '/>' +
    '<path d="M20 92 Q46 58 78 18" fill="none" ' + st(5) + '/></g>';

  /* ---------- answer pictures ---------- */
  function spikesDome() {
    var s = '', cx = 50, cy = 80, rx = 34, ry = 40;
    for (var i = 0; i <= 8; i++) {
      var t = Math.PI * (0.08 + 0.84 * (i / 8));
      var bx = cx + rx * Math.cos(t), by = cy - ry * Math.sin(t);
      var nx = Math.cos(t) / rx, ny = -Math.sin(t) / ry, nl = Math.sqrt(nx * nx + ny * ny); nx /= nl; ny /= nl;
      var tx = -ny, ty = nx;
      s += P('M' + (bx + tx * 6).toFixed(1) + ' ' + (by + ty * 6).toFixed(1) + ' L' + (bx + nx * 16).toFixed(1) + ' ' + (by + ny * 16).toFixed(1) + ' L' + (bx - tx * 6).toFixed(1) + ' ' + (by - ty * 6).toFixed(1) + 'Z', '#F3E6C8', 3);
    }
    return s + P('M16 80 Q16 40 50 40 Q84 40 84 80Z', '#8E6E52');
  }
  function scales() {
    var s = '';
    for (var row = 0; row < 5; row++) {
      for (var col = -1; col < 5; col++) {
        var x = 14 + col * 18 + (row % 2) * 9, y = 20 + row * 15;
        s += P('M' + x + ' ' + y + ' a9 9 0 0 0 18 0', '#7CC36F', 3);
      }
    }
    return '<defs><clipPath id="clip-scales"><rect x="10" y="10" width="80" height="80" rx="16"/></clipPath></defs>' +
      '<g clip-path="url(#clip-scales)"><rect x="0" y="0" width="100" height="100" fill="#A8DB9C"/>' + s + '</g>' + R(10, 10, 80, 80, 16, 'none', 4);
  }

  var body = {
    fur: (function () {
      var bumps = '', n = 13;
      for (var i = 0; i < n; i++) {
        var a = (i / n) * Math.PI * 2;
        bumps += C((50 + 30 * Math.cos(a)).toFixed(1), (52 + 28 * Math.sin(a)).toFixed(1), 12, '#B98457', 4);
      }
      return bumps + CN(50, 52, 32, '#B98457') +
        L('M36 42 q8 -2 10 6 M54 36 q8 -2 10 6 M40 60 q8 -2 10 6 M58 56 q8 -2 10 6', 3.5);
    })(),
    feathers: P('M28 82 Q16 50 42 26 Q60 10 82 12 Q86 34 72 54 Q56 76 28 82Z', '#8EC6EE') +
      L('M20 92 Q46 58 78 18', 4) + L('M40 62 L28 54 M48 52 L36 42 M56 42 L46 30 M50 62 L64 66 M58 52 L72 54', 3),
    scales: scales(),
    skin: P('M16 56 Q14 22 50 18 Q86 16 86 52 Q88 86 50 84 Q16 86 16 56Z', '#B8C2CE') + L('M30 38 Q36 28 48 28', 5, '#FFFFFF'),
    spines: spikesDome(),
    shell: P('M10 74 Q12 26 50 24 Q88 26 90 74Z', '#8CC37A') +
      P('M38 40 L62 40 L68 56 L50 66 L32 56Z', '#B5DE9F', 3) + L('M38 40 L32 28 M62 40 L68 28 M32 56 L14 60 M68 56 L86 60 M50 66 L50 74', 3) +
      R(6, 72, 88, 10, 5, '#6FA85F')
  };

  body.spikes = body.spines;

  var habitat = {
    ocean: scene('ocean', '#D9F0FF', C(72, 28, 11, '#FFD34E') +
      P('M0 52 Q12 44 25 52 Q38 60 50 52 Q62 44 75 52 Q88 60 100 52 L100 100 L0 100Z', '#4FA9E6') +
      L('M14 72 Q22 66 30 72 M56 80 Q64 74 72 80', 4, '#FFFFFF')),
    rainforest: scene('rainforest', '#CFEFC5', L('M30 0 Q22 30 34 50 Q44 66 36 90', 4, '#3E7A3F') +
      P('M0 30 Q30 18 46 40 Q24 48 0 40Z', '#3E9A55', 3) + P('M100 22 Q66 18 56 44 Q82 48 100 36Z', '#5DBB63', 3) +
      P('M100 70 Q72 58 58 82 Q80 92 100 84Z', '#3E9A55', 3) + P('M0 78 Q22 62 40 84 Q20 96 0 92Z', '#5DBB63', 3) +
      C(62, 62, 6, '#E5534B', 3) + L('M50 14 l-3 7 M72 52 l-3 7 M20 56 l-3 7 M84 10 l-3 7', 3, '#3E92D0')),
    desert: scene('desert', '#FFF3CF', C(74, 26, 12, '#FFB733') +
      P('M0 74 Q30 56 60 70 Q80 60 100 68 L100 100 L0 100Z', '#F2C46D') +
      P('M36 86 L36 40 Q36 32 43 32 Q50 32 50 40 L50 86Z', '#6DBA62', 3.5) +
      P('M36 64 L28 64 Q24 64 24 58 L24 48 Q24 44 28 44 Q31 44 31 48 L31 56 L36 56Z', '#6DBA62', 3) +
      P('M50 58 L58 58 L58 46 Q58 42 61 42 Q65 42 65 46 L65 60 Q65 66 59 66 L50 66Z', '#6DBA62', 3)),
    grassland: scene('grassland', '#E2F4FF', P('M0 66 Q50 58 100 66 L100 100 L0 100Z', '#C9E27A') +
      R(58, 40, 6, 30, 2, '#9A6A45', 3) + P('M38 42 Q46 26 62 28 Q80 24 88 40 Q64 46 38 42Z', '#6DAF4F', 3.5) +
      L('M16 84 l3 -8 l3 8 l3 -10 l3 10 M66 88 l3 -8 l3 8 l3 -10 l3 10', 3, '#5E8F2E')),
    forest: scene('forest', '#DDF2E3', P('M0 82 L100 82 L100 100 L0 100Z', '#8FD18A') +
      P('M26 22 L44 70 L8 70Z', '#3E8F55', 3.5) + R(23, 70, 6, 12, 2, '#9A6A45', 3) +
      P('M66 12 L90 74 L42 74Z', '#2F7F49', 3.5) + R(63, 74, 6, 10, 2, '#9A6A45', 3) +
      P('M46 40 L58 72 L34 72Z', '#4DAA57', 3)),
    mountains: scene('mountains', '#DDF0FF', C(78, 24, 9, '#FFD34E') +
      P('M-4 92 L36 26 L58 62 L72 44 L104 92Z', '#9AA6B6', 3.5) +
      P('M26 42 L36 26 L46 42 L40 38 L34 46Z', '#FFFFFF', 3) + P('M66 54 L72 44 L78 54Z', '#FFFFFF', 3) +
      P('M0 86 Q50 74 100 86 L100 100 L0 100Z', '#8FD18A', 3.5)),
    wetland: scene('wetland', '#E4F4DC', P('M0 52 Q50 44 100 52 L100 100 L0 100Z', '#7CC2EE', 3.5) +
      E(36, 70, 11, 5, '#5DBB63', 3) + E(68, 82, 9, 4, '#5DBB63', 3) + C(68, 80, 3, '#F59BB8', 2) +
      L('M14 56 L14 18 M22 56 L22 26 M84 56 L84 22', 3.5, '#5E8F2E') +
      E(14, 20, 3.5, 8, '#9A6A45', 2.5) + E(22, 28, 3.5, 8, '#9A6A45', 2.5) + E(84, 24, 3.5, 8, '#9A6A45', 2.5)),
    snow: scene('snow', '#E8F4FB', P('M0 86 L30 36 L46 58 L62 30 L100 86Z', '#B8C8D8', 3.5) +
      P('M22 50 L30 36 L38 50 L32 46 L28 52Z', '#FFFFFF', 3) + P('M52 46 L62 30 L72 46 L66 42 L60 48Z', '#FFFFFF', 3) +
      P('M0 84 Q50 74 100 84 L100 100 L0 100Z', '#FFFFFF', 3.5) +
      L('M82 16 l0 14 M75 23 l14 0 M77 18 l10 10 M87 18 l-10 10', 2.5, '#5A9CCB')),
    river: scene('river', '#BFE3A8', P('M38 0 Q30 30 52 46 Q72 62 54 100 L84 100 Q98 62 76 42 Q58 26 66 0Z', '#5FB2E8', 3.5) +
      L('M58 30 Q62 34 66 32 M70 72 Q74 76 78 74', 3, '#FFFFFF') +
      L('M18 78 L18 58 M24 80 L24 54 M12 80 L12 64', 3, '#5E8F2E') + E(18, 56, 3, 7, '#9A6A45', 2) + E(24, 52, 3, 7, '#9A6A45', 2))
  };


  var kind = {
    mammal: C(26, 30, 11, '#C48C5A') + C(74, 30, 11, '#C48C5A') + C(50, 54, 32, '#C48C5A') +
      E(50, 66, 14, 11, '#F2D3AE', 3.5) + E(50, 60, 5.5, 4, INK, 0) + CN(39, 48, 4, INK) + CN(61, 48, 4, INK),
    bird: P('M18 54 L4 44 L8 64Z', '#5BA7E0') + E(46, 58, 30, 22, '#7CC2EE') + C(70, 38, 15, '#7CC2EE') +
      P('M83 34 L97 40 L83 46Z', '#F2A541', 3.5) + P('M30 54 Q46 40 60 56 Q46 70 30 54Z', '#5BA7E0', 3) + CN(73, 35, 3.5, INK) +
      L('M42 80 L40 92 M54 80 L56 92', 4),
    reptile: tube('M50 74 Q54 88 72 92', 7, '#7CC36F') +
      L('M38 36 L22 28 M62 36 L78 28 M38 64 L22 74 M62 64 L78 74', 5) +
      E(50, 50, 14, 26, '#7CC36F') + E(50, 18, 10, 12, '#7CC36F') + CN(45, 15, 2.5, INK) + CN(55, 15, 2.5, INK) +
      L('M44 40 l6 4 l6 -4 M44 52 l6 4 l6 -4', 2.5, '#4F9A4B'),
    amphibian: E(50, 62, 36, 26, '#6CC04A') + C(30, 38, 13, '#6CC04A') + C(70, 38, 13, '#6CC04A') +
      CN(30, 38, 6, INK) + CN(70, 38, 6, INK) + CN(32, 36, 2, '#fff') + CN(72, 36, 2, '#fff') + L('M34 68 Q50 80 66 68', 4),
    fish: P('M72 52 L94 34 L92 70Z', '#F39A3D') + E(44, 52, 32, 21, '#F39A3D') + P('M36 32 Q46 22 56 32Z', '#E57E25', 3) +
      CN(26, 46, 4, INK) + L('M54 40 Q60 52 54 64', 3) + L('M14 58 Q18 60 22 58', 3)
  };

  function clip(id, inner) {
    return '<defs><clipPath id="clip-' + id + '"><rect x="10" y="10" width="80" height="80" rx="18"/></clipPath></defs>' +
      '<g clip-path="url(#clip-' + id + ')">' + inner + '</g>' + R(10, 10, 80, 80, 18, 'none', 4);
  }
  var feature = {
    stripes: clip('stripes', '<rect x="0" y="0" width="100" height="100" fill="#F39A3D"/>' +
      L('M0 30 L30 0 M0 62 L62 0 M10 96 L96 10 M42 100 L100 42 M74 100 L100 74', 9)),
    spots: P('M14 50 Q14 16 50 16 Q86 16 86 50 Q86 84 50 84 Q14 84 14 50Z', '#F6CF6B') +
      CN(34, 36, 6, INK) + CN(58, 30, 5, INK) + CN(70, 52, 6, INK) + CN(44, 58, 7, INK) + CN(30, 70, 5, INK) + CN(62, 72, 5, INK),
    mane: (function () {
      var s2 = '';
      for (var i = 0; i < 12; i++) { var a = (i / 12) * Math.PI * 2; s2 += C((50 + 30 * Math.cos(a)).toFixed(1), (50 + 30 * Math.sin(a)).toFixed(1), 13, '#D9893B', 3.5); }
      return s2 + CN(50, 50, 32, '#D9893B') + C(50, 52, 22, '#F4C76A', 3.5) + CN(43, 48, 3, INK) + CN(57, 48, 3, INK) + E(50, 58, 4, 3, INK, 0);
    })(),
    horns: P('M26 88 Q18 52 40 12 Q46 52 56 88Z', '#EDE4D3') + P('M60 88 Q56 64 68 42 Q72 64 80 88Z', '#EDE4D3') + L('M14 88 L88 88', 5),
    antlers: (function () {
      var one = tube('M44 92 C40 64 30 46 14 30', 5, '#E3CFAE') + tube('M34 56 L16 54', 4.5, '#E3CFAE') + tube('M24 40 L12 16', 4.5, '#E3CFAE') + tube('M38 64 Q40 48 32 36', 4.5, '#E3CFAE');
      return one + '<g transform="translate(100 0) scale(-1 1)">' + one + '</g>';
    })(),
    tusk: P('M16 28 Q24 82 88 84 Q52 64 34 22Z', '#FFF8EC', 4.5) + L('M22 34 Q26 50 34 58', 3, '#E3D6BC'),
    trunk: tube('M34 8 Q30 58 50 76 Q66 90 74 72', 22, '#A9B6C6') + L('M30 40 L44 40 M32 54 L46 52', 3),
    pouch: E(50, 54, 34, 40, '#C98A57') + P('M24 58 Q50 92 76 58 Q50 70 24 58Z', '#F1D7B5', 3.5) +
      C(50, 52, 12, '#C98A57', 3.5) + E(43, 40, 3, 7, '#C98A57', 3, -20) + E(57, 40, 3, 7, '#C98A57', 3, 20) + CN(46, 52, 2.5, INK) + CN(54, 52, 2.5, INK) +
      L('M24 58 Q50 70 76 58', 4),
    longNeck: P('M44 96 L44 32 L60 32 L60 96Z', '#F6CF6B') + E(58, 22, 20, 12, '#F6CF6B') +
      L('M50 12 L48 4 M60 12 L62 4', 4) + CN(62, 19, 3, INK) +
      '<rect x="47" y="44" width="9" height="8" rx="3" fill="#C9813F"/><rect x="48" y="62" width="9" height="9" rx="3" fill="#C9813F"/><rect x="46" y="80" width="10" height="8" rx="3" fill="#C9813F"/>',
    frill: (function () {
      var s2 = '';
      for (var i = 0; i <= 8; i++) { var a = Math.PI + (i / 8) * Math.PI; s2 += C((50 + 28 * Math.cos(a)).toFixed(1), (66 + 28 * Math.sin(a)).toFixed(1), 13, '#F08A4B', 3.5); }
      return s2 + P('M14 66 Q14 26 50 26 Q86 26 86 66Z', '#F08A4B', 0) + L('M50 66 L50 30 M50 66 L26 42 M50 66 L74 42 M50 66 L20 62 M50 66 L80 62', 3, '#C9573A') +
        E(50, 70, 15, 13, '#B08A5E') + CN(44, 66, 2.5, INK) + CN(56, 66, 2.5, INK);
    })(),
    beak: C(38, 50, 26, '#7CC2EE') + P('M60 40 L94 52 L60 62Z', '#F2A541', 4) + L('M60 51 L84 52', 3) + CN(38, 44, 5, INK) + CN(40, 42, 1.6, '#fff'),
    eggs: P('M10 66 Q50 98 90 66 Q50 80 10 66Z', '#B07A4E', 4) + E(38, 56, 14, 18, '#FFF8EC', 4, -10) + E(62, 56, 14, 18, '#DDEFF8', 4, 10) +
      L('M12 68 l8 -4 M88 68 l-8 -4', 3)
  };

  /* size row: cat, dog, you, grown-up, car; the matching step is coloured */
  var SIZE_ON = '#F39A3D', SIZE_OFF = '#E4E6EB';
  function sil(step, f, faint) {
    var w = faint ? 3 : 4;
    var o = faint ? ' opacity="0.55"' : '';
    if (step === 1) return '<svg viewBox="0 0 60 64"' + o + ' aria-hidden="true">' +
      P('M40 60 Q60 60 56 42', 'none', w) + P('M14 60 Q8 40 22 30 L40 30 Q50 44 44 60Z', f, w) + C(30, 22, 13, f, w) +
      P('M19 14 L20 2 L28 11Z', f, w) + P('M41 14 L40 2 L32 11Z', f, w) + '</svg>';
    if (step === 2) return '<svg viewBox="0 0 92 70"' + o + ' aria-hidden="true">' +
      P('M70 30 Q86 22 84 10', 'none', w) + R(20, 26, 52, 22, 10, f, w) + R(22, 44, 8, 22, 3, f, w) + R(60, 44, 8, 22, 3, f, w) +
      C(18, 22, 14, f, w) + P('M8 16 Q2 30 10 32Z', f, w) + '</svg>';
    if (step === 3 || step === 4) {
      var tall = step === 4;
      return '<svg viewBox="0 0 40 ' + (tall ? 100 : 70) + '"' + o + ' aria-hidden="true">' +
        C(20, 11, 9, f, w) + R(8, 22, 24, tall ? 40 : 26, 9, f, w) + R(10, tall ? 56 : 44, 8, tall ? 42 : 24, 3, f, w) + R(22, tall ? 56 : 44, 8, tall ? 42 : 24, 3, f, w) + '</svg>';
    }
    return '<svg viewBox="0 0 104 60"' + o + ' aria-hidden="true">' +
      P('M8 44 L8 30 Q8 24 16 24 L26 24 L36 10 Q38 8 44 8 L72 8 Q78 8 82 14 L90 24 Q98 26 98 32 L98 44Z', f, w) +
      C(28, 46, 9, faint ? SIZE_OFF : '#4A4550', w) + C(78, 46, 9, faint ? SIZE_OFF : '#4A4550', w) + '</svg>';
  }
  function sizeRow(step) {
    // widths keep the silhouettes in proportion: cat < dog < you < grown-up, car widest
    var w = { 1: 10.3, 2: 20.5, 3: 12.6, 4: 13, 5: 31.6 };
    var out = '<span class="size-row">';
    for (var i = 1; i <= 5; i++) {
      out += '<span class="size-sil' + (i === step ? ' on' : '') + '" style="width:' + w[i] + '%">' + sil(i, i === step ? SIZE_ON : SIZE_OFF, i !== step) + '</span>';
    }
    return out + '</span>';
  }

  var diet = {
    plants: P('M18 84 Q12 30 72 14 Q90 66 30 86Z', '#6DBA62') + L('M22 82 Q44 52 70 22', 3) + L('M36 64 L30 50 M46 52 L42 38 M42 66 L56 66 M52 52 L66 50', 3),
    meat: tube('M58 60 L80 82', 7, '#FFF8EC') + C(82, 90, 6, '#FFF8EC') + C(90, 82, 6, '#FFF8EC') +
      P('M26 72 Q10 54 22 32 Q40 12 64 26 Q80 42 64 62 Q46 80 26 72Z', '#C9703F') + L('M32 40 Q40 32 50 32', 4, '#E59A6C')
  };
  diet.both = '<g transform="translate(0 14) scale(0.62)">' + diet.plants + '</g><g transform="translate(40 18) scale(0.62)">' + diet.meat + '</g>';

  var kid = svg(
    P('M14 22 Q16 4 30 6 Q44 4 44 22Z', '#7A4E2D', 3.5) + C(29, 24, 13, '#F2C9A0', 3.5) +
    CN(24, 24, 2, INK) + CN(34, 24, 2, INK) + L('M25 30 Q29 33 33 30', 2.5) +
    R(18, 66, 9, 30, 4, '#3E5C8A', 3.5) + R(31, 66, 9, 30, 4, '#3E5C8A', 3.5) +
    R(13, 38, 32, 34, 10, '#5BA7E0', 3.5), '0 0 58 100');
  var car = svg(
    P('M8 44 L8 30 Q8 24 16 24 L26 24 L36 10 Q38 8 44 8 L72 8 Q78 8 82 14 L90 24 Q98 26 98 32 L98 44Z', '#E5534B', 4) +
    P('M38 22 L46 12 L58 12 L58 22Z', '#D9F0FF', 3) + P('M64 22 L64 12 L74 12 L82 22Z', '#D9F0FF', 3) +
    C(28, 46, 9, '#4A4550', 4) + C(28, 46, 3.5, '#C9CBD1', 0) + C(78, 46, 9, '#4A4550', 4) + C(78, 46, 3.5, '#C9CBD1', 0), '0 0 104 60');

  var badge = {
    yes: C(80, 80, 17, '#4DAA57', 4) + L('M71 80 l6 6 l11 -12', 5, '#FFFFFF'),
    no: C(80, 80, 17, '#E5534B', 4) + L('M73 73 l14 14 M87 73 l-14 14', 5, '#FFFFFF')
  };

  /* ---------- simple world map ---------- */
  var LAND = {
    northAmerica: [[[18, 22], [30, 14], [48, 10], [66, 12], [80, 20], [76, 28], [70, 32], [66, 40], [62, 46], [56, 50], [52, 56], [55, 60], [50, 61], [44, 55], [38, 47], [30, 40], [22, 32]],
      [[78, 8], [90, 5], [98, 9], [94, 17], [84, 19], [79, 14]]],
    southAmerica: [[[53, 63], [62, 61], [72, 65], [78, 71], [74, 80], [66, 89], [60, 97], [56, 91], [54, 80], [50, 70]]],
    europe: [[[92, 22], [100, 16], [110, 13], [118, 17], [117, 26], [110, 31], [100, 33], [94, 29]]],
    africa: [[[91, 40], [104, 36], [116, 38], [124, 45], [128, 51], [122, 59], [116, 71], [108, 81], [103, 77], [100, 65], [94, 56], [88, 47]]],
    asia: [[[119, 14], [136, 8], [160, 8], [182, 12], [194, 20], [188, 30], [178, 36], [170, 46], [160, 52], [150, 54], [140, 50], [130, 45], [124, 39], [121, 30]]],
    australia: [[[160, 70], [172, 64], [184, 66], [190, 74], [186, 84], [174, 88], [164, 84], [158, 77]]],
    antarctica: [[[34, 102], [70, 99], [110, 101], [150, 99], [182, 102], [172, 107], [110, 106], [48, 107]]]
  };
  var ARCTIC = 'M6 4 Q100 -2 194 4 L194 9 Q160 13 130 9 Q100 13 70 9 Q40 13 6 9Z';
  function smooth(pts) {
    var n = pts.length, d = 'M' + pts[0][0] + ' ' + pts[0][1];
    for (var i = 0; i < n; i++) {
      var p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      var c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      var c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ' C' + c1x.toFixed(1) + ' ' + c1y.toFixed(1) + ' ' + c2x.toFixed(1) + ' ' + c2y.toFixed(1) + ' ' + p2[0] + ' ' + p2[1];
    }
    return d + 'Z';
  }
  var LAND_PATHS = {};
  Object.keys(LAND).forEach(function (k) { LAND_PATHS[k] = LAND[k].map(smooth); });

  function map(highlight) {
    var hl = highlight || [];
    var oceanOn = hl.indexOf('ocean') !== -1;
    var s = R(2, 2, 196, 108, 14, oceanOn ? '#4FA9E6' : '#CFE9F8', 3);
    s += P(ARCTIC, hl.indexOf('arctic') !== -1 ? '#FF9F1C' : '#F2F8FC', 2.5);
    Object.keys(LAND_PATHS).forEach(function (k) {
      var on = hl.indexOf(k) !== -1;
      var off = k === 'antarctica' ? '#F2F8FC' : (oceanOn ? '#E8E2D0' : '#D8E8C8');
      LAND_PATHS[k].forEach(function (d) { s += P(d, on ? '#FF9F1C' : off, 2.5); });
    });
    return svg(s, '0 0 200 112');
  }

  window.ICONS = {
    svg: svg,
    topic: function (k) { return svg(topic[k]); },
    body: function (k) { return svg(body[k] || body.skin); },
    habitat: function (k) { return svg(habitat[k]); },
    kind: function (k) { return svg(kind[k]); },
    feature: function (k) { return svg(feature[k]); },
    sizeRow: sizeRow,
    diet: function (k) { return svg(diet[k]); },
    yesNo: function (topicKey, yes) { return svg(topic[topicKey] + (yes ? badge.yes : badge.no)); },
    map: map,
    kid: kid,
    car: car,
    speaker: svg(P('M14 40 L30 40 L52 22 L52 78 L30 60 L14 60Z', '#FFC93C', 5) + L('M64 36 Q74 50 64 64', 5) + L('M74 26 Q90 50 74 74', 5)),
    speakerOff: svg(P('M14 40 L30 40 L52 22 L52 78 L30 60 L14 60Z', '#C9CBD1', 5) + L('M66 38 L88 62 M88 38 L66 62', 5)),
    back: svg(L('M58 20 L28 50 L58 80', 11)),
    next: svg(L('M42 20 L72 50 L42 80', 11)),
    search: svg(C(42, 42, 24, '#D9F0FF', 7) + L('M60 60 L84 84', 12)),
    guess: svg(L('M62 62 L88 88', 14) + C(42, 42, 30, '#FFF3C4', 7) +
      '<text x="42" y="56" text-anchor="middle" font-family="Andika, sans-serif" font-weight="700" font-size="40" fill="' + INK + '">?</text>'),
    bulb: svg(P('M50 8 Q78 8 80 36 Q80 52 66 62 L66 74 L34 74 L34 62 Q20 52 20 36 Q22 8 50 8Z', '#FFE07A', 5) +
      R(34, 74, 32, 10, 4, '#C9CBD1', 4) + R(38, 84, 24, 8, 4, '#A9ABB3', 4) + L('M42 40 L50 50 L58 40 M50 50 L50 72', 3.5)),
    paw: svg(topic.body),
    dice: svg('<g transform="rotate(-10 50 50)">' + R(14, 14, 72, 72, 18, '#FFFFFF', 6) +
      CN(32, 32, 7.5, INK) + CN(68, 32, 7.5, INK) + CN(50, 50, 7.5, INK) + CN(32, 68, 7.5, INK) + CN(68, 68, 7.5, INK) + '</g>'),
    grid: svg(R(12, 12, 32, 32, 8, '#FFE07A', 5) + R(56, 12, 32, 32, 8, '#9BC8EE', 5) + R(12, 56, 32, 32, 8, '#8FD18A', 5) + R(56, 56, 32, 32, 8, '#F59BB8', 5)),
    star: svg(P('M50 8 L61 36 L91 38 L68 57 L76 87 L50 70 L24 87 L32 57 L9 38 L39 36Z', '#FFC93C', 5)),
    play: svg(P('M30 16 Q30 10 36 13 L84 44 Q90 50 84 56 L36 87 Q30 90 30 84Z', '#FFFFFF', 6)),
    think: svg(
      C(16, 92, 5, '#FFFFFF', 3.5) + C(28, 80, 8, '#FFFFFF', 3.5) +
      P('M30 66 Q14 66 14 50 Q14 34 30 34 Q32 16 52 16 Q68 12 76 26 Q94 26 94 46 Q96 66 76 66Z', '#FFFFFF', 4) +
      '<text x="54" y="58" text-anchor="middle" font-family="Andika, sans-serif" font-weight="700" font-size="36" fill="' + INK + '">?</text>')
  };
})();
