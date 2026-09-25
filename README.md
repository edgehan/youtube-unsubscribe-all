**한국어** | [English](README.en.md)

# YouTube 구독 전체 취소 스크립트

YouTube에서 구독한 채널을 한꺼번에 구독 취소하는 브라우저 스크립트입니다.
설치할 것 없이 Chrome 개발자 도구 Console에 붙여 넣기만 하면 됩니다.

> ⚠️ **구독 취소는 되돌릴 수 없습니다.** 다시 구독하려면 채널을 하나씩 찾아 구독해야 합니다.

## 사용 방법

1. Chrome에서 구독을 정리할 계정으로 로그인한 뒤 https://www.youtube.com/feed/channels 를 엽니다.
2. [`unsubscribe-all.js`](unsubscribe-all.js) 파일을 열고 내용을 전부 복사합니다.
3. `Cmd + Option + J` (Windows: `Ctrl + Shift + J`)를 눌러 Console을 엽니다.
4. Console에 붙여 넣고 `Enter`를 누릅니다.
   - 붙여 넣기 경고가 뜨면 `allow pasting`을 직접 입력하고 Enter를 누른 뒤 다시 붙여 넣으세요.
5. 목록을 끝까지 불러온 뒤 한 채널씩 약 1초 간격으로 구독을 취소합니다. 진행 상황은 Console에 표시됩니다.

중간에 멈추려면 Console에 입력하세요:

```js
window.stopUnsub = true
```

## 동작 방식

- "구독중"(Subscribed) 버튼이 있는 채널만 누르므로, 구독하지 않은 채널을 실수로 구독하지 않습니다.
- "구독중" 버튼 → "구독 취소" 메뉴 → 확인 창의 "구독 취소" 순서로 누릅니다.
- 한국어와 영어 YouTube 화면을 지원합니다.
- 페이지의 버튼만 누르며, 어떤 정보도 외부로 보내지 않습니다.

## 참고

YouTube 화면 구조가 바뀌면 동작하지 않을 수 있습니다. Console에 "실패"나 "건너뜀"이 계속 나오면 이슈로 알려 주세요.

붙여 넣기 전에 코드를 꼭 직접 확인하세요. 모르는 사람이 준 코드를 Console에 붙여 넣으면 계정을 빼앗길 수 있습니다.

## 라이선스

[MIT](LICENSE) © edgehan
