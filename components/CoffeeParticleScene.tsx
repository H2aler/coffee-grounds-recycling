"use client";

import { useEffect, useRef } from "react";

interface CoffeeBean {
  x: number;
  y: number;
  z: number; // 깊이 (홀로그램 효과용)
  size: number;
  rotation: number;
  rotationSpeed: number;
  speedX: number;
  speedY: number;
  speedZ: number;
  opacity: number;
  hue: number; // 홀로그램 색상
  phase: number; // 유기적 움직임을 위한 위상
  waveAmplitude: number; // 파도 효과
}

export default function CoffeeParticleScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const beansRef = useRef<CoffeeBean[]>([]);
  const isActiveRef = useRef(true);
  const timeRef = useRef(0);
  const isInitializedRef = useRef(false);
  const currentWidthRef = useRef<number>(0);
  const currentHeightRef = useRef<number>(0);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // 이전 애니메이션 정리
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    // 페이지 전환 시에도 애니메이션을 유지하면서 화면 크기에 맞게 조정
    // 원두 배열은 유지하되, 화면 크기 변경을 감지하기 위해 이전 크기 추적
    // 처음 초기화가 아니면 이전 크기를 유지하여 변경 감지
    const wasInitialized = isInitializedRef.current && beansRef.current.length > 0;
    if (!wasInitialized) {
      // 처음 초기화하는 경우
      currentWidthRef.current = 0;
      currentHeightRef.current = 0;
      isInitializedRef.current = false;
    }
    // 이미 초기화된 경우 currentWidthRef는 유지하여 화면 크기 변경 감지
    
    // 활성 상태 재설정
    isActiveRef.current = true;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // 커피 원두 생성 함수
    const createCoffeeBean = (width: number, height: number): CoffeeBean => {
      const size = Math.random() * 8 + 4; // 4-12px
      const z = Math.random() * 200 + 50; // 깊이 (50-250)
      
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        size,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3 + 0.1, // 약간 아래로 떨어지는 효과
        speedZ: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.4 + 0.3,
        hue: Math.random() * 60 + 20, // 갈색-주황색 범위 (20-80)
        phase: Math.random() * Math.PI * 2,
        waveAmplitude: Math.random() * 20 + 10,
      };
    };

    // 원두 수 결정 (성능 고려) - 화면 크기에 따라 동적 조정
    const getBeanCount = (width: number) => {
      if (width < 640) return 20; // 모바일
      if (width < 768) return 25; // 태블릿 작은 화면
      if (width < 1024) return 35; // 태블릿 큰 화면
      if (width < 1280) return 45; // 작은 데스크톱
      return 50; // 큰 데스크톱
    };

    // 원두 배열 조정 함수 (화면 크기 변경 시) - 부드럽게 조정
    const adjustBeans = (newWidth: number, newHeight: number) => {
      const currentCount = beansRef.current.length;
      const targetCount = getBeanCount(newWidth);
      
      // 원두 수가 변경되어야 하는 경우
      if (currentCount !== targetCount) {
        if (currentCount < targetCount) {
          // 원두 추가 - 부드럽게 추가
          const addCount = targetCount - currentCount;
          for (let i = 0; i < addCount; i++) {
            beansRef.current.push(createCoffeeBean(newWidth, newHeight));
          }
        } else if (currentCount > targetCount) {
          // 원두 제거 - 뒤에서부터 제거하여 자연스럽게
          beansRef.current = beansRef.current.slice(0, targetCount);
        }
      }
      
      // 모든 원두 위치를 새 화면 크기에 맞게 부드럽게 조정
      beansRef.current.forEach(bean => {
        // 화면 밖에 있으면 재배치
        if (bean.x < 0) {
          bean.x = Math.random() * newWidth * 0.1;
        } else if (bean.x > newWidth) {
          bean.x = newWidth - Math.random() * newWidth * 0.1;
        }
        if (bean.y < 0) {
          bean.y = Math.random() * newHeight * 0.1;
        } else if (bean.y > newHeight) {
          bean.y = newHeight - Math.random() * newHeight * 0.1;
        }
      });
    };

    // 원두 초기화 및 조정 함수 - 부드럽게 화면 크기에 맞게 조정
    const initBeans = () => {
      const rect = canvas.getBoundingClientRect();
      const newWidth = rect.width;
      const newHeight = rect.height;
      const targetCount = getBeanCount(newWidth);
      const currentCount = beansRef.current.length;
      
      // 처음 초기화하는 경우에만 새로 생성
      if (!isInitializedRef.current || currentCount === 0) {
        beansRef.current = [];
        for (let i = 0; i < targetCount; i++) {
          beansRef.current.push(createCoffeeBean(newWidth, newHeight));
        }
        isInitializedRef.current = true;
        currentWidthRef.current = newWidth;
        currentHeightRef.current = newHeight;
      } else {
        // 이미 초기화된 경우 - 화면 크기 변경 또는 원두 수 불일치 확인
        const prevWidth = currentWidthRef.current;
        const prevHeight = currentHeightRef.current;
        const widthChanged = Math.abs(prevWidth - newWidth) > 5;
        const heightChanged = Math.abs(prevHeight - newHeight) > 5;
        const countMismatch = currentCount !== targetCount;
        
        // 이전 화면 크기가 0이면 페이지 전환이므로 무조건 조정
        const isPageTransition = prevWidth === 0;
        
        // 화면 크기가 변경되었거나 원두 수가 맞지 않거나 페이지 전환이면 조정
        if (isPageTransition || widthChanged || heightChanged || countMismatch) {
          adjustBeans(newWidth, newHeight);
          currentWidthRef.current = newWidth;
          currentHeightRef.current = newHeight;
        } else {
          // 화면 크기가 같고 원두 수도 맞으면 위치만 재조정 (화면 밖에 있는 원두 처리)
          beansRef.current.forEach(bean => {
            if (bean.x < 0 || bean.x > newWidth) {
              bean.x = Math.random() * newWidth;
            } else {
              bean.x = Math.min(bean.x, newWidth);
            }
            if (bean.y < 0 || bean.y > newHeight) {
              bean.y = Math.random() * newHeight;
            } else {
              bean.y = Math.min(bean.y, newHeight);
            }
          });
        }
      }
    };

    // 원두를 먼저 초기화 또는 조정
    initBeans();

    // 성능 최적화: 디바이스 픽셀 비율 고려
    const dpr = window.devicePixelRatio || 1;
    const resizeCanvas = () => {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const newWidth = rect.width;
      const newHeight = rect.height;
      
      // 화면 크기가 실제로 변경되었는지 확인 (임계값을 낮춰서 더 민감하게)
      const widthChanged = Math.abs(currentWidthRef.current - newWidth) > 5;
      const heightChanged = Math.abs(currentHeightRef.current - newHeight) > 5;
      
      canvas.width = newWidth * dpr;
      canvas.height = newHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${newWidth}px`;
      canvas.style.height = `${newHeight}px`;
      
      // 화면 크기가 변경된 경우 즉시 원두 수 조정
      if (widthChanged || heightChanged) {
        adjustBeans(newWidth, newHeight);
        currentWidthRef.current = newWidth;
        currentHeightRef.current = newHeight;
      } else {
        // 작은 변경의 경우 위치만 재조정
        beansRef.current.forEach(bean => {
          bean.x = Math.min(bean.x, newWidth);
          bean.y = Math.min(bean.y, newHeight);
        });
      }
    };

    resizeCanvas();
    
    // ResizeObserver 사용 (더 정확한 크기 변경 감지) - 즉시 반응
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserverRef.current = new ResizeObserver((entries) => {
        // requestAnimationFrame을 사용하여 즉시 반응하되 렌더링 최적화
        requestAnimationFrame(() => {
          for (const entry of entries) {
            if (entry.target === canvas) {
              resizeCanvas();
            }
          }
        });
      });
      resizeObserverRef.current.observe(canvas);
    }
    
    // 리사이즈 이벤트 (ResizeObserver가 없는 경우 대비) - 디바운싱 최소화
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      // 디바운싱을 50ms로 줄여서 더 빠르게 반응
      resizeTimeout = setTimeout(() => {
        requestAnimationFrame(() => {
          resizeCanvas();
        });
      }, 50);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    
    // 모바일 화면 회전 감지 - 즉시 반응
    const handleOrientationChange = () => {
      // 화면 회전 시 즉시 반응하되 약간의 지연 (브라우저가 크기 계산 완료 대기)
      setTimeout(() => {
        requestAnimationFrame(() => {
          resizeCanvas();
        });
      }, 100);
    };
    window.addEventListener("orientationchange", handleOrientationChange);

    // 홀로그램 그라데이션 생성
    const createHologramGradient = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      hue: number,
      time: number
    ): CanvasGradient => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
      const hueShift = Math.sin(time * 0.01 + hue * 0.1) * 30;
      const currentHue = (hue + hueShift) % 360;
      
      // 홀로그램 무지개 효과
      gradient.addColorStop(0, `hsla(${currentHue}, 70%, 60%, 0.8)`);
      gradient.addColorStop(0.3, `hsla(${(currentHue + 30) % 360}, 70%, 55%, 0.6)`);
      gradient.addColorStop(0.6, `hsla(${(currentHue + 60) % 360}, 60%, 50%, 0.4)`);
      gradient.addColorStop(1, `hsla(${(currentHue + 90) % 360}, 50%, 45%, 0)`);
      
      return gradient;
    };

    // 커피 원두 그리기 (타원형)
    const drawCoffeeBean = (
      ctx: CanvasRenderingContext2D,
      bean: CoffeeBean,
      time: number,
      width: number,
      height: number
    ) => {
      // 깊이에 따른 크기 조정 (원근감)
      const scale = 200 / (bean.z + 100);
      const drawSize = bean.size * scale;
      
      // 깊이에 따른 투명도
      const depthOpacity = Math.max(0.2, 1 - bean.z / 300);
      const finalOpacity = bean.opacity * depthOpacity;
      
      // 유기적인 움직임 (파도 효과)
      const waveX = Math.sin(time * 0.002 + bean.phase) * bean.waveAmplitude * scale;
      const waveY = Math.cos(time * 0.003 + bean.phase) * bean.waveAmplitude * scale * 0.5;
      
      const drawX = bean.x + waveX;
      const drawY = bean.y + waveY;
      
      // 화면 밖이면 스킵
      if (drawX < -drawSize || drawX > width + drawSize || 
          drawY < -drawSize || drawY > height + drawSize) {
        return;
      }

      ctx.save();
      ctx.translate(drawX, drawY);
      ctx.rotate(bean.rotation);
      
      // 홀로그램 그라데이션 적용
      const gradient = createHologramGradient(ctx, 0, 0, drawSize, bean.hue, time);
      
      // 커피 원두 모양 (타원형)
      ctx.beginPath();
      ctx.ellipse(0, 0, drawSize, drawSize * 0.6, 0, 0, Math.PI * 2);
      
      // 홀로그램 채우기
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // 홀로그램 빛의 반사 효과
      ctx.globalCompositeOperation = 'screen';
      const highlightGradient = ctx.createRadialGradient(
        -drawSize * 0.3, -drawSize * 0.2, 0,
        -drawSize * 0.3, -drawSize * 0.2, drawSize * 0.8
      );
      highlightGradient.addColorStop(0, `rgba(255, 255, 255, ${finalOpacity * 0.6})`);
      highlightGradient.addColorStop(0.5, `rgba(255, 255, 200, ${finalOpacity * 0.3})`);
      highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = highlightGradient;
      ctx.fill();
      
      // 중앙 라인 (커피 원두 특징)
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = `rgba(101, 67, 33, ${finalOpacity * 0.4})`;
      ctx.lineWidth = drawSize * 0.1;
      ctx.beginPath();
      ctx.moveTo(-drawSize * 0.8, 0);
      ctx.lineTo(drawSize * 0.8, 0);
      ctx.stroke();
      
      // 홀로그램 빛의 굴절 효과 (주변 빛)
      ctx.shadowBlur = drawSize * 0.5;
      ctx.shadowColor = `hsla(${bean.hue}, 70%, 60%, ${finalOpacity * 0.5})`;
      ctx.beginPath();
      ctx.ellipse(0, 0, drawSize * 1.2, drawSize * 0.7, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${bean.hue}, 70%, 60%, ${finalOpacity * 0.2})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      
      ctx.restore();
    };

    // 연결선 그리기 (홀로그램 효과) - 화면 크기에 따라 거리 조정
    const drawConnections = (
      ctx: CanvasRenderingContext2D,
      beans: CoffeeBean[],
      time: number,
      width: number,
      height: number
    ) => {
      // 화면 크기에 따라 연결 거리 조정 (모바일에서는 더 짧게)
      const baseDistance = width < 768 ? 120 : width < 1024 ? 150 : 180;
      const connectionDistance = baseDistance;
      const connectionDistanceSq = connectionDistance * connectionDistance;
      
      // 모바일에서는 연결선 수 제한 (성능 최적화)
      const maxConnections = width < 768 ? 30 : width < 1024 ? 50 : Infinity;
      let connectionCount = 0;
      
      for (let i = 0; i < beans.length; i++) {
        const bean1 = beans[i];
        const scale1 = 200 / (bean1.z + 100);
        const waveX1 = Math.sin(time * 0.002 + bean1.phase) * bean1.waveAmplitude * scale1;
        const waveY1 = Math.cos(time * 0.003 + bean1.phase) * bean1.waveAmplitude * scale1 * 0.5;
        const x1 = bean1.x + waveX1;
        const y1 = bean1.y + waveY1;
        
        for (let j = i + 1; j < beans.length; j++) {
          const bean2 = beans[j];
          const scale2 = 200 / (bean2.z + 100);
          const waveX2 = Math.sin(time * 0.002 + bean2.phase) * bean2.waveAmplitude * scale2;
          const waveY2 = Math.cos(time * 0.003 + bean2.phase) * bean2.waveAmplitude * scale2 * 0.5;
          const x2 = bean2.x + waveX2;
          const y2 = bean2.y + waveY2;
          
          const dx = x1 - x2;
          const dy = y1 - y2;
          const distanceSq = dx * dx + dy * dy;
          
          if (distanceSq < connectionDistanceSq && connectionCount < maxConnections) {
            const distance = Math.sqrt(distanceSq);
            const opacity = 0.15 * (1 - distance / connectionDistance);
            const avgHue = (bean1.hue + bean2.hue) / 2;
            const hueShift = Math.sin(time * 0.01) * 20;
            
            // 홀로그램 연결선
            const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
            gradient.addColorStop(0, `hsla(${(avgHue + hueShift) % 360}, 70%, 60%, ${opacity})`);
            gradient.addColorStop(0.5, `hsla(${(avgHue + hueShift + 30) % 360}, 70%, 55%, ${opacity * 0.8})`);
            gradient.addColorStop(1, `hsla(${(avgHue + hueShift + 60) % 360}, 60%, 50%, ${opacity})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            connectionCount++;
          }
        }
      }
    };

    // 애니메이션 루프
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (!isActiveRef.current || !ctx || !canvas) return;

      // FPS 제한
      const elapsed = currentTime - lastTime;
      if (elapsed < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime - (elapsed % frameInterval);
      timeRef.current = currentTime;

      const rect = canvas.getBoundingClientRect();
      
      // 배경 그라데이션 (친환경 색상)
      const bgGradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      bgGradient.addColorStop(0, 'rgba(250, 247, 242, 0.1)'); // 베이지
      bgGradient.addColorStop(0.5, 'rgba(244, 237, 224, 0.05)'); // 라이트 베이지
      bgGradient.addColorStop(1, 'rgba(232, 217, 193, 0.1)'); // 커피색
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, rect.width, rect.height);
      
      // 원두 업데이트
      beansRef.current.forEach(bean => {
        // 위치 업데이트
        bean.x += bean.speedX;
        bean.y += bean.speedY;
        bean.z += bean.speedZ;
        
        // 회전 업데이트
        bean.rotation += bean.rotationSpeed;
        
        // 깊이 범위 제한
        if (bean.z < 50) {
          bean.z = 50;
          bean.speedZ = Math.abs(bean.speedZ);
        } else if (bean.z > 250) {
          bean.z = 250;
          bean.speedZ = -Math.abs(bean.speedZ);
        }
        
        // 경계 처리 (무한 루프)
        if (bean.x > rect.width + 50) bean.x = -50;
        else if (bean.x < -50) bean.x = rect.width + 50;
        if (bean.y > rect.height + 50) bean.y = -50;
        else if (bean.y < -50) bean.y = rect.height + 50;
      });
      
      // 깊이순 정렬 (원근감)
      beansRef.current.sort((a, b) => b.z - a.z);
      
      // 연결선 그리기
      drawConnections(ctx, beansRef.current, currentTime, rect.width, rect.height);
      
      // 원두 그리기
      beansRef.current.forEach(bean => {
        drawCoffeeBean(ctx, bean, currentTime, rect.width, rect.height);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // 페이지 가시성 API
    const handleVisibilityChange = () => {
      isActiveRef.current = !document.hidden;
      if (isActiveRef.current && animationFrameRef.current === null) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isActiveRef.current = false;
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      clearTimeout(resizeTimeout);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      // 원두 배열은 유지하여 페이지 전환 시 빠른 재시작
      // beansRef.current = [];
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.4 }}
      aria-hidden="true"
    />
  );
}
