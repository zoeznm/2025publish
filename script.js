// 캔버스 초기 설정
const canvas = document.getElementById("drawing_canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 버튼과 상태 변수
const yearButton = document.getElementById("yearButton");
let isCelebrating = false;

// 폭죽 파티클 설정
const particles = [];
const particleCount = 150;

// 버튼 클릭 이벤트
yearButton.addEventListener("click", () => {
  if (!isCelebrating) {
    isCelebrating = true;

    // 버튼 숨기고 문구 변경
    yearButton.textContent = "Happy 2025!";
    setTimeout(() => {
      yearButton.style.display = "none";
    }, 2000);

    // 폭죽 애니메이션 시작
    createParticles();
    requestAnimationFrame(animateParticles);

    // 파티클 종료 후 메시지 표시
    setTimeout(() => {
      showCredits();
    }, 2500); // 파티클 종료 후 5초 대기
  }
});

// 메시지 표시 함수
function showCredits() {
  const credits = document.getElementById("credits");
  credits.classList.remove("hidden");
  credits.style.opacity = 1; // 서서히 나타나도록 설정
}

// 파티클 생성
function createParticles() {
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: Math.random() * 15 + 5, // 크기를 더 다양하게
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      velocity: {
        x: Math.random() * 10 - 5, // 더 빠르게 퍼지도록 속도 증가
        y: Math.random() * 10 - 5,
      },
      alpha: 1,
      rotationSpeed: Math.random() * 0.2 - 0.1, // 회전 속도 추가
      rotation: Math.random() * 360, // 초기 회전 값
    });
  }
}

// 파티클 애니메이션
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    // 파티클 그리기
    ctx.save();
    ctx.globalAlpha = particle.alpha;
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 파티클 이동
    particle.x += particle.velocity.x;
    particle.y += particle.velocity.y;
    particle.alpha -= 0.01;

    // 파티클 제거
    if (particle.alpha <= 0) particles.splice(index, 1);
  });

  // 파티클이 남아있으면 계속 실행
  if (particles.length > 0) {
    requestAnimationFrame(animateParticles);
  }
}