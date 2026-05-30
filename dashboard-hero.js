/**
 * PATH BLUEPRINT - SAAS HERO INTERACTION CONTROLLER
 * High-end startup landing page interactive behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const appWindow = document.getElementById('dashboard-app-window');
  const growthCard = document.getElementById('floating-growth-card');
  const dropzoneTrigger = document.getElementById('dropzone-trigger');
  const parserContainer = document.getElementById('resume-parser-container');
  const parserStatusLbl = document.getElementById('parser-status-lbl');
  const dropzoneText = document.getElementById('dropzone-text');
  const skeletonContainer = document.getElementById('resume-skeleton-container');
  const profileTitle = document.getElementById('profile-title-display');
  const profileSub = document.getElementById('profile-sub-display');
  const radialPct = document.getElementById('competency-pct');
  const radialBar = document.getElementById('competency-radial-bar');
  const chartMarker = document.getElementById('chart-marker-cursor');
  const equalizerContainer = document.getElementById('equalizer-container');
  const activeBarLabel = document.getElementById('active-bar-label');
  const ctaGenerate = document.getElementById('cta-generate');
  const ctaDemo = document.getElementById('cta-demo');

  // Initial States
  let isParsing = false;
  let parsedSuccess = false;

  // 1. 3D Mouse Parallax Effect (Apple & Linear Dashboard aesthetic)
  const heroRightCol = document.querySelector('.hero-right-col');
  
  if (heroRightCol && appWindow) {
    heroRightCol.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 1024) return; // Disable on tablet/mobile for performance
      
      const rect = heroRightCol.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within element
      const y = e.clientY - rect.top;  // y position within element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation angles (-5 to +5 degrees)
      const rotateX = -(y - centerY) / (rect.height / 10);
      const rotateY = (x - centerX) / (rect.width / 10);
      
      // Apply smooth transition values
      appWindow.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(10px)`;
      
      // Opposite float for the growth card to create depth
      if (growthCard) {
        const floatX = (x - centerX) / (rect.width / 8);
        const floatY = (y - centerY) / (rect.height / 8);
        growthCard.style.transform = `translateX(${floatX}px) translateY(${floatY}px) translateZ(40px)`;
      }
    });

    // Reset rotation on leave
    heroRightCol.addEventListener('mouseleave', () => {
      appWindow.style.transform = `rotateY(-3deg) rotateX(1.5deg) translateZ(0)`;
      if (growthCard) {
        growthCard.style.transform = `translateY(0px) rotate(-1deg) translateZ(0)`;
      }
    });
  }

  // 2. Interactive Resume Parsing Simulator (AI Profile Engine)
  const skillsPool = [
    { title: 'Python & PyTorch', level: 'w-75' },
    { title: 'LLM Fine-Tuning', level: 'w-90' },
    { title: 'Transformer Architectures', level: 'w-60' },
    { title: 'Kubernetes Orchestration', level: 'w-45' },
    { title: 'Distributed Systems', level: 'w-75' }
  ];

  const defaultSkeletons = `
    <div class="skeleton-item">
      <div class="skeleton-dot shimmer-active"></div>
      <div class="skeleton-line w-45 shimmer-active"></div>
    </div>
    <div class="skeleton-item">
      <div class="skeleton-dot shimmer-active"></div>
      <div class="skeleton-line w-75 shimmer-active"></div>
    </div>
    <div class="skeleton-item">
      <div class="skeleton-dot shimmer-active"></div>
      <div class="skeleton-line w-60 shimmer-active"></div>
    </div>
    <div class="skeleton-item">
      <div class="skeleton-dot shimmer-active"></div>
      <div class="skeleton-line w-30 shimmer-active"></div>
    </div>
    <div class="skeleton-item">
      <div class="skeleton-dot shimmer-active"></div>
      <div class="skeleton-line w-90 shimmer-active"></div>
    </div>
  `;

  const startAIParsing = () => {
    if (isParsing) return;
    isParsing = true;
    parsedSuccess = false;

    // Reset UI to analyzing state
    parserStatusLbl.innerHTML = `<div class="pulse-circle"></div><span>Uploading...</span>`;
    parserStatusLbl.style.color = '#3B82F6';
    dropzoneText.innerHTML = `Analyzing <span>cv_expert_profile.pdf</span>...`;
    
    // Add pulsing border to dropzone
    const dropzone = document.querySelector('.parser-dropzone');
    dropzone.style.borderColor = 'var(--accent-indigo)';
    dropzone.style.boxShadow = '0 0 15px rgba(99, 102, 241, 0.15)';
    
    // Reset radial and profiles in dashboard
    radialPct.innerText = '0%';
    if (radialBar) radialBar.style.strokeDashoffset = '100';
    profileTitle.innerText = 'Extracting Profile...';
    profileSub.innerText = 'Reading professional history...';
    
    // Reset projection cursor position
    if (chartMarker) {
      chartMarker.style.left = '10%';
      chartMarker.style.transition = 'left 3s cubic-bezier(0.16, 1, 0.3, 1)';
    }

    // Step 1: File parsed (1.5 seconds)
    setTimeout(() => {
      parserStatusLbl.innerHTML = `<div class="pulse-circle" style="background-color: var(--accent-indigo)"></div><span>AI Scanning...</span>`;
      parserStatusLbl.style.color = 'var(--accent-indigo)';
      profileTitle.innerText = 'Structuring Skills...';
      profileSub.innerText = 'Matching industry clusters...';
      
      // Update skeleton container to double shimmering
      skeletonContainer.querySelectorAll('.skeleton-line, .skeleton-dot').forEach(el => {
        el.style.background = '#E0F2FE';
      });
    }, 1500);

    // Step 2: Mapping Competencies (3 seconds)
    setTimeout(() => {
      parserStatusLbl.innerHTML = `<div class="pulse-circle" style="background-color: #F59E0B"></div><span>Compiling Path...</span>`;
      parserStatusLbl.style.color = '#D97706';
      profileTitle.innerText = 'Compiling Competencies...';
      profileSub.innerText = 'Aligning to Director of AI/ML targets...';
      
      // Animate radial percentage counter up
      animateCounter(0, 88, 1500, (val) => {
        radialPct.innerText = `${val}%`;
        if (radialBar) {
          const offset = 100 - (val * 100) / 100;
          radialBar.style.strokeDashoffset = offset;
        }
      });
      
      if (chartMarker) {
        chartMarker.style.left = '55%';
      }
    }, 3000);

    // Step 3: Success Compiled (4.8 seconds)
    setTimeout(() => {
      isParsing = false;
      parsedSuccess = true;

      // Update widget status
      parserStatusLbl.innerHTML = `
        <svg viewBox="0 0 20 20" fill="currentColor" style="width: 14px; height:14px; color: var(--color-green-icon);">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span style="color: var(--color-green-text); font-weight: 600;">Blueprint Synced</span>
      `;
      
      dropzoneText.innerHTML = `Resume parsed! <span>Click to scan again</span>`;
      dropzone.style.borderColor = 'var(--color-green-icon)';
      dropzone.style.boxShadow = '0 0 15px rgba(34, 197, 94, 0.1)';
      
      // Load real skills instead of skeletons
      profileTitle.innerText = 'Principal AI Architect';
      profileSub.innerText = 'AI Research Lab Target Profile Match';
      
      let skillsHtml = '<div class="card-label"><span class="live-pill" style="background-color: var(--color-green-icon); box-shadow: 0 0 6px var(--color-green-icon);"></span><span>AI Extracted Stack</span></div>';
      skillsPool.forEach((skill, index) => {
        skillsHtml += `
          <div class="skeleton-item" style="opacity: 0; transform: translateY(5px); animation: skillFadeIn 0.3s ease-out forwards; animation-delay: ${index * 0.1}s;">
            <svg viewBox="0 0 20 20" fill="currentColor" style="width: 12px; height: 12px; color: var(--accent-indigo);">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <span style="font-size: 0.68rem; font-weight: 600; color: var(--text-dark);">${skill.title}</span>
          </div>
        `;
      });
      
      skeletonContainer.innerHTML = skillsHtml;

      // Add a CSS animation on the fly for beautiful skill list entrance
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes skillFadeIn {
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);

      // Trigger a pulse animation on the floating growth card
      if (growthCard) {
        growthCard.style.transform = 'scale(1.15) rotateZ(1deg)';
        setTimeout(() => {
          growthCard.style.transform = '';
        }, 500);
      }

      // Animate the bottom equalizer bars to higher values representing updated forecast
      animateEqualizerBars(true);
    }, 4800);
  };

  // Helper utility to animate counters smoothly
  function animateCounter(start, end, duration, callback) {
    let startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentVal = Math.floor(progress * (end - start) + start);
      callback(currentVal);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  }

  // Bind trigger to dropzone
  if (dropzoneTrigger) {
    dropzoneTrigger.addEventListener('click', () => {
      startAIParsing();
    });
  }

  // 3. Bottom Equalizer Hover Tooltips & Interactions
  const monthlyPhrases = {
    January: 'Global AI recruiter index rises +35%. Cloud infrastructure demands spike.',
    February: 'Enterprise AI investments expand. Python and PyTorch requirements grow +48%.',
    March: 'Q1 talent allocation peak. Match capability forecasts +60% velocity.',
    April: 'System engineering demands hold steady. Edge computing matches +42%.',
    May: 'Silicon Valley cohort hires rise. Large Language Model expertise shifts +75%.',
    June: 'Mid-year career pathways accelerate. Machine learning engineering spikes +88%.',
    July: 'Product strategy planning cycles commence. System design matching rises +65%.',
    August: 'Summer technical assessment peak. Data engineering profiles match +50%.',
    September: 'Q3 expansion workflows start. Autonomous agent integration peaks +72%.',
    October: 'Annual tech hiring crescendo. AI Blueprint matching peaks at a record +95%.',
    November: 'Enterprise optimization focus. Infrastructure & compliance matching surges +80%.',
    December: 'Year-end pathway consolidation. Automated recommendation alignment +60%.'
  };

  if (equalizerContainer) {
    const bars = equalizerContainer.querySelectorAll('.eq-bar');
    
    bars.forEach(bar => {
      bar.addEventListener('mouseenter', () => {
        const month = bar.getAttribute('data-month');
        const phrase = monthlyPhrases[month] || `Demand Forecast for ${month}`;
        
        activeBarLabel.innerHTML = `<strong>${month}:</strong> ${phrase}`;
        activeBarLabel.style.color = 'var(--text-dark)';
      });

      bar.addEventListener('mouseleave', () => {
        activeBarLabel.innerHTML = 'Hover over elements for demand forecasting';
        activeBarLabel.style.color = 'var(--text-muted)';
      });
      
      // Pulse animation on click
      bar.addEventListener('click', () => {
        bar.style.transform = 'scaleY(1.3) scaleX(1.1)';
        setTimeout(() => {
          bar.style.transform = '';
        }, 300);
      });
    });
  }

  // Animate Equalizer heights dynamically
  function animateEqualizerBars(elevated = false) {
    const bars = equalizerContainer.querySelectorAll('.eq-bar');
    bars.forEach((bar, idx) => {
      const baseVal = parseInt(bar.getAttribute('data-val'));
      // If elevated (e.g. after AI scan success), scale up demand metrics
      const finalVal = elevated ? Math.min(Math.floor(baseVal * 1.15), 100) : baseVal;
      
      setTimeout(() => {
        bar.style.height = `${finalVal}%`;
        const tooltip = bar.querySelector('.eq-tooltip');
        if (tooltip) {
          const monthShort = bar.getAttribute('data-month').substring(0, 3);
          tooltip.innerText = `${monthShort}: ${finalVal}%`;
        }
      }, idx * 40);
    });
  }

  // 4. CTA Button micro-interactions
  if (ctaGenerate) {
    ctaGenerate.addEventListener('click', () => {
      // Trigger parsing as a demo
      startAIParsing();
      // Smooth scroll to parser if viewport is small
      if (window.innerWidth < 1024) {
        parserContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  if (ctaDemo) {
    ctaDemo.addEventListener('click', () => {
      // Interactive demo toggle
      if (parsedSuccess) {
        // Reset to initial
        parsedSuccess = false;
        skeletonContainer.innerHTML = defaultSkeletons;
        profileTitle.innerText = 'Principal Architect Blueprint';
        profileSub.innerText = 'Targeting Director of AI/ML Pathways';
        parserStatusLbl.innerHTML = `<div class="pulse-circle"></div><span>Ready for import</span>`;
        parserStatusLbl.style.color = 'var(--accent-blue)';
        dropzoneText.innerHTML = `Drag & drop your resume or <span>browse files</span>`;
        document.querySelector('.parser-dropzone').style.borderColor = 'rgba(148, 163, 184, 0.4)';
        document.querySelector('.parser-dropzone').style.boxShadow = '';
        
        radialPct.innerText = '88%';
        if (radialBar) radialBar.style.strokeDashoffset = '12';
        if (chartMarker) chartMarker.style.left = '55%';
        
        animateEqualizerBars(false);
      } else {
        startAIParsing();
      }
    });
  }

  // Initialize bars animation on page load
  setTimeout(() => {
    animateEqualizerBars(false);
  }, 300);

});
