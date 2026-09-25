// YouTube 구독 전체 취소 스크립트 / YouTube Unsubscribe All
// 사용법: https://www.youtube.com/feed/channels 페이지의 개발자 도구 Console에 붙여 넣고 Enter
// Usage: paste into the DevTools Console on https://www.youtube.com/feed/channels and press Enter
// 중간에 멈추려면 / To stop: window.stopUnsub = true

(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const SUBSCRIBED = /구독중|Subscribed/i;
  const UNSUB = /구독 취소|Unsubscribe/i;
  const isVisible = (el) => el.getClientRects().length > 0;
  const findVisible = (selector, pattern) =>
    [...document.querySelectorAll(selector)].find(
      (el) => isVisible(el) && pattern.test(el.textContent)
    );

  window.stopUnsub = false;

  // 1. 끝까지 스크롤해서 구독 목록 전체 불러오기
  console.log('구독 목록 불러오는 중... / Loading subscriptions...');
  let last = -1;
  for (let i = 0; i < 200; i++) {
    window.scrollTo(0, document.documentElement.scrollHeight);
    await sleep(1500);
    const n = document.querySelectorAll('ytd-channel-renderer').length;
    if (n === last) break;
    last = n;
  }
  const channels = [...document.querySelectorAll('ytd-channel-renderer')];
  console.log(`구독 채널 ${channels.length}개 발견. 구독 취소를 시작합니다. / Found ${channels.length} channels. Starting to unsubscribe.`);

  // 2. 채널마다 "구독중" 버튼 → (메뉴가 뜨면 "구독 취소") → 확인 창 "구독 취소"
  let done = 0;
  for (const ch of channels) {
    if (window.stopUnsub) { console.log('중단했습니다. / Stopped.'); break; }
    const name = ch.querySelector('#channel-title')?.textContent.trim() || '(이름 없음)';
    const btn = [...ch.querySelectorAll('button')].find((b) => SUBSCRIBED.test(b.textContent));
    if (!btn) { console.warn('건너뜀 (구독중 버튼 없음) / Skipped (no Subscribed button):', name); continue; }

    btn.scrollIntoView({ block: 'center' });
    btn.click();
    await sleep(800);

    const dialogSel = 'yt-confirm-dialog-renderer button, tp-yt-paper-dialog button';
    let confirm = findVisible(dialogSel, UNSUB);
    if (!confirm) {
      const menuItem = findVisible(
        'ytd-popup-container ytd-menu-service-item-renderer, ytd-popup-container yt-list-item-view-model, ytd-popup-container [role="menuitem"]',
        UNSUB
      );
      if (menuItem) { menuItem.click(); await sleep(800); }
      confirm = findVisible(dialogSel, UNSUB);
    }
    if (!confirm) {
      console.warn('실패 (확인 버튼을 찾지 못함) / Failed (confirm button not found):', name);
      document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      continue;
    }
    confirm.click();
    done++;
    console.log(`[${done}/${channels.length}] 구독 취소 / Unsubscribed:`, name);
    await sleep(1200);
  }
  console.log(`완료: ${done}개 채널 구독 취소 / Done: unsubscribed from ${done} channels`);
})();
