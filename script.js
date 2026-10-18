// Web Audio API Synthesis for Mobile-Friendly Instant Sound Effects
function playPopSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch(e) {}
}

function playCheerSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, index) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }, index * 100);
    });
  } catch(e) {}
}

function playCutSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch(e) {}
}

// Password & Name Setting
const CORRECT_NAME = "mama"; 
const CORRECT_DOB = "2005-10-19"; 

function checkLogin() {
  const nameInput = document.getElementById('inputName').value.trim().toLowerCase();
  const dobInput = document.getElementById('inputDOB').value;
  const errorMsg = document.getElementById('errorMsg');

  if (nameInput.includes(CORRECT_NAME) && dobInput === CORRECT_DOB) {
    errorMsg.style.display = 'none';
    playCheerSound();
    nextStep(2);
  } else {
    errorMsg.style.display = 'block';
  }
}

function nextStep(stepNumber) {
  document.querySelectorAll('.step').forEach(step => {
    step.classList.remove('active');
  });
  document.getElementById('step' + stepNumber).classList.add('active');

  if (stepNumber === 5) {
    triggerParty();
  }
}

// Candle Blow
function blowCandle() {
  document.getElementById('flame').style.display = 'none';
  playCheerSound();
  confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });

  document.getElementById('candleMsg').style.display = 'block';
  document.getElementById('step2Btn').style.display = 'block';
}

// Cake Cut
function cutCake() {
  const knife = document.getElementById('knife');
  knife.classList.add('cut-anim');
  playCutSound();

  setTimeout(() => {
    playCheerSound();
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
    document.getElementById('cakeMsg').style.display = 'block';
    document.getElementById('step3Btn').style.display = 'block';
  }, 400);
}

// Balloon Pop
let poppedCount = 0;
function popSingleBalloon(element) {
  if (element.style.opacity === '0') return;

  playPopSound();
  confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });

  element.style.transform = 'scale(1.5)';
  element.style.opacity = '0';

  setTimeout(() => {
    element.style.visibility = 'hidden';
  }, 200);

  poppedCount++;

  if (poppedCount >= 3) {
    setTimeout(() => {
      document.getElementById('balloonMsg').style.display = 'block';
      document.getElementById('step4Btn').style.display = 'block';
    }, 400);
  }
}

// Final Party Fireworks
function triggerParty() {
  playCheerSound();
  var count = 200;
  var defaults = { origin: { y: 0.7 } };

  function fire(particleRatio, opts) {
    confetti(Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio)
    }));
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}
