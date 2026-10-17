// Sound Elements
const popSound = document.getElementById('popSound');
const cheerSound = document.getElementById('cheerSound');
const cutSound = document.getElementById('cutSound');
const bgMusic = document.getElementById('bgMusic');

// Password & Name Setting (Yahan Date of Birth change kar lena)
const CORRECT_NAME = "mama"; 
const CORRECT_DOB = "2005-10-19"; // Yahan apni date daal dena

function checkLogin() {
  const nameInput = document.getElementById('inputName').value.trim().toLowerCase();
  const dobInput = document.getElementById('inputDOB').value;
  const errorMsg = document.getElementById('errorMsg');

  if (nameInput.includes(CORRECT_NAME) && dobInput === CORRECT_DOB) {
    errorMsg.style.display = 'none';
    bgMusic.play().catch(() => console.log("Audio play allowed"));
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
  cheerSound.play();
  confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });

  document.getElementById('candleMsg').style.display = 'block';
  document.getElementById('step2Btn').style.display = 'block';
}

// Cake Cut
function cutCake() {
  const knife = document.getElementById('knife');
  knife.classList.add('cut-anim');
  cutSound.play();

  setTimeout(() => {
    cheerSound.play();
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
    document.getElementById('cakeMsg').style.display = 'block';
    document.getElementById('step3Btn').style.display = 'block';
  }, 400);
}

// Balloon Pop
let poppedCount = 0;
function popSingleBalloon(element) {
  if (element.style.opacity === '0') return;

  popSound.play();
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
  cheerSound.play();
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
