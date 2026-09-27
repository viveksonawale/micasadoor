// Synthesized door sounds via Web Audio API — no audio files needed.
// Created on user gesture (the handle click), so no autoplay restrictions apply.

let ctx: AudioContext | null = null;

const getCtx = () => {
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
};

export const playHandleClick = () => {
  try {
    const ac = getCtx();
    if (!ac) return;
    const t = ac.currentTime;

    // metallic tick: short filtered noise burst
    const dur = 0.07;
    const buffer = ac.createBuffer(1, ac.sampleRate * dur, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2);
    }
    const src = ac.createBufferSource();
    src.buffer = buffer;
    const bp = ac.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 2600;
    bp.Q.value = 1.1;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.3, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(bp); bp.connect(g); g.connect(ac.destination);
    src.start(t);

    // low mechanical thunk
    const osc = ac.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(65, t + 0.09);
    const og = ac.createGain();
    og.gain.setValueAtTime(0.22, t);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.11);
    osc.connect(og); og.connect(ac.destination);
    osc.start(t);
    osc.stop(t + 0.12);
  } catch (e) { /* audio unavailable */ }
};

export const playDoorCreak = () => {
  try {
    const ac = getCtx();
    if (!ac) return;
    const t = ac.currentTime;
    const dur = 1.6;

    const osc = ac.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(160, t);
    osc.frequency.linearRampToValueAtTime(240, t + dur * 0.35);
    osc.frequency.linearRampToValueAtTime(120, t + dur);

    // creak wobble
    const lfo = ac.createOscillator();
    lfo.frequency.value = 8.5;
    const lfoGain = ac.createGain();
    lfoGain.gain.value = 45;
    lfo.connect(lfoGain); lfoGain.connect(osc.frequency);

    const bp = ac.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 700;
    bp.Q.value = 7;

    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.09, t + 0.3);

    // stick-slip stutter characteristic of a hinge creak
    const stut = ac.createOscillator();
    stut.type = "square";
    stut.frequency.value = 11;
    const stutGain = ac.createGain();
    stutGain.gain.value = 0.035;
    stut.connect(stutGain); stutGain.connect(g.gain);

    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    osc.connect(bp); bp.connect(g); g.connect(ac.destination);
    osc.start(t); lfo.start(t); stut.start(t);
    osc.stop(t + dur); lfo.stop(t + dur); stut.stop(t + dur);
  } catch (e) { /* audio unavailable */ }
};
